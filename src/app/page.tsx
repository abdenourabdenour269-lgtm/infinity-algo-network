'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

// Types
interface TeamMember {
  name: string
  nameAr: string
  role: string
  roleAr: string
  image: string
  description: string
  descriptionAr: string
}

interface Term {
  term: string
  termAr: string
  definition: string
  definitionAr: string
  category: string
}

interface Platform {
  id: string
  name: string
  nameAr: string
  url: string
  tagline: string
  taglineAr: string
  description: string
  descriptionAr: string
  features: string[]
  featuresAr: string[]
  color: string
  icon: string
}

// Data
const platforms: Platform[] = [
  {
    id: 'academy',
    name: 'Infinity Algo Academy',
    nameAr: 'أكاديمية إنفينيتي ألغو',
    url: 'https://infinityalgoacademy.net/portal/',
    tagline: 'Professional Trading Education & Tools',
    taglineAr: 'تعليم وأدوات تداول احترافية',
    description: 'Your gateway to professional trading. Access AI-powered EAs, non-repainting indicators, advanced strategies, and comprehensive training programs.',
    descriptionAr: 'بوابتك للتداول الاحترافي. الوصول إلى مستشارين خبراء بالذكاء الاصطناعي، مؤشرات موثوقة، استراتيجيات متقدمة، وبرامج تدريبية شاملة.',
    features: ['AI-Powered EAs', 'Non-Repainting Indicators', 'Smart Strategies', 'Expert Training', 'Multi-Platform Support', '24/7 Support'],
    featuresAr: ['مستشارون خبراء بالذكاء الاصطناعي', 'مؤشرات غير مرسومة', 'استراتيجيات ذكية', 'تدريب احترافي', 'دعم منصات متعددة', 'دعم على مدار الساعة'],
    color: 'from-amber-500 to-orange-500',
    icon: '🎓'
  },
  {
    id: 'signals',
    name: 'Infinity Signals',
    nameAr: 'إنفينيتي سيغنالز',
    url: 'https://infinitysignals.net/',
    tagline: 'AI-Powered Crypto Scanner',
    taglineAr: 'ماسح تشفير بالذكاء الاصطناعي',
    description: 'Real-time RSI monitoring and AI-powered crypto insights. ARIUS AI Sentinel Core catches every micro-pulse in the liquidity mesh with 99.9% accuracy.',
    descriptionAr: 'مراقبة RSI في الوقت الحقيقي ورؤى تشفير مدعومة بالذكاء الاصطناعي. نواة الحارس ARIUS AI تلتقط كل نبضة دقيقة في شبكة السيولة بدقة 99.9%.',
    features: ['Real-Time RSI Monitor', 'AI Crypto Scanner', 'Whale Feed Tracking', 'Instant Alerts', 'Multi-Chain Support', 'Sentinel Interface'],
    featuresAr: ['مراقب RSI الحقيقي', 'ماسح تشفير بالذكاء الاصطناعي', 'تتبع حيتان السوق', 'تنبيهات فورية', 'دعم سلاسل متعددة', 'واجهة الحارس'],
    color: 'from-yellow-400 to-amber-500',
    icon: '📡'
  }
]

const teamMembers: TeamMember[] = [
  {
    name: 'King Arius',
    nameAr: 'كينغ أريوس',
    role: 'CEO & Founder',
    roleAr: 'الرئيس التنفيذي والمؤسس',
    image: '/images/team/king-arius.jpg',
    description: 'Visionary leader with 15+ years in algorithmic trading and financial technology.',
    descriptionAr: 'قائد رؤيوي مع أكثر من 15 عامًا في التداول الخوارزمي والتكنولوجيا المالية.'
  },
  {
    name: 'Katie',
    nameAr: 'كاتي',
    role: 'Chief Trading Analyst',
    roleAr: 'كبير محللي التداول',
    image: '/images/team/katie.png',
    description: 'Expert in technical analysis and market prediction with proven track record.',
    descriptionAr: 'خبيرة في التحليل الفني والتنبؤ بالسوق مع سجل حافل بالنجاح.'
  },
  {
    name: 'Jeremy',
    nameAr: 'جريمي',
    role: 'Head of Algorithm Development',
    roleAr: 'رئيس قسم تطوير الخوارزميات',
    image: '/images/team/jeremy.png',
    description: 'Master developer creating cutting-edge trading algorithms and AI systems.',
    descriptionAr: 'مطور رئيسي يبتكر خوارزميات تداول متطورة وأنظمة ذكاء اصطناعي.'
  },
  {
    name: 'Ryan',
    nameAr: 'ريان',
    role: 'Senior Strategy Advisor',
    roleAr: 'مستشار استراتيجي أول',
    image: '/images/team/ryan.png',
    description: 'Strategic mind behind successful trading systems and risk management.',
    descriptionAr: 'العقل الاستراتيجي وراء أنظمة التداول الناجحة وإدارة المخاطر.'
  },
  {
    name: 'Samiha',
    nameAr: 'سميحة',
    role: 'Client Relations Director',
    roleAr: 'مديرة علاقات العملاء',
    image: '/images/team/samiha.png',
    description: 'Dedicated to ensuring client success and satisfaction with personalized support.',
    descriptionAr: 'مكرسة لضمان نجاح العملاء ورضاهم من خلال الدعم الشخصي.'
  }
]

const tradingTerms: Term[] = [
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
  { value: '50K+', label: 'Active Traders', labelAr: 'متداول نشط' },
  { value: '99.9%', label: 'Accuracy Rate', labelAr: 'معدل الدقة' },
  { value: '100+', label: 'Trading Tools', labelAr: 'أداة تداول' },
  { value: '24/7', label: 'Live Support', labelAr: 'دعم حي' }
]

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [selectedTermCategory, setSelectedTermCategory] = useState('all')
  const [activePlatform, setActivePlatform] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  
  const heroRef = useRef<HTMLDivElement>(null)

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
    : tradingTerms.filter(t => t.category === selectedTermCategory)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-[#020205] text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Gradient Orbs */}
        <div 
          className="absolute top-[-20%] right-[-10%] w-[600px] md:w-[1000px] h-[600px] md:h-[1000px] bg-amber-500/10 blur-[100px] md:blur-[150px] rounded-full animate-pulse opacity-30"
        />
        <div 
          className="absolute bottom-[-20%] left-[-10%] w-[600px] md:w-[1000px] h-[600px] md:h-[1000px] bg-emerald-500/10 blur-[100px] md:blur-[150px] rounded-full animate-pulse opacity-30"
          style={{ animationDelay: '3s' }}
        />
        <div 
          className="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-yellow-500/5 blur-[80px] rounded-full animate-pulse opacity-20"
          style={{ animationDelay: '1.5s' }}
        />
        
        {/* Scan Line */}
        <div 
          className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent animate-scan-line z-10"
          style={{ top: `${(scrollY * 0.1) % 100}%` }}
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `
            linear-gradient(rgba(245, 158, 11, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245, 158, 11, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrollY > 50 ? 'bg-[#020205]/90 backdrop-blur-xl border-b border-amber-500/10' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:shadow-amber-500/50 transition-all duration-300 group-hover:scale-110">
                  <span className="text-2xl font-black text-black">∞</span>
                </div>
                <div className="absolute -inset-1 bg-amber-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight">
                  <span className="text-white">Infinity</span>
                  <span className="text-amber-500">Algo</span>
                </span>
                <span className="text-[8px] text-gray-500 tracking-[0.3em] uppercase">Network</span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {['الرئيسية', 'المنصات', 'الفريق', 'المصطلحات', 'تواصل'].map((item, i) => (
                <button
                  key={i}
                  onClick={() => scrollToSection(['hero', 'platforms', 'team', 'terms', 'contact'][i])}
                  className={`text-sm font-medium transition-all hover:text-amber-500 relative group ${
                    activeSection === ['hero', 'platforms', 'team', 'terms', 'contact'][i] 
                      ? 'text-amber-500' 
                      : 'text-gray-400'
                  }`}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all group-hover:w-full" />
                </button>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <a 
                href="https://infinitysignals.net/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm font-bold text-amber-500 border border-amber-500/30 rounded-lg hover:bg-amber-500/10 transition-all"
              >
                Signals
              </a>
              <a 
                href="https://infinityalgoacademy.net/portal/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-2 text-sm font-bold text-black bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg hover:shadow-lg hover:shadow-amber-500/30 transition-all hover:scale-105"
              >
                Academy
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
          <div className="md:hidden bg-[#020205]/95 backdrop-blur-xl border-t border-amber-500/10">
            <div className="px-4 py-6 space-y-4">
              {['الرئيسية', 'المنصات', 'الفريق', 'المصطلحات', 'تواصل'].map((item, i) => (
                <button
                  key={i}
                  onClick={() => scrollToSection(['hero', 'platforms', 'team', 'terms', 'contact'][i])}
                  className="block w-full text-right text-gray-300 hover:text-amber-500 py-2 font-medium"
                >
                  {item}
                </button>
              ))}
              <div className="flex gap-3 pt-4 border-t border-gray-800">
                <a 
                  href="https://infinitysignals.net/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 py-3 text-center text-sm font-bold text-amber-500 border border-amber-500/30 rounded-lg"
                >
                  Signals
                </a>
                <a 
                  href="https://infinityalgoacademy.net/portal/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 py-3 text-center text-sm font-bold text-black bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg"
                >
                  Academy
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/backgrounds/hero-bg.png"
            alt="Trading Background"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020205] via-[#020205]/50 to-[#020205]" />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-amber-500 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.1,
                animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className={`relative z-20 text-center px-4 max-w-6xl mx-auto ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-3 mb-8 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 backdrop-blur-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
            <span className="text-amber-500 text-sm font-bold tracking-wide">شبكة التداول الأكثر تقدماً</span>
          </div>
          
          {/* Main Title */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black mb-6 leading-tight tracking-tight">
            <span className="text-white">Infinity</span>
            <br />
            <span className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(245,158,11,0.3)]">
              Algo Network
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
            منصتان متكاملتان للتفوق في الأسواق المالية
            <br />
            <span className="text-amber-500 font-bold">تداول ذكي • تحليل متقدم • إشارات لحظية</span>
          </p>

          {/* Platform Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
            {platforms.map((platform, i) => (
              <a
                key={platform.id}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-6 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 hover:border-amber-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-500/10 text-right"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform`}>
                      {platform.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-amber-500 transition-colors">{platform.nameAr}</h3>
                      <p className="text-sm text-gray-500">{platform.taglineAr}</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{platform.descriptionAr}</p>
                  <div className="flex flex-wrap gap-2">
                    {platform.featuresAr.slice(0, 3).map((feature, j) => (
                      <span key={j} className="text-xs px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-bold">زيارة المنصة</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </a>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((stat, i) => (
              <div key={i} className="p-6 rounded-xl bg-gradient-to-br from-gray-900/50 to-gray-900/30 border border-gray-800 hover:border-amber-500/30 transition-all">
                <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent mb-1">{stat.value}</div>
                <div className="text-gray-500 text-sm">{stat.labelAr}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-gray-500">اكتشف المزيد</span>
          <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Platforms Showcase Section */}
      <section id="platforms" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20">
              <span className="text-amber-500 text-sm font-bold">منصات متكاملة</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">المنصتان</span>
              <span className="text-white"> الرائدتان</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              اختر المنصة المناسبة لاحتياجاتك - التعليم والتدريب أو المراقبة والإشارات اللحظية
            </p>
          </div>

          {/* Platform Tabs */}
          <div className="flex justify-center gap-4 mb-12">
            {platforms.map((platform, i) => (
              <button
                key={platform.id}
                onClick={() => setActivePlatform(i)}
                className={`px-8 py-4 rounded-xl font-bold transition-all ${
                  activePlatform === i
                    ? `bg-gradient-to-r ${platform.color} text-black shadow-lg shadow-amber-500/30`
                    : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'
                }`}
              >
                <span className="text-lg">{platform.icon}</span>
                <span className="ml-2">{platform.nameAr}</span>
              </button>
            ))}
          </div>

          {/* Active Platform Details */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 p-8 md:p-12">
            <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${platforms[activePlatform].color} opacity-10 blur-3xl rounded-full transform translate-x-1/2 -translate-y-1/2`} />
            
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div className="text-right">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${platforms[activePlatform].color} flex items-center justify-center text-4xl shadow-lg`}>
                    {platforms[activePlatform].icon}
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-white">{platforms[activePlatform].nameAr}</h3>
                    <p className="text-amber-500">{platforms[activePlatform].taglineAr}</p>
                  </div>
                </div>
                
                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                  {platforms[activePlatform].descriptionAr}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  {platforms[activePlatform].featuresAr.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-right">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <a
                  href={platforms[activePlatform].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r ${platforms[activePlatform].color} text-black font-bold hover:shadow-lg hover:shadow-amber-500/30 transition-all hover:scale-105`}
                >
                  <span>ابدأ الآن</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>

              {/* Platform Preview */}
              <div className="relative">
                <div className="aspect-video rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">{platforms[activePlatform].icon}</div>
                      <div className="text-2xl font-bold text-white mb-2">{platforms[activePlatform].name}</div>
                      <div className="text-gray-500">{platforms[activePlatform].tagline}</div>
                    </div>
                  </div>
                  {/* Animated Elements */}
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs text-green-500">Live</span>
                  </div>
                </div>
                <div className={`absolute -inset-4 bg-gradient-to-r ${platforms[activePlatform].color} opacity-20 blur-2xl rounded-3xl -z-10`} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CEO Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative flex justify-center">
              <div className="relative w-80 h-80">
                {/* Animated Rings */}
                <div className="absolute inset-0 rounded-full border-2 border-amber-500/20 animate-spin-slow" style={{ animationDuration: '20s' }} />
                <div className="absolute inset-4 rounded-full border border-amber-500/10 animate-spin-reverse" style={{ animationDuration: '30s' }} />
                <div className="absolute inset-8 rounded-full border border-dashed border-amber-500/10 animate-spin-slow" style={{ animationDuration: '40s' }} />
                
                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent rounded-full blur-3xl" />
                
                {/* Image Container */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-amber-500/30 shadow-2xl shadow-amber-500/20">
                  <Image
                    src="/images/team/king-arius.jpg"
                    alt="King Arius - CEO"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-amber-500/20 rounded-full animate-float" style={{ animationDelay: '0s' }} />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 border-2 border-amber-500/10 rounded-full animate-float" style={{ animationDelay: '1s' }} />
              </div>
            </div>

            {/* Content */}
            <div className="text-right">
              <div className="inline-block mb-4 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20">
                <span className="text-amber-500 text-sm font-bold">القيادة الرؤية</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black mb-6">
                <span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">كينغ أريوس</span>
              </h2>
              <p className="text-xl text-amber-500 mb-6">الرئيس التنفيذي والمؤسس</p>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                رائد في عالم التداول الخوارزمي والتكنولوجيا المالية. بخبرة تمتد لأكثر من 15 عاماً، 
                أسس كينغ أريوس شبكة Infinity Algo لتمكين المتداولين من جميع المستويات من تحقيق 
                النجاح في الأسواق المالية من خلال أدوات متقدمة وتدريب احترافي.
              </p>
              <div className="flex gap-4 justify-end">
                <a 
                  href="https://infinityalgoacademy.net/portal/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl border border-amber-500/30 text-amber-500 font-bold hover:bg-amber-500/10 transition-all"
                >
                  اكتشف المزيد
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20">
              <span className="text-amber-500 text-sm font-bold">فريق النخبة</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black mb-4">
              <span className="text-white">فريقنا</span>
              <span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent"> الاحترافي</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              نخبة من الخبراء والمتخصصين في التداول والتحليل المالي والتكنولوجيا
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {teamMembers.map((member, i) => (
              <div
                key={i}
                className={`group relative ${i === 0 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
              >
                <div className={`relative p-6 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-900/40 border transition-all duration-500 hover:scale-105 ${
                  i === 0 ? 'border-amber-500/50 shadow-lg shadow-amber-500/10' : 'border-gray-800 hover:border-amber-500/30'
                }`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                  
                  <div className="relative z-10 text-center">
                    <div className="relative w-24 h-24 mx-auto mb-4">
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 opacity-0 group-hover:opacity-20 transition-opacity ${i === 0 ? 'opacity-20' : ''}`} />
                      <div className={`relative w-full h-full rounded-full overflow-hidden border-2 ${
                        i === 0 ? 'border-amber-500' : 'border-amber-500/30'
                      }`}>
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {i === 0 && (
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-sm">👑</span>
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-bold text-white mb-1">{member.nameAr}</h3>
                    <p className="text-amber-500 text-sm mb-3">{member.roleAr}</p>
                    <p className="text-gray-500 text-xs leading-relaxed">{member.descriptionAr}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trading Terms Section */}
      <section id="terms" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20">
              <span className="text-amber-500 text-sm font-bold">قاموس التداول</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black mb-4">
              <span className="text-white">مصطلحات</span>
              <span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent"> التداول</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              دليلك الشامل لمصطلحات التداول والتجارة الرقمية
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {[
              { id: 'all', label: 'الكل' },
              { id: 'basics', label: 'الأساسيات' },
              { id: 'market', label: 'السوق' },
              { id: 'risk', label: 'إدارة المخاطر' },
              { id: 'advanced', label: 'متقدم' },
              { id: 'crypto', label: 'العملات الرقمية' },
              { id: 'indicators', label: 'المؤشرات' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedTermCategory(cat.id)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                  selectedTermCategory === cat.id
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-lg shadow-amber-500/30'
                    : 'bg-gray-900 text-gray-400 border border-gray-800 hover:border-amber-500/50 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Terms Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredTerms.map((term, i) => (
              <div
                key={i}
                className="group p-5 rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 hover:border-amber-500/30 transition-all duration-300 hover:scale-[1.02]"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-lg font-bold text-amber-500">{term.termAr}</h4>
                    <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">{term.term}</span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{term.definitionAr}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-24 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 p-12 md:p-16">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-500/20 to-transparent blur-3xl rounded-full transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-orange-500/20 to-transparent blur-3xl rounded-full transform -translate-x-1/2 translate-y-1/2" />
            
            <div className="relative z-10">
              <div className="text-5xl mb-6">🚀</div>
              <h2 className="text-3xl sm:text-4xl font-black mb-6">
                ابدأ رحلتك في
                <span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent"> التداول الاحترافي</span>
              </h2>
              <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
                انضم إلى الآلاف من المتداولين الناجحين واحصل على أفضل أدوات التداول والتدريب الاحترافي
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://infinityalgoacademy.net/portal/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-10 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-lg hover:shadow-xl hover:shadow-amber-500/30 transition-all hover:scale-105"
                >
                  انضم للأكاديمية
                </a>
                <a 
                  href="https://infinitysignals.net/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-10 py-4 rounded-xl border-2 border-amber-500/50 text-amber-500 font-bold text-lg hover:bg-amber-500/10 transition-all"
                >
                  احصل على الإشارات
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
                  <span className="text-xl font-black text-black">∞</span>
                </div>
                <span className="text-xl font-bold">
                  <span className="text-white">Infinity</span>
                  <span className="text-amber-500">Algo</span>
                </span>
              </div>
              <p className="text-gray-500 leading-relaxed">
                شبكة التداول الاحترافية الرائدة. نقدم أفضل أدوات التداول والتحليل والتدريب للمتداولين من جميع المستويات.
              </p>
            </div>

            {/* Platforms */}
            <div>
              <h4 className="text-lg font-bold mb-4">المنصات</h4>
              <div className="space-y-3">
                {platforms.map((platform) => (
                  <a
                    key={platform.id}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-400 hover:text-amber-500 transition-colors"
                  >
                    <span className="text-xl">{platform.icon}</span>
                    <span>{platform.nameAr}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-lg font-bold mb-4">روابط سريعة</h4>
              <div className="space-y-3">
                {['الرئيسية', 'المنصات', 'الفريق', 'المصطلحات'].map((link, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToSection(['hero', 'platforms', 'team', 'terms'][i])}
                    className="block text-gray-400 hover:text-amber-500 transition-colors"
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-600">
              © {new Date().getFullYear()} Infinity Algo Network. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3">
        <a
          href="https://infinitysignals.net/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/30 hover:scale-110 transition-all animate-pulse"
          title="Infinity Signals"
        >
          <span className="text-xl">📡</span>
        </a>
        <a
          href="https://infinityalgoacademy.net/portal/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/30 hover:scale-110 transition-all"
          title="Infinity Algo Academy"
        >
          <span className="text-xl">🎓</span>
        </a>
      </div>

      {/* Styles */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes scan-line {
          0% { top: 0%; }
          100% { top: 100%; }
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 20s linear infinite;
        }
        
        .animate-scan-line {
          animation: scan-line 8s linear infinite;
        }
      `}</style>
    </div>
  )
}
