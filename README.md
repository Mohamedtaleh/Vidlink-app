# SnapKit.io - TikTok Video Downloader

A high-performance, modern TikTok Downloader website that allows users to download TikTok videos without watermark, with watermark, or as MP3 audio.

## 🚀 Features

- **Download Options**: HD without watermark, with watermark, MP3 audio
- **Multi-language**: English, French, Arabic, Spanish
- **Mobile-first Design**: Responsive with dark/light mode
- **Sharing Features**: WhatsApp, Telegram, QR codes
- **AdSense Ready**: Strategic ad placement for monetization
- **SEO Optimized**: Multiple routes for search optimization
- **Rate Limiting**: Prevents abuse with IP-based limits
- **Privacy Focused**: No video storage, links expire in 10 minutes

## 🛠️ Tech Stack

- **Frontend**: React + Tailwind CSS
- **Backend**: FastAPI + Python
- **Database**: MongoDB
- **API**: TikWM (free TikTok scraper)
- **Deployment**: Vercel (frontend) + Railway (backend)

## 📦 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables:
   - `REACT_APP_BACKEND_URL`: Your backend URL
4. Deploy automatically

### Backend (Railway/Render)
1. Create new project
2. Connect GitHub repository
3. Set environment variables:
   - `MONGO_URL`: Your MongoDB connection string
   - `DB_NAME`: Database name
   - `PORT`: 8000
4. Deploy automatically

### Database (MongoDB Atlas)
1. Create MongoDB Atlas account
2. Create new cluster
3. Get connection string
4. Update backend environment variables

## 🔧 Local Development

### Prerequisites
- Node.js 18+ and Yarn
- Python 3.11+
- MongoDB (local or Atlas)

### Setup
1. Clone repository
2. Install dependencies:
   ```bash
   # Frontend
   cd frontend
   yarn install
   
   # Backend
   cd backend
   pip install -r requirements.txt
   ```

3. Set environment variables:
   ```bash
   # Frontend (.env)
   REACT_APP_BACKEND_URL=http://localhost:8000
   
   # Backend (.env)
   MONGO_URL=mongodb://localhost:27017/snapkit
   DB_NAME=snapkit
   ```

4. Run development servers:
   ```bash
   # Frontend
   cd frontend && yarn start
   
   # Backend
   cd backend && python server.py
   ```

## 🌍 Environment Variables

### Frontend (.env)
```
REACT_APP_BACKEND_URL=https://your-backend-url.com
```

### Backend (.env)
```
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/snapkit
DB_NAME=snapkit
PORT=8000
ENVIRONMENT=production
CORS_ORIGINS=https://snapkit.vercel.app,https://snapkit-io.vercel.app
```

## 📄 API Documentation

### Parse TikTok URL
```
POST /api/parse
{
  "url": "https://www.tiktok.com/@user/video/123456789"
}
```

### Download Video
```
GET /api/download/video/{video_id}?watermark=false
```

### Download Audio
```
GET /api/download/audio/{video_id}
```

## 🎯 Monetization

The app is **AdSense ready** with strategic ad placements:
- Top leaderboard (728x90)
- Sidebar ads (160x600)
- Mid-content rectangle (300x250)
- Bottom sticky banner (320x50)

## 📈 SEO Routes

- `/` - Main downloader
- `/tiktok-to-mp3` - Audio conversion focus
- `/remove-watermark` - Watermark removal focus

## 🔒 Security Features

- Input validation for TikTok URLs
- Rate limiting (10 requests/hour per IP)
- CORS configuration
- Environment variable protection
- No video storage policy

## 🌐 Multi-language Support

- English (default)
- French
- Arabic (RTL layout)
- Spanish
- Auto-detect browser language

## 📱 Mobile Features

- QR code generation for mobile downloads
- Responsive design
- Touch-friendly interface
- Mobile-optimized ad formats

## 🔧 Maintenance

- Links expire after 10 minutes
- Automatic cleanup of temporary files
- MongoDB indexes for performance
- Error logging and monitoring

## 📞 Support

For support or questions, visit our website or contact us through the app.

## 📄 License

MIT License - feel free to use this code for your own projects!

---

**SnapKit.io** - Fast, Free, and Secure TikTok Video Downloader 🚀