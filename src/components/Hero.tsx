'use client'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'

export default function Hero() {
  const container = useRef(null)

  useGSAP(() => {
    gsap.from('.hero-title', {
      y: 80,
      opacity: 0,
      duration: 1.2,
      ease: 'power4.out',
    })
    gsap.from('.hero-sub', {
      y: 40,
      opacity: 0,
      duration: 1,
      delay: 0.4,
      ease: 'power3.out',
    })
  }, { scope: container })

  return (
    <section ref={container} className="min-h-screen bg-charcoal flex flex-col items-center justify-center text-center px-6">
      <p className="hero-sub text-gold tracking-[0.4em] text-sm uppercase mb-4 font-sans">
        Welcome to my world
      </p>
      <h1 className="hero-title font-serif text-cream text-6xl md:text-8xl font-light leading-tight">
        Crafting Digital <br />
        <span className="text-gold italic">Experiences</span>
      </h1>
    </section>
  )
}