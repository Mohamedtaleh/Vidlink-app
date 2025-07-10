import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  FaVideo,
  FaWater,
  FaMusic,
  FaCopy,
  FaWhatsapp,
  FaTelegramPlane,
} from "react-icons/fa";
import { Helmet } from "react-helmet";

import "./App.css";


// Replace this with your actual backend base URL
const API = "http://localhost:8000/api";

const languages = {
  en: {
    hero: {
      title: "Download TikTok Videos Without Watermark",
      subtitle:
        "Paste a TikTok video URL below and get a clean download link instantly.",
      placeholder: "Enter TikTok video URL",
      button: "Download",
    },
    error_invalid_url: "Please enter a valid TikTok video URL.",
    how_it_works: {
      title: "How It Works",
      step1: "Copy TikTok video link",
      step2: "Paste URL in the box above",
      step3: "Download your video instantly",
    },
    trending: {
      title: "🔻 Most Downloaded This Week",
    },
    testimonials: {
      title: "What Users Say",
      user1: {
        text: "Super fast and easy to use! Downloaded 10 videos in minutes.",
        name: "Sarah M.",
      },
      user2: {
        text: "Finally, a downloader that actually removes watermarks!",
        name: "Mike T.",
      },
      user3: {
        text: "Clean interface, no ads, just works perfectly.",
        name: "Lisa K.",
      },
    },
    footer: {
      about: "About",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
    },
    features: {
      title: "Why Choose VidLink?",
      no_watermark: {
        title: "No Watermark",
        desc: "Download HD videos without TikTok branding",
      },
      fast_free: {
        title: "Fast & Free",
        desc: "Lightning-fast downloads, completely free forever",
      },
      safe_private: {
        title: "Safe & Private",
        desc: "No registration, no tracking, no stored data",
      },
    },
  },
  fr: {
    hero: {
      title: "Téléchargez des Vidéos TikTok Sans Filigrane",
      subtitle:
        "Collez l'URL d'une vidéo TikTok ci-dessous pour obtenir un lien de téléchargement propre.",
      placeholder: "Entrez l'URL de la vidéo TikTok",
      button: "Télécharger",
    },
    error_invalid_url: "Veuillez entrer une URL TikTok valide.",
    how_it_works: {
      title: "Comment Ça Marche",
      step1: "Copiez le lien de la vidéo TikTok",
      step2: "Collez l'URL dans la boîte ci-dessus",
      step3: "Téléchargez votre vidéo instantanément",
    },
    trending: {
      title: "🔻 Les Plus Téléchargées Cette Semaine",
    },
    testimonials: {
      title: "Ce Que Disent les Utilisateurs",
      user1: {
        text: "Ultra rapide et facile à utiliser ! 10 vidéos en quelques minutes.",
        name: "Sarah M.",
      },
      user2: {
        text: "Enfin un outil qui enlève vraiment le filigrane !",
        name: "Mike T.",
      },
      user3: {
        text: "Interface propre, sans pub, fonctionne parfaitement.",
        name: "Lisa K.",
      },
    },
    footer: {
      about: "À propos",
      privacy: "Politique de confidentialité",
      terms: "Conditions d'utilisation",
    },
    features: {
      title: "Pourquoi Choisir VidLink ?",
      no_watermark: {
        title: "Sans Filigrane",
        desc: "Téléchargez des vidéos HD sans le logo TikTok",
      },
      fast_free: {
        title: "Rapide et Gratuit",
        desc: "Téléchargements ultra rapides et entièrement gratuits",
      },
      safe_private: {
        title: "Sûr et Privé",
        desc: "Pas d'inscription, pas de suivi, aucune donnée stockée",
      },
    },
  },
  ar: {
    hero: {
      title: "تحميل فيديوهات تيك توك بدون علامة مائية",
      subtitle:
        "الصق رابط فيديو تيك توك أدناه واحصل على رابط تنزيل نظيف فوراً.",
      placeholder: "أدخل رابط فيديو تيك توك",
      button: "تحميل",
    },
    error_invalid_url: "يرجى إدخال رابط تيك توك صالح.",
    how_it_works: {
      title: "كيف يعمل؟",
      step1: "انسخ رابط فيديو تيك توك",
      step2: "الصق الرابط في الحقل أعلاه",
      step3: "قم بتحميل الفيديو فوراً",
    },
    trending: {
      title: "🔻 الأكثر تحميلًا هذا الأسبوع",
    },
    testimonials: {
      title: "آراء المستخدمين",
      user1: {
        text: "سريع جداً وسهل الاستخدام! حملت 10 فيديوهات في دقائق.",
        name: "سارة م.",
      },
      user2: {
        text: "أخيرًا أداة تحذف العلامة المائية فعلاً!",
        name: "مايك ت.",
      },
      user3: {
        text: "واجهة نظيفة، بدون إعلانات، تعمل بكفاءة.",
        name: "ليزا ك.",
      },
    },
    footer: {
      about: "حول",
      privacy: "سياسة الخصوصية",
      terms: "شروط الاستخدام",
    },
    features: {
      title: "لماذا فيدلينك؟",
      no_watermark: {
        title: "بدون علامة مائية",
        desc: "تنزيل فيديوهات HD بدون شعار تيك توك",
      },
      fast_free: {
        title: "سريع ومجاني",
        desc: "تنزيلات سريعة مجانًا إلى الأبد",
      },
      safe_private: {
        title: "آمن وخاص",
        desc: "بدون تسجيل، بدون تتبع، بدون بيانات مخزنة",
      },
    },
  },
  es: {
    hero: {
      title: "Descargar Videos de TikTok Sin Marca de Agua",
      subtitle:
        "Pega la URL de un video de TikTok abajo y obtén un enlace limpio al instante.",
      placeholder: "Ingresa la URL del video de TikTok",
      button: "Descargar",
    },
    error_invalid_url: "Por favor ingresa una URL válida de TikTok.",
    how_it_works: {
      title: "Cómo Funciona",
      step1: "Copia el enlace del video de TikTok",
      step2: "Pega la URL en el campo de arriba",
      step3: "Descarga tu video al instante",
    },
    trending: {
      title: "🔻 Más Descargados Esta Semana",
    },
    testimonials: {
      title: "Lo Que Dicen los Usuarios",
      user1: {
        text: "¡Súper rápido y fácil de usar! Descargué 10 videos en minutos.",
        name: "Sarah M.",
      },
      user2: {
        text: "¡Finalmente una herramienta que realmente quita la marca de agua!",
        name: "Mike T.",
      },
      user3: {
        text: "Interfaz limpia, sin anuncios, funciona perfectamente.",
        name: "Lisa K.",
      },
    },
    footer: {
      about: "Sobre Nosotros",
      privacy: "Política de Privacidad",
      terms: "Términos de Servicio",
    },
    features: {
      title: "¿Por Qué Elegir VidLink?",
      no_watermark: {
        title: "Sin Marca de Agua",
        desc: "Descarga videos HD sin marca de TikTok",
      },
      fast_free: {
        title: "Rápido y Gratis",
        desc: "Descargas ultra rápidas totalmente gratis",
      },
      safe_private: {
        title: "Seguro y Privado",
        desc: "Sin registro, sin rastreo, sin almacenamiento de datos",
      },
    },
  },
};




const Header = ({ currentLang, setCurrentLang, isDark, setIsDark }) => (
  <>
      <Helmet>
      <title>VidLink — Fast & Private TikTok Downloader</title>
      <meta
        name="description"
        content="Download TikTok videos quickly and privately with VidLink. No tracking, no ads, just pure speed."
      />
      <link rel="canonical" href="https://vidlink.example.com" />
    </Helmet>

  <header className="sticky top-0 z-50 section-header backdrop-blur-md border-b border-gray-200 dark:border-slate-700">
    <div className="container mx-auto px-4 py-4 flex items-center justify-between">
      <Link
        to="/"
        className="flex items-center space-x-2 hover:opacity-90 transition-opacity duration-200"
        aria-label="Go to homepage"
      >
        <div className="w-8 h-8 logo-gradient rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm select-none">VL</span>
        </div>
        <span className="text-xl font-bold text-gray-800 dark:text-gray-100 select-none">
          VidLink
        </span>
      </Link>

      <div className="flex items-center space-x-4">
        <label htmlFor="language-select" className="sr-only">
          Select Language
        </label>
        <select
          id="language-select"
          value={currentLang}
          onChange={(e) => setCurrentLang(e.target.value)}
          className="text-sm rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          aria-label="Select language"
        >
          <option value="en">🇺🇸 EN</option>
          <option value="fr">🇫🇷 FR</option>
          <option value="ar">🇸🇦 AR</option>
          <option value="es">🇪🇸 ES</option>
        </select>

        <button
          onClick={() => setIsDark(!isDark)}
          className="bg-gray-300 dark:bg-slate-700 p-2 rounded-md transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          title={isDark ? "Light mode" : "Dark mode"}
        >
          {isDark ? "☀️" : "🌙"}
        </button>
      </div>
    </div>
    </header>
  </>
);

const Hero = ({ lang, onDownload, loading }) => {
  const [inputUrl, setInputUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      onDownload(inputUrl.trim());
    }
  };

  return (
    <>

      <Helmet>
        <title>{lang.hero.title} | VidLink</title>
        <meta name="description" content={lang.hero.subtitle} />
      </Helmet>
    <section className="py-24 bg-gradient-to-br from-green-500 via-green-600 to-green-700 text-white">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">
          {lang.hero.title}
        </h1>
        <p className="text-xl mb-12 max-w-xl mx-auto drop-shadow-md">
          {lang.hero.subtitle}
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex max-w-xl mx-auto shadow-lg rounded-full overflow-hidden border border-green-700"
        >
          <input
            type="url"
            placeholder={lang.hero.placeholder}
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            className="flex-grow px-6 py-4 text-lg rounded-none bg-white text-green-900 placeholder-green-600 focus:outline-none focus:ring-4 focus:ring-green-400"
            required
            disabled={loading}
            aria-label="Video URL input"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-white text-green-700 font-bold px-8 py-4 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
            aria-live="polite"
            aria-busy={loading}
          >
            {loading ? (
              <svg
                className="animate-spin h-6 w-6 text-green-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            ) : (
              lang.hero.button
            )}
          </button>
        </form>
      </div>
      </section>
    </>
  );
};

const VideoResult = ({ result, error }) => {
  const [showFullCaption, setShowFullCaption] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  if (error)
    return (
      <div
        className="max-w-3xl mx-auto my-6 p-4 text-center text-red-700 bg-red-100 rounded-md shadow"
        role="alert"
      >
        {error}
      </div>
    );

  if (!result) return null;

  // Optional fallback values
  const duration = result.duration || null;
  const views = result.views || null;
  const caption = result.caption || "";
  const videoUrl = result.hd_video_url || result.watermark_video_url || "";

  // Copy caption to clipboard
  const handleCopyCaption = () => {
    if (!caption) return;
    navigator.clipboard.writeText(caption).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  // Share URLs
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `${result.title}\n${videoUrl}`
  )}`;
  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(
    videoUrl
  )}&text=${encodeURIComponent(result.title)}`;

  return (
  <>
    <Helmet>
    <title>{result.title} - VidLink</title>
    <meta name="description" content={result.caption?.slice(0, 160) || 'Download TikTok videos easily with VidLink.'} />
    {/* Open Graph tags */}
    <meta property="og:title" content={result.title} />
    <meta property="og:description" content={result.caption?.slice(0, 160) || 'Download TikTok videos easily with VidLink.'} />
    <meta property="og:image" content={result.thumbnail} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={window.location.href} />
  </Helmet>
    <section className="max-w-4xl mx-auto my-12 bg-white dark:bg-slate-900 rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
      {/* Thumbnail */}
      <div className="md:w-1/3 relative">
        <img
          src={result.thumbnail}
          alt={`Thumbnail for ${result.title}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {duration && (
          <span className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs font-mono px-2 py-1 rounded">
            {duration}
          </span>
        )}
      </div>

      {/* Details */}
      <div className="md:w-2/3 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">
            {result.title}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            By{" "}
            <span className="font-semibold text-green-600 dark:text-green-400">
              {result.author}
            </span>
          </p>
          {views && (
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
              {views.toLocaleString()} views
            </p>
          )}

          {/* Caption with toggle and copy */}
          {caption && (
            <div className="relative mb-4 p-3 bg-gray-100 dark:bg-slate-700 rounded">
              <p className="text-gray-700 dark:text-gray-200 text-sm whitespace-pre-wrap max-h-20 overflow-hidden">
                {showFullCaption
                  ? caption
                  : caption.slice(0, 180) + (caption.length > 180 ? "..." : "")}
              </p>
              <button
                onClick={() => setShowFullCaption(!showFullCaption)}
                className="mt-2 text-green-600 dark:text-green-400 font-semibold hover:underline focus:outline-none"
                aria-expanded={showFullCaption}
              >
                {showFullCaption ? "Show Less" : "Read More"}
              </button>

              <button
                onClick={handleCopyCaption}
                aria-label="Copy caption"
                className="absolute top-3 right-3 flex items-center space-x-1 text-sm text-green-600 hover:text-green-800 focus:outline-none"
              >
                <FaCopy />
                <span>{copySuccess ? "Copied!" : "Copy Caption"}</span>
              </button>
            </div>
          )}
        </div>

        {/* Download Buttons */}
        <div className="mt-auto flex flex-wrap gap-3 mb-4">
          {result.hd_video_url && (
            <a
              href={result.hd_video_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
              aria-label="Download Video without Watermark"
            >
              <FaVideo />
              Download Video (No Watermark)
            </a>
          )}
          {result.watermark_video_url && (
            <a
              href={result.watermark_video_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700 transition"
              aria-label="Download Video with Watermark"
            >
              <FaWater />
              Download Video (With Watermark)
            </a>
          )}
          {result.audio_url && (
            <a
              href={result.audio_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
              aria-label="Download Audio"
            >
              <FaMusic />
              Download Audio
            </a>
          )}
        </div>

        {/* Share Buttons */}
        <div className="flex space-x-4">
          <a
            href={whatsappShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            aria-label="Share on WhatsApp"
          >
            <FaWhatsapp className="mr-2" />
            WhatsApp
          </a>
          <a
            href={telegramShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            aria-label="Share on Telegram"
          >
            <FaTelegramPlane className="mr-2" />
            Telegram
          </a>
        </div>
      </div>
      </section>
  </>
  );
};

const Features = ({ lang }) => {
  const features = [
    {
      icon: "🚫",
      title: lang.features?.no_watermark?.title || "No Watermark",
      desc:
        lang.features?.no_watermark?.desc ||
        "Download HD videos without TikTok branding",
    },
    {
      icon: "⚡",
      title: lang.features?.fast_free?.title || "Fast & Free",
      desc:
        lang.features?.fast_free?.desc ||
        "Lightning-fast downloads, completely free forever",
    },
    {
      icon: "🔒",
      title: lang.features?.safe_private?.title || "Safe & Private",
      desc:
        lang.features?.safe_private?.desc ||
        "No registration, no tracking, no stored data",
    },
  ];

  return (
    <section className="py-16 section-light">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-12">
          {lang.features?.title || "Why Choose VidLink?"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="text-center feature-card hover-lift">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = ({ lang }) => {
  const steps = [
    {
      number: "1",
      title: lang.how_it_works?.step1 || "Copy TikTok video link",
      icon: "📱",
    },
    {
      number: "2",
      title: lang.how_it_works?.step2 || "Paste URL in the box above",
      icon: "📋",
    },
    {
      number: "3",
      title: lang.how_it_works?.step3 || "Download your video instantly",
      icon: "⬇️",
    },
  ];

  return (
    <section className="py-16 section-gray">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-12">
          {lang.how_it_works?.title || "How It Works"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="step-indicator">
                <span className="font-bold text-xl">{step.number}</span>
              </div>
              <div className="text-3xl mb-3">{step.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {step.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TrendingVideos = ({ lang }) => {
  const trendingVideos = [
    {
      thumbnail:
        "https://images.unsplash.com/photo-1694878982378-4fc7fb9ca415?w=300",
      title: "Amazing Dance Move",
      author: "@dancer123",
    },
    {
      thumbnail:
        "https://images.pexels.com/photos/5077064/pexels-photo-5077064.jpeg?w=300",
      title: "Cooking Hack Tutorial",
      author: "@foodlover",
    },
    {
      thumbnail:
        "https://images.unsplash.com/photo-1658953229625-aad99d7603b4?w=300",
      title: "Tech Review",
      author: "@techguru",
    },
    {
      thumbnail:
        "https://images.unsplash.com/photo-1694878982093-25e8897ec9d5?w=300",
      title: "Comedy Skit",
      author: "@funny_person",
    },
  ];

  return (
    <section className="py-16 section-light">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-12">
          {lang.trending?.title || "🔻 Most Downloaded This Week"}
        </h2>

        {/* AdSense Mid Placeholder */}
        <div className="adsense-mid w-full max-w-4xl mx-auto h-32 flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm mb-12">
          [Ad Banner Placeholder - Mid Section]
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {trendingVideos.map((video, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-slate-700"
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-32 object-cover"
              />
              <div className="p-3">
                <h4 className="font-medium text-sm text-gray-800 dark:text-gray-100 mb-1 truncate">
                  {video.title}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {video.author}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = ({ lang }) => {
  const testimonials = [
    {
      text:
        lang.testimonials?.user1?.text ||
        "Super fast and easy to use! Downloaded 10 videos in minutes.",
      name: lang.testimonials?.user1?.name || "Sarah M.",
      avatar:
        "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=100&h=100&fit=crop&crop=face",
    },
    {
      text:
        lang.testimonials?.user2?.text ||
        "Finally, a downloader that actually removes watermarks!",
      name: lang.testimonials?.user2?.name || "Mike T.",
      avatar:
        "https://images.pexels.com/photos/3811111/pexels-photo-3811111.jpeg?w=100&h=100&fit=crop&crop=face",
    },
    {
      text:
        lang.testimonials?.user3?.text ||
        "Clean interface, no ads, just works perfectly.",
      name: lang.testimonials?.user3?.name || "Lisa K.",
      avatar:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=100&h=100&fit=crop&crop=face",
    },
  ];

  return (
    <section className="py-16 section-gray">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-12">
          {lang.testimonials?.title || "What Users Say"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                "{testimonial.text}"
              </p>
              <div className="flex items-center space-x-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="font-semibold text-gray-800 dark:text-gray-100">
                  {testimonial.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = ({ lang }) => {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        {/* AdSense Footer Placeholder */}
        <div className="adsense-footer w-full max-w-4xl mx-auto h-24 flex items-center justify-center text-slate-400 text-sm mb-8">
          [Ad Banner Placeholder - Footer]
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-8 h-8 logo-gradient rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">VL</span>
            </div>
            <span className="text-xl font-bold">VidLink</span>
          </div>

          <div className="flex flex-wrap justify-center space-x-6 mb-6 text-sm">
            <a href="/about" className="hover:text-green-400 transition-colors">
              {lang.footer?.about || "About"}
            </a>
            <a
              href="/privacy"
              className="hover:text-green-400 transition-colors"
            >
              {lang.footer?.privacy || "Privacy Policy"}
            </a>
            <a href="/terms" className="hover:text-green-400 transition-colors">
              {lang.footer?.terms || "Terms of Service"}
            </a>
          </div>

          <p className="text-gray-400 text-sm">
            © 2025 VidLink. All rights reserved. Made with ❤️ for content
            creators.
          </p>
        </div>
      </div>
    </footer>
  );
};

const SimpleHeader = () => {
  return (
    <header className="sticky top-0 z-50 section-header backdrop-blur-md border-b border-gray-200 dark:border-slate-700">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 logo-gradient rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">VL</span>
          </div>
          <span className="text-xl font-bold text-gray-800 dark:text-gray-100">
            VidLink
          </span>
        </a>

        <nav className="flex items-center space-x-6">
          <a href="/" className="nav-link">
            Home
          </a>
          <a href="/about" className="nav-link">
            About
          </a>
          <a href="/privacy" className="nav-link">
            Privacy
          </a>
          <a href="/terms" className="nav-link">
            Terms
          </a>
        </nav>
      </div>
    </header>
  );
};

const AboutPage = () => (
  <>
          <Helmet>
        <title>About VidLink | Fast & Private TikTok Downloader</title>
        <meta
          name="description"
          content="Learn more about VidLink, a privacy-first TikTok video downloader focused on speed and no tracking."
        />
      </Helmet>

  <div className="min-h-screen bg-gradient-to-b from-slate-900 to-gray-900 text-white">
    <SimpleHeader />
    <div className="container mx-auto px-6 py-20">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold mb-10 tracking-tight drop-shadow-lg">
          Why VidLink Exists — The Revolution Starts Here 🚀
        </h1>

        <p className="text-xl max-w-prose mx-auto mb-12 leading-relaxed text-gray-300">
          In a digital world drowning in noise, clutter, and compromise,{" "}
          <strong>VidLink is your beacon of freedom</strong>. We don’t just
          download videos — we reclaim control, privacy, and speed for creators
          and audiences alike. Your content, your rules. Always.
        </p>

        <h2 className="text-3xl font-bold mb-6">
          Crafted For Creators, Powered By Purpose
        </h2>
        <p className="text-gray-400 max-w-prose mx-auto mb-12 leading-relaxed">
          Whether you’re sparking new ideas, archiving your legacy, or fueling
          your next masterpiece, VidLink delivers with zero friction and zero
          distractions. No ads. No trackers. No compromises — just laser-focused
          performance.
        </p>

        <h2 className="text-3xl font-bold mb-6">
          Our Mission: A Fierce Commitment to Privacy & Independence
        </h2>
        <p className="text-gray-400 max-w-prose mx-auto mb-12 leading-relaxed">
          We reject the surveillance economy. We build tools that serve you, not
          data brokers or algorithms. Every byte you process is handled with
          brutal respect for your privacy, lightning speed, and absolute
          transparency.
        </p>

        <h2 className="text-3xl font-bold mb-6">
          Privacy Isn’t Optional — It’s Non-Negotiable
        </h2>
        <p className="text-gray-400 max-w-prose mx-auto leading-relaxed">
          No tracking. No logs. No storage. Ever. Your videos live only for the
          moment you need them — then vanish without a trace. Because true
          privacy is freedom, and freedom is your birthright.
        </p>
      </div>
    </div>
    <Footer lang={languages.en} />
    </div>
  </>
);

const PrivacyPage = () => (

  <>
        <Helmet>
        <title>Privacy Policy | VidLink</title>
        <meta
          name="description"
          content="Read VidLink’s privacy policy. We respect your privacy and never track or store your data."
        />
      </Helmet>

  <div className="min-h-screen ">
    <SimpleHeader />
    <main className="container mx-auto px-6 py-20">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-12">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-10">
          Our Commitment to Your Privacy
        </h1>

        <p className="text-lg text-gray-700 mb-8 italic">
          Effective Date: March 2025
        </p>

        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Absolute Data Protection
          </h2>
          <p className="text-gray-700 leading-relaxed">
            At VidLink, your privacy is not just a policy—it’s our promise. We{" "}
            <strong>do not collect, store, or track</strong> any personal data.
            All video URLs you process are handled <em>in real-time</em>,
            ensuring zero retention on our servers. Your data stays yours,
            always.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            No Tracking, No Profiling
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We don’t use cookies, tracking pixels, or any form of behavioral
            profiling. Your browsing and usage habits remain strictly
            confidential, with no footprint left behind.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Secure & Temporary File Processing
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Videos are processed <strong>temporarily</strong> and deleted
            automatically within 10 minutes. No downloaded or processed content
            is ever stored, shared, or accessed beyond your immediate session.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Trusted Third-Party APIs
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We leverage carefully vetted third-party APIs strictly to process
            TikTok URLs. While these services may have their own privacy
            policies, we ensure all integrations meet the highest standards of
            security and transparency.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Your Rights & GDPR Compliance
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Since we do not collect or process any personal information, many
            regulatory obligations such as GDPR do not apply. Nonetheless, we
            are fully committed to upholding your digital rights and privacy in
            every interaction.
          </p>
        </section>
      </div>
    </main>
    <Footer lang={languages.en} />
    </div>
  </>
);

const TermsPage = () => (

  <>
        <Helmet>
        <title>Terms & Conditions | VidLink</title>
        <meta
          name="description"
          content="Read the terms and conditions for using VidLink, the fast and private TikTok downloader."
        />
      </Helmet>

  <div className="min-h-screen bg-gray-50">
    <SimpleHeader />
    <main className="container mx-auto px-6 py-20">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-12">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-10">
          Terms of Service
        </h1>

        <p className="text-lg text-gray-700 mb-8 italic">
          Last updated: March 2025
        </p>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Acceptable Use & Responsibility
          </h2>
          <p className="text-gray-700 leading-relaxed">
            VidLink is designed exclusively for downloading content you own or
            have explicit permission to access. Users are solely responsible for
            ensuring their actions comply with applicable copyright laws and
            regulations. Unauthorized use, infringement, or misuse is strictly
            prohibited and may lead to legal consequences.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Service Availability & Disclaimer
          </h2>
          <p className="text-gray-700 leading-relaxed">
            While we strive for maximum uptime and reliability, VidLink is
            provided <strong>“as is”</strong> without any warranties or
            guarantees. We do not promise uninterrupted service or error-free
            operation. Use the platform at your own risk.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            VidLink is not affiliated, endorsed, or sponsored by TikTok. We
            utilize only publicly accessible APIs and services to deliver our
            functionality.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Fair Use & Rate Limiting
          </h2>
          <p className="text-gray-700 leading-relaxed">
            To maintain equitable access for all users, VidLink enforces rate
            limits on downloads per IP address. Excessive or abusive use may
            result in temporary or permanent restrictions without prior notice.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Prohibited Conduct
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              Downloading copyrighted material without explicit authorization.
            </li>
            <li>
              Using VidLink for commercial purposes without express permission.
            </li>
            <li>
              Attempting to reverse engineer, disrupt, or exploit the service in
              any manner.
            </li>
            <li>
              Engaging in any activity that violates applicable laws or harms
              others.
            </li>
          </ul>
        </section>
      </div>
    </main>
    <Footer lang={languages.en} />
    </div>
  </>
);

const HomePage = () => {
  const [currentLang, setCurrentLang] = useState("en");
  const [isDark, setIsDark] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const lang = languages[currentLang] || languages.en;

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  // Here's the fixed handler calling backend /api/parse POST with JSON body { url }
  const handleDownload = async (url) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Call your backend API parse endpoint
      const response = await axios.post(`${API}/parse`, { url });

      // response.data should be VideoResponse type with video info and URLs
      setResult(response.data);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Failed to process video URL. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? "dark" : ""}`}>
      <div className="section-light transition-colors duration-300">
        <Header
          currentLang={currentLang}
          setCurrentLang={setCurrentLang}
          isDark={isDark}
          setIsDark={setIsDark}
        />

        <Helmet>
          <title>VidLink — Fast & Private TikTok Downloader</title>
          <meta
            name="description"
            content="Download TikTok videos quickly and privately with VidLink. No tracking, no ads, just pure speed."
          />
          <link rel="canonical" href="https://vidlink.example.com" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://vidlink.example.com" />
          <meta
            property="og:title"
            content="VidLink — Fast & Private TikTok Downloader"
          />
          <meta
            property="og:description"
            content="Download TikTok videos quickly and privately with VidLink. No tracking, no ads, just pure speed."
          />
          <meta
            property="og:image"
            content="https://vidlink.example.com/og-image.jpg"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://vidlink.example.com" />
          <meta
            name="twitter:title"
            content="VidLink — Fast & Private TikTok Downloader"
          />
          <meta
            name="twitter:description"
            content="Download TikTok videos quickly and privately with VidLink. No tracking, no ads, just pure speed."
          />
          <meta
            name="twitter:image"
            content="https://vidlink.example.com/og-image.jpg"
          />
        </Helmet>

        <main>
          <Hero lang={lang} onDownload={handleDownload} loading={loading} />

          <div className="container mx-auto px-4">
            <VideoResult result={result} error={error} />
          </div>

          <Features lang={lang} />
          <HowItWorks lang={lang} />
          <TrendingVideos lang={lang} />
          <Testimonials lang={lang} />
        </main>

        <Footer lang={lang} />
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
