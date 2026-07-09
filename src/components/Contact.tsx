'use client'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef, useState } from 'react'

gsap.registerPlugin(ScrollTrigger)

// ── DATA SOSIAL ───────────────────────────────────────────────────
// Ganti `handle` dan `url` dengan akun aslimu
const socials = [
  {
    name: 'GitHub',
    handle: '@Zaychh',
    desc: 'Lihat source code & project open source',
    url: 'https://github.com/Zaychh',
    glow: '#ffffff',
    bg: 'from-[#161616] to-[#0d0d0d]',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    name: 'Discord',
    handle: 'iwantfluoxetine',
    desc: 'Chat langsung & diskusi project bareng',
    url: 'https://discord.com/users/1161652828192903210',
    glow: '#5865F2',
    bg: 'from-[#1a1b2e] to-[#0f1017]',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    handle: '@iwantfluoxetine',
    desc: 'Behind the scenes & karya visual',
    url: 'https://instagram.com/iwantfluoxetine',
    glow: '#E1306C',
    bg: 'from-[#1e0f17] to-[#0f0a0d]',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    handle: '@Aigrid',
    desc: 'Short video & konten kreatif',
    url: 'https://tiktok.com/@djarumespresso0',
    glow: '#69C9D0',
    bg: 'from-[#0f1a1b] to-[#090f10]',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
      </svg>
    ),
  },
]

// ── SOCIAL CARD ───────────────────────────────────────────────────
function SocialCard({ social, index }: { social: typeof socials[0]; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`contact-card relative group flex flex-col justify-between p-8 rounded-sm bg-gradient-to-br ${social.bg} border border-white/5 overflow-hidden cursor-pointer transition-transform duration-300 hover:-translate-y-1`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ minHeight: '220px' }}
    >
      {/* Neon glow border */}
      <div
        className="absolute inset-0 rounded-sm pointer-events-none transition-opacity duration-500"
        style={{
          boxShadow: hovered
            ? `0 0 28px 5px ${social.glow}44, inset 0 0 20px 2px ${social.glow}18`
            : `0 0 10px 1px ${social.glow}22`,
          opacity: hovered ? 1 : 0.6,
        }}
      />

      {/* Decorative corner glow blob */}
      <div
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl pointer-events-none transition-opacity duration-500"
        style={{
          background: social.glow,
          opacity: hovered ? 0.12 : 0.05,
        }}
      />

      {/* Top: Icon + Platform name */}
      <div className="relative z-10 flex items-start justify-between">
        <div style={{ color: hovered ? social.glow : '#888' }} className="transition-colors duration-300">
          {social.icon}
        </div>
        {/* Arrow */}
        <span
          className="font-sans text-xl transition-all duration-300"
          style={{ color: hovered ? social.glow : '#444', transform: hovered ? 'translate(3px,-3px)' : 'none' }}
        >
          ↗
        </span>
      </div>

      {/* Bottom: Text */}
      <div className="relative z-10 flex flex-col gap-1 mt-6">
        <p className="font-sans text-[10px] tracking-[0.35em] uppercase mb-1" style={{ color: hovered ? social.glow : '#666' }}>
          {social.name}
        </p>
        <h3 className="font-serif text-cream text-2xl font-light leading-tight">
          {social.handle}
        </h3>
        <p className="font-sans text-muted text-xs mt-1 leading-relaxed">
          {social.desc}
        </p>
      </div>

      {/* Bottom shimmer line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${social.glow}, transparent)`,
          opacity: hovered ? 0.8 : 0.2,
        }}
      />
    </a>
  )
}

// ── MAIN SECTION ─────────────────────────────────────────────────
export default function Contact() {
  const container = useRef(null)

  useGSAP(() => {
    gsap.from('.contact-label', {
      opacity: 0, y: 30, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: '.contact-label', start: 'top 88%' },
    })
    gsap.from('.contact-title', {
      opacity: 0, y: 50, duration: 1, ease: 'power4.out',
      scrollTrigger: { trigger: '.contact-title', start: 'top 88%' },
    })
    gsap.from('.contact-card', {
      opacity: 0, y: 50, scale: 0.95, duration: 0.7,
      stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: '.contact-grid', start: 'top 85%' },
    })
    gsap.from('.contact-footer', {
      opacity: 0, y: 20, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: '.contact-footer', start: 'top 95%' },
    })
  }, { scope: container })

  return (
    <section
      ref={container}
      id="contact"
      className="bg-[#0e0e0e] py-24 px-6 md:px-20"
    >
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-16 text-center">
          <p className="contact-label text-gold tracking-[0.4em] text-xs uppercase font-sans mb-3">
            Get in Touch
          </p>
          <h2 className="contact-title font-serif text-cream text-5xl md:text-6xl font-light leading-tight">
            Mari <span className="italic text-gold">Terhubung</span>
          </h2>
          <p className="font-sans text-muted text-sm mt-4 max-w-md mx-auto leading-relaxed">
            Terbuka untuk kolaborasi, diskusi project, atau sekadar ngobrol santai.
            Pilih platform favoritmu di bawah ini.
          </p>
        </div>

        {/* Cards Grid: 2x2 */}
        <div className="contact-grid grid grid-cols-1 sm:grid-cols-2 gap-5">
          {socials.map((social, i) => (
            <SocialCard key={social.name} social={social} index={i} />
          ))}
        </div>

        {/* Footer ornament */}
        <div className="contact-footer mt-20 flex flex-col items-center gap-4">
          <div className="flex items-center gap-4 w-full max-w-xs">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold/20" />
            <span className="text-gold/40 text-xs tracking-widest">✦</span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold/20" />
          </div>
          <p className="font-sans text-muted/30 text-[10px] tracking-[0.3em] uppercase">
            Portofolio Adenatha Zauzi Magria · {new Date().getFullYear()}
          </p>
        </div>

      </div>
    </section>
  )
}