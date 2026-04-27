'use client'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef, useState } from 'react'

gsap.registerPlugin(ScrollTrigger)

// ── DATA PROJEK ──────────────────────────────────────────────────
type Project = {
  id: number
  title: string
  desc: string
  tech: string[]
  url: string
  year: string
  status: 'Live' | 'WIP' | 'Archive'
}

type Category = 'coding' | 'modelling' | 'design'

const projects: Record<Category, Project[]> = {
  coding: [
    {
      id: 1,
      title: 'Portfolio Website',
      desc: 'Website portofolio personal dengan animasi GSAP dan desain elegant luxury.',
      tech: ['Next.js', 'GSAP', 'Tailwind'],
      url: 'https://github.com/username/portfolio',
      year: '2026',
      status: 'Live',
    },
    {
      id: 2,
      title: 'Web App E-Course Karisma Academy',
      desc: 'Aplikasi web untuk menampilkan kursus online dari Karisma Academy.',
      tech: ['React & Vite', 'Express.js', 'MySQL'],
      url: 'https://github.com/username/project2',
      year: '2025',
      status: 'Archive',
    },
    {
      id: 3,
      title: 'Web App Toko Baju Online',
      desc: 'Aplikasi web untuk menampilkan dan menjual baju secara online.',
      tech: ['Next.js', 'Laravel', 'MySQL'],
      url: 'https://github.com/username/project3',
      year: '2026',
      status: 'WIP',
    },
  ],
  modelling: [
    {
      id: 4,
      title: '3D Character',
      desc: 'Karakter 3D untuk game / animasi yang dibuat menggunakan Blender.',
      tech: ['Blender', 'Substance Painter'],
      url: 'https://www.artstation.com/username',
      year: '2024',
      status: 'Live',
    },
    {
      id: 5,
      title: 'Architectural Viz',
      desc: 'Visualisasi arsitektur rumah modern dengan lighting realistis.',
      tech: ['Blender', 'Cycles'],
      url: 'https://www.artstation.com/username',
      year: '2023',
      status: 'Archive',
    },
    {
      id: 6,
      title: 'Product Render',
      desc: 'Product render untuk kebutuhan iklan dan presentasi.',
      tech: ['Blender', 'EEVEE'],
      url: 'https://www.artstation.com/username',
      year: '2023',
      status: 'Live',
    },
  ],
  design: [
    {
      id: 7,
      title: 'UI Mobile App',
      desc: 'Desain UI aplikasi mobile dengan pendekatan user-centered design.',
      tech: ['Figma', 'Prototyping'],
      url: 'https://www.figma.com/username',
      year: '2024',
      status: 'Live',
    },
    {
      id: 8,
      title: 'Brand Identity',
      desc: 'Identitas brand lengkap termasuk logo, warna, dan typography.',
      tech: ['Figma', 'Illustrator'],
      url: 'https://www.figma.com/username',
      year: '2023',
      status: 'Archive',
    },
    {
      id: 9,
      title: 'Dashboard UI',
      desc: 'Desain dashboard analytics untuk platform SaaS.',
      tech: ['Figma', 'Auto Layout'],
      url: 'https://www.figma.com/username',
      year: '2024',
      status: 'WIP',
    },
  ],
}

const tabConfig: { key: Category; label: string; icon: string; accent: string }[] = [
  { key: 'coding',    label: 'Coding',    icon: '⌨️', accent: '#C9A84C' },
  { key: 'modelling', label: 'Modelling', icon: '🧊', accent: '#C9A84C' },
  { key: 'design',    label: 'Design',    icon: '✦',  accent: '#C9A84C' },
]

const statusColor: Record<string, string> = {
  Live:    'text-emerald-400 border-emerald-400/40',
  WIP:     'text-amber-400 border-amber-400/40',
  Archive: 'text-zinc-400 border-zinc-400/40',
}

// ── TAROT CARD ────────────────────────────────────────────────────
function TarotCard({ project }: { project: Project }) {
  const [flipped, setFlipped] = useState(false)
  const [glowing, setGlowing] = useState(false)

  const handleClick = () => {
    if (!flipped) {
      setFlipped(true)
      setGlowing(true)
      setTimeout(() => setGlowing(false), 1200)
    } else {
      window.open(project.url, '_blank')
    }
  }

  return (
    <div
      className="tarot-card group cursor-pointer"
      style={{ perspective: '1000px' }}
      onClick={handleClick}
    >
      {/* Glow pulse ring */}
      <div
        className={`absolute inset-0 rounded-sm pointer-events-none transition-all duration-700 z-10 ${
          glowing ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
        }`}
        style={{
          boxShadow: glowing
            ? '0 0 30px 8px rgba(201,168,76,0.55), 0 0 60px 16px rgba(201,168,76,0.25)'
            : 'none',
          borderRadius: '4px',
        }}
      />

      {/* Hover glow (subtle) */}
      <div
        className="absolute inset-0 rounded-sm pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          boxShadow: '0 0 20px 4px rgba(201,168,76,0.18)',
        }}
      />

      {/* Card flip container */}
      <div
        className="relative w-full transition-transform duration-700"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          height: '360px',
        }}
      >
        {/* ── FRONT (back of tarot card) ── */}
        <div
          className="absolute inset-0 rounded-sm flex flex-col items-center justify-center overflow-hidden"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 bg-charcoal" />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                #C9A84C 0px, #C9A84C 1px,
                transparent 1px, transparent 12px
              )`,
            }}
          />
          {/* Gold border */}
          <div className="absolute inset-[6px] border border-gold/40 rounded-sm pointer-events-none" />
          <div className="absolute inset-[10px] border border-gold/15 rounded-sm pointer-events-none" />

          {/* Center ornament */}
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full border border-gold/50 flex items-center justify-center">
              <span className="text-gold text-2xl">✦</span>
            </div>
            <p className="font-sans text-gold/60 text-xs tracking-[0.35em] uppercase">
              Tap to Reveal
            </p>
          </div>

          {/* Corner ornaments */}
          <span className="absolute top-4 left-4 text-gold/30 text-xs">✦</span>
          <span className="absolute top-4 right-4 text-gold/30 text-xs">✦</span>
          <span className="absolute bottom-4 left-4 text-gold/30 text-xs">✦</span>
          <span className="absolute bottom-4 right-4 text-gold/30 text-xs">✦</span>
        </div>

        {/* ── BACK (project info) ── */}
        <div
          className="absolute inset-0 rounded-sm flex flex-col justify-between overflow-hidden bg-charcoal"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Top accent line */}
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-gold to-transparent" />

          <div className="flex flex-col gap-4 p-6 flex-1 justify-between">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={`font-sans text-[10px] tracking-widest uppercase border px-2 py-[2px] rounded-sm ${statusColor[project.status]}`}>
                  {project.status}
                </span>
                <span className="font-sans text-muted text-[10px] tracking-widest">{project.year}</span>
              </div>
              <h3 className="font-serif text-cream text-2xl font-light leading-tight mb-2">
                {project.title}
              </h3>
              <p className="font-sans text-muted text-sm leading-relaxed">
                {project.desc}
              </p>
            </div>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="font-sans text-[10px] tracking-widest uppercase text-gold/80 border border-gold/20 px-2 py-1 rounded-sm"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* CTA hint */}
            <div className="flex items-center gap-2 pt-2 border-t border-gold/10">
              <span className="text-gold text-xs animate-pulse">✦</span>
              <p className="font-sans text-gold/60 text-xs tracking-wider">
                Klik lagi untuk melihat project
              </p>
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-gold to-transparent" />
        </div>
      </div>
    </div>
  )
}

// ── MAIN SECTION ──────────────────────────────────────────────────
export default function Projects() {
  const [activeTab, setActiveTab] = useState<Category>('coding')
  const container = useRef(null)
  const prevTab = useRef<Category>('coding')

  useGSAP(() => {
    gsap.from('.projects-label', {
      opacity: 0, y: 30, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: '.projects-label', start: 'top 85%' },
    })
    gsap.from('.projects-title', {
      opacity: 0, y: 50, duration: 1, ease: 'power4.out',
      scrollTrigger: { trigger: '.projects-title', start: 'top 85%' },
    })
    gsap.from('.folder-tab', {
      opacity: 0, y: 20, duration: 0.6, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: '.folder-tabs', start: 'top 88%' },
    })
  }, { scope: container })

  const handleTabChange = (key: Category) => {
    if (key === activeTab) return
    prevTab.current = activeTab

    // Animate cards out then switch tab
    gsap.to('.tarot-card', {
      opacity: 0, y: 20, duration: 0.3, stagger: 0.05, ease: 'power2.in',
      onComplete: () => {
        setActiveTab(key)
        gsap.fromTo(
          '.tarot-card',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' }
        )
      },
    })
  }

  return (
    <section
      ref={container}
      id="projects"
      className="min-h-screen bg-charcoal py-24 px-6 md:px-20"
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <p className="projects-label text-gold tracking-[0.4em] text-xs uppercase font-sans mb-3">
            My Work
          </p>
          <h2 className="projects-title font-serif text-cream text-5xl md:text-6xl font-light leading-tight">
            Karya &amp; <br />
            <span className="italic text-gold">Project</span>
          </h2>
        </div>

        {/* ── FOLDER TABS ── */}
        <div className="folder-tabs flex items-end gap-0 mb-0 select-none">
          {tabConfig.map((tab) => {
            const isActive = activeTab === tab.key
            return (
              <button
                key={tab.key}
                onClick={() => handleTabChange(tab.key)}
                className={`folder-tab relative font-sans text-sm tracking-widest uppercase px-6 py-3 transition-all duration-300 rounded-t-sm cursor-pointer
                  ${isActive
                    ? 'bg-[#1e1e1e] text-gold border border-b-0 border-gold/30 z-10'
                    : 'bg-charcoal text-muted border border-b border-gold/10 hover:text-gold/70'
                  }`}
                style={{ marginBottom: isActive ? '-1px' : '0' }}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[2px]"
                    style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }}
                  />
                )}
              </button>
            )
          })}
          {/* Tab right filler border */}
          <div className="flex-1 border-b border-gold/10" />
        </div>

        {/* ── CARD GRID ── */}
        <div
          className="border border-t-0 border-gold/10 bg-[#1e1e1e] p-8 rounded-b-sm rounded-tr-sm"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects[activeTab].map((project) => (
              <TarotCard key={project.id} project={project} />
            ))}
          </div>

          {/* Footer hint */}
          <p className="font-sans text-muted/40 text-xs text-center tracking-widest uppercase mt-10">
            ✦ Klik card untuk membaliknya · Klik lagi untuk membuka project ✦
          </p>
        </div>

      </div>
    </section>
  )
}