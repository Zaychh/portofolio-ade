'use client'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Profil from '../../public/image/profil.png'

const navLinks = [
  { label: 'Home',     href: '#hero' },
  { label: 'About',    href: '#about' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact' },
]

const hobbyLinks = [
  { label: 'Hobby', href: '#hobby' },
]

export default function Navbar() {
  const [scrolled,      setScrolled] = useState(false)
  const [activeSection, setActive]   = useState('#hero')
  const [menuOpen,      setMenuOpen]  = useState(false)
  const router = useRouter()
  const container = useRef(null)

  // ── Scroll listener ─────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)

      const allLinks = [...navLinks, ...hobbyLinks]
      const ids = allLinks.map((l) => l.href)
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.querySelector(ids[i])
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(ids[i])
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Entrance animation ───────────────────────────────────────────
  useGSAP(() => {
    gsap.from('.nav-root', {
      y: -60, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.2,
    })
  }, { scope: container })

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header ref={container} className="fixed top-0 left-0 right-0 z-50">
      <nav
        className="nav-root transition-all duration-500 px-6 md:px-12 py-3 flex items-center justify-between gap-6"
        style={{
          backgroundColor: scrolled ? 'rgba(26,26,26,0.92)' : 'transparent',
          backdropFilter:  scrolled ? 'blur(12px)'           : 'none',
          borderBottom:    scrolled ? '1px solid rgba(201,168,76,0.1)' : 'none',
          boxShadow:       scrolled ? '0 4px 30px rgba(0,0,0,0.4)'    : 'none',
        }}
      >

        {/* ── LEFT: Logo + Nama ──────────────────────────────────── */}
        <button
          onClick={() => scrollTo('#hero')}
          className="flex items-center gap-3 group shrink-0"
        >
          <div
            className="relative w-9 h-9 rounded-full overflow-hidden transition-all duration-300"
            style={{ border: '1px solid rgba(201,168,76,0.4)', boxShadow: '0 0 8px 2px rgba(201,168,76,0.25)' }}
          >
            <Image src={Profil} alt="Profil" fill className="object-cover" />
          </div>
          <span className="font-serif text-cream text-base font-light tracking-wide group-hover:text-gold transition-colors duration-300">
            Portofolioku
          </span>
        </button>

        {/* ── RIGHT: Nav Links (desktop) ─────────────────────────── */}
        <div className="hidden md:flex items-center gap-1">

          <span className="font-sans text-[9px] tracking-[0.3em] uppercase mr-2"
            style={{ color: 'rgba(107,107,107,0.5)' }}>
            Main
          </span>

          {navLinks.map((link) => {
            const isActive = activeSection === link.href
            return (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="relative font-sans text-xs tracking-widest uppercase px-4 py-2 rounded-sm transition-all duration-300"
                style={{ color: isActive ? '#C9A84C' : '#6B6B6B' }}
                onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = '#F5F0E8' }}
                onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = '#6B6B6B' }}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-[1px] rounded-full"
                    style={{ backgroundColor: '#C9A84C' }} />
                )}
              </button>
            )
          })}

          <div className="w-px h-4 mx-2" style={{ backgroundColor: 'rgba(201,168,76,0.2)' }} />

          <span className="font-sans text-[9px] tracking-[0.3em] uppercase mr-2"
            style={{ color: 'rgba(107,107,107,0.5)' }}>
            Hobby
          </span>

          {hobbyLinks.map((link) => {
            const isActive = activeSection === link.href
            return (
              <button
                key={link.href}
                onClick={() => router.push('/hobby')}
                className="relative font-sans text-xs tracking-widest uppercase px-4 py-2 rounded-sm transition-all duration-300"
                style={{ color: isActive ? '#C9A84C' : '#6B6B6B' }}
                onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = '#F5F0E8' }}
                onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = '#6B6B6B' }}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-[1px] rounded-full"
                    style={{ backgroundColor: '#C9A84C' }} />
                )}
              </button>
            )
          })}
        </div>

        {/* ── MOBILE: Hamburger ──────────────────────────────────── */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {[
            menuOpen ? 'rotate(45deg) translateY(7px)'  : 'none',
            null,
            menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none',
          ].map((transform, i) =>
            transform !== null ? (
              <span key={i} className="block h-px w-6 transition-all duration-300"
                style={{ backgroundColor: '#F5F0E8', transform: transform ?? 'none' }} />
            ) : (
              <span key={i} className="block h-px w-6 transition-all duration-300"
                style={{ backgroundColor: '#F5F0E8', opacity: menuOpen ? 0 : 1 }} />
            )
          )}
        </button>
      </nav>

      {/* ── MOBILE MENU ────────────────────────────────────────────── */}
      <div
        className="md:hidden transition-all duration-300 overflow-hidden"
        style={{
          maxHeight:       menuOpen ? '400px' : '0px',
          backgroundColor: 'rgba(26,26,26,0.95)',
          backdropFilter:  'blur(12px)',
          borderBottom:    menuOpen ? '1px solid rgba(201,168,76,0.1)' : 'none',
        }}
      >
        <div className="flex flex-col px-6 gap-1 py-4">
          <p className="font-sans text-[9px] tracking-[0.3em] uppercase mb-2"
            style={{ color: 'rgba(107,107,107,0.5)' }}>Main</p>

          {navLinks.map((link) => (
            <button key={link.href} onClick={() => scrollTo(link.href)}
              className="text-left font-sans text-sm tracking-widest uppercase py-2 transition-colors"
              style={{
                color:        activeSection === link.href ? '#C9A84C' : '#6B6B6B',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}>
              {link.label}
            </button>
          ))}

          <p className="font-sans text-[9px] tracking-[0.3em] uppercase mt-4 mb-2"
            style={{ color: 'rgba(107,107,107,0.5)' }}>Hobby</p>

          {hobbyLinks.map((link) => (
            <button key={link.href} onClick={() => scrollTo(link.href)}
              className="text-left font-sans text-sm tracking-widest uppercase py-2 transition-colors"
              style={{ color: activeSection === link.href ? '#C9A84C' : '#6B6B6B' }}>
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}