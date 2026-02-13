'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion';
import { Search, MapPin, Briefcase, TrendingUp, ChevronDown, ArrowRight, CheckCircle, FileText, Rocket } from 'lucide-react';
import ListingCard from '@/components/ListingCard';

// Mock ilanlar
const mockListings = [
  {
    id: 1,
    title: 'Part-time Garson Aranıyor',
    description: 'Kadıköy merkezde şık bir restoranda part-time garson aranmaktadır. Deneyimli adaylar tercih edilir. Esnek çalışma saatleri mevcuttur.',
    city: 'İstanbul',
    phone: '05XX XXX XX XX',
    createdAt: '2026-02-13T10:00:00Z',
  },
  {
    id: 2,
    title: 'Grafik Tasarımcı - Freelance',
    description: 'Reklam ajansımız için freelance grafik tasarımcı arıyoruz. Adobe Creative Suite bilgisi gereklidir. Portföy ile başvurunuz beklenmektedir.',
    city: 'Ankara',
    phone: '05XX XXX XX XX',
    createdAt: '2026-02-12T14:30:00Z',
  },
  {
    id: 3,
    title: 'Depo Çalışanı',
    description: 'E-ticaret firmamızın deposunda çalışacak elemanlar aranmaktadır. Fiziksel dayanıklılık ve düzenli çalışma alışkanlığı gereklidir.',
    city: 'İzmir',
    phone: '05XX XXX XX XX',
    createdAt: '2026-02-12T09:15:00Z',
  },
  {
    id: 4,
    title: 'Sosyal Medya Uzmanı',
    description: 'Büyüyen markamız için sosyal medya kampanyalarını yönetecek, içerik üretecek sosyal medya uzmanı aranmaktadır.',
    city: 'İstanbul',
    phone: '05XX XXX XX XX',
    createdAt: '2026-02-11T16:00:00Z',
  },
  {
    id: 5,
    title: 'Kurye Elemanı',
    description: 'Şehir içi teslimat firmasında motosikletli kurye aranmaktadır. B sınıfı ehliyet sahibi olmalıdır. Yüksek kazanç imkanı.',
    city: 'Bursa',
    phone: '05XX XXX XX XX',
    createdAt: '2026-02-11T11:45:00Z',
  },
  {
    id: 6,
    title: 'Yazılım Stajyeri',
    description: 'Teknoloji şirketimizde React ve Node.js bilen stajyer arıyoruz. Üniversite öğrencileri başvurabilir. Tam zamanlıya geçiş imkanı.',
    city: 'Ankara',
    phone: '05XX XXX XX XX',
    createdAt: '2026-02-10T08:00:00Z',
  },
  {
    id: 7,
    title: 'Kasiyer - AVM',
    description: 'Alışveriş merkezindeki mağazamız için deneyimli kasiyer aranmaktadır. Vardiyalı çalışma sistemi uygulanmaktadır.',
    city: 'Antalya',
    phone: '05XX XXX XX XX',
    createdAt: '2026-02-09T13:30:00Z',
  },
  {
    id: 8,
    title: 'İngilizce Öğretmeni',
    description: 'Özel dil kursumuz için part-time İngilizce öğretmeni aranmaktadır. CELTA veya TEFL sertifikası tercih sebebidir.',
    city: 'İstanbul',
    phone: '05XX XXX XX XX',
    createdAt: '2026-02-08T10:20:00Z',
  },
  {
    id: 9,
    title: 'Aşçıbaşı Yardımcısı',
    description: 'Lüks otel restoranımızda aşçıbaşı yardımcısı pozisyonu için deneyimli adaylar aranmaktadır. Uluslararası mutfak bilgisi avantajdır.',
    city: 'Muğla',
    phone: '05XX XXX XX XX',
    createdAt: '2026-02-07T15:00:00Z',
  },
];

const cities = ['Tüm Şehirler', 'İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Muğla'];

// ============================
// ANIMATED COUNTER (scroll-triggered)
// ============================
function AnimatedCounter({ target, delay = 0 }: { target: number; delay?: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const timeout = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(timeout);
  }, [isInView, delay]);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutQuart for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [started, target]);

  return <span ref={ref}>{count}</span>;
}

// ============================
// TEXT REVEAL (word by word)
// ============================
function TextReveal({ children, className, delay = 0 }: { children: string; className?: string; delay?: number }) {
  const words = children.split(' ');
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.08,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

// ============================
// STEP CARD (How it Works)
// ============================
function StepCard({ step, index, icon: Icon }: { step: { title: string; description: string }; index: number; icon: React.ElementType }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative group"
    >
      {/* Step number */}
      <div className="absolute -top-3 -left-3 w-10 h-10 rounded-xl bg-gradient-to-br from-[#2623D2] to-[#116DFF] flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-[#2623D2]/30 z-10">
        {index + 1}
      </div>

      <div className="glass-card rounded-2xl p-8 pt-10 h-full transition-all duration-500 group-hover:shadow-xl group-hover:shadow-[#2623D2]/10 group-hover:-translate-y-2">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#EEEDFF] to-[#DDE2FF] flex items-center justify-center mb-5">
          <Icon size={26} className="text-[#2623D2]" />
        </div>
        <h3 className="text-xl font-bold text-[#181818] mb-3">{step.title}</h3>
        <p className="text-gray-500 leading-relaxed">{step.description}</p>
      </div>
    </motion.div>
  );
}

// ============================
// MAIN PAGE
// ============================
export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('Tüm Şehirler');

  // Scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Parallax refs
  const heroRef = useRef(null);
  const listingsRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(heroProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);
  const shape1Y = useTransform(heroProgress, [0, 1], [0, -100]);
  const shape2Y = useTransform(heroProgress, [0, 1], [0, -60]);
  const shape3Y = useTransform(heroProgress, [0, 1], [0, -150]);

  const filteredListings = useMemo(() => {
    return mockListings.filter((listing) => {
      const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCity = selectedCity === 'Tüm Şehirler' || listing.city === selectedCity;
      return matchesSearch && matchesCity;
    });
  }, [searchQuery, selectedCity]);

  // Steps data
  const steps = [
    {
      title: 'İlanları Keşfet',
      description: 'Binlerce güncel iş ilanı arasında arama yap. Şehir, pozisyon ve sektöre göre filtrele.',
      icon: Search,
    },
    {
      title: 'Tek Tıkla Ulaş',
      description: 'Özgeçmiş yüklemeye gerek yok! Beğendiğin ilanı bul, tek tıkla doğrudan işverene ulaş.',
      icon: FileText,
    },
    {
      title: 'İşe Başla',
      description: 'İşveren seninle iletişime geçsin. Hayalindeki kariyere ilk adımı at.',
      icon: Rocket,
    },
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <motion.div className="scroll-progress" style={{ scaleX }} />

      {/* ============================
          SECTION 1: HERO + STATS (Unified)
          ============================ */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col overflow-hidden" style={{ background: 'linear-gradient(160deg, #0F0E47 0%, #1B1A9E 25%, #2623D2 45%, #116DFF 65%, #1B1A9E 85%, #0A0A1B 100%)' }}>
        {/* Animated blobs */}
        <motion.div
          style={{ y: shape1Y, willChange: 'transform', transform: 'translateZ(0)' }}
          className="absolute w-[500px] h-[500px] rounded-full bg-[#5A48F5] opacity-20 blur-[80px] -top-20 -left-40"
          aria-hidden="true"
        />
        <motion.div
          style={{ y: shape2Y, willChange: 'transform', transform: 'translateZ(0)' }}
          className="absolute w-[600px] h-[600px] rounded-full bg-[#116DFF] opacity-15 blur-[100px] -bottom-40 -right-40"
          aria-hidden="true"
        />
        <motion.div
          style={{ y: shape3Y, willChange: 'transform', transform: 'translateZ(0)' }}
          className="absolute w-[300px] h-[300px] rounded-full bg-[#3B82F6] opacity-20 blur-[60px] top-1/3 right-1/4"
          aria-hidden="true"
        />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Floating particles — deterministic positions to avoid hydration mismatch */}
        {[
          { left: '15%', top: '20%', tx: '-60px', ty: '-150px', dur: '5s', del: '0s', size: '3px' },
          { left: '75%', top: '35%', tx: '80px', ty: '-200px', dur: '7s', del: '1s', size: '4px' },
          { left: '40%', top: '60%', tx: '-40px', ty: '-120px', dur: '6s', del: '2s', size: '2px' },
          { left: '85%', top: '15%', tx: '50px', ty: '-180px', dur: '8s', del: '0.5s', size: '5px' },
          { left: '25%', top: '75%', tx: '-90px', ty: '-160px', dur: '5.5s', del: '3s', size: '3px' },
          { left: '60%', top: '45%', tx: '70px', ty: '-140px', dur: '9s', del: '1.5s', size: '4px' },
        ].map((p, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: p.left,
              top: p.top,
              '--tx': p.tx,
              '--ty': p.ty,
              '--duration': p.dur,
              '--delay': p.del,
              width: p.size,
              height: p.size,
            } as React.CSSProperties}
          />
        ))}

        {/* Hero content — centered area */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center flex-1 flex flex-col justify-center pt-24 pb-6"
        >
          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.25] mb-6 sm:mb-8 tracking-tight">
            <TextReveal delay={0.3}>Hayalindeki</TextReveal>
            <br />
            <TextReveal delay={0.6} className="text-white/80">İşi Bul.</TextReveal>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-lg sm:text-xl lg:text-2xl text-white/60 max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed font-light"
          >
            Binlerce iş ilanı arasından sana en uygun olanını keşfet.
            <br className="hidden sm:block" />
            Kariyerine bugün yön ver.
          </motion.p>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full max-w-3xl mx-auto"
          >
            <div className="w-full bg-white/95 backdrop-blur-xl rounded-2xl p-2.5 sm:p-3 shadow-2xl shadow-black/20 flex flex-col sm:flex-row items-center gap-2 border border-white/50">
              <div className="flex-1 relative w-full">
                <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="İlan başlığı ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 sm:py-3.5 bg-gray-50/80 rounded-xl text-sm sm:text-[15px] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#2623D2]/20 transition-all text-gray-700 placeholder:text-gray-400"
                />
              </div>
              <div className="relative w-full sm:w-auto">
                <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="appearance-none w-full sm:w-auto pl-11 pr-10 py-3 sm:py-3.5 bg-gray-50/80 rounded-xl text-sm sm:text-[15px] text-gray-700 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#2623D2]/20 transition-all cursor-pointer sm:min-w-[160px]"
                >
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary !rounded-xl !py-3 sm:!py-3.5 !px-8 whitespace-nowrap w-full sm:w-auto"
              >
                <Search size={18} />
                Ara
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats + CTA — bottom of hero */}
        <div className="relative z-10 w-full pb-10 sm:pb-14">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
            {/* Stats row — glassmorphic cards */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="grid grid-cols-3 gap-3 sm:gap-6 mb-4"
            >
              {[
                { icon: Briefcase, label: 'Aktif İlan', value: mockListings.length, suffix: '+' },
                { icon: MapPin, label: 'Şehir', value: cities.length - 1, suffix: '+' },
                { icon: TrendingUp, label: 'Başvuru', value: 1250, suffix: '+' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 2.0 + i * 0.15 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="group relative bg-white/[0.08] backdrop-blur-xl rounded-2xl p-4 sm:p-6 text-center border border-white/[0.12] hover:bg-white/[0.14] hover:border-white/[0.2] transition-all duration-500 cursor-default overflow-hidden"
                >
                  {/* Glow on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-white/5 to-transparent" />

                  <div className="relative">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-white/15 transition-colors duration-300">
                      <stat.icon size={20} className="text-white/70 sm:w-6 sm:h-6" />
                    </div>
                    <div className="text-2xl sm:text-4xl font-black text-white mb-1 tracking-tight">
                      <AnimatedCounter target={stat.value} delay={2.0 + i * 0.15 + 0.5} />{stat.suffix}
                    </div>
                    <div className="text-white/40 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.15em]">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* İlanları Göster button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.5 }}
              className="flex justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => listingsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="group flex items-center gap-3 px-7 py-3.5 bg-white/[0.12] backdrop-blur-xl text-white font-semibold rounded-2xl border border-white/[0.15] hover:bg-white/[0.2] hover:border-white/[0.25] transition-all duration-300 shadow-lg shadow-black/10"
              >
                <Briefcase size={18} />
                İlanları Göster
                <motion.span
                  className="inline-block"
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ChevronDown size={18} />
                </motion.span>
              </motion.button>
            </motion.div>
          </div>
        </div>
        {/* Bottom gradient fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, #0A0A1B)' }} />
      </section>

      {/* ============================
          SECTION 3: HOW IT WORKS (Immersive Scrollytelling)
          ============================ */}
      <section className="relative pt-8 pb-24 sm:pt-12 sm:pb-36 overflow-hidden bg-[#0A0A1B]">
        {/* Ambient glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#2623D2] opacity-[0.07] blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#116DFF] opacity-[0.05] blur-[100px] rounded-full" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20 sm:mb-28"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-5 py-2 rounded-full bg-white/5 border border-white/10 text-[#818CF8] text-sm font-semibold mb-5 backdrop-blur-sm"
            >
              Nasıl Çalışır?
            </motion.span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-5 leading-tight">
              3 Adımda{' '}
              <span className="bg-gradient-to-r from-[#818CF8] via-[#6366F1] to-[#4F46E5] bg-clip-text text-transparent">Kariyerine</span>
              {' '}Başla
            </h2>
            <p className="text-white/40 text-lg sm:text-xl max-w-xl mx-auto">
              Wincoi ile iş bulmak hiç bu kadar kolay olmamıştı.
            </p>
          </motion.div>

          {/* Steps — vertical layout */}
          <div className="relative flex flex-col gap-8 sm:gap-0">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isLast = i === steps.length - 1;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                  viewport={{ once: true, margin: '-80px' }}
                  className={`relative flex flex-col sm:flex-row items-center gap-6 sm:gap-12 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'} ${!isLast ? 'sm:mb-16' : ''}`}
                >
                  {/* Step number — large */}
                  <div className="hidden sm:flex w-1/2 justify-center items-center">
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.6, delay: i * 0.2 + 0.3 }}
                      viewport={{ once: true }}
                      className="relative"
                    >
                      <span className="text-[140px] lg:text-[180px] font-black bg-gradient-to-br from-white/[0.08] to-transparent bg-clip-text text-transparent select-none leading-none">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {/* Glow behind number */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-[#6366F1] opacity-20 blur-[40px]" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Card */}
                  <div className="w-full sm:w-1/2">
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="relative group rounded-2xl p-[1px] overflow-hidden"
                    >
                      {/* Animated gradient border */}
                      <div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: 'linear-gradient(135deg, #6366F1, #818CF8, #4F46E5, #6366F1)',
                          backgroundSize: '300% 300%',
                          animation: 'gradient-shift 4s ease infinite',
                        }}
                      />
                      {/* Static border for non-hover */}
                      <div className="absolute inset-0 rounded-2xl border border-white/[0.08] group-hover:border-transparent transition-all duration-500" />

                      <div className="relative bg-[#12122A] rounded-2xl p-7 sm:p-9">
                        {/* Mobile step number */}
                        <span className="sm:hidden text-xs font-bold text-[#818CF8] tracking-widest uppercase mb-3 block">
                          Adım {String(i + 1).padStart(2, '0')}
                        </span>

                        {/* Icon container */}
                        <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-[#6366F1]/20 to-[#4F46E5]/10 flex items-center justify-center mb-6 group-hover:from-[#6366F1]/30 group-hover:to-[#4F46E5]/20 transition-all duration-500">
                          <Icon size={26} className="text-[#818CF8] group-hover:text-white transition-colors duration-300" />
                          {/* Icon glow */}
                          <div className="absolute inset-0 rounded-xl bg-[#6366F1] opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-500" />
                        </div>

                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-[#C7D2FE] transition-colors duration-300">
                          {step.title}
                        </h3>
                        <p className="text-white/40 leading-relaxed text-[15px] group-hover:text-white/55 transition-colors duration-300">
                          {step.description}
                        </p>

                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}

            {/* Vertical animated connecting line (desktop) */}
            <div className="hidden sm:block absolute left-1/2 -translate-x-1/2 top-20 bottom-20">
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                transition={{ duration: 2, ease: 'easeInOut' }}
                viewport={{ once: true }}
                className="w-[2px] h-full origin-top"
                style={{
                  background: 'linear-gradient(180deg, transparent, #6366F1 20%, #818CF8 50%, #6366F1 80%, transparent)',
                }}
              />
              {/* Animated dot on line */}
              {steps.map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.3 }}
                  viewport={{ once: true }}
                  className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#6366F1] border-4 border-[#0A0A1B] shadow-[0_0_20px_rgba(99,102,241,0.5)]"
                  style={{ top: `${15 + i * 35}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================
          SECTION 4: LISTINGS (Interactive Grid)
          ============================ */}
      <section ref={listingsRef} className="relative py-16 sm:py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12"
          >
            <div>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-1.5 rounded-full bg-[#EEEDFF] text-[#2623D2] text-sm font-semibold mb-3"
              >
                Güncel İlanlar
              </motion.span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#181818]">
                Seni Bekleyen <span className="gradient-text">Fırsatlar</span>
              </h2>
              <p className="text-gray-500 mt-2">
                Toplam{' '}
                <span className="font-semibold text-[#2623D2]">
                  {filteredListings.length}
                </span>{' '}
                aktif ilan
              </p>
            </div>

            {/* Desktop filters */}
            <div className="hidden sm:flex items-center gap-3">
              <div className="relative">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="İlan ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field !pl-10 !py-2.5 !text-sm !w-[200px] !rounded-xl"
                />
              </div>
              <div className="relative">
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="input-field !py-2.5 !text-sm !pr-9 appearance-none !rounded-xl cursor-pointer"
                >
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </motion.div>

          {/* Mobile filters */}
          <div className="flex items-center gap-3 sm:hidden mb-6">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field !pl-9 !py-2.5 !text-sm"
              />
            </div>
            <div className="relative">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="input-field !py-2.5 !text-sm !pr-8 appearance-none"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Listings Grid */}
          {filteredListings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {filteredListings.map((listing, index) => (
                <ListingCard
                  key={listing.id}
                  title={listing.title}
                  description={listing.description}
                  city={listing.city}
                  phone={listing.phone}
                  createdAt={listing.createdAt}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 rounded-2xl bg-[#EEEDFF] flex items-center justify-center mx-auto mb-4">
                <Search size={32} className="text-[#2623D2]" />
              </div>
              <h3 className="text-xl font-bold text-[#181818] mb-2">İlan Bulunamadı</h3>
              <p className="text-gray-500">Farklı filtreler ile tekrar arayın.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* ============================
          SECTION 5: CTA (Call to Action)
          ============================ */}
      <section className="relative py-24 sm:py-36 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0F0E47 0%, #1B1A9E 30%, #2623D2 55%, #116DFF 80%, #3B82F6 100%)' }}>
        {/* Blobs */}
        <div className="absolute w-[400px] h-[400px] rounded-full bg-[#5A48F5] opacity-20 blur-[80px] -top-20 -right-20" />
        <div className="absolute w-[300px] h-[300px] rounded-full bg-[#116DFF] opacity-15 blur-[80px] -bottom-20 -left-20" />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />

        {/* Particles — deterministic to avoid hydration mismatch */}
        {[
          { left: '12%', top: '25%', tx: '-50px', ty: '-130px', dur: '6s', del: '0s' },
          { left: '80%', top: '15%', tx: '60px', ty: '-160px', dur: '7s', del: '0.5s' },
          { left: '35%', top: '70%', tx: '-30px', ty: '-110px', dur: '8s', del: '1s' },
          { left: '65%', top: '40%', tx: '45px', ty: '-140px', dur: '5s', del: '1.5s' },
          { left: '20%', top: '55%', tx: '-70px', ty: '-120px', dur: '9s', del: '2s' },
          { left: '90%', top: '60%', tx: '35px', ty: '-100px', dur: '6.5s', del: '2.5s' },
          { left: '50%', top: '20%', tx: '-55px', ty: '-180px', dur: '7.5s', del: '0.8s' },
          { left: '75%', top: '80%', tx: '40px', ty: '-90px', dur: '5.5s', del: '1.2s' },
        ].map((p, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: p.left,
              top: p.top,
              '--tx': p.tx,
              '--ty': p.ty,
              '--duration': p.dur,
              '--delay': p.del,
            } as React.CSSProperties}
          />
        ))}

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              Kariyerinde Bir Sonraki
              <br />
              <span className="text-white/80">Adımı At</span>
            </h2>
            <p className="text-white/50 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Wincoi ile iş dünyasına güçlü bir giriş yap.
              Ücretsiz hesap oluştur ve fırsatları kaçırma.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                href="/kayit"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary btn-magnetic !rounded-full !px-10 !py-4 !text-lg animate-pulse-glow"
              >
                Hemen Başla
                <ArrowRight size={20} />
              </motion.a>
              <motion.a
                href="/blog"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-10 py-4 rounded-full text-lg font-semibold text-white border-2 border-white/30 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              >
                Daha Fazla Bilgi
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
