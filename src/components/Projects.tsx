'use client'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image, { StaticImageData } from 'next/image'
import { useRef, useState } from 'react'

gsap.registerPlugin(ScrollTrigger)

// ── TYPES ─────────────────────────────────────────────────────────
type Project = {
  id: number
  title: string
  desc: string
  tech: string[]
  url: string
  year: string
  status: 'Live' | 'WIP' | 'Archive'
  preview: string | StaticImageData // path di /public/previews/
}

type Category = 'development' | 'modelling' | 'design'

// ── DATA ──────────────────────────────────────────────────────────
// Ganti preview dengan path foto screenshot / render / workspace kamu
// Taruh foto di /public/previews/nama-file.jpg
const projects: Record<Category, Project[]> = {
  development: [
    {
      id: 1,
      title: 'Portfolio Website',
      desc: 'Website portofolio personal dengan animasi GSAP dan desain elegant luxury.',
      tech: ['Next.js', 'GSAP', 'Tailwind'],
      url: 'https://github.com/username/portfolio',
      year: '2026',
      status: 'Live',
      preview: '/previews/portfolio.jpg',
    },
    {
      id: 2,
      title: 'Web App E-Course Karisma Academy',
      desc: 'Aplikasi web untuk menampilkan kursus online dari Karisma Academy.',
      tech: ['React & Vite', 'Express.js', 'MySQL'],
      url: 'https://github.com/username/karisma',
      year: '2025',
      status: 'Archive',
      preview: '/previews/karisma.jpg',
    },
    {
      id: 3,
      title: 'Web App Toko Baju Online',
      desc: 'Aplikasi web untuk menampilkan dan menjual baju secara online.',
      tech: ['Next.js', 'Laravel', 'MySQL'],
      url: 'https://github.com/username/toko-baju',
      year: '2026',
      status: 'WIP',
      preview: '/previews/toko.jpg',
    },
    // Tambah project lain di sini ...
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
      preview: '/previews/character.jpg',
    },
    {
      id: 5,
      title: 'Architectural Viz',
      desc: 'Visualisasi arsitektur rumah modern dengan lighting realistis.',
      tech: ['Blender', 'Cycles'],
      url: 'https://www.artstation.com/username',
      year: '2023',
      status: 'Archive',
      preview: '/previews/arch.jpg',
    },
    {
      id: 6,
      title: 'Product Render',
      desc: 'Product render untuk kebutuhan iklan dan presentasi.',
      tech: ['Blender', 'EEVEE'],
      url: 'https://www.artstation.com/username',
      year: '2023',
      status: 'Live',
      preview: '/previews/product.jpg',
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
      preview: '/previews/mobile.jpg',
    },
    {
      id: 8,
      title: 'Brand Identity',
      desc: 'Identitas brand lengkap termasuk logo, warna, dan typography.',
      tech: ['Figma', 'Illustrator'],
      url: 'https://www.figma.com/username',
      year: '2023',
      status: 'Archive',
      preview: '/previews/brand.jpg',
    },
    {
      id: 9,
      title: 'Dashboard UI',
      desc: 'Desain dashboard analytics untuk platform SaaS.',
      tech: ['Figma', 'Auto Layout'],
      url: 'https://www.figma.com/username',
      year: '2024',
      status: 'WIP',
      preview: '/previews/dashboard.jpg',
    },
  ],
}

const tabConfig: { key: Category; label: string; num: string }[] = [
  { key: 'development', label: 'Development', num: '01' },
  { key: 'modelling',   label: 'Modelling',   num: '02' },
  { key: 'design',      label: 'Design',       num: '03' },
]

const statusStyle: Record<string, { color: string; border: string }> = {
  Live:    { color: '#34d399', border: 'rgba(52,211,153,0.3)' },
  WIP:     { color: '#fbbf24', border: 'rgba(251,191,36,0.3)' },
  Archive: { color: '#71717a', border: 'rgba(113,113,122,0.3)' },
}

// ── PROJECT CARD ──────────────────────────────────────────────────
function ProjectCard({ project }: { project: Project }) {
  const [flipped, setFlipped] = useState(false)
  const [glowing, setGlowing] = useState(false)

  const handleClick = () => {
    if (!flipped) {
      setFlipped(true)
      setGlowing(true)
      setTimeout(() => setGlowing(false), 1000)
    } else {
      window.open(project.url, '_blank')
    }
  }

  const st = statusStyle[project.status]

  return (
    <div
      className="tarot-card relative cursor-pointer select-none"
      style={{ perspective: '1200px', height: '420px' }}
      onClick={handleClick}
    >
      {/* Glow pulse on flip */}
      <div
        className="absolute inset-0 rounded-sm pointer-events-none z-10 transition-all duration-700"
        style={{
          boxShadow: glowing
            ? '0 0 32px 8px rgba(201,168,76,0.5), 0 0 64px 20px rgba(201,168,76,0.2)'
            : 'none',
          opacity: glowing ? 1 : 0,
        }}
      />

      {/* Flip wrapper */}
      <div
        className="relative w-full h-full transition-transform duration-700"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >

        {/* ── FRONT: Ornamen Tarot ── */}
        <div
          className="absolute inset-0 rounded-sm overflow-hidden flex flex-col items-center justify-center"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', backgroundColor: '#141414' }}
        >
          {/* Diagonal pattern */}
          <div className="absolute inset-0 opacity-[0.07]" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #C9A84C 0px, #C9A84C 1px, transparent 1px, transparent 14px)',
          }} />
          {/* Double border */}
          <div className="absolute inset-[8px] rounded-sm pointer-events-none" style={{ border: '1px solid rgba(201,168,76,0.35)' }} />
          <div className="absolute inset-[13px] rounded-sm pointer-events-none" style={{ border: '1px solid rgba(201,168,76,0.12)' }} />

          {/* Ornament center */}
          <div className="relative z-10 flex flex-col items-center gap-5">
            <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ border: '1px solid rgba(201,168,76,0.4)' }}>
              <span style={{ color: '#C9A84C', fontSize: '20px' }}>✦</span>
            </div>
            <p className="font-sans text-[10px] tracking-[0.4em] uppercase" style={{ color: 'rgba(201,168,76,0.5)' }}>
              Tap to Reveal
            </p>
          </div>

          {/* Corners */}
          {['top-3 left-3','top-3 right-3','bottom-3 left-3','bottom-3 right-3'].map((pos) => (
            <span key={pos} className={`absolute ${pos} text-[10px]`} style={{ color: 'rgba(201,168,76,0.25)' }}>✦</span>
          ))}

          {/* Hover glow */}
          <div className="absolute inset-0 rounded-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ boxShadow: '0 0 20px 3px rgba(201,168,76,0.12)' }} />
        </div>

        {/* ── BACK: Project Info ── */}
        <div
          className="absolute inset-0 rounded-sm overflow-hidden flex flex-col"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            backgroundColor: '#161616',
          }}
        >
          {/* Top gold line */}
          <div className="h-[2px] w-full shrink-0" style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }} />

          {/* Preview image */}
          <div className="relative w-full shrink-0" style={{ height: '160px', backgroundColor: '#0e0e0e' }}>
            <Image
              src={project.preview}
              alt={project.title}
              fill
              className="object-cover"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 50%, #161616 100%)' }} />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-3 px-5 pb-5 flex-1 justify-between">
            {/* Status + Year */}
            <div className="flex items-center justify-between">
              <span
                className="font-sans text-[9px] tracking-widest uppercase px-2 py-[2px] rounded-sm"
                style={{ color: st.color, border: `1px solid ${st.border}` }}
              >
                {project.status}
              </span>
              <span className="font-sans text-[10px] tracking-widest" style={{ color: '#6B6B6B' }}>
                {project.year}
              </span>
            </div>

            {/* Title + Desc */}
            <div>
              <h3 className="font-serif text-cream text-xl font-light leading-tight mb-1">
                {project.title}
              </h3>
              <p className="font-sans text-xs leading-relaxed" style={{ color: '#6B6B6B' }}>
                {project.desc}
              </p>
            </div>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-1">
              {project.tech.map((t) => (
                <span key={t} className="font-sans text-[9px] tracking-widest uppercase px-2 py-1 rounded-sm"
                  style={{ color: 'rgba(201,168,76,0.7)', border: '1px solid rgba(201,168,76,0.15)' }}>
                  {t}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-2 pt-2" style={{ borderTop: '1px solid rgba(201,168,76,0.08)' }}>
              <span className="text-xs animate-pulse" style={{ color: '#C9A84C' }}>✦</span>
              <p className="font-sans text-[10px] tracking-wider" style={{ color: 'rgba(201,168,76,0.5)' }}>
                Klik lagi untuk membuka project
              </p>
            </div>
          </div>

          {/* Bottom gold line */}
          <div className="h-[2px] w-full shrink-0" style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }} />
        </div>

      </div>
    </div>
  )
}

// ── CAROUSEL WRAPPER ──────────────────────────────────────────────
const CARDS_PER_PAGE = 3

function Carousel({ items }: { items: Project[] }) {
  const [page, setPage] = useState(0)
  const totalPages = Math.ceil(items.length / CARDS_PER_PAGE)
  const gridRef = useRef<HTMLDivElement>(null)

  const goTo = (next: number) => {
    if (next < 0 || next >= totalPages) return
    // Slide out
    gsap.to(gridRef.current, {
      opacity: 0, x: next > page ? -30 : 30, duration: 0.25, ease: 'power2.in',
      onComplete: () => {
        setPage(next)
        // Slide in
        gsap.fromTo(gridRef.current,
          { opacity: 0, x: next > page ? 30 : -30 },
          { opacity: 1, x: 0, duration: 0.4, ease: 'power3.out' }
        )
      }
    })
  }

  const visibleItems = items.slice(page * CARDS_PER_PAGE, page * CARDS_PER_PAGE + CARDS_PER_PAGE)

  return (
    <div>
      {/* Grid */}
      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {visibleItems.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Carousel controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-8 px-1">
          {/* Page numbers */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="font-sans text-[10px] tracking-widest transition-all duration-300 w-7 h-7 rounded-sm flex items-center justify-center"
                style={{
                  color:           i === page ? '#C9A84C' : '#6B6B6B',
                  backgroundColor: i === page ? 'rgba(201,168,76,0.1)' : 'transparent',
                  border:          i === page ? '1px solid rgba(201,168,76,0.3)' : '1px solid transparent',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </button>
            ))}
          </div>

          {/* Counter + Arrows */}
          <div className="flex items-center gap-4">
            <span className="font-sans text-[10px] tracking-widest" style={{ color: '#6B6B6B' }}>
              <span style={{ color: '#C9A84C' }}>{String(page + 1).padStart(2, '0')}</span>
              {' / '}
              {String(totalPages).padStart(2, '0')}
            </span>

            <div className="flex items-center gap-2">
              {/* Prev */}
              <button
                onClick={() => goTo(page - 1)}
                disabled={page === 0}
                className="w-8 h-8 rounded-sm flex items-center justify-center transition-all duration-300"
                style={{
                  border:          '1px solid rgba(201,168,76,0.2)',
                  color:           page === 0 ? 'rgba(107,107,107,0.4)' : '#C9A84C',
                  backgroundColor: 'transparent',
                  cursor:          page === 0 ? 'not-allowed' : 'pointer',
                }}
              >
                ←
              </button>
              {/* Next */}
              <button
                onClick={() => goTo(page + 1)}
                disabled={page === totalPages - 1}
                className="w-8 h-8 rounded-sm flex items-center justify-center transition-all duration-300"
                style={{
                  border:          '1px solid rgba(201,168,76,0.2)',
                  color:           page === totalPages - 1 ? 'rgba(107,107,107,0.4)' : '#C9A84C',
                  backgroundColor: 'transparent',
                  cursor:          page === totalPages - 1 ? 'not-allowed' : 'pointer',
                }}
              >
                →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hint */}
      <p className="font-sans text-center text-[10px] tracking-widest uppercase mt-6"
        style={{ color: 'rgba(107,107,107,0.35)' }}>
        ✦ Klik card untuk membaliknya · Klik lagi untuk membuka project ✦
      </p>
    </div>
  )
}

// ── MAIN SECTION ──────────────────────────────────────────────────
export default function Projects() {
  const [activeTab, setActiveTab]   = useState<Category>('development')
  const [prevTab,   setPrevTab]     = useState<Category | null>(null)
  const container   = useRef(null)
  const contentRef  = useRef<HTMLDivElement>(null)

  // Scroll trigger entrance
  useGSAP(() => {
    gsap.from('.proj-label', {
      opacity: 0, y: 30, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: '.proj-label', start: 'top 88%' },
    })
    gsap.from('.proj-title', {
      opacity: 0, y: 50, duration: 1, ease: 'power4.out',
      scrollTrigger: { trigger: '.proj-title', start: 'top 88%' },
    })
    gsap.from('.folder-tab', {
      opacity: 0, y: 24, duration: 0.5, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: '.folder-tabs', start: 'top 88%' },
    })
    gsap.from(contentRef.current, {
      opacity: 0, y: 30, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: contentRef.current, start: 'top 88%' },
    })
  }, { scope: container })

  const handleTabChange = (key: Category) => {
    if (key === activeTab) return
    setPrevTab(activeTab)

    // Pull-up animation: content slides up & fades out, then new tab slides in from below
    gsap.to(contentRef.current, {
      opacity: 0, y: -20, duration: 0.25, ease: 'power2.in',
      onComplete: () => {
        setActiveTab(key)
        gsap.fromTo(contentRef.current,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }
        )
      }
    })
  }

  return (
    <section
      ref={container}
      id="projects"
      className="min-h-screen py-24 px-6 md:px-20"
      style={{ backgroundColor: '#0e0e0e' }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <p className="proj-label font-sans text-xs tracking-[0.4em] uppercase mb-3" style={{ color: '#C9A84C' }}>
            My Work
          </p>
          <h2 className="proj-title font-serif text-cream text-5xl md:text-6xl font-light leading-tight">
            Karya &amp; <br />
            <span className="italic" style={{ color: '#C9A84C' }}>Project</span>
          </h2>
        </div>

        {/* ── FOLDER TABS ── */}
        <div className="folder-tabs flex items-end gap-0 select-none">
          {tabConfig.map((tab) => {
            const isActive = activeTab === tab.key
            return (
              <button
                key={tab.key}
                onClick={() => handleTabChange(tab.key)}
                className="folder-tab relative font-sans text-xs tracking-[0.2em] uppercase px-7 py-3 transition-all duration-350 cursor-pointer rounded-t-sm"
                style={{
                  // Active tab: lifted up, bright, no bottom border
                  backgroundColor: isActive ? '#1a1a1a'               : '#111111',
                  color:           isActive ? '#C9A84C'               : '#555555',
                  border:          isActive
                    ? '1px solid rgba(201,168,76,0.25)'
                    : '1px solid rgba(255,255,255,0.05)',
                  borderBottom:    isActive ? '1px solid #1a1a1a'     : '1px solid rgba(201,168,76,0.15)',
                  // Pull-up effect on active
                  transform:       isActive ? 'translateY(-3px)'      : 'translateY(0)',
                  zIndex:          isActive ? 10                       : 1,
                  marginBottom:    isActive ? '-1px'                   : '0',
                  letterSpacing:   '0.15em',
                }}
              >
                {/* Number label */}
                <span
                  className="mr-2 font-sans"
                  style={{
                    fontSize: '9px',
                    color: isActive ? 'rgba(201,168,76,0.6)' : 'rgba(85,85,85,0.5)',
                    verticalAlign: 'middle',
                  }}
                >
                  {tab.num}
                </span>
                {tab.label}

                {/* Active bottom shimmer */}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[2px]"
                    style={{ background: 'linear-gradient(90deg, transparent, #C9A84C88, transparent)' }}
                  />
                )}
              </button>
            )
          })}

          {/* Right filler */}
          <div className="flex-1" style={{ borderBottom: '1px solid rgba(201,168,76,0.15)' }} />
        </div>

        {/* ── CONTENT PANEL ── */}
        <div
          ref={contentRef}
          className="p-7 rounded-b-sm rounded-tr-sm"
          style={{
            backgroundColor: '#1a1a1a',
            border: '1px solid rgba(201,168,76,0.15)',
            borderTop: 'none',
          }}
        >
          <Carousel key={activeTab} items={projects[activeTab]} />
        </div>

      </div>
    </section>
  )
}