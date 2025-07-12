import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useLocation, Link } from "react-router-dom";
import {
  FaVideo,
  FaWater,
  FaMusic,
  FaCopy,
  FaWhatsapp,
  FaTelegramPlane,
} from "react-icons/fa";
import { Helmet } from "react-helmet";
import CountUp from "react-countup";
import { Menu, X } from "lucide-react"; // You can also use heroicons or other icons
import { AnimatePresence, motion } from "framer-motion"; // optional animation
import "./App.css";


// Replace this with your actual backend base URL
const API = process.env.REACT_APP_BACKEND_URL + "/api";

const languages = {
  en: {
    hero: {
      title: "Download TikTok Videos  — No Watermark, No Hassle ",
      subtitle:
        "Paste a TikTok video URL below and download your favorite clips in seconds.",
      placeholder: "Enter TikTok video URL",
      button: "Download",
      stats: {
        rating: "⭐ 4.9/5",
        rating_label: "User Rating",
        downloads: "🎥 1.2M+",
        downloads_label: "Videos Downloaded",
        users: "👤 500K+",
        users_label: "Users Worldwide",
      },
      motivation:
        "No sign-up. No watermark. Just paste and download your TikTok video instantly.",
      learn_more: "Learn how it works",
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
      faq: "FAQs",
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
    about: {
      title: "About VidLink | Fast & Private TikTok Downloader",
      meta: "Learn more about VidLink, a privacy-first TikTok downloader.",
      headline: "Why VidLink Exists — The Revolution Starts Here 🚀",
      mission1:
        "In a digital world drowning in noise , clutter, and compromise, VidLink is your beacon of freedom. We don’t just download videos — we reclaim control, privacy, and speed for creators and audiences alike. Your content, your rules. Always.",
      crafted: "Crafted For Creators, Powered By Purpose",
      crafted_desc:
        "Whether you're sparking new ideas,  archiving your legacy, or fueling your next masterpiece, VidLink delivers with zero friction and zero distractions. No ads. No trackers. No compromises — just laser-focused performance.",
      privacy_title:
        "Our Mission: A Fierce Commitment to Privacy & Independence",
      privacy_desc:
        "We reject the surveillance economy,  We build tools that serve you, not data brokers or algorithms. Every byte you process is handled with brutal respect for your privacy, lightning speed, and absolute transparency.",
      privacy_final: "Privacy Isn’t Optional — It’s Non-Negotiable",
      privacy_final_desc:
        "No tracking. No logs. No storage. Ever .  Your videos live only for the moment you need them — then vanish without a trace. Because true privacy is freedom, and freedom is your birthright.",
    },
    privacy: {
      title: "Privacy Policy | VidLink",
      meta: "Read VidLink’s privacy policy. We respect your privacy and never track or store your data.",
      heading: "Our Commitment to Your Privacy",
      effective: "Effective Date: March 2025",
      sections: [
        {
          title: "Absolute Data Protection",
          text: "At VidLink, your privacy is not just a policy—it’s our promise. We do not collect, store, or track any personal data. All video URLs you process are handled in real-time, ensuring zero retention on our servers. Your data stays yours, always.",
        },
        {
          title: "No Tracking, No Profiling",
          text: "We don’t use cookies, tracking pixels, or any form of behavioral profiling. Your browsing and usage habits remain strictly confidential, with no footprint left behind.",
        },
        {
          title: "Secure & Temporary File Processing",
          text: "Videos are processed temporarily and deleted automatically within 10 minutes. No downloaded or processed content is ever stored, shared, or accessed beyond your immediate session.",
        },
        {
          title: "Trusted Third-Party APIs",
          text: "We leverage carefully vetted third-party APIs strictly to process TikTok URLs. While these services may have their own privacy policies, we ensure all integrations meet the highest standards of security and transparency.",
        },
        {
          title: "Your Rights & GDPR Compliance",
          text: "Since we do not collect or process any personal information, many regulatory obligations such as GDPR do not apply. Nonetheless, we are fully committed to upholding your digital rights and privacy in every interaction.",
        },
      ],
    },
    terms: {
      title: "Terms & Conditions | VidLink",
      meta: "Read the terms and conditions for using VidLink.",
      headline: "Terms of Service",
      last_updated: "Last updated: March 2025",
      section1_title: "Acceptable Use & Responsibility",
      section1_desc:
        "VidLink is for content you own or have permission to download. You are responsible for legal compliance.",
      section2_title: "Service Availability & Disclaimer",
      section2_desc:
        "VidLink is provided 'as is' without warranty. Use at your own risk. Not affiliated with TikTok.",
      section3_title: "Fair Use & Rate Limiting",
      section3_desc:
        "Rate limits are enforced. Abusive behavior may result in restrictions.",
      section4_title: "Prohibited Conduct",
      section4_list: [
        "Downloading copyrighted content.",
        "Using VidLink for commercial gain without permission.",
        "Disrupting, reversing, or exploiting the system.",
        "Breaking laws or causing harm.",
      ],
    },
    faq: {
      title: "FAQs | VidLink",
      meta: "Frequently Asked Questions about VidLink.",
      headline: "Frequently Asked Questions 🙋",
      questions: [
        {
          q: "Is VidLink free to use?",
          a: "Yes! VidLink is completely free with no hidden charges.",
        },
        {
          q: "Do you store any videos or data?",
          a: "No, we never store your videos or URLs. Everything is processed in real time.",
        },
        {
          q: "Is there a watermark on downloaded videos?",
          a: "No, VidLink removes the watermark from TikTok videos automatically.",
        },
        {
          q: "Can I download videos from private accounts?",
          a: "No, only publicly available TikTok videos can be downloaded.",
        },
        {
          q: "Is there a limit to how many videos I can download?",
          a: "To ensure fair use, we apply a temporary rate limit per IP address.",
        },
        {
          q: "Do I need to create an account?",
          a: "Not at all. VidLink doesn’t require any registration or login.",
        },
        {
          q: "Does VidLink work on mobile devices?",
          a: "Yes! VidLink is fully optimized for mobile, tablets, and desktop.",
        },
        {
          q: "Can I choose the video quality?",
          a: "We deliver the highest quality available by default, no extra steps needed.",
        },
      ],
    },
  },
  fr: {
    hero: {
      title: "Téléchargez des vidéos TikTok — Sans Filigrane, Sans Tracas",
      subtitle:
        "Collez l'URL d'une vidéo TikTok ci-dessous pour télécharger vos vidéos favorites.",
      placeholder: "Entrez l'URL de la vidéo TikTok",
      button: "Télécharger",
      stats: {
        rating: "⭐ 4.9/5",
        rating_label: "Note des utilisateurs",
        downloads: "🎥 1.2M+",
        downloads_label: "Vidéos téléchargées",
        users: "👤 500K+",
        users_label: "Utilisateurs dans le monde",
      },
      motivation:
        "Pas d'inscription. Pas de filigrane. Téléchargez vos vidéos TikTok instantanément.",
      learn_more: "Voir comment ça marche",
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
      faq: "FAQ",
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
    about: {
      title: "À propos de VidLink | Téléchargeur TikTok rapide et privé",
      meta: "En savoir plus sur VidLink, un téléchargeur TikTok axé sur la confidentialité.",
      headline: "Pourquoi VidLink existe — La révolution commence ici 🚀",
      mission1:
        "Dans un monde numérique saturé de bruit, de désordre et de compromis, VidLink est votre phare de liberté. Nous ne faisons pas que télécharger des vidéos — nous redonnons le contrôle, la confidentialité et la rapidité aux créateurs et aux utilisateurs. Votre contenu, vos règles. Toujours.",
      crafted: "Conçu pour les créateurs, motivé par une mission",
      crafted_desc:
        "Que vous lanciez de nouvelles idées, archiviez votre héritage ou alimentiez votre prochain chef-d'œuvre, VidLink vous offre une expérience sans friction ni distraction. Pas de pubs. Pas de traqueurs. Aucun compromis — juste une performance ciblée.",
      privacy_title:
        "Notre mission : un engagement féroce pour la vie privée et l'indépendance",
      privacy_desc:
        "Nous rejetons l'économie de surveillance. Nous construisons des outils qui vous servent, et non les courtiers de données ou les algorithmes. Chaque octet est traité avec un profond respect pour votre vie privée, une vitesse fulgurante et une transparence totale.",
      privacy_final:
        "La vie privée n’est pas facultative — elle est non négociable",
      privacy_final_desc:
        "Pas de suivi. Pas de journalisation. Pas de stockage. Jamais. Vos vidéos ne vivent que le temps dont vous avez besoin — puis disparaissent sans laisser de trace. La vraie vie privée, c’est la liberté. Et la liberté est votre droit.",
    },
    privacy: {
      title: "Politique de Confidentialité | VidLink",
      meta: "Découvrez la politique de confidentialité de VidLink. Aucune collecte, aucun suivi, juste du respect.",
      headline: "Notre Engagement pour Votre Confidentialité",
      effective_date: "Date d'entrée en vigueur : Mars 2025",
      section1_title: "Protection Totale des Données",
      section1_desc:
        "Chez VidLink, votre vie privée est notre promesse. Nous ne collectons, ne stockons, ni ne suivons aucune donnée personnelle.",
      section2_title: "Aucun Suivi, Aucun Profilage",
      section2_desc:
        "Pas de cookies, pas de pixels espions. Votre utilisation reste privée, sans trace.",
      section3_title: "Traitement Sécurisé & Temporaire",
      section3_desc:
        "Les vidéos sont traitées temporairement et supprimées automatiquement sous 10 minutes.",
      section4_title: "APIs Tiers de Confiance",
      section4_desc:
        "Nous utilisons uniquement des APIs sécurisées et vérifiées, sans compromettre votre vie privée.",
      section5_title: "Vos Droits & Conformité RGPD",
      section5_desc:
        "Nous ne collectons pas d'infos personnelles, mais respectons vos droits numériques pleinement.",
    },
    terms: {
      title: "Conditions Générales | VidLink",
      meta: "Lisez les conditions d'utilisation de VidLink, le téléchargeur TikTok rapide et privé.",
      heading: "Conditions d'utilisation",
      updated: "Dernière mise à jour : Mars 2025",
      section1_title: "Utilisation acceptable & Responsabilité",
      section1_desc:
        "VidLink est conçu exclusivement pour télécharger du contenu que vous possédez ou que vous êtes autorisé à utiliser...",
      section2_title: "Disponibilité du service & Clause de non-responsabilité",
      section2_desc:
        "VidLink est fourni tel quel sans garantie d'aucune sorte...",
      section3_title: "Utilisation équitable & Limitation de débit",
      section3_desc:
        "VidLink impose des limites de téléchargement par adresse IP...",
      section4_title: "Comportements interdits",
      section4_list: [
        "Téléchargement de contenu protégé sans autorisation.",
        "Utilisation commerciale de VidLink sans autorisation.",
        "Tentative d'ingénierie inverse ou d'exploitation du service.",
        "Violation des lois ou préjudices à autrui.",
      ],
    },
    faq: {
      title: "FAQ | VidLink - Téléchargeur TikTok Rapide & Privé",
      meta: "Questions fréquemment posées sur VidLink, le téléchargeur TikTok axé sur la confidentialité.",
      headline: "Questions Fréquemment Posées",
      questions: [
        {
          q: "Qu'est-ce que VidLink ?",
          a: "VidLink est un téléchargeur TikTok gratuit et sans publicité qui respecte votre vie privée.",
        },
        {
          q: "Ai-je besoin d’un compte pour utiliser VidLink ?",
          a: "Non, aucune inscription ni connexion n’est requise.",
        },
        {
          q: "Est-ce que VidLink stocke mes vidéos ?",
          a: "Non, nous ne stockons rien. Vos vidéos sont supprimées automatiquement.",
        },
        {
          q: "Puis-je télécharger des vidéos privées ?",
          a: "Non, seules les vidéos publiques peuvent être téléchargées.",
        },
        {
          q: "Est-ce que VidLink ajoute un filigrane ?",
          a: "Jamais. Toutes les vidéos sont téléchargées sans filigrane.",
        },
        {
          q: "Quels appareils sont compatibles ?",
          a: "VidLink fonctionne sur ordinateur, mobile et tablette.",
        },
        {
          q: "Combien coûte VidLink ?",
          a: "C’est 100% gratuit — pour toujours.",
        },
        {
          q: "Comment signaler un bug ?",
          a: "Contactez-nous via la section support ou notre e-mail officiel.",
        },
      ],
    },
  },
  ar: {
    hero: {
      title: "تحميل فيديوهات تيك توك — بدون علامة مائية أو متاعب",
      subtitle:
        "الصق رابط فيديو تيك توك أدناه وقم بتنزيل مقاطعك المفضلة في ثوانٍ.",
      placeholder: "أدخل رابط فيديو تيك توك",
      button: "تحميل",
      stats: {
        rating: "⭐ 4.9/5",
        rating_label: "تقييم المستخدم",
        downloads: "🎥 1.2M+",
        downloads_label: "الفيديوهات المحملة",
        users: "👤 500K+",
        users_label: "مستخدمين حول العالم",
      },
      motivation:
        "لا تسجيل. لا علامة مائية. فقط الصق الرابط وقم بالتحميل فوراً.",
      learn_more: "تعرف على كيفية الاستخدام",
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
      faq: "الأسئلة الشائعة",
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
    about: {
      title: "حول VidLink | أداة تحميل تيك توك سريعة وخاصة",
      meta: "تعرف على المزيد حول VidLink، أداة تحميل تيك توك تركز على الخصوصية.",
      headline: "لماذا يوجد VidLink — الثورة تبدأ من هنا 🚀",
      mission1:
        "في عالم رقمي يعج بالضوضاء والفوضى والتنازلات، VidLink هو منارة حريتك. نحن لا نقوم فقط بتنزيل الفيديوهات — نحن نعيد لك السيطرة، الخصوصية، والسرعة. المحتوى الخاص بك، قواعدك. دائمًا.",
      crafted: "مصمم للمبدعين، مدفوع بالهدف",
      crafted_desc:
        "سواء كنت تطلق أفكارًا جديدة، أو توثق إرثك، أو تنشئ تحفتك القادمة، VidLink يقدم لك أداءً بلا عوائق أو تشتيت. لا إعلانات. لا تتبع. لا تنازلات — فقط أداء فائق.",
      privacy_title: "مهمتنا: التزام قوي بالخصوصية والاستقلالية",
      privacy_desc:
        "نرفض اقتصاد المراقبة. نحن نبني أدوات تخدمك، لا تخدم وسطاء البيانات أو الخوارزميات. كل بايت تتم معالجته باحترام صارم لخصوصيتك وسرعة البرق وشفافية تامة.",
      privacy_final: "الخصوصية ليست اختيارًا — إنها أمر لا جدال فيه",
      privacy_final_desc:
        "لا تتبع. لا سجلات. لا تخزين. أبدًا. تعيش مقاطع الفيديو فقط للحظة التي تحتاجها فيها — ثم تختفي دون أثر. لأن الخصوصية الحقيقية هي الحرية، والحرية حقك الطبيعي.",
    },
    privacy: {
      title: "سياسة الخصوصية | VidLink",
      meta: "اطلع على سياسة الخصوصية الخاصة بـ VidLink. لا تتبع، لا تخزين، فقط خصوصيتك.",
      headline: "التزامنا بخصوصيتك",
      effective_date: "تاريخ السريان: مارس 2025",
      section1_title: "حماية كاملة للبيانات",
      section1_desc:
        "في VidLink، خصوصيتك وعد منا. لا نقوم بجمع أو تخزين أو تتبع أي بيانات شخصية.",
      section2_title: "بدون تتبع أو إنشاء ملفات تعريف",
      section2_desc:
        "لا نستخدم الكوكيز أو أدوات التتبع. استخدامك يظل خاصًا تمامًا.",
      section3_title: "معالجة مؤقتة وآمنة",
      section3_desc:
        "يتم معالجة الفيديوهات مؤقتًا وحذفها تلقائيًا خلال 10 دقائق.",
      section4_title: "واجهات API موثوقة",
      section4_desc:
        "نستخدم فقط خدمات خارجية موثوقة تلتزم بمعايير الخصوصية والأمان العالية.",
      section5_title: "حقوقك والامتثال لـ GDPR",
      section5_desc:
        "لا نقوم بجمع أي بيانات، ومع ذلك نلتزم بحماية حقوقك الرقمية بالكامل.",
    },
    terms: {
      title: "الشروط والأحكام | VidLink",
      meta: "اقرأ شروط وأحكام استخدام VidLink، أداة تنزيل تيك توك السريعة والخاصة.",
      heading: "شروط الخدمة",
      updated: "آخر تحديث: مارس 2025",
      section1_title: "الاستخدام المقبول والمسؤولية",
      section1_desc:
        "تم تصميم VidLink حصريًا لتنزيل المحتوى الذي تملكه أو لديك إذن صريح لتنزيله...",
      section2_title: "توفر الخدمة وإخلاء المسؤولية",
      section2_desc: "يتم تقديم VidLink كما هو، بدون أي ضمانات...",
      section3_title: "الاستخدام العادل وتحديد المعدل",
      section3_desc: "يفرض VidLink حدودًا على عدد التنزيلات لكل عنوان IP...",
      section4_title: "السلوكيات المحظورة",
      section4_list: [
        "تنزيل محتوى محمي بحقوق النشر دون إذن.",
        "استخدام VidLink لأغراض تجارية دون إذن.",
        "محاولة عكس هندسة الخدمة أو استغلالها.",
        "انتهاك القوانين أو التسبب في ضرر للآخرين.",
      ],
    },
    faq: {
      title: "الأسئلة الشائعة | VidLink",
      meta: "اعثر على إجابات للأسئلة الشائعة حول استخدام VidLink.",
      headline: "الأسئلة الشائعة",
      questions: [
        {
          q: "هل VidLink مجاني تمامًا؟",
          a: "نعم، VidLink مجاني 100٪ بدون إعلانات أو اشتراكات خفية.",
        },
        {
          q: "هل تظهر علامات مائية على الفيديوهات؟",
          a: "لا. يتم تحميل جميع الفيديوهات بدون علامة مائية.",
        },
        {
          q: "هل أحتاج إلى حساب لاستخدام VidLink؟",
          a: "لا، لا تحتاج إلى إنشاء حساب أو تسجيل الدخول لتنزيل الفيديوهات.",
        },
        {
          q: "هل يقوم VidLink بجمع بياناتي؟",
          a: "أبدًا. لا نقوم بجمع أو تخزين أو تتبع أي بيانات للمستخدم.",
        },
        {
          q: "هل يمكنني تحميل فيديوهات TikTok خاصة؟",
          a: "لا. يدعم VidLink فقط الفيديوهات العامة التي يمكن الوصول إليها عبر الروابط.",
        },
        {
          q: "كم عدد الفيديوهات التي يمكنني تنزيلها يوميًا؟",
          a: "لا توجد حدود صارمة، ولكن قد يتم فرض قيود مؤقتة في حال إساءة الاستخدام.",
        },
        {
          q: "هل يمكنني استخدام VidLink على الهاتف المحمول؟",
          a: "نعم، الموقع يعمل بسلاسة على جميع الأجهزة بما في ذلك الهواتف الذكية.",
        },
        {
          q: "هل استخدام VidLink قانوني؟",
          a: "VidLink مخصص للاستخدام الشخصي فقط. لا تستخدمه لتنزيل محتوى لا تملكه.",
        },
      ],
    },
  },
  es: {
    hero: {
      title:
        "Descarga videos de TikTok — Sin marca de agua, sin complicaciones",
      subtitle:
        "Pega la URL de un video de TikTok y descarga tus clips favoritos al instante.",
      placeholder: "Ingresa la URL del video de TikTok",
      button: "Descargar",
      stats: {
        rating: "⭐ 4.9/5",
        rating_label: "Calificación de Usuarios",
        downloads: "🎥 1.2M+",
        downloads_label: "Videos Descargados",
        users: "👤 500K+",
        users_label: "Usuarios en Todo el Mundo",
      },
      motivation:
        "Sin registro. Sin marcas de agua. Simplemente pega el enlace y descarga.",
      learn_more: "Ver cómo funciona",
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
      faq: "Preguntas Frecuentes",
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
    about: {
      title: "Sobre VidLink | Descargador de TikTok rápido y privado",
      meta: "Conoce más sobre VidLink, un descargador de TikTok centrado en la privacidad.",
      headline: "Por qué existe VidLink — La revolución comienza aquí 🚀",
      mission1:
        "En un mundo digital lleno de ruido, desorden y compromisos, VidLink es tu faro de libertad. No solo descargamos vídeos — recuperamos el control, la privacidad y la velocidad para creadores y usuarios. Tu contenido, tus reglas. Siempre.",
      crafted: "Creado para creadores, impulsado por un propósito",
      crafted_desc:
        "Ya sea que estés generando nuevas ideas, archivando tu legado o creando tu próxima obra maestra, VidLink ofrece una experiencia sin fricción ni distracciones. Sin anuncios. Sin rastreadores. Sin compromisos — solo rendimiento puro.",
      privacy_title:
        "Nuestra misión: un compromiso feroz con la privacidad e independencia",
      privacy_desc:
        "Rechazamos la economía de la vigilancia. Creamos herramientas que te sirven a ti, no a los intermediarios de datos ni a los algoritmos. Cada byte es manejado con absoluto respeto a tu privacidad, velocidad instantánea y transparencia total.",
      privacy_final: "La privacidad no es opcional — es innegociable",
      privacy_final_desc:
        "Sin seguimiento. Sin registros. Sin almacenamiento. Nunca. Tus videos existen solo el tiempo que los necesitas — luego desaparecen sin dejar rastro. Porque la verdadera privacidad es libertad, y la libertad es tu derecho.",
    },
    privacy: {
      title: "Política de Privacidad | VidLink",
      meta: "Consulta la política de privacidad de VidLink. No rastreamos, no almacenamos, solo respetamos.",
      headline: "Nuestro Compromiso con tu Privacidad",
      effective_date: "Fecha de entrada en vigor: Marzo 2025",
      section1_title: "Protección Total de Datos",
      section1_desc:
        "En VidLink, tu privacidad es una promesa. No recolectamos, almacenamos ni rastreamos datos personales.",
      section2_title: "Sin Seguimiento ni Perfiles",
      section2_desc:
        "No usamos cookies ni píxeles de seguimiento. Tu uso es completamente privado.",
      section3_title: "Procesamiento Seguro y Temporal",
      section3_desc:
        "Los videos se procesan temporalmente y se eliminan automáticamente en 10 minutos.",
      section4_title: "APIs Confiables de Terceros",
      section4_desc:
        "Utilizamos solo APIs de terceros seguras y verificadas para proteger tu privacidad.",
      section5_title: "Tus Derechos y Cumplimiento de la GDPR",
      section5_desc:
        "No recolectamos datos personales, pero respetamos tus derechos digitales en su totalidad.",
    },
    terms: {
      title: "Términos y Condiciones | VidLink",
      meta: "Lea los términos y condiciones para usar VidLink, el descargador de TikTok rápido y privado.",
      heading: "Términos del Servicio",
      updated: "Última actualización: Marzo 2025",
      section1_title: "Uso aceptable y responsabilidad",
      section1_desc:
        "VidLink está diseñado exclusivamente para descargar contenido que poseas o tengas permiso explícito para acceder...",
      section2_title:
        "Disponibilidad del servicio y exención de responsabilidad",
      section2_desc:
        "VidLink se proporciona 'tal cual', sin garantías de ningún tipo...",
      section3_title: "Uso justo y limitación de tasa",
      section3_desc: "VidLink impone límites de descarga por dirección IP...",
      section4_title: "Conductas prohibidas",
      section4_list: [
        "Descargar contenido con derechos de autor sin autorización.",
        "Usar VidLink con fines comerciales sin permiso.",
        "Intentar descompilar o explotar el servicio.",
        "Violar leyes o dañar a otros.",
      ],
    },
    faq: {
      title: "Preguntas Frecuentes | VidLink",
      meta: "Encuentra respuestas a preguntas frecuentes sobre cómo usar VidLink.",
      headline: "Preguntas Frecuentes",
      questions: [
        {
          q: "¿VidLink es realmente gratuito?",
          a: "Sí, VidLink es completamente gratuito sin anuncios ni costos ocultos.",
        },
        {
          q: "¿Las descargas tienen marca de agua?",
          a: "No. Todos los videos se descargan sin marca de agua.",
        },
        {
          q: "¿Necesito una cuenta para usar VidLink?",
          a: "No. No se requiere crear una cuenta ni iniciar sesión.",
        },
        {
          q: "¿VidLink recopila mis datos?",
          a: "Nunca. No recopilamos, almacenamos ni rastreamos tus datos.",
        },
        {
          q: "¿Puedo descargar videos privados de TikTok?",
          a: "No. Solo se admiten videos públicos con enlaces accesibles.",
        },
        {
          q: "¿Cuántos videos puedo descargar al día?",
          a: "No hay un límite exacto, pero se pueden aplicar restricciones por uso excesivo.",
        },
        {
          q: "¿VidLink funciona en móviles?",
          a: "Sí, nuestro sitio está optimizado para todos los dispositivos móviles.",
        },
        {
          q: "¿Es legal usar VidLink?",
          a: "VidLink está diseñado para uso personal legal. Solo descarga contenido que tienes derecho a usar.",
        },
      ],
    },
  },
  hi: {
    hero: {
      title: "TikTok वीडियो डाउनलोड करें — बिना वॉटरमार्क, बिना झंझट के",
      subtitle:
        "नीचे TikTok वीडियो URL पेस्ट करें और सेकंडों में डाउनलोड करें।",
      placeholder: "TikTok वीडियो URL दर्ज करें",
      button: "डाउनलोड करें",
      stats: {
        rating: "⭐ 4.9/5",
        rating_label: "यूज़र रेटिंग",
        downloads: "🎥 1.2M+",
        downloads_label: "डाउनलोड किए गए वीडियो",
        users: "👤 500K+",
        users_label: "दुनियाभर के उपयोगकर्ता",
      },
      motivation:
        "साइन-अप नहीं। वॉटरमार्क नहीं। बस पेस्ट करें और डाउनलोड करें।",
      learn_more: "जानें कैसे काम करता है",
    },
    error_invalid_url: "कृपया एक वैध TikTok वीडियो URL दर्ज करें।",
    how_it_works: {
      title: "कैसे काम करता है",
      step1: "TikTok वीडियो लिंक कॉपी करें",
      step2: "ऊपर दिए गए बॉक्स में URL पेस्ट करें",
      step3: "तुरंत अपना वीडियो डाउनलोड करें",
    },
    trending: {
      title: "🔻 इस सप्ताह सबसे अधिक डाउनलोड",
    },
    testimonials: {
      title: "यूज़र्स क्या कहते हैं",
      user1: {
        text: "बहुत तेज और उपयोग में आसान! मैंने कुछ ही मिनटों में 10 वीडियो डाउनलोड किए।",
        name: "सारा एम.",
      },
      user2: {
        text: "आख़िरकार, एक ऐसा डाउनलोडर जो सच में वॉटरमार्क हटाता है!",
        name: "माइक टी.",
      },
      user3: {
        text: "क्लीन इंटरफ़ेस, कोई विज्ञापन नहीं, एकदम परफ़ेक्ट काम करता है।",
        name: "लीसा के.",
      },
    },
    footer: {
      about: "हमारे बारे में",
      privacy: "गोपनीयता नीति",
      terms: "सेवा की शर्तें",
      faq: "सामान्य प्रश्न",
    },
    features: {
      title: "VidLink क्यों चुनें?",
      no_watermark: {
        title: "बिना वॉटरमार्क",
        desc: "TikTok ब्रांडिंग के बिना HD वीडियो डाउनलोड करें",
      },
      fast_free: {
        title: "तेज़ और मुफ़्त",
        desc: "बिजली जैसी तेज़ डाउनलोडिंग, हमेशा के लिए मुफ़्त",
      },
      safe_private: {
        title: "सुरक्षित और निजी",
        desc: "कोई पंजीकरण नहीं, कोई ट्रैकिंग नहीं, कोई डेटा संग्रहण नहीं",
      },
    },
    about: {
      title: "VidLink के बारे में | तेज़ और निजी TikTok डाउनलोडर",
      meta: "VidLink के बारे में जानें, एक प्राइवेसी-फर्स्ट TikTok डाउनलोडर।",
      headline: "VidLink क्यों मौजूद है — क्रांति यहाँ से शुरू होती है 🚀",
      mission1:
        "एक डिजिटल दुनिया में जो शोर, अव्यवस्था और समझौते से भरी है, VidLink आपकी स्वतंत्रता की मशाल है। हम केवल वीडियो डाउनलोड नहीं करते — हम रचनाकारों और उपयोगकर्ताओं के लिए नियंत्रण, गोपनीयता और गति को पुनः प्राप्त करते हैं। आपका कंटेंट, आपके नियम। हमेशा।",
      crafted: "क्रिएटर्स के लिए तैयार, उद्देश्य से प्रेरित",
      crafted_desc:
        "चाहे आप नए विचार उत्पन्न कर रहे हों, अपनी विरासत को संरक्षित कर रहे हों, या अपनी अगली रचना को आकार दे रहे हों, VidLink बिना किसी रुकावट और ध्यानभंग के प्रदर्शन देता है। न विज्ञापन। न ट्रैकिंग। कोई समझौता नहीं — बस केंद्रित प्रदर्शन।",
      privacy_title:
        "हमारा मिशन: गोपनीयता और स्वतंत्रता के लिए एक मजबूत प्रतिबद्धता",
      privacy_desc:
        "हम निगरानी अर्थव्यवस्था को खारिज करते हैं। हम ऐसे उपकरण बनाते हैं जो आपको सेवा दें, न कि डेटा दलालों या एल्गोरिदम को। हर बाइट को आपकी गोपनीयता, तेज़ी और पारदर्शिता के साथ संभाला जाता है।",
      privacy_final: "गोपनीयता वैकल्पिक नहीं है — यह अनिवार्य है",
      privacy_final_desc:
        "कोई ट्रैकिंग नहीं। कोई लॉग नहीं। कोई स्टोरेज नहीं। कभी नहीं। आपके वीडियो केवल उस समय तक रहते हैं जब तक आपको उनकी ज़रूरत होती है — फिर बिना किसी निशान के गायब हो जाते हैं। क्योंकि असली गोपनीयता ही स्वतंत्रता है, और स्वतंत्रता आपका जन्मसिद्ध अधिकार है।",
    },
    privacy: {
      title: "गोपनीयता नीति | VidLink",
      meta: "VidLink की गोपनीयता नीति पढ़ें। कोई ट्रैकिंग नहीं, कोई स्टोरेज नहीं, केवल आपकी निजता का सम्मान।",
      headline: "आपकी गोपनीयता के लिए हमारा वादा",
      effective_date: "प्रभावी तिथि: मार्च 2025",
      section1_title: "पूर्ण डेटा सुरक्षा",
      section1_desc:
        "VidLink में, आपकी गोपनीयता हमारी प्राथमिकता है। हम कोई भी व्यक्तिगत डेटा इकट्ठा, स्टोर या ट्रैक नहीं करते।",
      section2_title: "कोई ट्रैकिंग नहीं, कोई प्रोफाइलिंग नहीं",
      section2_desc:
        "हम कुकीज़ या ट्रैकिंग पिक्सेल का उपयोग नहीं करते। आपका उपयोग पूरी तरह से निजी है।",
      section3_title: "सुरक्षित और अस्थायी प्रोसेसिंग",
      section3_desc:
        "वीडियो केवल अस्थायी रूप से प्रोसेस किए जाते हैं और 10 मिनट के भीतर हटा दिए जाते हैं।",
      section4_title: "विश्वसनीय थर्ड-पार्टी APIs",
      section4_desc:
        "हम केवल सुरक्षित और भरोसेमंद APIs का उपयोग करते हैं जो गोपनीयता मानकों को पूरा करते हैं।",
      section5_title: "आपके अधिकार और GDPR अनुपालन",
      section5_desc:
        "हम कोई निजी जानकारी नहीं एकत्र करते, फिर भी आपके डिजिटल अधिकारों का पूरा सम्मान करते हैं।",
    },
    terms: {
      title: "नियम और शर्तें | VidLink",
      meta: "VidLink के उपयोग की शर्तें पढ़ें, जो एक तेज़ और निजी TikTok डाउनलोडर है।",
      heading: "सेवा की शर्तें",
      updated: "अंतिम अद्यतन: मार्च 2025",
      section1_title: "स्वीकार्य उपयोग और ज़िम्मेदारी",
      section1_desc:
        "VidLink केवल उसी सामग्री को डाउनलोड करने के लिए डिज़ाइन किया गया है जिसे आप स्वयं के रूप में दावा करते हैं या जिसके लिए आपके पास अनुमति है...",
      section2_title: "सेवा उपलब्धता और अस्वीकरण",
      section2_desc:
        "VidLink 'जैसा है' के आधार पर प्रदान किया गया है, किसी भी प्रकार की गारंटी के बिना...",
      section3_title: "न्यायसंगत उपयोग और दर सीमाएं",
      section3_desc:
        "VidLink प्रति IP पते पर डाउनलोड की सीमाएं लागू करता है...",
      section4_title: "प्रतिबंधित आचरण",
      section4_list: [
        "कॉपीराइट सामग्री डाउनलोड करना बिना अनुमति के।",
        "VidLink का वाणिज्यिक उपयोग बिना अनुमति के।",
        "सेवा को रिवर्स इंजीनियर या एक्सप्लॉइट करने की कोशिश करना।",
        "कानूनों का उल्लंघन या दूसरों को नुकसान पहुंचाना।",
      ],
    },
    faq: {
      title: "सामान्य प्रश्न | VidLink",
      meta: "VidLink का उपयोग करने से संबंधित सामान्य प्रश्नों के उत्तर पाएं।",
      headline: "अक्सर पूछे जाने वाले सवाल",
      questions: [
        {
          q: "क्या VidLink वास्तव में फ्री है?",
          a: "हाँ, VidLink पूरी तरह से मुफ़्त है और इसमें कोई छुपा शुल्क या विज्ञापन नहीं है।",
        },
        {
          q: "क्या डाउनलोड की गई वीडियो में वॉटरमार्क होता है?",
          a: "नहीं। सभी वीडियो वॉटरमार्क के बिना डाउनलोड होती हैं।",
        },
        {
          q: "VidLink उपयोग करने के लिए क्या अकाउंट बनाना जरूरी है?",
          a: "नहीं, आपको कोई अकाउंट नहीं बनाना होगा या लॉगिन नहीं करना होगा।",
        },
        {
          q: "क्या VidLink मेरी जानकारी एकत्र करता है?",
          a: "कभी नहीं। हम आपकी कोई भी व्यक्तिगत जानकारी ट्रैक या संग्रह नहीं करते हैं।",
        },
        {
          q: "क्या मैं निजी TikTok वीडियो डाउनलोड कर सकता हूँ?",
          a: "नहीं। VidLink केवल सार्वजनिक और लिंक-योग्य वीडियो का समर्थन करता है।",
        },
        {
          q: "मैं एक दिन में कितनी वीडियो डाउनलोड कर सकता हूँ?",
          a: "कोई सख्त सीमा नहीं है, लेकिन अत्यधिक उपयोग पर अस्थायी प्रतिबंध लग सकता है।",
        },
        {
          q: "क्या मैं VidLink को मोबाइल पर उपयोग कर सकता हूँ?",
          a: "हाँ, हमारा प्लेटफ़ॉर्म मोबाइल के लिए पूरी तरह अनुकूलित है।",
        },
        {
          q: "VidLink का उपयोग करना क्या कानूनी है?",
          a: "VidLink केवल व्यक्तिगत उपयोग के लिए है। केवल वही वीडियो डाउनलोड करें जिनका उपयोग करने का अधिकार आपके पास हो।",
        },
      ],
    },
  },
  id: {
    hero: {
      title: "Unduh Video TikTok — Tanpa Watermark, Tanpa Repot",
      subtitle:
        "Tempel URL video TikTok di bawah dan unduh dalam hitungan detik.",
      placeholder: "Masukkan URL video TikTok",
      button: "Unduh",
      stats: {
        rating: "⭐ 4.9/5",
        rating_label: "Penilaian Pengguna",
        downloads: "🎥 1.2M+",
        downloads_label: "Video Diunduh",
        users: "👤 500K+",
        users_label: "Pengguna Global",
      },
      motivation:
        "Tidak perlu mendaftar. Tanpa watermark. Cukup tempel dan unduh.",
      learn_more: "Pelajari cara kerjanya",
    },
    error_invalid_url: "Silakan masukkan URL video TikTok yang valid.",
    how_it_works: {
      title: "Cara Kerjanya",
      step1: "Salin tautan video TikTok",
      step2: "Tempel URL di kotak di atas",
      step3: "Unduh video kamu langsung",
    },
    trending: {
      title: "🔻 Paling Banyak Diunduh Minggu Ini",
    },
    testimonials: {
      title: "Apa Kata Pengguna",
      user1: {
        text: "Cepat dan mudah digunakan! Saya mengunduh 10 video dalam beberapa menit.",
        name: "Sarah M.",
      },
      user2: {
        text: "Akhirnya, pengunduh yang benar-benar menghapus watermark!",
        name: "Mike T.",
      },
      user3: {
        text: "Antarmuka bersih, tanpa iklan, bekerja dengan sempurna.",
        name: "Lisa K.",
      },
    },
    footer: {
      about: "Tentang",
      privacy: "Kebijakan Privasi",
      terms: "Syarat Layanan",
      faq: "Pertanyaan Umum",
    },
    features: {
      title: "Kenapa Pilih VidLink?",
      no_watermark: {
        title: "Tanpa Watermark",
        desc: "Unduh video HD tanpa logo TikTok",
      },
      fast_free: {
        title: "Cepat & Gratis",
        desc: "Unduhan super cepat dan gratis selamanya",
      },
      safe_private: {
        title: "Aman & Pribadi",
        desc: "Tanpa pendaftaran, tanpa pelacakan, tanpa penyimpanan data",
      },
    },
    about: {
      title: "Tentang VidLink | Pengunduh TikTok Cepat & Pribadi",
      meta: "Pelajari lebih lanjut tentang VidLink, pengunduh TikTok yang mengutamakan privasi.",
      headline: "Mengapa VidLink Ada — Revolusi Dimulai di Sini 🚀",
      mission1:
        "Di dunia digital yang penuh kebisingan, kekacauan, dan kompromi, VidLink adalah mercusuar kebebasan Anda. Kami tidak hanya mengunduh video — kami mengembalikan kontrol, privasi, dan kecepatan untuk para kreator dan pengguna. Konten Anda, aturan Anda. Selalu.",
      crafted: "Dibuat untuk Kreator, Didukung oleh Tujuan",
      crafted_desc:
        "Apakah Anda memulai ide baru, mengarsipkan warisan Anda, atau menciptakan mahakarya berikutnya, VidLink memberikan kinerja tanpa gangguan. Tanpa iklan. Tanpa pelacak. Tanpa kompromi — hanya performa maksimal.",
      privacy_title: "Misi Kami: Komitmen Kuat terhadap Privasi & Kemandirian",
      privacy_desc:
        "Kami menolak ekonomi pengawasan. Kami membangun alat yang melayani Anda, bukan broker data atau algoritma. Setiap byte ditangani dengan penghormatan total terhadap privasi Anda, kecepatan tinggi, dan transparansi.",
      privacy_final: "Privasi Bukan Opsi — Itu Wajib",
      privacy_final_desc:
        "Tidak ada pelacakan. Tidak ada log. Tidak ada penyimpanan. Pernah. Video Anda hanya ada selama Anda membutuhkannya — lalu menghilang tanpa jejak. Karena privasi sejati adalah kebebasan, dan kebebasan adalah hak Anda.",
    },
    privacy: {
      title: "Kebijakan Privasi | VidLink",
      meta: "Baca kebijakan privasi VidLink. Tidak ada pelacakan, tidak ada penyimpanan, hanya menghormati privasi Anda.",
      headline: "Komitmen Kami terhadap Privasi Anda",
      effective_date: "Tanggal Berlaku: Maret 2025",
      section1_title: "Perlindungan Data Total",
      section1_desc:
        "Di VidLink, privasi Anda adalah janji kami. Kami tidak mengumpulkan, menyimpan, atau melacak data pribadi apa pun.",
      section2_title: "Tanpa Pelacakan atau Profil",
      section2_desc:
        "Kami tidak menggunakan cookie atau pelacak. Penggunaan Anda sepenuhnya bersifat pribadi.",
      section3_title: "Pemrosesan Aman & Sementara",
      section3_desc:
        "Video diproses sementara dan dihapus secara otomatis dalam 10 menit.",
      section4_title: "API Pihak Ketiga Tepercaya",
      section4_desc:
        "Kami hanya menggunakan API tepercaya yang memenuhi standar keamanan dan privasi tertinggi.",
      section5_title: "Hak Anda & Kepatuhan GDPR",
      section5_desc:
        "Kami tidak mengumpulkan data pribadi apa pun, tetapi kami tetap menjunjung tinggi hak digital Anda sepenuhnya.",
    },
    terms: {
      title: "Syarat & Ketentuan | VidLink",
      meta: "Baca syarat dan ketentuan penggunaan VidLink, pengunduh TikTok yang cepat dan privat.",
      heading: "Syarat Layanan",
      updated: "Terakhir diperbarui: Maret 2025",
      section1_title: "Penggunaan yang Dapat Diterima & Tanggung Jawab",
      section1_desc:
        "VidLink dirancang khusus untuk mengunduh konten yang Anda miliki atau memiliki izin eksplisit untuk mengakses...",
      section2_title: "Ketersediaan Layanan & Penafian",
      section2_desc:
        "VidLink disediakan 'sebagaimana adanya' tanpa jaminan apapun...",
      section3_title: "Penggunaan Adil & Batasan Penggunaan",
      section3_desc: "VidLink memberlakukan batas unduhan per alamat IP...",
      section4_title: "Perilaku yang Dilarang",
      section4_list: [
        "Mengunduh materi berhak cipta tanpa izin.",
        "Menggunakan VidLink untuk tujuan komersial tanpa izin.",
        "Mencoba meretas atau mengeksploitasi layanan.",
        "Melanggar hukum atau merugikan orang lain.",
      ],
    },
    faq: {
      title: "Pertanyaan Umum | VidLink",
      meta: "Temukan jawaban atas pertanyaan umum tentang penggunaan VidLink.",
      headline: "Pertanyaan yang Sering Diajukan",
      questions: [
        {
          q: "Apakah VidLink benar-benar gratis?",
          a: "Ya, VidLink sepenuhnya gratis tanpa iklan atau biaya tersembunyi.",
        },
        {
          q: "Apakah video yang diunduh memiliki watermark?",
          a: "Tidak. Semua video diunduh tanpa watermark.",
        },
        {
          q: "Apakah saya perlu membuat akun untuk menggunakan VidLink?",
          a: "Tidak. Tidak perlu mendaftar atau masuk.",
        },
        {
          q: "Apakah VidLink mengumpulkan data saya?",
          a: "Tidak pernah. Kami tidak menyimpan atau melacak data pengguna apa pun.",
        },
        {
          q: "Bisakah saya mengunduh video TikTok pribadi?",
          a: "Tidak. VidLink hanya mendukung video publik dengan tautan yang dapat diakses.",
        },
        {
          q: "Berapa banyak video yang bisa saya unduh per hari?",
          a: "Tidak ada batasan tetap, tetapi pembatasan mungkin diterapkan jika digunakan berlebihan.",
        },
        {
          q: "Bisakah saya menggunakan VidLink di ponsel?",
          a: "Ya, situs kami sepenuhnya responsif untuk perangkat seluler.",
        },
        {
          q: "Apakah penggunaan VidLink legal?",
          a: "VidLink hanya untuk penggunaan pribadi yang sah. Jangan unduh konten tanpa izin.",
        },
      ],
    },
  },
};

const Header = ({
  currentLang,
  setCurrentLang,
  isDark,
  setIsDark,
  lang, // ✅ receive full language object
}) => {
  const location = useLocation();
  const hideToggle = ["/about", "/privacy", "/terms", "/faq"].includes(
    location.pathname
  );
  const [menuOpen, setMenuOpen] = useState(false);

  // ✅ Nav labels pulled from translation
  const navItems = [
    { name: lang.footer?.about || "About", path: "/about" },
    { name: lang.footer?.privacy || "Privacy", path: "/privacy" },
    { name: lang.footer?.terms || "Terms", path: "/terms" },
    { name: lang.footer?.faq || "FAQs", path: "/faq" },
  ];

  return (
    <>
      <Helmet>
        <title>VidLink — Fast & Private TikTok Downloader</title>
        <meta
          name="description"
          content="Download TikTok videos quickly and privately with VidLink. No tracking, no ads, just pure speed."
        />
        <link rel="canonical" href="https://vidlink.example.com" />
      </Helmet>

      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-b border-gray-200 dark:border-slate-700 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 hover:opacity-90 transition-opacity duration-200"
            aria-label="Go to homepage"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm select-none">
                VL
              </span>
            </div>
            <span className="text-xl font-bold text-gray-800 dark:text-white select-none">
              VidLink
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Controls: Language + Dark Mode + Mobile Toggle */}
          <div className="flex items-center space-x-3">
            {/* Language Select */}
            <select
              value={currentLang}
              onChange={(e) => setCurrentLang(e.target.value)}
              className="text-sm rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              aria-label="Select language"
            >
              <option value="en">🇺🇸 EN</option>
              <option value="fr">🇫🇷 FR</option>
              <option value="ar">🇸🇦 AR</option>
              <option value="es">🇪🇸 ES</option>
              <option value="hi">🇮🇳 हिन्दी</option>
              <option value="id">🇮🇩 Bahasa</option>
            </select>

            {/* Dark Mode Toggle */}
            {!hideToggle && (
              <button
                onClick={() => setIsDark(!isDark)}
                className="bg-gray-300 dark:bg-slate-700 p-2 rounded-md transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={
                  isDark ? "Switch to light mode" : "Switch to dark mode"
                }
                title={isDark ? "Light mode" : "Dark mode"}
              >
                {isDark ? "☀️" : "🌙"}
              </button>
            )}

            {/* Hamburger for Mobile */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-gray-700 dark:text-white"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="md:hidden px-4 pb-4 pt-2 bg-white/80 dark:bg-slate-900/90 backdrop-blur-md shadow-inner rounded-b-xl"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <nav className="flex flex-col space-y-2 text-base font-medium">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMenuOpen(false)}
                      className={`px-4 py-2 rounded-md transition-colors ${
                        isActive
                          ? "bg-blue-600 text-white dark:bg-emerald-500"
                          : "text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-slate-700"
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};


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

      <section
        id="top"
        className="py-24 bg-gradient-to-br from-emerald-500 via-blue-600 to-blue-800 text-white relative"
      >
        <div className="container mx-auto px-6 max-w-3xl text-center">
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg leading-snug">
            {lang.hero.title}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl mb-8 max-w-xl mx-auto drop-shadow-md text-white/90">
            {lang.hero.subtitle}
          </p>

          {/* User Stats */}
          <div className="flex justify-center space-x-6 sm:space-x-10 mb-8 flex-wrap gap-4 font-semibold text-sm sm:text-base text-white/90">
            <div className="flex flex-col items-center min-w-[90px]">
              <span className="text-2xl sm:text-3xl font-bold">
                ⭐ <CountUp end={4.9} decimals={1} duration={2} />
                /5
              </span>
              <span>{lang.hero.stats.rating_label}</span>
            </div>
            <div className="flex flex-col items-center min-w-[90px]">
              <span className="text-2xl sm:text-3xl font-bold">
                🎥 <CountUp end={1200000} duration={3} separator="," />+
              </span>
              <span>{lang.hero.stats.downloads_label}</span>
            </div>
            <div className="flex flex-col items-center min-w-[90px]">
              <span className="text-2xl sm:text-3xl font-bold">
                👤 <CountUp end={500000} duration={3} separator="," />+
              </span>
              <span>{lang.hero.stats.users_label}</span>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row max-w-xl mx-auto shadow-lg rounded-full overflow-hidden border border-blue-800 bg-white"
          >
            <input
              id="urlInput"
              type="url"
              placeholder={lang.hero.placeholder}
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              className="flex-grow px-6 py-4 text-lg text-blue-900 placeholder-blue-500 focus:outline-none"
              required
              disabled={loading}
              aria-label="Video URL input"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white font-bold px-8 py-4 transition hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <svg
                  className="animate-spin h-6 w-6"
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

          {/* Motivational subtext */}
          <p className="mt-4 text-sm text-white/80 italic">
            {lang.hero.motivation}
          </p>
        </div>

        {/* Mobile CTA Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-emerald-600 to-blue-700 text-white p-4 shadow-xl flex justify-between items-center sm:hidden z-50">
          <span className="font-semibold text-sm">{lang.hero.placeholder}</span>
          <button
            onClick={() => document.getElementById("urlInput")?.focus()}
            className="bg-white text-blue-700 font-bold px-4 py-2 rounded-full shadow"
          >
            {lang.hero.button}
          </button>
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
        {/*<div className="adsense-mid w-full max-w-4xl mx-auto h-32 flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm mb-12">
          [Ad Banner Placeholder - Mid Section]
        </div>*/}

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
        {/*<div className="adsense-footer w-full max-w-4xl mx-auto h-24 flex items-center justify-center text-slate-400 text-sm mb-8">
          [Ad Banner Placeholder - Footer]
        </div> */}

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
            <a href="/faq" className="hover:text-green-400 transition-colors">
              {lang.footer?.faq || "FAQs"}
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


const AboutPage = ({
  lang,
  currentLang,
  setCurrentLang,
}) => {
  return (
    <>
      <Helmet>
        <title>
          {lang.about?.title ||
            "About VidLink | Fast & Private TikTok Downloader"}
        </title>
        <meta
          name="description"
          content={
            lang.about?.meta ||
            "Learn more about VidLink, a privacy-first TikTok downloader."
          }
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-gray-900 text-white">
        <Header
          currentLang={currentLang}
          setCurrentLang={setCurrentLang}
        />
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-extrabold mb-10 tracking-tight drop-shadow-lg">
              {lang.about?.headline ||
                "Why VidLink Exists — The Revolution Starts Here 🚀"}
            </h1>

            <p className="text-xl max-w-prose mx-auto mb-12 leading-relaxed text-gray-300">
              {lang.about?.mission1 ||
                "In a digital world drowning in noise, clutter, and compromise, VidLink is your beacon of freedom. We don’t just download videos — we reclaim control, privacy, and speed for creators and audiences alike. Your content, your rules. Always."}
            </p>

            <h2 className="text-3xl font-bold mb-6">
              {lang.about?.crafted ||
                "Crafted For Creators, Powered By Purpose"}
            </h2>
            <p className="text-gray-400 max-w-prose mx-auto mb-12 leading-relaxed">
              {lang.about?.crafted_desc ||
                "Whether you’re sparking new ideas, archiving your legacy, or fueling your next masterpiece, VidLink delivers with zero friction and zero distractions. No ads. No trackers. No compromises — just laser-focused performance."}
            </p>

            <h2 className="text-3xl font-bold mb-6">
              {lang.about?.privacy_title ||
                "Our Mission: A Fierce Commitment to Privacy & Independence"}
            </h2>
            <p className="text-gray-400 max-w-prose mx-auto mb-12 leading-relaxed">
              {lang.about?.privacy_desc ||
                "We reject the surveillance economy. We build tools that serve you, not data brokers or algorithms. Every byte you process is handled with brutal respect for your privacy, lightning speed, and absolute transparency."}
            </p>

            <h2 className="text-3xl font-bold mb-6">
              {lang.about?.privacy_final ||
                "Privacy Isn’t Optional — It’s Non-Negotiable"}
            </h2>
            <p className="text-gray-400 max-w-prose mx-auto leading-relaxed">
              {lang.about?.privacy_final_desc ||
                "No tracking. No logs. No storage. Ever. Your videos live only for the moment you need them — then vanish without a trace. Because true privacy is freedom, and freedom is your birthright."}
            </p>
          </div>
        </div>
        <Footer lang={lang} />
      </div>
    </>
  );
};

const PrivacyPage = ({ lang, currentLang, setCurrentLang }) => {
  return (
    <>
      <Helmet>
        <title>
          {lang.privacy?.title || "Privacy Policy | VidLink"}
        </title>
        <meta
          name="description"
          content={
            lang.privacy?.meta ||
            "Read VidLink’s privacy policy. We respect your privacy and never track or store your data."
          }
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-gray-900 text-white">
        <Header currentLang={currentLang} setCurrentLang={setCurrentLang} />

        <div className="container mx-auto px-6 py-20">
          <div className="max-w-3xl mx-auto text-left">
            <h1 className="text-5xl font-extrabold mb-10 tracking-tight drop-shadow-lg">
              {lang.privacy?.headline || "Our Commitment to Your Privacy"}
            </h1>

            <p className="text-lg text-gray-300 mb-8 italic">
              {lang.privacy?.effective_date || "Effective Date: March 2025"}
            </p>

            <section className="mb-10">
              <h2 className="text-3xl font-bold mb-4">
                {lang.privacy?.section1_title || "Absolute Data Protection"}
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {lang.privacy?.section1_desc ||
                  "At VidLink, your privacy is not just a policy — it’s our promise. We do not collect, store, or track any personal data. All video URLs you process are handled in real-time, ensuring zero retention on our servers."}
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold mb-4">
                {lang.privacy?.section2_title || "No Tracking, No Profiling"}
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {lang.privacy?.section2_desc ||
                  "We don’t use cookies, tracking pixels, or any form of behavioral profiling. Your browsing and usage habits remain strictly confidential."}
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold mb-4">
                {lang.privacy?.section3_title || "Secure & Temporary File Processing"}
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {lang.privacy?.section3_desc ||
                  "Videos are processed temporarily and deleted automatically within 10 minutes. No downloaded or processed content is ever stored."}
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold mb-4">
                {lang.privacy?.section4_title || "Trusted Third-Party APIs"}
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {lang.privacy?.section4_desc ||
                  "We leverage carefully vetted third-party APIs strictly to process TikTok URLs. All integrations meet the highest standards of security and transparency."}
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">
                {lang.privacy?.section5_title || "Your Rights & GDPR Compliance"}
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {lang.privacy?.section5_desc ||
                  "Since we do not collect or process any personal information, many regulatory obligations such as GDPR do not apply. We are fully committed to upholding your digital rights and privacy."}
              </p>
            </section>
          </div>
        </div>

        <Footer lang={lang} />
      </div>
    </>
  );
};


const TermsPage = ({ lang, currentLang, setCurrentLang }) => {
  return (
    <>
      <Helmet>
        <title>{lang.terms?.title || "Terms & Conditions | VidLink"}</title>
        <meta
          name="description"
          content={
            lang.terms?.meta ||
            "Read the terms and conditions for using VidLink, the fast and private TikTok downloader."
          }
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-gray-900 text-white">
        <Header currentLang={currentLang} setCurrentLang={setCurrentLang} />

        <div className="container mx-auto px-6 py-20">
          <div className="max-w-3xl mx-auto text-left">
            <h1 className="text-5xl font-extrabold mb-10 tracking-tight drop-shadow-lg">
              {lang.terms?.heading || "Terms of Service"}
            </h1>

            <p className="text-lg text-gray-300 mb-8 italic">
              {lang.terms?.updated || "Last updated: March 2025"}
            </p>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {lang.terms?.section1_title ||
                  "Acceptable Use & Responsibility"}
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {lang.terms?.section1_desc ||
                  "VidLink is designed for downloading content you own or have permission to access. Users are responsible for legal compliance. Unauthorized use is prohibited."}
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {lang.terms?.section2_title ||
                  "Service Availability & Disclaimer"}
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {lang.terms?.section2_desc ||
                  "VidLink is provided “as is” without guarantees of uptime or error-free operation. Use it at your own risk. We are not affiliated with TikTok."}
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {lang.terms?.section3_title || "Fair Use & Rate Limiting"}
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {lang.terms?.section3_desc ||
                  "VidLink enforces fair usage limits to ensure equal access. Abusive use may result in restriction without notice."}
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {lang.terms?.section4_title || "Prohibited Conduct"}
              </h2>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                {lang.terms?.section4_list?.length ? (
                  lang.terms.section4_list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))
                ) : (
                  <>
                    <li>
                      Downloading copyrighted material without permission.
                    </li>
                    <li>
                      Using VidLink for commercial purposes without approval.
                    </li>
                    <li>Reverse engineering or disrupting the service.</li>
                    <li>Any activity that breaks laws or harms others.</li>
                  </>
                )}
              </ul>
            </section>
          </div>
        </div>

        <Footer lang={lang} />
      </div>
    </>
  );
};



const FAQPage = ({ lang, currentLang, setCurrentLang }) => {
  const faqs = lang.faq?.questions || [];

  return (
    <>
      <Helmet>
        <title>{lang.faq?.title || "FAQs — VidLink"}</title>
        <meta
          name="description"
          content={lang.faq?.meta || "Frequently Asked Questions"}
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-gray-900 text-white">
        <Header currentLang={currentLang} setCurrentLang={setCurrentLang} />

        <main className="container mx-auto px-6 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-extrabold mb-10 tracking-tight drop-shadow-lg">
              {lang.faq?.headline || "Frequently Asked Questions"}
            </h1>

            <div className="space-y-4 text-left">
              {faqs.map(({ q, a }, i) => (
                <FAQItem key={i} question={q} answer={a} />
              ))}
            </div>
          </div>
        </main>

        <Footer lang={lang} />
      </div>
    </>
  );
};



const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-700 py-4 cursor-pointer select-none">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left text-lg font-semibold text-white hover:text-blue-400 focus:outline-none"
        aria-expanded={isOpen}
      >
        {question}
        <span
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-45" : "rotate-0"
          }`}
        >
          +
        </span>
      </button>
      {isOpen && (
        <p className="mt-3 text-gray-300 leading-relaxed max-w-prose">
          {answer}
        </p>
      )}
    </div>
  );
};




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
    <>
      <Header
        currentLang={currentLang}
        setCurrentLang={setCurrentLang}
        isDark={isDark}
        setIsDark={setIsDark}
        lang={lang} // ✅ always defined
      />
      <div className={`min-h-screen ${isDark ? "dark" : ""}`}>
        <div className="section-light transition-colors duration-300">
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
    </>
  );
};

function App() {
  const [isDark, setIsDark] = React.useState(false);
  const [currentLang, setCurrentLang] = React.useState("en");

  return (
    <Router>
      {/* ✅ Main content below */}
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              isDark={isDark}
              setIsDark={setIsDark}
              currentLang={currentLang}
              setCurrentLang={setCurrentLang}
            />
          }
        />
        <Route
          path="/about"
          element={
            <AboutPage
              lang={languages[currentLang]}
              currentLang={currentLang}
              setCurrentLang={setCurrentLang}
            />
          }
        />
        <Route
          path="/privacy"
          element={
            <PrivacyPage
              lang={languages[currentLang]}
              currentLang={currentLang}
              setCurrentLang={setCurrentLang}
            />
          }
        />
        <Route
          path="/terms"
          element={
            <TermsPage
              lang={languages[currentLang]}
              currentLang={currentLang}
              setCurrentLang={setCurrentLang}
            />
          }
        />
        <Route
          path="/faq"
          element={
            <FAQPage
              lang={languages[currentLang]}
              currentLang={currentLang}
              setCurrentLang={setCurrentLang}
            />
          }
        />
      </Routes>
    </Router>
  );
}


export default App;
