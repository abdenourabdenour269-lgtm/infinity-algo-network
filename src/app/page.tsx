'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

// Language translations
const translations = {
  en: {
    nav: { home: 'Home', platforms: 'Platforms', team: 'Team', terms: 'Terms', contact: 'Contact' },
    hero: {
      badge: 'Most Advanced Trading Network',
      title: 'Infinity',
      titleSpan: 'Algo Network',
      subtitle: 'Two integrated platforms for excellence in financial markets',
      subtitleHighlight: 'Smart Trading • Advanced Analysis • Real-time Signals'
    },
    stats: { traders: 'Active Traders', accuracy: 'Accuracy Rate', tools: 'Trading Tools', support: 'Live Support' },
    platforms: {
      title: 'Our Platforms',
      subtitle: 'Choose the platform that suits your needs',
      academy: {
        name: 'Infinity Algo Academy',
        tagline: 'Professional Trading Education & Tools',
        description: 'Your gateway to professional trading. Access AI-powered EAs, non-repainting indicators, advanced strategies, and comprehensive training programs.',
        features: ['AI-Powered EAs', 'Non-Repainting Indicators', 'Smart Strategies', 'Expert Training']
      },
      signals: {
        name: 'Infinity Signals',
        tagline: 'AI-Powered Crypto Scanner',
        description: 'Real-time RSI monitoring and AI-powered crypto insights. ARIUS AI Sentinel Core with 99.9% accuracy.',
        features: ['Real-Time RSI Monitor', 'AI Crypto Scanner', 'Whale Feed Tracking', 'Instant Alerts']
      }
    },
    team: {
      badge: 'Elite Team',
      title: 'Our Professional Team',
      subtitle: 'Elite experts in trading, financial analysis, and technology',
      ceo: { badge: 'Visionary Leadership', title: 'King Arius', role: 'CEO & Founder', description: 'Pioneer in algorithmic trading and financial technology. With over 15 years of experience, King Arius founded Infinity Algo Network to empower traders of all levels.' },
      members: [
        { name: 'Katie', role: 'Chief Trading Analyst', description: 'Expert in technical analysis and market prediction.' },
        { name: 'Jeremy', role: 'Head of Algorithm Development', description: 'Master developer creating cutting-edge trading algorithms.' },
        { name: 'Ryan', role: 'Senior Strategy Advisor', description: 'Strategic mind behind successful trading systems.' },
        { name: 'Samiha', role: 'Client Relations Director', description: 'Dedicated to ensuring client success and satisfaction.' }
      ]
    },
    terms: { badge: 'Trading Dictionary', title: 'Trading Terms', subtitle: 'Your comprehensive guide to trading terms', categories: { all: 'All', basics: 'Basics', market: 'Market', risk: 'Risk', advanced: 'Advanced', crypto: 'Crypto', indicators: 'Indicators' } },
    cta: { title: 'Start Your Journey in', titleSpan: 'Professional Trading', subtitle: 'Join thousands of successful traders', button1: 'Join Academy', button2: 'Get Signals' },
    footer: { brand: 'The leading professional trading network.', platforms: 'Platforms', links: 'Quick Links', copyright: 'All rights reserved.' }
  },
  ar: {
    nav: { home: 'الرئيسية', platforms: 'المنصات', team: 'الفريق', terms: 'المصطلحات', contact: 'تواصل' },
    hero: {
      badge: 'شبكة التداول الأكثر تقدماً',
      title: 'إنفينيتي',
      titleSpan: 'ألغو نيتورك',
      subtitle: 'منصتان متكاملتان للتفوق في الأسواق المالية',
      subtitleHighlight: 'تداول ذكي • تحليل متقدم • إشارات لحظية'
    },
    stats: { traders: 'متداول نشط', accuracy: 'معدل الدقة', tools: 'أداة تداول', support: 'دعم حي' },
    platforms: {
      title: 'منصاتنا',
      subtitle: 'اختر المنصة المناسبة لاحتياجاتك',
      academy: {
        name: 'أكاديمية إنفينيتي ألغو',
        tagline: 'تعليم وأدوات تداول احترافية',
        description: 'بوابتك للتداول الاحترافي. الوصول إلى مستشارين خبراء بالذكاء الاصطناعي، مؤشرات موثوقة، استراتيجيات متقدمة.',
        features: ['مستشارون خبراء بالذكاء الاصطناعي', 'مؤشرات غير مرسومة', 'استراتيجيات ذكية', 'تدريب احترافي']
      },
      signals: {
        name: 'إنفينيتي سيغنالز',
        tagline: 'ماسح تشفير بالذكاء الاصطناعي',
        description: 'مراقبة RSI في الوقت الحقيقي ورؤى تشفير مدعومة بالذكاء الاصطناعي بدقة 99.9%.',
        features: ['مراقب RSI الحقيقي', 'ماسح تشفير بالذكاء الاصطناعي', 'تتبع حيتان السوق', 'تنبيهات فورية']
      }
    },
    team: {
      badge: 'فريق النخبة',
      title: 'فريقنا الاحترافي',
      subtitle: 'نخبة من الخبراء والمتخصصين في التداول والتحليل المالي',
      ceo: { badge: 'القيادة الرؤية', title: 'كينغ أريوس', role: 'الرئيس التنفيذي والمؤسس', description: 'رائد في عالم التداول الخوارزمي والتكنولوجيا المالية. بخبرة تمتد لأكثر من 15 عاماً.' },
      members: [
        { name: 'كاتي', role: 'كبير محللي التداول', description: 'خبيرة في التحليل الفني والتنبؤ بالسوق.' },
        { name: 'جريمي', role: 'رئيس قسم تطوير الخوارزميات', description: 'مطور رئيسي يبتكر خوارزميات تداول متطورة.' },
        { name: 'ريان', role: 'مستشار استراتيجي أول', description: 'العقل الاستراتيجي وراء أنظمة التداول الناجحة.' },
        { name: 'سميحة', role: 'مديرة علاقات العملاء', description: 'مكرسة لضمان نجاح العملاء ورضاهم.' }
      ]
    },
    terms: { badge: 'قاموس التداول', title: 'مصطلحات التداول', subtitle: 'دليلك الشامل لمصطلحات التداول', categories: { all: 'الكل', basics: 'الأساسيات', market: 'السوق', risk: 'المخاطر', advanced: 'متقدم', crypto: 'العملات الرقمية', indicators: 'المؤشرات' } },
    cta: { title: 'ابدأ رحلتك في', titleSpan: 'التداول الاحترافي', subtitle: 'انضم إلى الآلاف من المتداولين الناجحين', button1: 'انضم للأكاديمية', button2: 'احصل على الإشارات' },
    footer: { brand: 'شبكة التداول الاحترافية الرائدة.', platforms: 'المنصات', links: 'روابط سريعة', copyright: 'جميع الحقوق محفوظة.' }
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
  { term: 'Expert Advisor', termAr: 'المستشار الخبير', definition: 'Automated trading program', definitionAr: 'برنامج تداول آلي', category: 'advanced' },
  { term: 'RSI', termAr: 'مؤشر القوة النسبية', definition: 'Relative Strength Index indicator', definitionAr: 'مؤشر القوة النسبية', category: 'indicators' },
  { term: 'Cryptocurrency', termAr: 'العملات الرقمية', definition: 'Digital currency using cryptography', definitionAr: 'عملة رقمية تستخدم التشفير', category: 'crypto' },
  { term: 'Blockchain', termAr: 'البلوكتشين', definition: 'Distributed ledger technology', definitionAr: 'تقنية دفتر الأستاذ الموزع', category: 'crypto' },
  { term: 'DeFi', termAr: 'تمويل لامركزي', definition: 'Decentralized financial services', definitionAr: 'الخدمات المالية اللامركزية', category: 'crypto' },
  { term: 'Whale', termAr: 'حوت', definition: 'Large holder who can move markets', definitionAr: 'ممسك كبير يمكنه تحريك الأسواق', category: 'crypto' },
  { term: 'MACD', termAr: 'ماكد', definition: 'Moving Average Convergence Divergence', definitionAr: 'مؤشر تقارب وتباعد المتوسطات المتحركة', category: 'indicators' },
  { term: 'Signal', termAr: 'إشارة', definition: 'Trading recommendation based on analysis', definitionAr: 'توصية تداول مبنية على التحليل', category: 'advanced' },
]

export default function Home() {
  const [lang, setLang] = useState<'en' | 'ar'>('ar')
  const [activeSection, setActiveSection] = useState('')
  const [selectedTermCategory, setSelectedTermCategory] = useState('all')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  
  const t = translations[lang]
  const isRTL = lang === 'ar'

  useEffect(() => {
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
    <div 
      className={`min-h-screen bg-[#0a0a0f] text-white ${isRTL ? 'rtl' : 'ltr'}`}
      style={{ fontFamily: isRTL ? "'Tajawal', sans-serif" : "'Inter', sans-serif" }}
    >
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[150px]" />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrollY > 50 ? 'bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-amber-500/10' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <span className="text-2xl font-black text-black">∞</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">
                  <span className="text-white">Infinity</span>
                  <span className="text-amber-500">Algo</span>
                </h1>
                <p className="text-xs text-gray-500 font-medium">Network</p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-10">
              {Object.values(t.nav).map((item, i) => (
                <button
                  key={i}
                  onClick={() => scrollToSection(['hero', 'platforms', 'team', 'terms', 'contact'][i])}
                  className={`text-base font-semibold transition-colors ${
                    activeSection === ['hero', 'platforms', 'team', 'terms', 'contact'][i] 
                      ? 'text-amber-500' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center bg-gray-900 rounded-lg p-1">
                <button onClick={() => setLang('en')} className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${lang === 'en' ? 'bg-amber-500 text-black' : 'text-gray-400 hover:text-white'}`}>EN</button>
                <button onClick={() => setLang('ar')} className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${lang === 'ar' ? 'bg-amber-500 text-black' : 'text-gray-400 hover:text-white'}`}>عربي</button>
              </div>
              <a href="https://infinityalgoacademy.net/portal/" target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-amber-500/30 transition-all">{lang === 'ar' ? 'ابدأ الآن' : 'Get Started'}</a>
            </div>

            <button className="md:hidden text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0a0a0f]/98 backdrop-blur-xl border-b border-amber-500/10">
            <div className="px-6 py-6 space-y-4">
              <div className="flex items-center justify-center gap-2 bg-gray-900 rounded-lg p-1 mb-6">
                <button onClick={() => setLang('en')} className={`flex-1 py-3 rounded-md text-sm font-semibold ${lang === 'en' ? 'bg-amber-500 text-black' : 'text-gray-400'}`}>English</button>
                <button onClick={() => setLang('ar')} className={`flex-1 py-3 rounded-md text-sm font-semibold ${lang === 'ar' ? 'bg-amber-500 text-black' : 'text-gray-400'}`}>العربية</button>
              </div>
              {Object.values(t.nav).map((item, i) => (
                <button key={i} onClick={() => scrollToSection(['hero', 'platforms', 'team', 'terms', 'contact'][i])} className="block w-full text-center text-gray-300 hover:text-amber-500 py-3 font-semibold text-lg">{item}</button>
              ))}
              <a href="https://infinityalgoacademy.net/portal/" target="_blank" rel="noopener noreferrer" className="block w-full py-4 text-center bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold rounded-lg mt-4">{lang === 'ar' ? 'ابدأ الآن' : 'Get Started'}</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <Image src="/images/backgrounds/hero-bg.png" alt="Trading Background" fill className="object-cover opacity-20" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0a0a0f]/70 to-[#0a0a0f]" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-3 mb-10 px-6 py-3 rounded-full bg-amber-500/10 border border-amber-500/30">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
            </span>
            <span className="text-amber-500 text-sm font-semibold">{t.hero.badge}</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black mb-8 leading-tight">
            <span className="text-white">{t.hero.title}</span>
            <br />
            <span className="text-amber-500">{t.hero.titleSpan}</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed">{t.hero.subtitle}</p>
          <p className="text-lg text-amber-500 font-semibold mb-12">{t.hero.subtitleHighlight}</p>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
            <a href="https://infinityalgoacademy.net/portal/" target="_blank" rel="noopener noreferrer" className="group block p-8 rounded-2xl bg-[#12121a] border-2 border-amber-500/30 hover:border-amber-500/60 transition-all">
              <div className="flex items-center gap-5 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-3xl">🎓</div>
                <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-500 transition-colors">{t.platforms.academy.name}</h3>
                  <p className="text-amber-500/80 text-sm font-medium">{t.platforms.academy.tagline}</p>
                </div>
              </div>
              <p className={`text-gray-400 leading-relaxed mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>{t.platforms.academy.description}</p>
              <div className={`flex flex-wrap gap-2 ${isRTL ? 'justify-end' : 'justify-start'}`}>
                {t.platforms.academy.features.map((feature, j) => (
                  <span key={j} className="text-sm px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 font-medium">{feature}</span>
                ))}
              </div>
            </a>

            <a href="https://infinitysignals.net/" target="_blank" rel="noopener noreferrer" className="group block p-8 rounded-2xl bg-[#12121a] border-2 border-yellow-500/30 hover:border-yellow-500/60 transition-all">
              <div className="flex items-center gap-5 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center text-3xl">📡</div>
                <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <h3 className="text-xl font-bold text-white group-hover:text-yellow-500 transition-colors">{t.platforms.signals.name}</h3>
                  <p className="text-yellow-500/80 text-sm font-medium">{t.platforms.signals.tagline}</p>
                </div>
              </div>
              <p className={`text-gray-400 leading-relaxed mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>{t.platforms.signals.description}</p>
              <div className={`flex flex-wrap gap-2 ${isRTL ? 'justify-end' : 'justify-start'}`}>
                {t.platforms.signals.features.map((feature, j) => (
                  <span key={j} className="text-sm px-4 py-1.5 rounded-full bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 font-medium">{feature}</span>
                ))}
              </div>
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { value: '50K+', label: t.stats.traders },
              { value: '99.9%', label: t.stats.accuracy },
              { value: '100+', label: t.stats.tools },
              { value: '24/7', label: t.stats.support }
            ].map((stat, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#12121a] border border-gray-800">
                <div className="text-3xl font-black text-amber-500 mb-2">{stat.value}</div>
                <div className="text-gray-500 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CEO Section */}
      <section id="platforms" className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className={`grid lg:grid-cols-2 gap-16 items-center ${isRTL ? '' : 'lg:grid-flow-col-dense'}`}>
            <div className={`relative flex justify-center ${isRTL ? '' : 'lg:col-start-2'}`}>
              <div className="relative w-72 h-72 sm:w-80 sm:h-80">
                <div className="absolute inset-0 rounded-full border-2 border-amber-500/20 animate-spin" style={{ animationDuration: '20s' }} />
                <div className="absolute inset-4 rounded-full border border-amber-500/10 animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }} />
                <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-2xl" />
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-amber-500/30">
                  <Image src="/images/team/king-arius.jpg" alt="King Arius - CEO" fill className="object-cover" priority />
                </div>
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/30 z-10">
                  <span className="text-2xl">👑</span>
                </div>
              </div>
            </div>

            <div className={isRTL ? 'text-right' : 'text-left'}>
              <span className="inline-block px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-sm font-semibold mb-6">{t.team.ceo.badge}</span>
              <h2 className="text-4xl sm:text-5xl font-black text-amber-500 mb-4">{t.team.ceo.title}</h2>
              <p className="text-xl text-amber-500/80 font-semibold mb-6">{t.team.ceo.role}</p>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">{t.team.ceo.description}</p>
              <a href="https://infinityalgoacademy.net/portal/" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold rounded-xl hover:shadow-lg hover:shadow-amber-500/30 transition-all">{lang === 'ar' ? 'اكتشف المزيد' : 'Learn More'}</a>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 bg-[#08080d]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-sm font-semibold mb-6">{t.team.badge}</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">{t.team.title}</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">{t.team.subtitle}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.team.members.map((member, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#12121a] border border-gray-800 hover:border-amber-500/30 transition-all text-center">
                <div className="relative w-24 h-24 mx-auto mb-5">
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-amber-500/30">
                    <Image src={teamImages[i]} alt={member.name} fill className="object-cover" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{member.name}</h3>
                <p className="text-amber-500 font-semibold text-sm mb-3">{member.role}</p>
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
            <span className="inline-block px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-sm font-semibold mb-6">{t.terms.badge}</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">{t.terms.title}</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">{t.terms.subtitle}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {Object.entries(t.terms.categories).map(([key, label]) => (
              <button key={key} onClick={() => setSelectedTermCategory(key)} className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${selectedTermCategory === key ? 'bg-amber-500 text-black' : 'bg-[#12121a] text-gray-400 border border-gray-800 hover:border-amber-500/50 hover:text-white'}`}>{label}</button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredTerms.map((term, i) => (
              <div key={i} className="p-6 rounded-xl bg-[#12121a] border border-gray-800 hover:border-amber-500/30 transition-all">
                <div className={`flex items-start justify-between gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <h4 className="text-lg font-bold text-amber-500">{isRTL ? term.termAr : term.term}</h4>
                  <span className="text-xs text-gray-500 bg-gray-800 px-3 py-1.5 rounded-lg shrink-0">{isRTL ? term.term : term.termAr}</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{isRTL ? term.definitionAr : term.definition}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-24 bg-[#08080d]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="p-12 md:p-16 rounded-3xl bg-gradient-to-br from-[#12121a] to-[#0a0a0f] border border-amber-500/20">
            <div className="text-5xl mb-8">🚀</div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">{t.cta.title}</h2>
            <h3 className="text-3xl sm:text-4xl font-black text-amber-500 mb-8">{t.cta.titleSpan}</h3>
            <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">{t.cta.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://infinityalgoacademy.net/portal/" target="_blank" rel="noopener noreferrer" className="px-10 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold text-lg rounded-xl hover:shadow-lg hover:shadow-amber-500/30 transition-all">{t.cta.button1}</a>
              <a href="https://infinitysignals.net/" target="_blank" rel="noopener noreferrer" className="px-10 py-4 border-2 border-amber-500/50 text-amber-500 font-bold text-lg rounded-xl hover:bg-amber-500/10 transition-all">{t.cta.button2}</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <div className={`flex items-center gap-3 mb-4 ${isRTL ? 'justify-end' : 'justify-start'}`}>
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                  <span className="text-lg font-black text-black">∞</span>
                </div>
                <span className="text-lg font-bold"><span className="text-white">Infinity</span><span className="text-amber-500">Algo</span></span>
              </div>
              <p className="text-gray-500 leading-relaxed text-sm">{t.footer.brand}</p>
            </div>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h4 className="text-base font-bold text-white mb-4">{t.footer.platforms}</h4>
              <div className="space-y-3">
                <a href="https://infinityalgoacademy.net/portal/" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 text-gray-500 hover:text-amber-500 transition-colors text-sm ${isRTL ? 'flex-row-reverse justify-end' : ''}`}><span>🎓</span><span>{t.platforms.academy.name}</span></a>
                <a href="https://infinitysignals.net/" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 text-gray-500 hover:text-amber-500 transition-colors text-sm ${isRTL ? 'flex-row-reverse justify-end' : ''}`}><span>📡</span><span>{t.platforms.signals.name}</span></a>
              </div>
            </div>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h4 className="text-base font-bold text-white mb-4">{t.footer.links}</h4>
              <div className="space-y-3">
                {Object.values(t.nav).map((link, i) => (
                  <button key={i} onClick={() => scrollToSection(['hero', 'platforms', 'team', 'terms', 'contact'][i])} className="block text-gray-500 hover:text-amber-500 transition-colors text-sm">{link}</button>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-600 text-sm">© {new Date().getFullYear()} Infinity Algo Network. {t.footer.copyright}</p>
          </div>
        </div>
      </footer>

      {/* Floating Buttons */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3">
        <a href="https://infinitysignals.net/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20 hover:scale-110 transition-transform" title="Infinity Signals"><span className="text-xl">📡</span></a>
        <a href="https://infinityalgoacademy.net/portal/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20 hover:scale-110 transition-transform" title="Infinity Algo Academy"><span className="text-xl">🎓</span></a>
      </div>
    </div>
  )
}
