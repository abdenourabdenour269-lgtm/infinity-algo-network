'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

// Language translations
const translations = {
  en: {
    nav: { home: 'Home', products: 'Products', platforms: 'Platforms', team: 'Team', contact: 'Contact' },
    hero: {
      badge: '⚡ #1 Trading Platform in the Middle East',
      title: 'Professional Trading',
      titleHighlight: 'Tools',
      titleEnd: 'for Success',
      subtitle: 'Advanced indicators, automated robots, and educational courses to achieve sustainable profits in financial markets',
      cta1: 'Explore Products',
      cta2: 'Join Academy',
      liveSignals: 'Live Signals',
      accuracy: '+99% Accuracy'
    },
    stats: {
      clients: 'Happy Clients',
      products: 'Digital Products',
      satisfaction: 'Satisfaction Rate',
      support: 'Technical Support'
    },
    categories: {
      badge: 'Product Categories',
      title: 'Our Main',
      titleHighlight: 'Products',
      subtitle: 'Discover our diverse range of professional trading tools designed for success',
      indicators: {
        title: 'Indicators',
        subtitle: 'Professional Trading Tools',
        description: 'Professional non-repainting trading indicators for TradingView and MT4/MT5.',
        features: ['Non-Repainting', 'All Platforms', 'Precise Signals'],
        explore: 'Explore Now'
      },
      robots: {
        title: 'Robots',
        subtitle: 'Expert Advisors',
        description: 'AI-powered automated trading robots for hands-free trading.',
        features: ['Advanced AI', '24/7 Trading', 'Risk Management'],
        explore: 'Explore Now'
      },
      courses: {
        title: 'Courses',
        subtitle: 'Educational Programs',
        description: 'Comprehensive courses for beginners and professionals.',
        features: ['Beginner to Pro', 'Certifications', 'Expert Support'],
        explore: 'Explore Now'
      }
    },
    featured: {
      badge: 'Featured Products',
      title: 'Best',
      titleHighlight: 'Products',
      subtitle: 'The most popular and trusted products by thousands of traders',
      bestseller: 'Best Seller',
      discount: 'Sale',
      new: 'New',
      free: 'FREE',
      buyNow: 'Buy Now',
      download: 'Download Free',
      viewAll: 'View All Products'
    },
    platforms: {
      badge: 'Trading Platforms',
      title: 'Our Trading',
      titleHighlight: 'Platforms',
      subtitle: 'Choose the perfect platform for your trading journey',
      academy: {
        name: 'Infinity Algo Academy',
        tagline: 'Professional Trading Education & Tools',
        description: 'Your gateway to professional trading with AI-powered tools.',
        features: ['AI-Powered EAs', 'Smart Indicators', 'Expert Training'],
        cta: 'Visit Academy'
      },
      signals: {
        name: 'Infinity Signals',
        tagline: 'AI-Powered Crypto Scanner',
        description: 'Real-time RSI monitoring and AI-powered crypto insights.',
        features: ['RSI Monitor', 'AI Scanner', 'Instant Alerts'],
        cta: 'Get Signals'
      }
    },
    team: {
      badge: 'Elite Team',
      title: 'Meet Our',
      titleHighlight: 'Expert Team',
      subtitle: 'Industry leaders in algorithmic trading and financial technology',
      ceo: { badge: 'Visionary Leadership', title: 'King Arius', role: 'CEO & Founder', description: 'Pioneer in algorithmic trading with 15+ years of experience.' },
      members: [
        { name: 'Katie', role: 'Chief Trading Analyst', description: '98% prediction accuracy.' },
        { name: 'Jeremy', role: 'Head of Algorithms', description: 'Created 50+ trading algorithms.' },
        { name: 'Ryan', role: 'Strategy Advisor', description: 'Risk management expert.' },
        { name: 'Samiha', role: 'Client Relations', description: 'Personalized guidance.' }
      ]
    },
    cta: { 
      badge: 'Start Now',
      title: 'Ready to Transform', 
      titleHighlight: 'Your Trading?', 
      subtitle: 'Join thousands of successful traders with AI-driven trading', 
      button1: 'Get Started Free', 
      button2: 'Watch Demo' 
    },
    footer: { 
      brand: 'The most trusted name in AI-powered trading. Serving traders in 150+ countries.', 
      copyright: 'All rights reserved.'
    }
  },
  ar: {
    nav: { home: 'الرئيسية', products: 'المنتجات', platforms: 'المنصات', team: 'الفريق', contact: 'تواصل' },
    hero: {
      badge: '⚡ منصة التداول رقم 1 في الشرق الأوسط',
      title: 'أدوات تداول',
      titleHighlight: 'احترافية',
      titleEnd: 'للنجاح',
      subtitle: 'مؤشرات متقدمة، روبوتات آلية، ودورات تعليمية لتحقيق أرباح مستدامة في أسواق المال',
      cta1: 'استكشف المنتجات',
      cta2: 'انضم للأكاديمية',
      liveSignals: 'إشارات حية',
      accuracy: 'دقة +99%'
    },
    stats: {
      clients: 'عميل سعيد',
      products: 'منتج رقمي',
      satisfaction: 'نسبة الرضا',
      support: 'دعم فني'
    },
    categories: {
      badge: 'فئات المنتجات',
      title: 'منتجاتنا',
      titleHighlight: 'الرئيسية',
      subtitle: 'اكتشف مجموعة أدوات التداول الاحترافية المصممة للنجاح',
      indicators: {
        title: 'المؤشرات',
        subtitle: 'Indicators',
        description: 'مؤشرات تداول احترافية غير معادة الرسم لجميع المنصات.',
        features: ['غير معادة الرسم', 'جميع المنصات', 'إشارات دقيقة'],
        explore: 'استكشف الآن'
      },
      robots: {
        title: 'الروبوتات',
        subtitle: 'Expert Advisors',
        description: 'روبوتات تداول آلية بالذكاء الاصطناعي.',
        features: ['ذكاء اصطناعي', 'تداول 24/7', 'إدارة مخاطر'],
        explore: 'استكشف الآن'
      },
      courses: {
        title: 'الدورات',
        subtitle: 'Educational',
        description: 'دورات شاملة للمبتدئين والمحترفين.',
        features: ['من الصفر للاحتراف', 'شهادات معتمدة', 'دعم خبراء'],
        explore: 'استكشف الآن'
      }
    },
    featured: {
      badge: 'منتجات مميزة',
      title: 'أفضل',
      titleHighlight: 'المنتجات',
      subtitle: 'المنتجات الأكثر طلباً والموثوقة من آلاف المتداولين',
      bestseller: 'الأكثر مبيعاً',
      discount: 'تخفيض',
      new: 'جديد',
      free: 'مجاني',
      buyNow: 'اشتري الآن',
      download: 'تحميل مجاني',
      viewAll: 'عرض جميع المنتجات'
    },
    platforms: {
      badge: 'منصات التداول',
      title: 'منصاتنا',
      titleHighlight: 'الرئيسية',
      subtitle: 'اختر المنصة المثالية لرحلة تداولك',
      academy: {
        name: 'أكاديمية إنفينيتي ألغو',
        tagline: 'تعليم وأدوات احترافية',
        description: 'بوابتك للتداول الاحترافي مع أدوات الذكاء الاصطناعي.',
        features: ['مستشارون أذكياء', 'مؤشرات ذكية', 'تدريب احترافي'],
        cta: 'زيارة الأكاديمية'
      },
      signals: {
        name: 'إنفينيتي سيغنالز',
        tagline: 'ماسح تشفير ذكي',
        description: 'مراقبة لحظية وتحليلات ذكية للعملات الرقمية.',
        features: ['مراقب RSI', 'ماسح ذكي', 'تنبيهات فورية'],
        cta: 'احصل على الإشارات'
      }
    },
    team: {
      badge: 'فريق النخبة',
      title: 'تعرّف على فريق',
      titleHighlight: 'الخبراء',
      subtitle: 'قادة الصناعة في التداول الخوارزمي والتكنولوجيا المالية',
      ceo: { badge: 'القيادة الرؤية', title: 'كينغ أريوس', role: 'الرئيس التنفيذي والمؤسس', description: 'رائد في التداول الخوارزمي بخبرة تتجاوز 15 عاماً.' },
      members: [
        { name: 'كاتي', role: 'كبير المحللين', description: 'دقة تنبؤ 98%.' },
        { name: 'جريمي', role: 'رئيس الخوارزميات', description: 'أكثر من 50 خوارزمية.' },
        { name: 'ريان', role: 'مستشار استراتيجي', description: 'خبير إدارة مخاطر.' },
        { name: 'سميحة', role: 'علاقات العملاء', description: 'توجيه شخصي.' }
      ]
    },
    cta: { 
      badge: 'ابدأ الآن',
      title: 'مستعد لتحويل', 
      titleHighlight: 'تداولك؟', 
      subtitle: 'انضم لآلاف المتداولين الناجحين مع التداول الذكي', 
      button1: 'ابدأ مجاناً', 
      button2: 'شاهد العرض' 
    },
    footer: { 
      brand: 'الاسم الأكثر ثقة في التداول الذكي. نخدم المتداولين في 150+ دولة.', 
      copyright: 'جميع الحقوق محفوظة.'
    }
  }
}

const products = [
  { id: 1, emoji: '📊', name: 'ICT Entry V1', category: 'Indicator', categoryAr: 'مؤشر', rating: 4.9, reviews: 328, price: 149, oldPrice: 199, badge: 'bestseller', color: 'from-amber-500 to-orange-600' },
  { id: 2, emoji: '🎯', name: 'Buy Sell Magic', category: 'Indicator', categoryAr: 'مؤشر', rating: 4.8, reviews: 256, price: 99, oldPrice: 149, badge: 'discount', color: 'from-emerald-500 to-teal-600' },
  { id: 3, emoji: '💹', name: 'Smart Money', category: 'Indicator', categoryAr: 'مؤشر', rating: 4.7, reviews: 189, price: 129, oldPrice: 179, badge: 'new', color: 'from-blue-500 to-indigo-600' },
  { id: 4, emoji: '🤖', name: 'AI Gold Scalp Pro', category: 'Robot', categoryAr: 'روبوت', rating: 4.9, reviews: 412, price: 0, oldPrice: 299, badge: 'free', color: 'from-purple-500 to-pink-600' },
]

export default function Home() {
  const [lang, setLang] = useState<'en' | 'ar'>('ar')
  const [activeSection, setActiveSection] = useState('hero')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  
  const t = translations[lang]
  const isRTL = lang === 'ar'
  const dir = isRTL ? 'rtl' : 'ltr'

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      const sections = ['hero', 'categories', 'featured', 'platforms', 'team', 'cta']
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) element.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  const getBadgeText = (badge: string) => {
    if (!isRTL) return badge.charAt(0).toUpperCase() + badge.slice(1)
    const badges: Record<string, string> = { bestseller: 'الأكثر مبيعاً', discount: 'تخفيض', new: 'جديد', free: 'مجاني' }
    return badges[badge] || badge
  }

  return (
    <div dir={dir} className={`min-h-screen bg-[#030305] text-white overflow-x-hidden`}>
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-orange-900/10 via-transparent to-transparent" />
        
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[128px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-yellow-500/5 rounded-full blur-[80px]" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(251, 191, 36, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(251, 191, 36, 0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrollY > 30 ? 'bg-[#030305]/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => scrollToSection('hero')}>
              <div className="relative">
                <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:shadow-amber-500/50 transition-shadow">
                  <span className="text-xl font-black text-white">∞</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">
                  InfinityAlgo
                </span>
                <span className="text-[10px] text-amber-500/70 font-semibold tracking-widest uppercase -mt-0.5">Power</span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1">
              {['hero', 'categories', 'featured', 'platforms', 'team', 'cta'].map((sectionId, i) => (
                <button
                  key={sectionId}
                  onClick={() => scrollToSection(sectionId)}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                    activeSection === sectionId 
                      ? 'text-amber-400 bg-amber-500/10' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {Object.values(t.nav)[i]}
                </button>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Language Toggle */}
              <button
                onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
                className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-amber-500/30 transition-all"
              >
                <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
                <span className="text-xs font-semibold text-white">{lang === 'ar' ? 'EN' : 'ع'}</span>
              </button>
              
              <a 
                href="https://infinityalgoacademy.net/portal/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white font-semibold text-sm rounded-full shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105 transition-all"
              >
                <span>{lang === 'ar' ? 'ابدأ الآن' : 'Get Started'}</span>
                <svg className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>

              {/* Mobile Menu */}
              <button 
                className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen 
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  }
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#030305]/95 backdrop-blur-xl border-b border-white/5">
            <div className="px-4 py-6 space-y-2">
              {['hero', 'categories', 'featured', 'platforms', 'team', 'cta'].map((sectionId, i) => (
                <button 
                  key={sectionId}
                  onClick={() => scrollToSection(sectionId)} 
                  className={`block w-full text-start px-4 py-3 rounded-xl font-medium transition-all ${
                    activeSection === sectionId 
                      ? 'text-amber-400 bg-amber-500/10' 
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {Object.values(t.nav)[i]}
                </button>
              ))}
              <a 
                href="https://infinityalgoacademy.net/portal/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center gap-2 w-full py-3 mt-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-xl"
              >
                {lang === 'ar' ? 'ابدأ الآن' : 'Get Started'}
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="relative z-10">
        
        {/* Hero Section */}
        <section id="hero" className="relative min-h-screen flex items-center pt-20 pb-12 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 w-full">
            <div className={`flex flex-col ${isRTL ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}>
              {/* Content */}
              <div className={`flex-1 max-w-2xl ${isRTL ? 'text-center lg:text-right' : 'text-center lg:text-left'}`}>
                {/* Badge */}
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${isRTL ? 'from-amber-500/10 via-orange-500/10 to-transparent flex-row-reverse' : 'from-transparent via-orange-500/10 to-amber-500/10'} border border-amber-500/20 mb-8 backdrop-blur-sm`}>
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                  </div>
                  <span className="text-amber-300 text-sm font-medium">{t.hero.badge}</span>
                </div>
                
                {/* Title */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.1]">
                  <span className="text-white">{t.hero.title}</span>
                  <br />
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">{t.hero.titleHighlight}</span>
                    <svg className="absolute -bottom-2 left-0 w-full h-3 text-amber-500/30" viewBox="0 0 200 12" preserveAspectRatio="none">
                      <path d="M0,6 Q50,0 100,6 T200,6" fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </span>
                  <br />
                  <span className="text-white">{t.hero.titleEnd}</span>
                </h1>
                
                {/* Subtitle */}
                <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  {t.hero.subtitle}
                </p>

                {/* CTA Buttons */}
                <div className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                  <a 
                    href="https://infinityalgoacademy.net/portal/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 overflow-hidden rounded-xl font-semibold text-lg"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 transition-all duration-300 group-hover:scale-105" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-amber-400 via-orange-400 to-red-400" />
                    <span className="relative text-white">{t.hero.cta1}</span>
                    <svg className={`relative w-5 h-5 text-white transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                  <a 
                    href="https://infinityalgoacademy.net/item/ai-gold-scalp-pro-free-download/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 hover:border-amber-500/50 transition-all"
                  >
                    {t.hero.cta2}
                  </a>
                </div>
              </div>

              {/* Hero Visual */}
              <div className={`flex-1 max-w-lg lg:max-w-xl w-full ${isRTL ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="relative">
                  {/* Glow Effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 rounded-3xl blur-3xl opacity-60" />
                  
                  {/* Main Image */}
                  <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                    <Image 
                      src="/images/backgrounds/hero-bg.png" 
                      alt="Trading Platform" 
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-transparent to-transparent" />
                  </div>
                  
                  {/* Floating Stats Card */}
                  <div className={`absolute -bottom-4 ${isRTL ? '-left-4' : '-right-4'} bg-gradient-to-br from-[#0a0a10] to-[#050508] backdrop-blur-xl rounded-2xl p-4 border border-amber-500/20 shadow-xl`}>
                    <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <div className={isRTL ? 'text-right' : 'text-left'}>
                        <div className="text-sm font-bold text-white">{t.hero.liveSignals}</div>
                        <div className="text-xs text-emerald-400 font-semibold">{t.hero.accuracy}</div>
                      </div>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className={`absolute -top-4 ${isRTL ? '-right-4' : '-left-4'} w-20 h-20 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl blur-xl`} />
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 md:mt-20">
              {[
                { value: '+15,000', label: t.stats.clients },
                { value: '+50', label: t.stats.products },
                { value: '98%', label: t.stats.satisfaction },
                { value: '24/7', label: t.stats.support },
              ].map((stat, i) => (
                <div 
                  key={i} 
                  className="group relative text-center p-5 md:p-6 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 hover:border-amber-500/30 transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-1">
                      {stat.value}
                    </div>
                    <div className="text-gray-500 text-xs sm:text-sm font-medium">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section id="categories" className="py-20 md:py-28 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* Header */}
            <div className={`text-center mb-12 md:mb-16 ${isRTL ? 'rtl' : 'ltr'}`}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-semibold mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                {t.categories.badge}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
                <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">{t.categories.title}</span>
                <span className="text-white"> {t.categories.titleHighlight}</span>
              </h2>
              <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
                {t.categories.subtitle}
              </p>
            </div>

            {/* Category Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { key: 'indicators', icon: '📊', gradient: 'from-amber-500 to-orange-600', shadow: 'shadow-amber-500/20' },
                { key: 'robots', icon: '🤖', gradient: 'from-emerald-500 to-teal-600', shadow: 'shadow-emerald-500/20' },
                { key: 'courses', icon: '📚', gradient: 'from-blue-500 to-indigo-600', shadow: 'shadow-blue-500/20' }
              ].map((item) => {
                const category = t.categories[item.key as keyof typeof t.categories] as {
                  title: string;
                  subtitle: string;
                  description: string;
                  features: string[];
                  explore: string;
                }
                return (
                  <div 
                    key={item.key}
                    className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 hover:border-white/20 transition-all duration-500"
                  >
                    <div className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} w-32 h-32 bg-gradient-to-br ${item.gradient} opacity-10 rounded-full -translate-y-1/2 ${isRTL ? 'translate-x-1/2' : '-translate-x-1/2'} group-hover:scale-150 transition-transform duration-700`} />
                    <div className="relative p-6 md:p-8">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-2xl mb-5 shadow-lg ${item.shadow} group-hover:scale-110 transition-transform duration-300`}>
                        {item.icon}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{category.title}</h3>
                      <p className="text-sm text-amber-400/80 font-medium mb-4">{category.subtitle}</p>
                      <p className="text-gray-400 text-sm leading-relaxed mb-6">{category.description}</p>
                      <ul className="space-y-2.5 mb-6">
                        {category.features.map((feature, i) => (
                          <li key={i} className={`flex items-center gap-2 text-gray-300 text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <svg className={`w-4 h-4 text-amber-500 flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <a 
                        href="https://infinityalgoacademy.net/portal/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center gap-2 w-full px-5 py-3 bg-gradient-to-r ${item.gradient} text-white font-semibold text-sm rounded-xl hover:shadow-lg ${item.shadow} transition-all ${isRTL ? 'flex-row-reverse' : ''}`}
                      >
                        {category.explore}
                        <svg className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section id="featured" className="py-20 md:py-28 relative bg-gradient-to-b from-transparent via-amber-500/[0.02] to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* Header */}
            <div className={`text-center mb-12 md:mb-16 ${isRTL ? 'rtl' : 'ltr'}`}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-semibold mb-6">
                ⭐ {t.featured.badge}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
                <span className="text-white">{t.featured.title}</span>
                <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent"> {t.featured.titleHighlight}</span>
              </h2>
              <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
                {t.featured.subtitle}
              </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((product) => (
                <div 
                  key={product.id}
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 hover:border-amber-500/30 transition-all duration-500 flex flex-col"
                >
                  {/* Badge */}
                  <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-10`}>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold bg-gradient-to-r ${product.color} text-white shadow-lg`}>
                      {getBadgeText(product.badge)}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-grow">
                    {/* Icon */}
                    <div className="text-4xl mb-4">{product.emoji}</div>
                    
                    {/* Info */}
                    <h3 className="text-base md:text-lg font-bold text-white mb-1 line-clamp-1">{product.name}</h3>
                    <p className="text-amber-400/70 text-xs mb-4">{isRTL ? product.categoryAr : product.category}</p>
                    
                    {/* Rating */}
                    <div className={`flex items-center gap-1.5 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className="flex">
                        {[1,2,3,4,5].map((star) => (
                          <svg key={star} className={`w-3.5 h-3.5 ${star <= Math.floor(product.rating) ? 'text-amber-400' : 'text-gray-700'}`} fill="currentColor" viewBox="0 0 24 24">
                            <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">{product.rating} ({product.reviews})</span>
                    </div>

                    {/* Price */}
                    <div className={`flex items-baseline gap-2 mb-5 mt-auto ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="text-xl md:text-2xl font-black bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                        {product.price === 0 ? (isRTL ? 'مجاني' : 'FREE') : `$${product.price}`}
                      </span>
                      {product.oldPrice > product.price && (
                        <span className="text-gray-600 line-through text-sm">${product.oldPrice}</span>
                      )}
                    </div>

                    {/* CTA */}
                    <a 
                      href={product.id === 4 ? "https://infinityalgoacademy.net/item/ai-gold-scalp-pro-free-download/" : "https://infinityalgoacademy.net/portal/"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-gradient-to-r ${product.color} text-white font-semibold text-sm rounded-xl hover:shadow-lg transition-all group-hover:scale-[1.02] ${isRTL ? 'flex-row-reverse' : ''}`}
                    >
                      {product.price === 0 ? t.featured.download : t.featured.buyNow}
                      <svg className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* View All */}
            <div className="text-center mt-12">
              <a 
                href="https://infinityalgoacademy.net/portal/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-amber-500/30 text-amber-400 font-semibold hover:bg-amber-500/10 hover:border-amber-500/50 transition-all ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                {t.featured.viewAll}
                <svg className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Platforms Section */}
        <section id="platforms" className="py-20 md:py-28 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* Header */}
            <div className={`text-center mb-12 md:mb-16 ${isRTL ? 'rtl' : 'ltr'}`}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-semibold mb-6">
                🌐 {t.platforms.badge}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
                <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">{t.platforms.title}</span>
                <span className="text-white"> {t.platforms.titleHighlight}</span>
              </h2>
              <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
                {t.platforms.subtitle}
              </p>
            </div>

            {/* Platform Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Academy */}
              <a 
                href="https://infinityalgoacademy.net/portal/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500/5 to-orange-500/5 border border-amber-500/10 hover:border-amber-500/30 transition-all duration-500 block"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500" />
                <div className="p-6 md:p-8">
                  <div className={`flex items-center gap-4 mb-5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-3xl shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform">
                      🎓
                    </div>
                    <div className={isRTL ? 'text-right' : 'text-left'}>
                      <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">
                        {t.platforms.academy.name}
                      </h3>
                      <p className="text-amber-400/70 text-sm">{t.platforms.academy.tagline}</p>
                    </div>
                  </div>
                  <p className={`text-gray-400 text-sm leading-relaxed mb-5 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t.platforms.academy.description}
                  </p>
                  <div className={`flex flex-wrap gap-2 mb-5 ${isRTL ? 'justify-end' : 'justify-start'}`}>
                    {t.platforms.academy.features.map((feature, j) => (
                      <span key={j} className="px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-medium border border-amber-500/20">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className={`flex items-center gap-2 text-amber-500 font-semibold ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                    <span>{t.platforms.academy.cta}</span>
                    <svg className={`w-5 h-5 transition-transform group-hover:translate-x-0.5 ${isRTL ? 'rotate-180 group-hover:-translate-x-0.5' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </a>

              {/* Signals */}
              <a 
                href="https://infinitysignals.net/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-500/5 to-amber-500/5 border border-yellow-500/10 hover:border-yellow-500/30 transition-all duration-500 block"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500" />
                <div className="p-6 md:p-8">
                  <div className={`flex items-center gap-4 mb-5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center text-3xl shadow-lg shadow-yellow-500/30 group-hover:scale-110 transition-transform">
                      📡
                    </div>
                    <div className={isRTL ? 'text-right' : 'text-left'}>
                      <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                        {t.platforms.signals.name}
                      </h3>
                      <p className="text-yellow-400/70 text-sm">{t.platforms.signals.tagline}</p>
                    </div>
                  </div>
                  <p className={`text-gray-400 text-sm leading-relaxed mb-5 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t.platforms.signals.description}
                  </p>
                  <div className={`flex flex-wrap gap-2 mb-5 ${isRTL ? 'justify-end' : 'justify-start'}`}>
                    {t.platforms.signals.features.map((feature, j) => (
                      <span key={j} className="px-3 py-1.5 rounded-full bg-yellow-500/10 text-yellow-400 text-xs font-medium border border-yellow-500/20">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className={`flex items-center gap-2 text-yellow-500 font-semibold ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                    <span>{t.platforms.signals.cta}</span>
                    <svg className={`w-5 h-5 transition-transform group-hover:translate-x-0.5 ${isRTL ? 'rotate-180 group-hover:-translate-x-0.5' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-20 md:py-28 relative bg-gradient-to-b from-transparent via-amber-500/[0.02] to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* Header */}
            <div className={`text-center mb-12 md:mb-16 ${isRTL ? 'rtl' : 'ltr'}`}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-semibold mb-6">
                💎 {t.team.badge}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
                <span className="text-white">{t.team.title}</span>
                <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent"> {t.team.titleHighlight}</span>
              </h2>
              <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
                {t.team.subtitle}
              </p>
            </div>

            {/* CEO */}
            <div className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-16 mb-16 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 flex-shrink-0">
                {/* Decorative Rings */}
                <div className="absolute inset-0 rounded-full border border-amber-500/20 animate-spin" style={{ animationDuration: '30s' }} />
                <div className="absolute inset-3 rounded-full border border-amber-500/10 animate-spin" style={{ animationDuration: '40s', animationDirection: 'reverse' }} />
                <div className="absolute inset-6 rounded-full border border-dashed border-amber-500/5 animate-spin" style={{ animationDuration: '50s' }} />
                
                {/* Glow */}
                <div className="absolute inset-8 bg-gradient-to-br from-amber-500/20 to-orange-500/10 rounded-full blur-2xl" />
                
                {/* Image */}
                <div className="absolute inset-8 rounded-full overflow-hidden border-4 border-amber-500/30 shadow-2xl shadow-amber-500/20">
                  <Image src="/images/team/king-arius.jpg" alt="King Arius - CEO" fill className="object-cover" priority />
                </div>
                
                {/* Crown */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-14 bg-gradient-to-br from-amber-500 via-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/40 z-10">
                  <span className="text-2xl">👑</span>
                </div>
              </div>
              
              <div className={`flex-1 text-center lg:${isRTL ? 'text-right' : 'text-left'}`}>
                <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold mb-4">
                  {t.team.ceo.badge}
                </span>
                <h3 className="text-3xl md:text-4xl font-black text-white mb-2">{t.team.ceo.title}</h3>
                <p className="text-lg text-amber-400 font-bold mb-4">{t.team.ceo.role}</p>
                <p className="text-gray-400 leading-relaxed max-w-lg mx-auto lg:mx-0">{t.team.ceo.description}</p>
              </div>
            </div>

            {/* Team Members */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {t.team.members.map((member, i) => (
                <div 
                  key={i}
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 hover:border-amber-500/20 transition-all duration-500 text-center p-5"
                >
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-500/10 to-orange-500/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-amber-500/30 group-hover:border-amber-500/50 transition-colors">
                      <Image 
                        src={['/images/team/katie.png', '/images/team/jeremy.png', '/images/team/ryan.png', '/images/team/samiha.png'][i]} 
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <h4 className="text-base font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">
                    {member.name}
                  </h4>
                  <p className="text-amber-500/80 font-semibold text-xs mb-2">{member.role}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="cta" className="py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-orange-500/5 to-red-500/5" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-semibold mb-6">
              🚀 {t.cta.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6">
              <span className="text-white">{t.cta.title}</span>
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent"> {t.cta.titleHighlight}</span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg mb-10 max-w-xl mx-auto">
              {t.cta.subtitle}
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <a 
                href="https://infinityalgoacademy.net/portal/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 overflow-hidden rounded-xl font-semibold text-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500" />
                <span className="relative text-white">{t.cta.button1}</span>
                <svg className={`relative w-5 h-5 text-white transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a 
                href="https://infinityalgoacademy.net/item/ai-gold-scalp-pro-free-download/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 transition-all"
              >
                {t.cta.button2}
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-white/5 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* Logo & Brand */}
            <div className="flex flex-col items-center text-center mb-8">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 flex items-center justify-center">
                  <span className="text-xl font-black text-white">∞</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">
                  InfinityAlgoPower
                </span>
              </div>
              <p className="text-gray-500 text-sm max-w-md">
                {t.footer.brand}
              </p>
            </div>

            {/* Copyright */}
            <div className="pt-8 border-t border-white/5 text-center">
              <p className="text-gray-600 text-xs sm:text-sm">
                © {new Date().getFullYear()} Infinity Algo Network. {t.footer.copyright}
              </p>
            </div>
          </div>
        </footer>
      </main>

      {/* Floating Action Buttons */}
      <div className={`fixed bottom-4 sm:bottom-6 ${isRTL ? 'left-4 sm:left-6' : 'right-4 sm:right-6'} z-40 flex flex-col gap-2 sm:gap-3`}>
        <a
          href="https://infinityalgoacademy.net/portal/"
          target="_blank"
          rel="noopener noreferrer"
          className="group w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-110 transition-all"
          title="Infinity Algo Academy"
        >
          <span className="text-xl sm:text-2xl">🎓</span>
        </a>
        <a
          href="https://infinitysignals.net/"
          target="_blank"
          rel="noopener noreferrer"
          className="group w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50 hover:scale-110 transition-all"
          title="Infinity Signals"
        >
          <span className="text-xl sm:text-2xl">📡</span>
        </a>
      </div>
    </div>
  )
}
