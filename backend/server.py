from fastapi import FastAPI, APIRouter, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from pathlib import Path
from datetime import datetime
import httpx
import time
import re
import uuid
import os
import logging
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

# Load environment variables from .env
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB Setup
mongo_url = os.getenv("MONGO_URL")
db_name = os.getenv("DB_NAME", "vidlink_db")
client = AsyncIOMotorClient(mongo_url)
db = client[db_name]

# FastAPI app & router setup
app = FastAPI()
api_router = APIRouter(prefix="/api")






# Path to your static folder
STATIC_DIR = os.path.join(os.path.dirname(__file__), "static")

@app.get("/robots.txt", include_in_schema=False)
async def robots_txt():
    return FileResponse(os.path.join(STATIC_DIR, "robots.txt"), media_type="text/plain")

@app.get("/sitemap.xml", include_in_schema=False)
async def sitemap_xml():
    return FileResponse(os.path.join(STATIC_DIR, "sitemap.xml"), media_type="application/xml")

# Rate limiting config
RATE_LIMIT_REQUESTS = 10
RATE_LIMIT_WINDOW = 3600  # 1 hour in seconds
request_queue = []

# TikTok URL regex patterns (expanded)
TIKTOK_URL_PATTERNS = [
    r"^https?://(?:www\.)?tiktok\.com/@[\w\.-]+/video/(\d+)",
    r"^https?://(?:vm\.)?tiktok\.com/[\w\.-]+",
    r"^https?://(?:m\.)?tiktok\.com/@[\w\.-]+/video/(\d+)",
]

# Pydantic models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class TikTokRequest(BaseModel):
    url: str

class VideoResponse(BaseModel):
    video_id: str
    title: str
    author: str
    thumbnail: str
    hd_video_url: str
    watermark_video_url: str
    audio_url: str
    caption: str
    duration: int
    likes: int
    download_count: int
    created_at: float

class DownloadResponse(BaseModel):
    download_url: str
    expires_at: float

# Utilities
def validate_tiktok_url(url: str) -> bool:
    return any(re.match(pattern, url) for pattern in TIKTOK_URL_PATTERNS)

def extract_video_id(url: str) -> str:
    for pattern in TIKTOK_URL_PATTERNS:
        match = re.match(pattern, url)
        if match and match.groups():
            return match.group(1)
    # fallback
    return str(abs(hash(url)) % (10**8))

async def rate_limit_check(request: Request):
    client_ip = request.client.host
    current_time = time.time()

    global request_queue
    # Remove outdated requests older than window
    request_queue = [
        (ip, timestamp) for ip, timestamp in request_queue
        if timestamp > current_time - RATE_LIMIT_WINDOW
    ]

    ip_requests = sum(1 for ip, _ in request_queue if ip == client_ip)
    if ip_requests >= RATE_LIMIT_REQUESTS:
        raise HTTPException(
            status_code=429,
            detail=f"Rate limit exceeded: Max {RATE_LIMIT_REQUESTS} requests per hour."
        )
    request_queue.append((client_ip, current_time))

async def call_tikwm_api(url: str) -> Dict[str, Any]:
    tikwm_url = "https://tikwm.com/api/"
    async with httpx.AsyncClient(timeout=30.0) as client:
        try:
            response = await client.get(tikwm_url, params={"url": url, "hd": 1})
            response.raise_for_status()
            data = response.json()
            if data.get("code") != 0:
                raise HTTPException(
                    status_code=400,
                    detail=f"TikWM API error: {data.get('msg', 'Unknown error')}"
                )
            return data.get("data", {})
        except httpx.RequestError as e:
            raise HTTPException(status_code=500, detail=f"Failed to connect to TikWM API: {str(e)}")
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail=f"TikWM API returned error: {e.response.status_code}")

# Routes
@api_router.get("/")
async def root():
    return {"message": "VidLink TikTok Downloader API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(client_name=input.client_name)
    await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**item) for item in status_checks]

@api_router.post("/parse", response_model=VideoResponse)
async def parse_tiktok_url(request: TikTokRequest, http_request: Request):
    await rate_limit_check(http_request)

    if not validate_tiktok_url(request.url):
        raise HTTPException(400, "Invalid TikTok URL format. Please provide a valid TikTok video URL.")

    try:
        video_data = await call_tikwm_api(request.url)
        video_id = extract_video_id(request.url)

        video_record = {
            "video_id": video_id,
            "url": request.url,
            "title": video_data.get("title", ""),
            "author": video_data.get("author", {}).get("unique_id", ""),
            "thumbnail": video_data.get("cover", ""),
            "hd_video_url": video_data.get("hdplay", ""),
            "watermark_video_url": video_data.get("play", ""),
            "audio_url": video_data.get("music", ""),
            "caption": video_data.get("title", ""),
            "duration": video_data.get("duration", 0),
            "likes": video_data.get("digg_count", 0),
            "download_count": 0,
            "created_at": time.time()
        }

        existing_video = await db.videos.find_one({"video_id": video_id})
        if existing_video:
            return VideoResponse(**existing_video)

        await db.videos.insert_one(video_record)
        return VideoResponse(**video_record)
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error processing TikTok URL: {str(e)}")
        raise HTTPException(500, f"Failed to process TikTok URL: {str(e)}")

@api_router.get("/download/video/{video_id}")
async def download_video(video_id: str, watermark: bool = False):
    video = await db.videos.find_one({"video_id": video_id})
    if not video:
        raise HTTPException(404, "Video not found")

    # Increment download count
    await db.videos.update_one({"video_id": video_id}, {"$inc": {"download_count": 1}})

    download_url = video["watermark_video_url"] if watermark else video["hd_video_url"]

    if not download_url:
        raise HTTPException(404, "Download URL not available for this video")

    return DownloadResponse(download_url=download_url, expires_at=time.time() + 600)

@api_router.get("/download/audio/{video_id}")
async def download_audio(video_id: str):
    video = await db.videos.find_one({"video_id": video_id})
    if not video:
        raise HTTPException(404, "Video not found")

    await db.videos.update_one({"video_id": video_id}, {"$inc": {"download_count": 1}})

    audio_url = video.get("audio_url")
    if not audio_url:
        raise HTTPException(404, "Audio URL not available for this video")

    return DownloadResponse(download_url=audio_url, expires_at=time.time() + 600)

@api_router.get("/video/{video_id}", response_model=VideoResponse)
async def get_video_info(video_id: str):
    video = await db.videos.find_one({"video_id": video_id})
    if not video:
        raise HTTPException(404, "Video not found")
    return VideoResponse(**video)

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": time.time(), "service": "VidLink TikTok Downloader"}

# Include router
app.include_router(api_router)
app.mount("/", StaticFiles(directory="static", html=True), name="static")


# CORS middleware (adjust origins as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, set specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Logging config
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
