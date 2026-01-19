
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Droplets, Sun, Zap, Shield, Menu, X, CheckCircle, ChevronLeft, ChevronRight, Phone, Mail, Award, Leaf, Quote, ArrowRight, Wind, Star } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import GradientText from './components/GlitchText';
import CustomCursor from './components/CustomCursor';
import ServiceCard from './components/ArtistCard';
import { ServiceItem } from './types';

// Data from PDF
const BENEFITS: ServiceItem[] = [
  { 
    id: '1', 
    title: 'Increased Efficiency', 
    subtitle: 'Maximize Output', 
    tag: 'Benefit', 
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1000&auto=format&fit=crop',
    description: 'More sunlight absorption equals higher energy output from your system. Dirty panels can lose up to 25% efficiency.'
  },
  { 
    id: '2', 
    title: 'Extended Lifespan', 
    subtitle: 'Protect Investment', 
    tag: 'Benefit', 
    image: 'https://images.unsplash.com/photo-1594818379496-da1e345b0ded?q=80&w=1000&auto=format&fit=crop',
    description: 'Regular maintenance prevents early degradation caused by debris, bird droppings, and environmental buildup.'
  },
  { 
    id: '3', 
    title: 'Eco-Friendly', 
    subtitle: 'De-ionised Water', 
    tag: 'Process', 
    image: 'https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?q=80&w=1000&auto=format&fit=crop', 
    description: 'We use no harmful chemicals - only purified de-ionised water that is safe for your panels, anti-reflective coatings, and the environment.'
  },
  { 
    id: '4', 
    title: 'Cost-Effective', 
    subtitle: 'Higher ROI', 
    tag: 'Value', 
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1000&auto=format&fit=crop',
    description: 'Cleaner panels perform better - reducing energy bills and increasing your return on investment significantly over time.'
  },
  { 
    id: '5', 
    title: 'System Health Check', 
    subtitle: 'Inspection', 
    tag: 'Safety', 
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=1000&auto=format&fit=crop',
    description: 'Each clean includes a full system health check to ensure optimal operation and catch any potential issues early.'
  },
  { 
    id: '6', 
    title: 'Pro Equipment', 
    subtitle: 'Specialised', 
    tag: 'Tech', 
    image: 'https://images.unsplash.com/photo-1591815302525-756a9bcc3425?q=80&w=1000&auto=format&fit=crop',
    description: 'We use professional-grade, eco-friendly equipment designed specifically for solar panel maintenance.'
  },
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Homeowner, Constantia",
    quote: "I didn't realize how much efficiency I was losing until Cape Solar Shine cleaned my panels. My output went up by 20% the very next day!",
    rating: 5
  },
  {
    id: 2,
    name: "GreenLeaf Estates",
    role: "Estate Manager",
    quote: "Professional, punctual, and eco-friendly. The de-ionised water system they use leaves the panels absolutely spotless with zero streaks.",
    rating: 5
  },
  {
    id: 3,
    name: "Mike Rossouw",
    role: "Business Owner",
    quote: "Excellent service. The team did a full health check and found a loose clamp I wouldn't have noticed.",
    rating: 5
  }
];

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ServiceItem | null>(null);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedItem) return;
      if (e.key === 'ArrowLeft') navigateItem('prev');
      if (e.key === 'ArrowRight') navigateItem('next');
      if (e.key === 'Escape') setSelectedItem(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offsetPosition = element.getBoundingClientRect().top + window.scrollY - 20;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const navigateItem = (direction: 'next' | 'prev') => {
    if (!selectedItem) return;
    const currentIndex = BENEFITS.findIndex(a => a.id === selectedItem.id);
    let nextIndex;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % BENEFITS.length;
    } else {
      nextIndex = (currentIndex - 1 + BENEFITS.length) % BENEFITS.length;
    }
    setSelectedItem(BENEFITS[nextIndex]);
  };
  
  return (
    <div className="relative min-h-screen text-white selection:bg-[#fbbf24] selection:text-black cursor-auto md:cursor-none overflow-x-hidden">
      <CustomCursor />
      <FluidBackground />
      
      {/* Navigation - Compact top-aligned as per screenshot */}
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-12 py-4 bg-[#0f172a]/90 backdrop-blur-lg border-b border-white/5 shadow-2xl">
        <div className="font-heading text-xl md:text-2xl font-bold tracking-tighter text-white cursor-default flex items-center gap-3">
           <span className="sm:inline uppercase">CAPE-SOLARSHINE</span>
        </div>
        
        <div className="hidden md:flex gap-6 lg:gap-8 text-[10px] lg:text-xs font-bold tracking-widest uppercase items-center">
          {['Benefits', 'Process', 'Reviews', 'Contact'].map((item) => (
            <button 
              key={item} 
              onClick={() => {
                const map: Record<string, string> = {
                  'reviews': 'testimonials',
                  'process': 'process',
                  'benefits': 'benefits',
                  'contact': 'contact'
                };
                scrollToSection(map[item.toLowerCase()] || item.toLowerCase());
              }}
              className="hover:text-[#fbbf24] transition-colors text-white cursor-pointer bg-transparent border-none"
              data-hover="true"
            >
              {item}
            </button>
          ))}
        </div>
        <button 
          onClick={() => scrollToSection('contact')}
          className="hidden md:inline-flex items-center gap-2 border border-[#fbbf24] px-5 py-2 text-[10px] font-bold tracking-widest uppercase hover:bg-[#fbbf24] hover:text-black transition-all duration-300 text-[#fbbf24] cursor-pointer bg-transparent"
          data-hover="true"
        >
          <Phone className="w-3.5 h-3.5" />
          Get Quote
        </button>

        <button 
          className="md:hidden text-white z-50 relative w-10 h-10 flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
           {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-[#0f172a]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <div className="mb-8 text-4xl font-heading font-black tracking-tighter">CAPE-SOLARSHINE</div>
            {['Benefits', 'Process', 'Reviews', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => {
                   const map: Record<string, string> = {
                    'reviews': 'testimonials',
                    'process': 'process',
                    'benefits': 'benefits',
                    'contact': 'contact'
                  };
                  scrollToSection(map[item.toLowerCase()] || item.toLowerCase());
                }}
                className="text-4xl font-heading font-bold text-white hover:text-[#fbbf24] transition-colors uppercase bg-transparent border-none"
              >
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <header className="relative h-[100svh] min-h-[700px] flex flex-col items-center justify-center overflow-hidden px-4">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
            src="https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?q=80&w=2070&auto=format&fit=crop" 
            alt="Solar Panel Cleaning Background" 
            className="w-full h-full object-cover opacity-30 blur-[2px] brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/70 via-transparent to-[#0f172a]" />
        </div>

        <motion.div 
          style={{ y, opacity }}
          className="z-10 text-center flex flex-col items-center w-full max-w-6xl relative pt-24"
        >
          {/* Blue Banner - Positioned to NOT overlap navigation (pushed down by pt-24) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-wrap justify-center items-center gap-3 md:gap-6 text-xs md:text-sm font-mono text-[#22d3ee] tracking-[0.2em] uppercase mb-10 bg-black/50 px-8 py-3.5 rounded-full backdrop-blur-md border border-white/10 shadow-2xl"
          >
            <span>Sparkling Solar</span>
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#fbbf24] rounded-full animate-pulse"/>
            <span>Endless Energy</span>
          </motion.div>

          <div className="relative w-full flex flex-col justify-center items-center">
            <GradientText 
              text="CAPE SOLAR" 
              as="h1" 
              className="text-[12vw] md:text-[10vw] leading-[0.9] font-black tracking-tighter text-center drop-shadow-2xl" 
            />
            <GradientText 
              text="SHINE" 
              as="h1" 
              className="text-[12vw] md:text-[10vw] leading-[0.9] font-black tracking-tighter text-center mt-2 drop-shadow-2xl" 
            />
            <motion.div 
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-20 w-[60vw] h-[60vw] bg-[#fbbf24]/20 blur-[100px] rounded-full pointer-events-none"
               animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.2, 0.4, 0.2] }}
               transition={{ duration: 5, repeat: Infinity }}
            />
          </div>
          
          <motion.div
             initial={{ scaleX: 0 }}
             animate={{ scaleX: 1 }}
             transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
             className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-[#fbbf24]/80 to-transparent mt-12 mb-10"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="p-8 rounded-3xl backdrop-blur-md bg-black/40 border border-white/10 shadow-2xl max-w-2xl"
          >
            <p className="text-base md:text-xl font-medium text-white leading-relaxed">
              Professional solar panel cleaning services for residential and commercial installations. 
              <span className="block mt-2 text-[#fbbf24] font-bold">Maximise your energy harvest.</span>
            </p>
          </motion.div>
        </motion.div>

        {/* Ticker Tape Footer of Header */}
        <div className="absolute bottom-0 left-0 w-full py-4 md:py-6 bg-white text-black z-20 overflow-hidden border-t-4 border-[#fbbf24] shadow-[0_-20px_40px_rgba(255,200,0,0.2)]">
          <motion.div 
            className="flex w-fit will-change-transform"
            animate={{ x: "-50%" }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            {[0, 1].map((key) => (
              <div key={key} className="flex whitespace-nowrap shrink-0">
                {[...Array(4)].map((_, i) => (
                  <span key={i} className="text-2xl md:text-5xl font-heading font-black px-8 flex items-center gap-4 uppercase">
                    Max Efficiency <span className="text-[#fbbf24] text-2xl md:text-4xl">●</span> 
                    Eco-Friendly Cleaning <span className="text-[#fbbf24] text-2xl md:text-4xl">●</span> 
                    Cape Town Experts <span className="text-[#fbbf24] text-2xl md:text-4xl">●</span> 
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </header>

      {/* BENEFITS SECTION */}
      <section id="benefits" className="relative z-10 py-20 md:py-32">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 px-4">
             <h2 className="text-5xl md:text-8xl font-heading font-bold uppercase leading-[0.9] drop-shadow-lg break-words w-full md:w-auto">
              Our <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] to-[#f59e0b]">Services</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/10 bg-black/20 backdrop-blur-sm">
            {BENEFITS.map((item, index) => (
              <ServiceCard key={item.id} item={item} index={index} onClick={() => setSelectedItem(item)} />
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS / INFO SECTION */}
      <section id="process" className="relative z-10 py-20 md:py-32 bg-[#0284c7]/5 backdrop-blur-sm border-t border-white/10 overflow-hidden">
        <div className="absolute top-1/2 right-[-20%] w-[50vw] h-[50vw] bg-[#fbbf24]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <h2 className="text-4xl md:text-7xl font-heading font-bold mb-6 md:mb-8 leading-tight">
                Pure <br/> <GradientText text="FINISH" className="text-5xl md:text-8xl" />
              </h2>
              <p className="text-lg md:text-xl text-gray-200 mb-8 md:mb-12 font-light leading-relaxed drop-shadow-md">
                Rainwater is rarely pure; it leaves mineral deposits that bake into your glass. Our de-ionised water process pulls contaminants away, leaving a perfectly smooth, reflective surface.
              </p>
              
              <div className="space-y-6 md:space-y-8">
                {[
                  { icon: Droplets, title: 'Pure Water Tech', desc: 'No minerals, no spots, just crystal clear glass.' },
                  { icon: Shield, title: 'Panel Integrity', desc: 'Non-abrasive cleaning methods that preserve your warranty.' },
                  { icon: CheckCircle, title: 'Verified Growth', desc: 'Immediate, measurable increases in energy efficiency.' },
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-6">
                    <div className="p-4 rounded-2xl bg-[#0f172a] border border-[#22d3ee]/20 text-[#22d3ee]">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg md:text-xl font-bold mb-1 md:mb-2 font-heading">{feature.title}</h4>
                      <p className="text-sm text-gray-300">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 relative h-[400px] md:h-[700px] w-full order-1 lg:order-2">
              <div className="absolute inset-0 bg-gradient-to-br from-[#fbbf24] to-[#22d3ee] rounded-3xl rotate-3 opacity-20 blur-xl" />
              <div className="relative h-full w-full rounded-3xl overflow-hidden border border-white/10 group shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1624397640148-949b1732bb0a?q=80&w=1000&auto=format&fit=crop" 
                  alt="Solar Cleaning Pro" 
                  className="h-full w-full object-cover transition-transform duration-[2s] group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
                  <div className="text-4xl md:text-6xl font-heading font-bold text-white mb-2 uppercase">Precision Gear</div>
                  <div className="text-sm md:text-base font-mono tracking-widest uppercase text-[#fbbf24]">Professional Grade • De-ionised H2O</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" className="relative z-10 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-center text-4xl md:text-7xl font-heading font-bold mb-16 uppercase">
            Client <span className="text-[#fbbf24]">Testimonials</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, index) => (
              <motion.div 
                key={t.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.21, 0.45, 0.32, 0.9] }}
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl relative flex flex-col"
              >
                <Quote className="w-10 h-10 text-[#22d3ee] opacity-30 absolute top-6 right-6" />
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#fbbf24] fill-[#fbbf24]" />
                  ))}
                </div>
                <p className="text-gray-200 text-lg mb-8 italic leading-relaxed flex-1">"{t.quote}"</p>
                <div>
                  <h4 className="font-bold text-white font-heading text-lg">{t.name}</h4>
                  <p className="text-xs text-[#fbbf24] uppercase tracking-widest mt-1 font-bold">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT / PRICING SECTION */}
      <section id="contact" className="relative z-10 py-20 md:py-32 px-4 md:px-6 bg-[#0f172a]/90">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
             <h2 className="text-5xl md:text-9xl font-heading font-bold opacity-10 text-white select-none uppercase">Get Quote</h2>
             <p className="text-[#fbbf24] font-mono uppercase tracking-[0.3em] -mt-3 md:-mt-8 relative z-10 text-sm md:text-base font-bold">Professional Solar Maintenance</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Residential', subtitle: 'Home Installations', icon: <Sun className="w-8 h-8 text-[#fbbf24]"/>, items: ['Thorough Panel Cleaning', 'Anti-Reflective Coating Care', 'System Health Check', 'Eco-Friendly Process'], accent: 'border-white/10' },
              { name: 'Commercial', subtitle: 'Large Scale Arrays', icon: <Zap className="w-8 h-8 text-[#22d3ee]"/>, items: ['Utility Scale Cleaning', 'Maintenance Contracts', 'Detailed Reporting', 'Flexible Scheduling'], accent: 'border-[#22d3ee]/50 bg-[#22d3ee]/5' },
              { name: 'Special Offer', subtitle: 'First Clean Discount', icon: <Award className="w-8 h-8 text-[#fbbf24]"/>, items: ['Use Code: H2Oclean', 'Up to 20% Off First Clean', 'Full Inspection Included', 'Cape Town Region'], accent: 'border-[#fbbf24]/50 bg-[#fbbf24]/5' },
            ].map((tier, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  whileHover={{ y: -10 }}
                  className={`relative p-8 md:p-10 border backdrop-blur-md flex flex-col min-h-[450px] transition-all duration-300 ${tier.accent} bg-white/5 rounded-xl`}
                >
                  <div className="flex justify-between items-start mb-6">
                     <h3 className="text-2xl md:text-3xl font-heading font-bold text-white uppercase">{tier.name}</h3>
                     {tier.icon}
                  </div>
                  <p className="text-sm uppercase tracking-widest text-gray-400 mb-8 font-bold">{tier.subtitle}</p>
                  <ul className="space-y-4 text-sm text-gray-200 flex-1">
                    {tier.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#22d3ee] shrink-0" /> 
                        <span className="leading-tight">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="mailto:jaco@cape-solarshine.co.za?subject=Quote%20Request" className={`w-full py-4 text-center text-sm font-bold uppercase tracking-[0.2em] border transition-all duration-300 mt-8 group overflow-hidden relative cursor-pointer ${i === 2 ? 'bg-[#fbbf24] text-black border-[#fbbf24] hover:bg-white hover:text-black hover:border-white shadow-xl shadow-[#fbbf24]/20' : 'text-white border-white/20 hover:bg-white hover:text-black'}`} data-hover="true">
                    <span className="relative z-10">{i === 2 ? 'Redeem Discount' : 'Request Quote'}</span>
                  </a>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      <footer className="relative z-10 py-16 md:py-24 bg-[#0f172a] overflow-hidden border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            <div className="flex flex-col gap-4 text-sm font-mono text-gray-400 text-center md:text-left order-2 md:order-1">
              <a href="tel:0848263153" className="flex items-center justify-center md:justify-start gap-3 hover:text-white transition-colors" data-hover="true">
                <Phone className="w-5 h-5 text-[#22d3ee]" /> 084 826 3153
              </a>
              <a href="mailto:jaco@cape-solarshine.co.za" className="flex items-center justify-center md:justify-start gap-3 hover:text-white transition-colors" data-hover="true">
                <Mail className="w-5 h-5 text-[#22d3ee]" /> jaco@cape-solarshine.co.za
              </a>
              <p className="mt-4 text-[10px] opacity-40 uppercase tracking-widest font-bold">Western Cape • South Africa</p>
            </div>
            
            <div className="flex justify-center order-1 md:order-2 flex-col items-center gap-6">
              <div className="text-4xl font-heading font-black tracking-tighter">CAPE-SOLARSHINE</div>
            </div>

            <div className="text-center md:text-right order-3">
              <p className="text-[#fbbf24] font-black text-3xl md:text-5xl font-heading mb-2">H2Oclean</p>
              <p className="text-xs text-gray-400 uppercase tracking-[0.3em] font-black mb-6">Discount Code • First Clean</p>
              <button onClick={() => scrollToSection('contact')} className="inline-flex items-center gap-2 border border-white/20 px-8 py-3 text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all" data-hover="true">Book Inspection</button>
            </div>
          </div>
          <div className="mt-20 pt-8 border-t border-white/5 text-center">
             <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.5em] mb-4">Sparkling Solar • Endless Energy</p>
             <p className="text-[9px] text-gray-600 opacity-50 uppercase tracking-widest">&copy; {new Date().getFullYear()} Cape Solar Shine. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {selectedItem && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedItem(null)} className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl cursor-auto">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} onClick={(e) => e.stopPropagation()} className="relative w-full max-w-5xl bg-[#0f172a] border border-white/10 overflow-hidden flex flex-col md:flex-row shadow-2xl shadow-[#fbbf24]/10 rounded-3xl">
              <button onClick={() => setSelectedItem(null)} className="absolute top-6 right-6 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors border border-white/10" data-hover="true">
                <X className="w-6 h-6" />
              </button>
              <div className="absolute bottom-6 right-6 md:top-1/2 md:right-8 md:bottom-auto md:-translate-y-1/2 flex flex-row md:flex-col gap-4 z-20">
                <button onClick={(e) => { e.stopPropagation(); navigateItem('prev'); }} className="p-3 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors border border-white/10" data-hover="true">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button onClick={(e) => { e.stopPropagation(); navigateItem('next'); }} className="p-3 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors border border-white/10" data-hover="true">
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
              <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden bg-black">
                <AnimatePresence mode="wait">
                  <motion.img key={selectedItem.id} src={selectedItem.image} alt={selectedItem.title} initial={{ opacity: 0, scale: 1.2 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="absolute inset-0 w-full h-full object-cover opacity-80" />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent md:bg-gradient-to-r" />
              </div>
              <div className="w-full md:w-1/2 p-8 pb-28 md:p-16 flex flex-col justify-center">
                <motion.div key={selectedItem.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                  <div className="flex items-center gap-3 text-[#fbbf24] mb-4">
                     {selectedItem.title === 'Eco-Friendly' ? <Leaf className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                     <span className="font-mono text-xs tracking-widest uppercase font-black">{selectedItem.tag}</span>
                  </div>
                  <h3 className="text-4xl md:text-6xl font-heading font-bold uppercase leading-none mb-3 text-white">{selectedItem.title}</h3>
                  <p className="text-sm md:text-lg text-[#22d3ee] font-bold tracking-[0.2em] uppercase mb-8">{selectedItem.subtitle}</p>
                  <div className="h-px w-24 bg-[#fbbf24]/50 mb-8" />
                  <div className="relative mb-10">
                    <p className="text-gray-300 leading-relaxed text-lg font-light">{selectedItem.description}</p>
                    {selectedItem.title === 'Eco-Friendly' && (
                      <div className="mt-8 space-y-6">
                        <div className="relative h-40 rounded-2xl overflow-hidden border border-white/10">
                           <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop" alt="Nature and Water" className="w-full h-full object-cover opacity-60" />
                           <div className="absolute inset-0 flex items-center justify-center p-4">
                              <p className="text-[10px] font-mono text-white text-center uppercase tracking-widest bg-black/40 px-3 py-1 rounded backdrop-blur-sm">Protecting our Cape Town heritage</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-4 bg-[#fbbf24]/10 p-4 rounded-xl border border-[#fbbf24]/20">
                          <Droplets className="w-8 h-8 text-[#fbbf24]" />
                          <span className="text-xs font-mono text-gray-200 uppercase tracking-wider font-bold">100% Streak-Free Pure De-ionised Process.</span>
                        </div>
                      </div>
                    )}
                  </div>
                   <a href="mailto:jaco@cape-solarshine.co.za" className="inline-block px-10 py-4 bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-[#fbbf24] transition-all duration-300 rounded-full shadow-lg hover:shadow-[#fbbf24]/20" data-hover="true">Get Help Now</a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
