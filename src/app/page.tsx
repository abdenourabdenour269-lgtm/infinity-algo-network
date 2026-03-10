'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

// Language translations
const translations = {
  en: {
    nav: {
      home: 'Home',
      platforms: 'Platforms',
      team: 'Team',
      terms: 'Terms',
      contact: 'Contact'
    },
    hero: {
      badge: 'Most Advanced Trading Network',
      title: 'Infinity',
      titleSpan: 'Algo Network',
      subtitle: 'Two integrated platforms for excellence in financial markets',
      subtitleHighlight: 'Smart Trading • Advanced Analysis • Real-time Signals',
      cta1: 'Get Started',
      cta2: 'Explore Platforms'
    },
    stats: {
      traders: 'Active Traders',
      accuracy: 'Accuracy Rate',
      tools: 'Trading Tools',
      support: 'Live Support'
    },
    platforms: {
      title: 'Our Platforms',
      subtitle: 'Choose the platform that suits your needs',
      visit: 'Visit Platform',
      features: 'Key Features',
      academy: {
        name: 'Infinity Algo Academy',
        tagline: 'Professional Trading Education & Tools',
        description: 'Your gateway to professional trading. Access AI-powered EAs, non-repainting indicators, advanced strategies, and comprehensive training programs.',
        features: ['AI-Powered EAs', 'Non-Repainting Indicators', 'Smart Strategies', 'Expert Training', 'Multi-Platform Support', '24/7 Support']
      },
      signals: {
        name: 'Infinity Signals',
        tagline: 'AI-Powered Crypto Scanner',
        description: 'Real-time RSI monitoring and AI-powered crypto insights. ARIUS AI Sentinel Core catches every micro-pulse in the liquidity mesh with 99.9% accuracy.',
        features: ['Real-Time RSI Monitor', 'AI Crypto Scanner', 'Whale Feed Tracking', 'Instant Alerts', 'Multi-Chain Support', 'Sentinel Interface']
      }
    },
    team: {
      badge: 'Elite Team',
      title: 'Our Professional Team',
      subtitle: 'Elite experts in trading, financial analysis, and technology',
      ceo: {
        badge: 'Visionary Leadership',
        title: 'King Arius',
        role: 'CEO & Founder',
        description: 'Pioneer in algorithmic trading and financial technology. With over 15 years of experience, King Arius founded Infinity Algo Network to empower traders of all levels to achieve success in financial markets through advanced tools and professional training.'
      },
      members: [
        { name: 'Katie', role: 'Chief Trading Analyst', description: 'Expert in technical analysis and market prediction with proven track record.' },
        { name: 'Jeremy', role: 'Head of Algorithm Development', description: 'Master developer creating cutting-edge trading algorithms and AI systems.' },
        { name: 'Ryan', role: 'Senior Strategy Advisor', description: 'Strategic mind behind successful trading systems and risk management.' },
        { name: 'Samiha', role: 'Client Relations Director', description: 'Dedicated to ensuring client success and satisfaction with personalized support.' }
      ]
    },
    terms: {
      badge: 'Trading Dictionary',
      title: 'Trading Terms',
      subtitle: 'Your comprehensive guide to trading and digital commerce terms',
      categories: {
        all: 'All',
        basics: 'Basics',
        market: 'Market',
        risk: 'Risk Management',
        advanced: 'Advanced',
        crypto: 'Cryptocurrency',
        indicators: 'Indicators'
      }
    },
    cta: {
      title: 'Start Your Journey in',
      titleSpan: 'Professional Trading',
      subtitle: 'Join thousands of successful traders and get the best trading tools and professional training',
      button1: 'Join Academy',
      button2: 'Get Signals'
    },
    footer: {
      brand: 'The leading professional trading network. We provide the best trading, analysis, and training tools for traders of all levels.',
      platforms: 'Platforms',
      links: 'Quick Links',
      copyright: 'All rights reserved.'
    }
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      platforms: 'المنصات',
      team: 'الفريق',
      terms: 'المصطلحات',
      contact: 'تواصل'
    },
    hero: {
      badge: 'شبكة التداول الأكثر تقدماً',
      title: 'إنفينيتي',
      titleSpan: 'ألغو نيتورك',
      subtitle: 'منصتان متكاملتان للتفوق في الأسواق المالية',
      subtitleHighlight: 'تداول ذكي • تحليل متقدم • إشارات لحظية',
      cta1: 'ابدأ الآن',
      cta2: 'استكشف المنصات'
    },
    stats: {
      traders: 'متداول نشط',
      accuracy: 'معدل الدقة',
      tools: 'أداة تداول',
      support: 'دعم حي'
    },
    platforms: {
      title: 'منصاتنا',
      subtitle: 'اختر المنصة المناسبة لاحتياجاتك',
      visit: 'زيارة المنصة',
      features: 'المميزات الرئيسية',
      academy: {
        name: 'أكاديمية إنفينيتي ألغو',
        tagline: 'تعليم وأدوات تداول احترافية',
        description: 'بوابتك للتداول الاحترافي. الوصول إلى مستشارين خبراء بالذكاء الاصطناعي، مؤشرات موثوقة، استراتيجيات متقدمة، وبرامج تدريبية شاملة.',
        features: ['مستشارون خبراء بالذكاء الاصطناعي', 'مؤشرات غير مرسومة', 'استراتيجيات ذكية', 'تدريب احترافي', 'دعم منصات متعددة', 'دعم على مدار الساعة']
      },
      signals: {
        name: 'إنفينيتي سيغنالز',
        tagline: 'ماسح تشفير بالذكاء الاصطناعي',
        description: 'مراقبة RSI في الوقت الحقيقي ورؤى تشفير مدعومة بالذكاء الاصطناعي. نواة الحارس ARIUS AI تلتقط كل نبضة دقيقة في شبكة السيولة بدقة 99.9%.',
        features: ['مراقب RSI الحقيقي', 'ماسح تشفير بالذكاء الاصطناعي', 'تتبع حيتان السوق', 'تنبيهات فورية', 'دعم سلاسل متعددة', 'واجهة الحارس']
      }
    },
    team: {
      badge: 'فريق النخبة',
      title: 'فريقنا الاحترافي',
      subtitle: 'نخبة من الخبراء والمتخصصين في التداول والتحليل المالي والتكنولوجيا',
      ceo: {
        badge: 'القيادة الرؤية',
        title: 'كينغ أريوس',
        role: 'الرئيس التنفيذي والمؤسس',
        description: 'رائد في عالم التداول الخوارزمي والتكنولوجيا المالية. بخبرة تمتد لأكثر من 15 عاماً، أسس كينغ أريوس شبكة Infinity Algo لتمكين المتداولين من جميع المستويات من تحقيق النجاح في الأسواق المالية من خلال أدوات متقدمة وتدريب احترافي.'
      },
      members: [
        { name: 'كاتي', role: 'كبير محللي التداول', description: 'خبيرة في التحليل الفني والتنبؤ بالسوق مع سجل حافل بالنجاح.' },
        { name: 'جريمي', role: 'رئيس قسم تطوير الخوارزميات', description: 'مطور رئيسي يبتكر خوارزميات تداول متطورة وأنظمة ذكاء اصطناعي.' },
        { name: 'ريان', role: 'مستشار استراتيجي أول', description: 'العقل الاستراتيجي وراء أنظمة التداول الناجحة وإدارة المخاطر.' },
        { name: 'سميحة', role: 'مديرة علاقات العملاء', description: 'مكرسة لضمان نجاح العملاء ورضاهم من خلال الدعم الشخصي.' }
      ]
    },
    terms: {
      badge: 'قاموس التداول',
      title: 'مصطلحات التداول',
      subtitle: 'دليلك الشامل لمصطلحات التداول والتجارة الرقمية',
      categories: {
        all: 'الكل',
        basics: 'الأساسيات',
        market: 'السوق',
        risk: 'إدارة المخاطر',
        advanced: 'متقدم',
        crypto: 'العملات الرقمية',
        indicators: 'المؤشرات'
      }
    },
    cta: {
      title: 'ابدأ رحلتك في',
      titleSpan: 'التداول الاحترافي',
      subtitle: 'انضم إلى الآلاف من المتداولين الناجحين واحصل على أفضل أدوات التداول والتدريب الاحترافي',
      button1: 'انضم للأكاديمية',
      button2: 'احصل على الإشارات'
    },
    footer: {
      brand: 'شبكة التداول الاحترافية الرائدة. نقدم أفضل أدوات التداول والتحليل والتدريب للمتداولين من جميع المستويات.',
      platforms: 'المنصات',
      links: 'روابط سريعة',
      copyright: 'جميع الحقوق محفوظة.'
    }
  }
}

// Trading terms data
const tradingTerms = [
  { term: 'Forex', termAr: 'فوركس', definition: 'Foreign exchange market for trading currencies', definitionAr: 'سوق تبادل العملات الأجنبية', category: 'basics' },
  { term: 'Pip', termAr: 'نقطة', definition: 'Smallest price move in forex trading', definitionAr: 'أصغر حركة سعر في تداول الفوركس', category: 'basics' },
  { term: 'Leverage', termAr: 'الرافعة المالية', definition: 'Borrowed capital to increase trading position', definitionAr: 'رأس المال المقترض لزيادة مركز التداول', category: 'basics' },
  { term: 'Spread', termAr: 'السبريد', definition: 'Difference between bid and ask price', definitionAr: 'الفرق بين سعر الشراء والبيع', category: 'basics' },
  { term: 'Bull Market', termAr: 'سوق صاعد', definition: 'Market condition with rising prices', definitionAr: 'حالة السوق مع ارتفاع الأسعار', category: 'market' },
  { term: 'Bear Market', termAr: 'سوق هابط', definition: 'Market condition with falling prices', definitionAr: 'حالة السوق مع انخفاض الأسعار', category: 'market' },
  { term: 'Stop Loss', termAr: 'وقف الخسارة', definition: 'Order to limit potential losses', definitionAr: 'أمر لتحديد الخسائر المحتملة', category: 'risk' },
  { term: 'Take Profit', termAr: 'جني الأرباح', definition: 'Order to secure profits at target price', definitionAr: 'أمر لتأمين الأرباح عند السعر المستهدف', category: 'risk' },
  { term: 'EA (Expert Advisor)', termAr: 'المستشار الخبير', definition: 'Automated trading program for MetaTrader', definitionAr: 'برنامج تداول آلي لمنصة ميتاتريدر', category: 'advanced' },
  { term: 'RSI', termAr: 'مؤشر القوة النسبية', definition: 'Relative Strength Index indicator', definitionAr: 'مؤشر القوة النسبية', category: 'indicators' },
  { term: 'Cryptocurrency', termAr: 'العملات الرقمية', definition: 'Digital currency using cryptography', definitionAr: 'عملة رقمية تستخدم التشفير', category: 'crypto' },
  { term: 'Blockchain', termAr: 'البلوكتشين', definition: 'Distributed ledger technology', definitionAr: 'تقنية دفتر الأستاذ الموزع', category: 'crypto' },
  { term: 'DeFi', termAr: 'تمويل لامركزي', definition: 'Decentralized financial services', definitionAr: 'الخدمات المالية اللامركزية', category: 'crypto' },
  { term: 'Whale', termAr: 'حوت', definition: 'Large holder who can move markets', definitionAr: 'ممسك كبير يمكنه تحريك الأسواق', category: 'crypto' },
  { term: 'MACD', termAr: 'ماكد', definition: 'Moving Average Convergence Divergence', definitionAr: 'مؤشر تقارب وتباعد المتوسطات المتحركة', category: 'indicators' },
  { term: 'Signal', termAr: 'إشارة', definition: 'Trading recommendation based on analysis', definitionAr: 'توصية تداول مبنية على التحليل', category: 'advanced' },
]

const stats = [
  { value: '50K+', valueEn: '50K+' },
  { value: '99.9%', valueEn: '99.9%' },
  { value: '100+', valueEn: '100+' },
  { value: '24/7', valueEn: '24/7' }
]

export default function Home() {
  const [lang, setLang] = useState<'en' | 'ar'>('ar')
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [selectedTermCategory, setSelectedTermCategory] = useState('all')
  const [activePlatform, setActivePlatform] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  
  const t = translations[lang]
  const isRTL = lang === 'ar'

  useEffect(() => {
    setIsLoaded(true)
    
    const handleScroll = () => {
      setScrollY(window.scrollY)
      
      const sections = ['hero', 'platforms', 'team', 'terms', 'contact']
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
    <div className={`min-h-screen bg-[#030308] text-white overflow-x-hidden ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Gradient Orbs */}
        <div className="absolute top-[-30%] right-[-20%] w-[800px] h-[800px] bg-gradient-to-br from-amber-600/20 via-yellow-500/10 to-transparent rounded-full blur-[150px] animate-pulse-slow" />
        <div className="absolute bottom-[-30%] left-[-20%] w-[800px] h-[800px] bg-gradient-to-tr from-orange-600/15 via-amber-500/10 to-transparent rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[30%] left-[30%] w-[500px] h-[500px] bg-gradient-to-br from-yellow-500/10 to-transparent rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '4s' }} />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `
            linear-gradient(rgba(251, 191, 36, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(251, 191, 36, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }} />
        
        {/* Animated Lines */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-[20%] left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent animate-slide-right" />
          <div className="absolute top-[60%] left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/15 to-transparent animate-slide-right" style={{ animationDelay: '3s' }} />
          <div className="absolute top-[80%] left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/10 to-transparent animate-slide-right" style={{ animationDelay: '6s' }} />
        </div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrollY > 50 ? 'bg-[#030308]/95 backdrop-blur-2xl border-b border-amber-500/10' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 flex items-center justify-center shadow-2xl shadow-amber-500/30 group-hover:shadow-amber-500/50 transition-all duration-500 group-hover:scale-110">
                  <span className="text-2xl font-black text-black">∞</span>
                </div>
                <div className="absolute -inset-2 bg-gradient-to-br from-amber-500/30 to-orange-500/30 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight">
                  <span className="text-white">Infinity</span>
                  <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">Algo</span>
                </span>
                <span className={`text-[8px] text-amber-500/60 tracking-[0.3em] uppercase font-bold ${isRTL ? 'text-right' : 'text-left'}`}>Network</span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-10">
              {Object.values(t.nav).map((item, i) => (
                <button
                  key={i}
                  onClick={() => scrollToSection(['hero', 'platforms', 'team', 'terms', 'contact'][i])}
                  className={`relative text-sm font-bold transition-all duration-300 group ${
                    activeSection === ['hero', 'platforms', 'team', 'terms', 'contact'][i] 
                      ? 'text-amber-400' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </div>

            {/* Language Toggle & CTA */}
            <div className="hidden md:flex items-center gap-4">
              {/* Language Toggle */}
              <div className="flex items-center gap-1 p-1 bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl border border-gray-800">
                <button
                  onClick={() => setLang('en')}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
                    lang === 'en' 
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black shadow-lg shadow-amber-500/30' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLang('ar')}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
                    lang === 'ar' 
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black shadow-lg shadow-amber-500/30' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  عربي
                </button>
              </div>

              <a 
                href="https://infinityalgoacademy.net/portal/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-2.5 text-sm font-bold text-black bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 rounded-xl hover:shadow-xl hover:shadow-amber-500/40 transition-all duration-300 hover:scale-105"
              >
                {lang === 'ar' ? 'ابدأ الآن' : 'Get Started'}
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#030308]/98 backdrop-blur-2xl border-t border-amber-500/10">
            <div className="px-4 py-6 space-y-4">
              {/* Language Toggle Mobile */}
              <div className="flex items-center justify-center gap-2 p-1 bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl border border-gray-800 mb-6">
                <button
                  onClick={() => setLang('en')}
                  className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${
                    lang === 'en' 
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black' 
                      : 'text-gray-400'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLang('ar')}
                  className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${
                    lang === 'ar' 
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black' 
                      : 'text-gray-400'
                  }`}
                >
                  العربية
                </button>
              </div>

              {Object.values(t.nav).map((item, i) => (
                <button
                  key={i}
                  onClick={() => scrollToSection(['hero', 'platforms', 'team', 'terms', 'contact'][i])}
                  className="block w-full text-center text-gray-300 hover:text-amber-400 py-3 font-bold text-lg"
                >
                  {item}
                </button>
              ))}
              <a 
                href="https://infinityalgoacademy.net/portal/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full py-4 text-center text-sm font-bold text-black bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 rounded-xl mt-4"
              >
                {lang === 'ar' ? 'ابدأ الآن' : 'Get Started'}
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/backgrounds/hero-bg.png"
            alt="Trading Background"
            fill
            className="object-cover opacity-25"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030308] via-[#030308]/60 to-[#030308]" />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `linear-gradient(135deg, rgba(251, 191, 36, ${Math.random() * 0.5 + 0.2}), rgba(245, 158, 11, ${Math.random() * 0.3 + 0.1}))`,
                animation: `floatParticle ${10 + Math.random() * 20}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 10}s`
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className={`relative z-20 text-center px-4 max-w-6xl mx-auto ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-3 mb-10 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-orange-500/10 border border-amber-500/30 backdrop-blur-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-gradient-to-r from-amber-400 to-yellow-500"></span>
            </span>
            <span className="text-amber-400 text-sm font-bold tracking-wide">{t.hero.badge}</span>
          </div>
          
          {/* Main Title */}
          <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black mb-8 leading-none tracking-tight">
            <span className="text-white drop-shadow-2xl">{t.hero.title}</span>
            <br />
            <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-400 bg-clip-text text-transparent drop-shadow-[0_0_60px_rgba(251,191,36,0.5)]">
              {t.hero.titleSpan}
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed font-medium">
            {t.hero.subtitle}
          </p>
          
          <p className="text-lg sm:text-xl bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent font-bold mb-12">
            {t.hero.subtitleHighlight}
          </p>

          {/* Platform Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
            {/* Academy Card */}
            <a
              href="https://infinityalgoacademy.net/portal/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-8 rounded-3xl bg-gradient-to-br from-gray-900/90 to-gray-950/90 border-2 border-amber-500/20 hover:border-amber-400/60 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-500/20 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 opacity-50 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 flex items-center justify-center text-3xl shadow-xl shadow-amber-500/30 group-hover:scale-110 transition-transform duration-500">
                    🎓
                  </div>
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <h3 className="text-2xl font-black text-white group-hover:text-amber-400 transition-colors duration-300">{t.platforms.academy.name}</h3>
                    <p className="text-sm text-amber-500/80 font-medium">{t.platforms.academy.tagline}</p>
                  </div>
                </div>
                <p className={`text-gray-400 leading-relaxed mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>{t.platforms.academy.description}</p>
                <div className={`flex flex-wrap gap-2 ${isRTL ? 'justify-end' : 'justify-start'}`}>
                  {t.platforms.academy.features.slice(0, 3).map((feature, j) => (
                    <span key={j} className="text-xs px-4 py-2 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 font-medium">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </a>

            {/* Signals Card */}
            <a
              href="https://infinitysignals.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-8 rounded-3xl bg-gradient-to-br from-gray-900/90 to-gray-950/90 border-2 border-yellow-500/20 hover:border-yellow-400/60 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-yellow-500/20 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 opacity-50 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 flex items-center justify-center text-3xl shadow-xl shadow-yellow-500/30 group-hover:scale-110 transition-transform duration-500">
                    📡
                  </div>
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <h3 className="text-2xl font-black text-white group-hover:text-yellow-400 transition-colors duration-300">{t.platforms.signals.name}</h3>
                    <p className="text-sm text-yellow-500/80 font-medium">{t.platforms.signals.tagline}</p>
                  </div>
                </div>
                <p className={`text-gray-400 leading-relaxed mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>{t.platforms.signals.description}</p>
                <div className={`flex flex-wrap gap-2 ${isRTL ? 'justify-end' : 'justify-start'}`}>
                  {t.platforms.signals.features.slice(0, 3).map((feature, j) => (
                    <span key={j} className="text-xs px-4 py-2 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 font-medium">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, i) => (
              <div key={i} className="group p-6 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-950/80 border border-gray-800 hover:border-amber-500/40 transition-all duration-500 hover:scale-105">
                <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2">{stat.value}</div>
                <div className="text-gray-500 text-sm font-medium">{Object.values(t.stats)[i]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce">
          <span className="text-xs text-gray-500 font-medium">{lang === 'ar' ? 'اكتشف المزيد' : 'Explore More'}</span>
          <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* CEO Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className={`grid lg:grid-cols-2 gap-20 items-center ${isRTL ? '' : 'lg:grid-flow-col-dense'}`}>
            {/* Image */}
            <div className={`relative flex justify-center ${isRTL ? '' : 'lg:col-start-2'}`}>
              <div className="relative w-80 h-80 sm:w-96 sm:h-96">
                {/* Animated Rings */}
                <div className="absolute inset-0 rounded-full border-2 border-amber-500/30 animate-spin-slow" style={{ animationDuration: '25s' }} />
                <div className="absolute inset-4 rounded-full border border-amber-500/20 animate-spin-reverse" style={{ animationDuration: '35s' }} />
                <div className="absolute inset-8 rounded-full border border-dashed border-amber-500/15 animate-spin-slow" style={{ animationDuration: '45s' }} />
                <div className="absolute inset-12 rounded-full border border-amber-500/10 animate-spin-reverse" style={{ animationDuration: '55s' }} />
                
                {/* Glow Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/30 to-orange-500/20 rounded-full blur-3xl animate-pulse-slow" />
                
                {/* Image Container */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-amber-500/40 shadow-2xl shadow-amber-500/30">
                  <Image
                    src="/images/team/king-arius.jpg"
                    alt="King Arius - CEO"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                
                {/* Crown Badge */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-xl shadow-amber-500/50 z-10">
                  <span className="text-3xl">👑</span>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-8 -right-8 w-32 h-32 border-2 border-amber-500/20 rounded-full animate-float" />
                <div className="absolute -bottom-8 -left-8 w-24 h-24 border border-amber-500/15 rounded-full animate-float" style={{ animationDelay: '1.5s' }} />
              </div>
            </div>

            {/* Content */}
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <div className="inline-block mb-6 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/30">
                <span className="text-amber-400 text-sm font-bold">{t.team.ceo.badge}</span>
              </div>
              <h2 className="text-4xl sm:text-6xl font-black mb-6">
                <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-400 bg-clip-text text-transparent">{t.team.ceo.title}</span>
              </h2>
              <p className="text-2xl text-amber-400 mb-8 font-bold">{t.team.ceo.role}</p>
              <p className="text-gray-300 text-lg leading-relaxed mb-10">
                {t.team.ceo.description}
              </p>
              <div className={`flex gap-4 ${isRTL ? 'justify-end' : 'justify-start'}`}>
                <a 
                  href="https://infinityalgoacademy.net/portal/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 text-black font-bold hover:shadow-xl hover:shadow-amber-500/40 transition-all duration-300 hover:scale-105"
                >
                  {lang === 'ar' ? 'اكتشف المزيد' : 'Learn More'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block mb-6 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/30">
              <span className="text-amber-400 text-sm font-bold">{t.team.badge}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black mb-6">
              <span className="text-white">{t.team.title.split(' ')[0]}</span>{' '}
              <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-400 bg-clip-text text-transparent">{t.team.title.split(' ').slice(1).join(' ')}</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {t.team.subtitle}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.team.members.map((member, i) => (
              <div
                key={i}
                className="group relative"
              >
                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-gray-900/90 to-gray-950/90 border-2 border-gray-800 hover:border-amber-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-500/10 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative z-10 text-center">
                    <div className="relative w-28 h-28 mx-auto mb-6">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-500/30 to-orange-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative w-full h-full rounded-full overflow-hidden border-3 border-amber-500/30 group-hover:border-amber-500/60 transition-colors">
                        <Image
                          src={teamImages[i]}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-black text-white mb-2 group-hover:text-amber-400 transition-colors">{member.name}</h3>
                    <p className="text-amber-500 font-bold mb-4">{member.role}</p>
                    <p className="text-gray-500 text-sm leading-relaxed">{member.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trading Terms Section */}
      <section id="terms" className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <div className="inline-block mb-6 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/30">
              <span className="text-amber-400 text-sm font-bold">{t.terms.badge}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black mb-6">
              <span className="text-white">{t.terms.title.split(' ')[0]}</span>{' '}
              <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-400 bg-clip-text text-transparent">{t.terms.title.split(' ').slice(1).join(' ')}</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {t.terms.subtitle}
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {Object.entries(t.terms.categories).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSelectedTermCategory(key)}
                className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                  selectedTermCategory === key
                    ? 'bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 text-black shadow-xl shadow-amber-500/30'
                    : 'bg-gray-900/80 text-gray-400 border border-gray-800 hover:border-amber-500/50 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Terms Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredTerms.map((term, i) => (
              <div
                key={i}
                className="group p-6 rounded-2xl bg-gradient-to-br from-gray-900/90 to-gray-950/90 border-2 border-gray-800 hover:border-amber-500/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-amber-500/10"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <div className="relative z-10">
                  <div className={`flex items-start justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <h4 className="text-lg font-black text-amber-400">{isRTL ? term.termAr : term.term}</h4>
                    <span className="text-xs text-gray-500 bg-gray-800/80 px-3 py-1.5 rounded-lg font-medium">{isRTL ? term.term : term.termAr}</span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{isRTL ? term.definitionAr : term.definition}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-32 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-gray-900 to-gray-950 border-2 border-amber-500/20 p-16 md:p-20">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-amber-500/20 to-transparent blur-[100px] rounded-full transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-orange-500/20 to-transparent blur-[100px] rounded-full transform -translate-x-1/2 translate-y-1/2" />
            
            <div className="relative z-10">
              <div className="text-6xl mb-8">🚀</div>
              <h2 className="text-3xl sm:text-5xl font-black mb-8 leading-tight">
                {t.cta.title}
                <br />
                <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-400 bg-clip-text text-transparent">{t.cta.titleSpan}</span>
              </h2>
              <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
                {t.cta.subtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a 
                  href="https://infinityalgoacademy.net/portal/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-12 py-5 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 text-black font-bold text-lg hover:shadow-2xl hover:shadow-amber-500/40 transition-all duration-300 hover:scale-105"
                >
                  {t.cta.button1}
                </a>
                <a 
                  href="https://infinitysignals.net/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-12 py-5 rounded-2xl border-2 border-amber-500/50 text-amber-400 font-bold text-lg hover:bg-amber-500/10 transition-all duration-300"
                >
                  {t.cta.button2}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <div className={`flex items-center gap-4 mb-6 ${isRTL ? 'justify-end' : 'justify-start'}`}>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 flex items-center justify-center shadow-xl shadow-amber-500/30">
                  <span className="text-2xl font-black text-black">∞</span>
                </div>
                <span className="text-xl font-black">
                  <span className="text-white">Infinity</span>
                  <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">Algo</span>
                </span>
              </div>
              <p className="text-gray-500 leading-relaxed">
                {t.footer.brand}
              </p>
            </div>

            {/* Platforms */}
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h4 className="text-lg font-bold mb-6 text-white">{t.footer.platforms}</h4>
              <div className="space-y-4">
                <a
                  href="https://infinityalgoacademy.net/portal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 text-gray-400 hover:text-amber-400 transition-colors ${isRTL ? 'flex-row-reverse justify-end' : ''}`}
                >
                  <span className="text-xl">🎓</span>
                  <span>{t.platforms.academy.name}</span>
                </a>
                <a
                  href="https://infinitysignals.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 text-gray-400 hover:text-amber-400 transition-colors ${isRTL ? 'flex-row-reverse justify-end' : ''}`}
                >
                  <span className="text-xl">📡</span>
                  <span>{t.platforms.signals.name}</span>
                </a>
              </div>
            </div>

            {/* Links */}
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h4 className="text-lg font-bold mb-6 text-white">{t.footer.links}</h4>
              <div className="space-y-4">
                {Object.values(t.nav).map((link, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToSection(['hero', 'platforms', 'team', 'terms', 'contact'][i])}
                    className="block text-gray-400 hover:text-amber-400 transition-colors"
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800/50 pt-8 text-center">
            <p className="text-gray-600">
              © {new Date().getFullYear()} Infinity Algo Network. {t.footer.copyright}
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className={`fixed bottom-6 z-50 flex flex-col gap-4 ${isRTL ? 'left-6' : 'left-6'}`}>
        <a
          href="https://infinitysignals.net/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl shadow-amber-500/30 hover:scale-110 transition-all duration-300 group"
          title="Infinity Signals"
        >
          <span className="text-2xl group-hover:scale-110 transition-transform">📡</span>
        </a>
        <a
          href="https://infinityalgoacademy.net/portal/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl shadow-amber-500/30 hover:scale-110 transition-all duration-300 group"
          title="Infinity Algo Academy"
        >
          <span className="text-2xl group-hover:scale-110 transition-transform">🎓</span>
        </a>
      </div>

      {/* Styles */}
      <style jsx global>{`
        @keyframes floatParticle {
          0%, 100% { 
            transform: translateY(0) translateX(0); 
            opacity: 0.3;
          }
          25% { 
            transform: translateY(-30px) translateX(10px); 
            opacity: 0.6;
          }
          50% { 
            transform: translateY(-50px) translateX(-10px); 
            opacity: 0.4;
          }
          75% { 
            transform: translateY(-20px) translateX(5px); 
            opacity: 0.5;
          }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
        
        @keyframes slide-right {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 25s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 25s linear infinite;
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-slide-right {
          animation: slide-right 20s linear infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        
        /* RTL Support */
        [dir="rtl"] {
          text-align: right;
        }
        
        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: #030308;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #f59e0b, #d97706);
          border-radius: 5px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #fbbf24, #f59e0b);
        }
      `}</style>
    </div>
  )
}
