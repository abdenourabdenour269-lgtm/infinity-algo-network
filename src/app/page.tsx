'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

// Language translations
const translations = {
  en: {
    nav: { home: 'Home', products: 'Products', platforms: 'Platforms', team: 'Team', terms: 'Terms', contact: 'Contact' },
    hero: {
      badge: '🚀 Most Advanced Trading Network',
      title: 'Master the Markets with',
      titleSpan: 'AI-Powered Trading',
      subtitle: 'Unlock your trading potential with cutting-edge AI tools, professional signals, and expert education. Join 50,000+ successful traders worldwide.',
      cta1: 'Start Trading Now',
      cta2: 'Explore Free Tools'
    },
    featured: {
      badge: '⭐ Featured Product',
      title: 'AI Gold Scalp Pro',
      subtitle: 'Revolutionary AI-Powered Gold Trading System',
      description: 'Experience the future of gold trading with our advanced AI-powered scalping system. Designed for precision, built for profit. Get it FREE now!',
      features: ['Real-time AI Analysis', 'High Accuracy Signals', 'Risk Management Built-in', 'Easy Installation', 'Free Download Available'],
      download: 'Download Free',
      learn: 'Learn More'
    },
    stats: { traders: 'Active Traders', accuracy: 'Accuracy Rate', tools: 'Trading Tools', profit: 'Avg. Monthly Profit' },
    platforms: {
      title: 'Our Trading Platforms',
      subtitle: 'Choose the perfect platform for your trading journey',
      academy: {
        name: 'Infinity Algo Academy',
        tagline: 'Professional Trading Education & Tools',
        description: 'Your gateway to professional trading. Access AI-powered EAs, non-repainting indicators, and advanced strategies.',
        features: ['AI-Powered EAs', 'Non-Repainting Indicators', 'Smart Strategies', 'Expert Training'],
        cta: 'Visit Academy'
      },
      signals: {
        name: 'Infinity Signals',
        tagline: 'AI-Powered Crypto Scanner',
        description: 'Real-time RSI monitoring and AI-powered crypto insights. ARIUS AI Sentinel Core with 99.9% accuracy.',
        features: ['Real-Time RSI Monitor', 'AI Crypto Scanner', 'Whale Feed Tracking', 'Instant Alerts'],
        cta: 'Get Signals'
      }
    },
    features: {
      title: 'Why Choose Us?',
      subtitle: 'Powerful tools designed for serious traders',
      items: [
        { icon: '🤖', title: 'AI-Powered Systems', description: 'Advanced machine learning algorithms that adapt to market conditions in real-time.' },
        { icon: '📊', title: 'Professional Analysis', description: 'Comprehensive technical analysis tools used by professional traders worldwide.' },
        { icon: '🎯', title: 'High Accuracy Signals', description: 'Signals with proven track record of 99.9% accuracy across all market conditions.' },
        { icon: '⚡', title: 'Instant Execution', description: 'Lightning-fast order execution with minimal slippage for maximum profit.' },
        { icon: '📚', title: 'Expert Training', description: 'Learn from professionals with decades of combined trading experience.' },
        { icon: '🔒', title: 'Risk Management', description: 'Built-in risk management tools to protect your capital and maximize gains.' }
      ]
    },
    team: {
      badge: '💎 Elite Team',
      title: 'Meet Our Expert Team',
      subtitle: 'Industry leaders with proven track records in algorithmic trading and financial technology',
      ceo: { badge: '👑 Visionary Leadership', title: 'King Arius', role: 'CEO & Founder', description: 'Pioneer in algorithmic trading with 15+ years of experience. Founded Infinity Algo Network to democratize professional trading tools for everyone.' },
      members: [
        { name: 'Katie', role: 'Chief Trading Analyst', description: 'Expert in technical analysis with proven 98% prediction accuracy.' },
        { name: 'Jeremy', role: 'Head of Algorithm Development', description: 'Created 50+ successful trading algorithms used globally.' },
        { name: 'Ryan', role: 'Senior Strategy Advisor', description: 'Developed risk management strategies protecting $100M+ in assets.' },
        { name: 'Samiha', role: 'Client Relations Director', description: 'Ensuring trader success with personalized guidance and support.' }
      ]
    },
    terms: { badge: '📖 Trading Dictionary', title: 'Trading Terms & Concepts', subtitle: 'Master the language of professional trading', categories: { all: 'All', basics: 'Basics', market: 'Market', risk: 'Risk', advanced: 'Advanced', crypto: 'Crypto', indicators: 'Indicators' } },
    cta: { title: 'Ready to Transform Your Trading?', titleSpan: 'Start Your Journey Today', subtitle: 'Join thousands of successful traders who have already discovered the power of AI-driven trading', button1: 'Get Started Free', button2: 'Watch Demo' },
    footer: { brand: 'The most trusted name in AI-powered trading solutions. Serving traders in 150+ countries.', platforms: 'Platforms', links: 'Quick Links', products: 'Products', copyright: 'All rights reserved.' }
  },
  ar: {
    nav: { home: 'الرئيسية', products: 'المنتجات', platforms: 'المنصات', team: 'الفريق', terms: 'المصطلحات', contact: 'تواصل' },
    hero: {
      badge: '🚀 شبكة التداول الأكثر تقدماً',
      title: 'احترف الأسواق مع',
      titleSpan: 'التداول بالذكاء الاصطناعي',
      subtitle: 'افتح إمكانياتك في التداول مع أدوات الذكاء الاصطناعي المتطورة والإشارات الاحترافية والتعليم المتميز. انضم لأكثر من 50,000 متداول ناجح حول العالم.',
      cta1: 'ابدأ التداول الآن',
      cta2: 'استكشف الأدوات المجانية'
    },
    featured: {
      badge: '⭐ منتج مميز',
      title: 'AI Gold Scalp Pro',
      subtitle: 'نظام تداول الذهب الثوري بالذكاء الاصطناعي',
      description: 'اختبر مستقبل تداول الذهب مع نظام السكالبينج المتطور المدعوم بالذكاء الاصطناعي. مصمم للدقة، مبني للربح. احصل عليه مجاناً الآن!',
      features: ['تحليل AI لحظي', 'إشارات عالية الدقة', 'إدارة مخاطر مدمجة', 'تثبيت سهل', 'تحميل مجاني متاح'],
      download: 'تحميل مجاني',
      learn: 'اعرف المزيد'
    },
    stats: { traders: 'متداول نشط', accuracy: 'معدل الدقة', tools: 'أداة تداول', profit: 'متوسط الربح الشهري' },
    platforms: {
      title: 'منصات التداول الخاصة بنا',
      subtitle: 'اختر المنصة المثالية لرحلة تداولك',
      academy: {
        name: 'أكاديمية إنفينيتي ألغو',
        tagline: 'تعليم وأدوات تداول احترافية',
        description: 'بوابتك للتداول الاحترافي. الوصول إلى مستشارين خبراء بالذكاء الاصطناعي ومؤشرات موثوقة واستراتيجيات متقدمة.',
        features: ['مستشارون خبراء بالذكاء الاصطناعي', 'مؤشرات غير مرسومة', 'استراتيجيات ذكية', 'تدريب احترافي'],
        cta: 'زيارة الأكاديمية'
      },
      signals: {
        name: 'إنفينيتي سيغنالز',
        tagline: 'ماسح تشفير بالذكاء الاصطناعي',
        description: 'مراقبة RSI في الوقت الحقيقي ورؤى تشفير مدعومة بالذكاء الاصطناعي بدقة 99.9%.',
        features: ['مراقب RSI الحقيقي', 'ماسح تشفير بالذكاء الاصطناعي', 'تتبع حيتان السوق', 'تنبيهات فورية'],
        cta: 'احصل على الإشارات'
      }
    },
    features: {
      title: 'لماذا تختارنا؟',
      subtitle: 'أدوات قوية مصممة للمتداولين الجادين',
      items: [
        { icon: '🤖', title: 'أنظمة ذكية', description: 'خوارزميات تعلم آلي متطورة تتكيف مع ظروف السوق لحظياً.' },
        { icon: '📊', title: 'تحليل احترافي', description: 'أدوات تحليل فني شاملة يستخدمها المتداولون المحترفون حول العالم.' },
        { icon: '🎯', title: 'إشارات عالية الدقة', description: 'إشارات بسجل مثبت بدقة 99.9% في جميع ظروف السوق.' },
        { icon: '⚡', title: 'تنفيذ فوري', description: 'تنفيذ أوامر سريع برشاقة минимальة لتحقيق أقصى ربح.' },
        { icon: '📚', title: 'تدريب خبراء', description: 'تعلم من محترفين بعقود من الخبرة المتراكمة في التداول.' },
        { icon: '🔒', title: 'إدارة مخاطر', description: 'أدوات إدارة مخاطر مدمجة لحماية رأس مالك وتعظيم مكاسبك.' }
      ]
    },
    team: {
      badge: '💎 فريق النخبة',
      title: 'تعرّف على فريق الخبراء',
      subtitle: 'قادة الصناعة بسجلات حافلة في التداول الخوارزمي والتكنولوجيا المالية',
      ceo: { badge: '👑 القيادة الرؤية', title: 'كينغ أريوس', role: 'الرئيس التنفيذي والمؤسس', description: 'رائد في التداول الخوارزمي بخبرة تتجاوز 15 عاماً. أسس شبكة إنفينيتي ألغو لجعل أدوات التداول الاحترافية متاحة للجميع.' },
      members: [
        { name: 'كاتي', role: 'كبير محللي التداول', description: 'خبيرة في التحليل الفني بدقة تنبؤ مثبتة 98%.' },
        { name: 'جريمي', role: 'رئيس قسم تطوير الخوارزميات', description: 'أنشأ أكثر من 50 خوارزمية تداول ناجحة مستخدمة عالمياً.' },
        { name: 'ريان', role: 'مستشار استراتيجي أول', description: 'طور استراتيجيات إدارة مخاطر تحمي أكثر من 100 مليون دولار.' },
        { name: 'سميحة', role: 'مديرة علاقات العملاء', description: 'تضمن نجاح المتداولين من خلال التوجيه الشخصي والدعم.' }
      ]
    },
    terms: { badge: '📖 قاموس التداول', title: 'مصطلحات ومفاهيم التداول', subtitle: 'أتقن لغة التداول الاحترافي', categories: { all: 'الكل', basics: 'الأساسيات', market: 'السوق', risk: 'المخاطر', advanced: 'متقدم', crypto: 'العملات الرقمية', indicators: 'المؤشرات' } },
    cta: { title: 'مستعد لتحويل تداولك؟', titleSpan: 'ابدأ رحلتك اليوم', subtitle: 'انضم لآلاف المتداولين الناجحين الذين اكتشفوا قوة التداول بالذكاء الاصطناعي', button1: 'ابدأ مجاناً', button2: 'شاهد العرض' },
    footer: { brand: 'الاسم الأكثر ثقة في حلول التداول بالذكاء الاصطناعي. نخدم المتداولين في أكثر من 150 دولة.', platforms: 'المنصات', links: 'روابط سريعة', products: 'المنتجات', copyright: 'جميع الحقوق محفوظة.' }
  }
}

const tradingTerms = [
  { term: 'Forex', termAr: 'فوركس', definition: 'Foreign exchange market for trading currencies', definitionAr: 'سوق تبادل العملات الأجنبية', category: 'basics' },
  { term: 'Pip', termAr: 'نقطة', definition: 'Smallest price move in forex trading', definitionAr: 'أصغر حركة سعر في تداول الفوركس', category: 'basics' },
  { term: 'Leverage', termAr: 'الرافعة المالية', definition: 'Borrowed capital to increase trading position', definitionAr: 'رأس المال المقترض لزيادة مركز التداول', category: 'basics' },
  { term: 'Spread', termAr: 'السبريد', definition: 'Difference between bid and ask price', definitionAr: 'الفرق بين سعر الشراء والبيع', category: 'basics' },
  { term: 'Bull Market', termAr: 'سوق صاعد', definition: 'Market condition with rising prices', definitionAr: 'حالة السوق مع ارتفاع الأسعار', category: 'market' },
  { term: 'Bear Market', termAr: 'سوق هابط', definition: 'Market condition with falling prices', definitionAr: 'حالة السوق مع انخفاض الأسعار', category: 'market' },
  { term: 'Stop Loss', termAr: 'وقف الخسارة', definition: 'Order to limit potential losses', definitionAr: 'أمر لتحديد الخسائر المحتملة', category: 'risk' },
  { term: 'Take Profit', termAr: 'جني الأرباح', definition: 'Order to secure profits at target price', definitionAr: 'أمر لتأمين الأرباح عند السعر المستهدف', category: 'risk' },
  { term: 'Scalping', termAr: 'السكالبينج', definition: 'Short-term trading strategy for small profits', definitionAr: 'استراتيجية تداول قصيرة المدى لأرباح صغيرة', category: 'advanced' },
  { term: 'Expert Advisor', termAr: 'المستشار الخبير', definition: 'Automated trading program for MetaTrader', definitionAr: 'برنامج تداول آلي لمنصة ميتاتريدر', category: 'advanced' },
  { term: 'RSI', termAr: 'مؤشر القوة النسبية', definition: 'Relative Strength Index indicator', definitionAr: 'مؤشر القوة النسبية', category: 'indicators' },
  { term: 'MACD', termAr: 'ماكد', definition: 'Moving Average Convergence Divergence', definitionAr: 'مؤشر تقارب وتباعد المتوسطات المتحركة', category: 'indicators' },
  { term: 'Cryptocurrency', termAr: 'العملات الرقمية', definition: 'Digital currency using cryptography', definitionAr: 'عملة رقمية تستخدم التشفير', category: 'crypto' },
  { term: 'Blockchain', termAr: 'البلوكتشين', definition: 'Distributed ledger technology', definitionAr: 'تقنية دفتر الأستاذ الموزع', category: 'crypto' },
  { term: 'DeFi', termAr: 'تمويل لامركزي', definition: 'Decentralized financial services', definitionAr: 'الخدمات المالية اللامركزية', category: 'crypto' },
  { term: 'Signal', termAr: 'إشارة', definition: 'Trading recommendation based on analysis', definitionAr: 'توصية تداول مبنية على التحليل', category: 'advanced' },
]

export default function Home() {
  const [lang, setLang] = useState<'en' | 'ar'>('ar')
  const [activeSection, setActiveSection] = useState('')
  const [selectedTermCategory, setSelectedTermCategory] = useState('all')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [activeFeature, setActiveFeature] = useState(0)
  
  const t = translations[lang]
  const isRTL = lang === 'ar'

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      const sections = ['hero', 'featured', 'platforms', 'features', 'team', 'terms', 'contact']
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 6)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const filteredTerms = selectedTermCategory === 'all' 
    ? tradingTerms 
    : tradingTerms.filter(term => term.category === selectedTermCategory)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  const teamImages = [
    '/images/team/katie.png',
    '/images/team/jeremy.png',
    '/images/team/ryan.png',
    '/images/team/samiha.png'
  ]

  return (
    <div 
      className={`min-h-screen bg-[#050508] text-white ${isRTL ? 'rtl' : 'ltr'}`}
      style={{ fontFamily: "'Cairo', sans-serif" }}
    >
      {/* Google Fonts - Cairo */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />

      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-gradient-to-br from-amber-600/10 via-yellow-500/5 to-transparent rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-gradient-to-tr from-orange-600/10 via-amber-500/5 to-transparent rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[40%] left-[40%] w-[400px] h-[400px] bg-gradient-to-br from-yellow-500/5 to-transparent rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '4s' }} />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(251, 191, 36, 0.5) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrollY > 50 ? 'bg-[#050508]/95 backdrop-blur-2xl border-b border-amber-500/10 shadow-xl shadow-black/20' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-4 group cursor-pointer" onClick={() => scrollToSection('hero')}>
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 via-yellow-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:shadow-amber-500/50 transition-all duration-300 group-hover:scale-110">
                  <span className="text-2xl font-black text-black">∞</span>
                </div>
                <div className="absolute -inset-1 bg-amber-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">
                  <span className="text-white">Infinity</span>
                  <span className="text-amber-500">Algo</span>
                </h1>
                <p className="text-[10px] text-amber-500/60 font-semibold tracking-widest uppercase">Network</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8">
              {Object.values(t.nav).map((item, i) => (
                <button
                  key={i}
                  onClick={() => scrollToSection(['hero', 'featured', 'platforms', 'features', 'team', 'terms', 'contact'][i])}
                  className={`relative text-sm font-semibold transition-all duration-300 group ${
                    activeSection === ['hero', 'featured', 'platforms', 'features', 'team', 'terms', 'contact'][i] 
                      ? 'text-amber-500' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300 ${
                    activeSection === ['hero', 'featured', 'platforms', 'features', 'team', 'terms', 'contact'][i] ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </button>
              ))}
            </div>

            {/* Right Side */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="flex items-center bg-gradient-to-r from-gray-900 to-gray-950 rounded-xl p-1 border border-gray-800">
                <button onClick={() => setLang('en')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${lang === 'en' ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}>EN</button>
                <button onClick={() => setLang('ar')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${lang === 'ar' ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}>عربي</button>
              </div>
              <a href="https://infinityalgoacademy.net/portal/" target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 text-black font-bold rounded-xl hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 hover:scale-105">{lang === 'ar' ? 'ابدأ الآن' : 'Get Started'}</a>
            </div>

            {/* Mobile Menu Button */}
            <button className="lg:hidden text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#050508]/98 backdrop-blur-2xl border-b border-amber-500/10">
            <div className="px-6 py-6 space-y-4">
              <div className="flex items-center justify-center gap-2 bg-gray-900 rounded-xl p-1 mb-6">
                <button onClick={() => setLang('en')} className={`flex-1 py-3 rounded-lg text-sm font-bold ${lang === 'en' ? 'bg-amber-500 text-black' : 'text-gray-400'}`}>English</button>
                <button onClick={() => setLang('ar')} className={`flex-1 py-3 rounded-lg text-sm font-bold ${lang === 'ar' ? 'bg-amber-500 text-black' : 'text-gray-400'}`}>العربية</button>
              </div>
              {Object.values(t.nav).map((item, i) => (
                <button key={i} onClick={() => scrollToSection(['hero', 'featured', 'platforms', 'features', 'team', 'terms', 'contact'][i])} className="block w-full text-center text-gray-300 hover:text-amber-500 py-3 font-semibold text-lg transition-colors">{item}</button>
              ))}
              <a href="https://infinityalgoacademy.net/portal/" target="_blank" rel="noopener noreferrer" className="block w-full py-4 text-center bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 text-black font-bold rounded-xl mt-4">{lang === 'ar' ? 'ابدأ الآن' : 'Get Started'}</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/backgrounds/hero-bg.png" alt="Trading Background" fill className="object-cover opacity-30" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-[#050508]/80 to-[#050508]" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-3 mb-8 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-orange-500/10 border border-amber-500/30 backdrop-blur-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gradient-to-r from-amber-500 to-orange-500"></span>
            </span>
            <span className="text-amber-400 text-sm font-bold">{t.hero.badge}</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black mb-6 leading-tight">
            <span className="text-white">{t.hero.title}</span>
            <br />
            <span className="bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">{t.hero.titleSpan}</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">{t.hero.subtitle}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a href="https://infinityalgoacademy.net/portal/" target="_blank" rel="noopener noreferrer" className="px-10 py-4 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 text-black font-bold text-lg rounded-xl hover:shadow-2xl hover:shadow-amber-500/40 transition-all duration-300 hover:scale-105">{t.hero.cta1}</a>
            <a href="https://infinityalgoacademy.net/item/ai-gold-scalp-pro-free-download/" target="_blank" rel="noopener noreferrer" className="px-10 py-4 border-2 border-amber-500/50 text-amber-400 font-bold text-lg rounded-xl hover:bg-amber-500/10 transition-all duration-300">{t.hero.cta2}</a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { value: '50K+', label: t.stats.traders },
              { value: '99.9%', label: t.stats.accuracy },
              { value: '150+', label: t.stats.tools },
              { value: '45%', label: t.stats.profit }
            ].map((stat, i) => (
              <div key={i} className="group p-6 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-950/80 border border-gray-800 hover:border-amber-500/40 transition-all duration-300 hover:scale-105">
                <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent mb-2">{stat.value}</div>
                <div className="text-gray-500 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Product Section */}
      <section id="featured" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-950 to-black border border-amber-500/20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-500/20 to-transparent blur-3xl rounded-full" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-orange-500/10 to-transparent blur-3xl rounded-full" />
            
            <div className="relative z-10 p-8 md:p-12 lg:p-16">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Content */}
                <div className={isRTL ? 'text-right lg:order-2' : 'text-left'}>
                  <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-400 text-sm font-bold mb-6">{t.featured.badge}</span>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">{t.featured.title}</h2>
                  <p className="text-xl text-amber-500 font-semibold mb-6">{t.featured.subtitle}</p>
                  <p className="text-gray-400 text-lg leading-relaxed mb-8">{t.featured.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {t.featured.features.map((feature, i) => (
                      <div key={i} className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-300 font-medium text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a href="https://infinityalgoacademy.net/item/ai-gold-scalp-pro-free-download/" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 text-black font-bold text-lg rounded-xl hover:shadow-2xl hover:shadow-amber-500/40 transition-all duration-300 hover:scale-105 text-center">
                      {t.featured.download} →
                    </a>
                    <a href="https://infinityalgoacademy.net/item/ai-gold-scalp-pro-free-download/" target="_blank" rel="noopener noreferrer" className="px-8 py-4 border-2 border-amber-500/50 text-amber-400 font-bold text-lg rounded-xl hover:bg-amber-500/10 transition-all text-center">{t.featured.learn}</a>
                  </div>
                </div>
                
                {/* Visual */}
                <div className={`relative ${isRTL ? 'lg:order-1' : ''}`}>
                  <div className="relative aspect-square max-w-md mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-3xl blur-3xl" />
                    <div className="relative w-full h-full rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 border border-amber-500/20 flex items-center justify-center overflow-hidden">
                      <div className="text-center p-8">
                        <div className="text-8xl mb-4">🥇</div>
                        <h3 className="text-2xl font-black text-white mb-2">Gold Trading</h3>
                        <p className="text-amber-500 font-bold">AI-Powered System</p>
                        <div className="mt-6 flex justify-center gap-2">
                          <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold">FREE</span>
                          <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs font-bold">PRO</span>
                        </div>
                      </div>
                    </div>
                    {/* Floating Elements */}
                    <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl animate-bounce" style={{ animationDuration: '3s' }}>
                      <span className="text-2xl">⚡</span>
                    </div>
                    <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center shadow-xl animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                      <span className="text-xl">🎯</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section id="platforms" className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-bold mb-6">🌐 {t.platforms.title}</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">{t.platforms.subtitle}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Academy Card */}
            <a href="https://infinityalgoacademy.net/portal/" target="_blank" rel="noopener noreferrer" className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-gray-950 border border-amber-500/20 hover:border-amber-500/50 transition-all duration-500">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500" />
              <div className="p-8">
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-4xl shadow-xl shadow-amber-500/30 group-hover:scale-110 transition-transform duration-300">🎓</div>
                  <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <h3 className="text-2xl font-black text-white group-hover:text-amber-400 transition-colors">{t.platforms.academy.name}</h3>
                    <p className="text-amber-500/80 font-semibold">{t.platforms.academy.tagline}</p>
                  </div>
                </div>
                <p className={`text-gray-400 leading-relaxed mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>{t.platforms.academy.description}</p>
                <div className={`flex flex-wrap gap-2 mb-6 ${isRTL ? 'justify-end' : 'justify-start'}`}>
                  {t.platforms.academy.features.map((feature, j) => (
                    <span key={j} className="text-sm px-4 py-2 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">{feature}</span>
                  ))}
                </div>
                <div className={`flex items-center gap-2 text-amber-500 font-bold ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span>{t.platforms.academy.cta}</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </a>

            {/* Signals Card */}
            <a href="https://infinitysignals.net/" target="_blank" rel="noopener noreferrer" className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-gray-950 border border-yellow-500/20 hover:border-yellow-500/50 transition-all duration-500">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500" />
              <div className="p-8">
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center text-4xl shadow-xl shadow-yellow-500/30 group-hover:scale-110 transition-transform duration-300">📡</div>
                  <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <h3 className="text-2xl font-black text-white group-hover:text-yellow-400 transition-colors">{t.platforms.signals.name}</h3>
                    <p className="text-yellow-500/80 font-semibold">{t.platforms.signals.tagline}</p>
                  </div>
                </div>
                <p className={`text-gray-400 leading-relaxed mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>{t.platforms.signals.description}</p>
                <div className={`flex flex-wrap gap-2 mb-6 ${isRTL ? 'justify-end' : 'justify-start'}`}>
                  {t.platforms.signals.features.map((feature, j) => (
                    <span key={j} className="text-sm px-4 py-2 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 font-medium">{feature}</span>
                  ))}
                </div>
                <div className={`flex items-center gap-2 text-yellow-500 font-bold ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span>{t.platforms.signals.cta}</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-[#030305]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-bold mb-6">✨ {t.features.title}</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">{t.features.subtitle}</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.features.items.map((feature, i) => (
              <div 
                key={i} 
                className={`group p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-950/50 border transition-all duration-500 ${
                  activeFeature === i ? 'border-amber-500/50 scale-[1.02]' : 'border-gray-800 hover:border-amber-500/30'
                }`}
              >
                <div className="text-5xl mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CEO Section */}
      <section className="py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className={`grid lg:grid-cols-2 gap-16 items-center ${isRTL ? '' : 'lg:grid-flow-col-dense'}`}>
            <div className={`relative flex justify-center ${isRTL ? '' : 'lg:col-start-2'}`}>
              <div className="relative w-80 h-80">
                <div className="absolute inset-0 rounded-full border-2 border-amber-500/20 animate-spin" style={{ animationDuration: '25s' }} />
                <div className="absolute inset-4 rounded-full border border-amber-500/10 animate-spin" style={{ animationDuration: '35s', animationDirection: 'reverse' }} />
                <div className="absolute inset-8 rounded-full border border-dashed border-amber-500/5 animate-spin" style={{ animationDuration: '45s' }} />
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/30 to-orange-500/20 rounded-full blur-3xl" />
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-amber-500/30 shadow-2xl shadow-amber-500/20">
                  <Image src="/images/team/king-arius.jpg" alt="King Arius - CEO" fill className="object-cover" priority />
                </div>
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-amber-500 via-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-xl shadow-amber-500/40 z-10">
                  <span className="text-3xl">👑</span>
                </div>
              </div>
            </div>

            <div className={isRTL ? 'text-right' : 'text-left'}>
              <span className="inline-block px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-bold mb-6">{t.team.ceo.badge}</span>
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">{t.team.ceo.title}</h2>
              <p className="text-xl text-amber-500 font-bold mb-6">{t.team.ceo.role}</p>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">{t.team.ceo.description}</p>
              <a href="https://infinityalgoacademy.net/portal/" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 text-black font-bold rounded-xl hover:shadow-xl hover:shadow-amber-500/30 transition-all hover:scale-105">{lang === 'ar' ? 'اكتشف المزيد' : 'Learn More'}</a>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 bg-[#030305]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-bold mb-6">{t.team.badge}</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">{t.team.title}</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">{t.team.subtitle}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.team.members.map((member, i) => (
              <div key={i} className="group p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 hover:border-amber-500/30 transition-all duration-300 text-center">
                <div className="relative w-28 h-28 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative w-full h-full rounded-full overflow-hidden border-3 border-amber-500/30 group-hover:border-amber-500/60 transition-colors">
                    <Image src={teamImages[i]} alt={member.name} fill className="object-cover" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">{member.name}</h3>
                <p className="text-amber-500 font-bold text-sm mb-4">{member.role}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Terms Section */}
      <section id="terms" className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-bold mb-6">{t.terms.badge}</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">{t.terms.title}</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">{t.terms.subtitle}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {Object.entries(t.terms.categories).map(([key, label]) => (
              <button key={key} onClick={() => setSelectedTermCategory(key)} className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${selectedTermCategory === key ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-lg shadow-amber-500/30' : 'bg-gray-900 text-gray-400 border border-gray-800 hover:border-amber-500/50 hover:text-white'}`}>{label}</button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredTerms.map((term, i) => (
              <div key={i} className="group p-6 rounded-xl bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 hover:border-amber-500/30 transition-all duration-300">
                <div className={`flex items-start justify-between gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <h4 className="text-lg font-bold text-amber-400">{isRTL ? term.termAr : term.term}</h4>
                  <span className="text-xs text-gray-600 bg-gray-800 px-3 py-1.5 rounded-lg shrink-0">{isRTL ? term.term : term.termAr}</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{isRTL ? term.definitionAr : term.definition}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-24 bg-[#030305]">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-gray-900 via-gray-950 to-black border border-amber-500/20 p-12 md:p-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-500/20 to-transparent blur-3xl rounded-full" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-orange-500/20 to-transparent blur-3xl rounded-full" />
            
            <div className="relative z-10">
              <div className="text-6xl mb-8">🚀</div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-2">{t.cta.title}</h2>
              <h3 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent mb-8">{t.cta.titleSpan}</h3>
              <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">{t.cta.subtitle}</p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://infinityalgoacademy.net/portal/" target="_blank" rel="noopener noreferrer" className="px-10 py-4 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 text-black font-bold text-lg rounded-xl hover:shadow-2xl hover:shadow-amber-500/40 transition-all hover:scale-105">{t.cta.button1}</a>
                <a href="https://infinityalgoacademy.net/item/ai-gold-scalp-pro-free-download/" target="_blank" rel="noopener noreferrer" className="px-10 py-4 border-2 border-amber-500/50 text-amber-400 font-bold text-lg rounded-xl hover:bg-amber-500/10 transition-all">{t.cta.button2}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className={isRTL ? 'text-right md:col-span-2' : 'text-left md:col-span-2'}>
              <div className={`flex items-center gap-3 mb-6 ${isRTL ? 'justify-end md:justify-start' : 'justify-start'}`}>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
                  <span className="text-2xl font-black text-black">∞</span>
                </div>
                <span className="text-xl font-bold"><span className="text-white">Infinity</span><span className="text-amber-500">Algo</span></span>
              </div>
              <p className="text-gray-500 leading-relaxed text-sm max-w-md">{t.footer.brand}</p>
            </div>
            
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h4 className="text-base font-bold text-white mb-4">{t.footer.platforms}</h4>
              <div className="space-y-3">
                <a href="https://infinityalgoacademy.net/portal/" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 text-gray-500 hover:text-amber-500 transition-colors text-sm ${isRTL ? 'flex-row-reverse justify-end' : ''}`}><span>🎓</span><span>{t.platforms.academy.name}</span></a>
                <a href="https://infinitysignals.net/" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 text-gray-500 hover:text-amber-500 transition-colors text-sm ${isRTL ? 'flex-row-reverse justify-end' : ''}`}><span>📡</span><span>{t.platforms.signals.name}</span></a>
              </div>
            </div>
            
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h4 className="text-base font-bold text-white mb-4">{t.footer.products}</h4>
              <div className="space-y-3">
                <a href="https://infinityalgoacademy.net/item/ai-gold-scalp-pro-free-download/" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 text-gray-500 hover:text-amber-500 transition-colors text-sm ${isRTL ? 'flex-row-reverse justify-end' : ''}`}><span>🥇</span><span>AI Gold Scalp Pro</span></a>
                <a href="https://infinityalgoacademy.net/portal/" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 text-gray-500 hover:text-amber-500 transition-colors text-sm ${isRTL ? 'flex-row-reverse justify-end' : ''}`}><span>📊</span><span>{lang === 'ar' ? 'جميع المنتجات' : 'All Products'}</span></a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800/50 pt-8 text-center">
            <p className="text-gray-600 text-sm">© {new Date().getFullYear()} Infinity Algo Network. {t.footer.copyright}</p>
          </div>
        </div>
      </footer>

      {/* Floating Buttons */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3">
        <a href="https://infinityalgoacademy.net/item/ai-gold-scalp-pro-free-download/" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-gradient-to-br from-amber-500 via-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl shadow-amber-500/30 hover:scale-110 transition-transform group" title="AI Gold Scalp Pro - FREE">
          <span className="text-2xl group-hover:scale-110 transition-transform">🥇</span>
        </a>
        <a href="https://infinitysignals.net/" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-xl shadow-yellow-500/30 hover:scale-110 transition-transform group" title="Infinity Signals">
          <span className="text-2xl group-hover:scale-110 transition-transform">📡</span>
        </a>
        <a href="https://infinityalgoacademy.net/portal/" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-xl shadow-amber-500/30 hover:scale-110 transition-transform group" title="Infinity Algo Academy">
          <span className="text-2xl group-hover:scale-110 transition-transform">🎓</span>
        </a>
      </div>

      {/* Global Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        * { font-family: 'Cairo', sans-serif; }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-spin {
          animation: spin 20s linear infinite;
        }
        
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #050508; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #f59e0b, #d97706); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: linear-gradient(180deg, #fbbf24, #f59e0b); }
        
        ::selection { background: rgba(245, 158, 11, 0.3); color: #fff; }
      `}} />
    </div>
  )
}
