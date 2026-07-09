'use client'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'
import Image from 'next/image'
import FotoDiri from '../../public/image/fotodiri.png'

gsap.registerPlugin(ScrollTrigger)

const education = [
  { year: '2014 – 2020', label: 'SDK', name: 'SDK Abdullah Ubaid 02', place: 'Surabaya' },
  { year: '2020 – 2023', label: 'MTs', name: 'MTs Darut Taqwa 02', place: 'Purwosari' },
  { year: '2023 – 2026', label: 'SMK', name: 'SMK PGRI 3', place: 'Malang' },
]

const experience = [
  {
    year: '2024',
    role: 'PKL / Magang Sekolah',
    company: 'PT. Kharisma Garuda',
    desc: 'Magang Sebagai Fullstack Developer, mengerjakan proyek internal untuk web app pembelajaran online Karisma Academy Menggunakan React, Vite, Express.js, MySQL dan Node.js',
  },
]

export default function About() {
  const container = useRef(null)

  useGSAP(() => {
    // Teks kiri
    gsap.from('.about-left > *', {
      x: -60,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container.current,
        start: 'top 75%',
      },
    })

    // Foto kanan
    gsap.from('.about-photo', {
      x: 60,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container.current,
        start: 'top 75%',
      },
    })

    // Timeline items
    gsap.from('.timeline-item', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.timeline-item',
        start: 'top 85%',
      },
    })
  }, { scope: container })

  return (
    <section
      ref={container}
      id="about"
      className="min-h-screen bg-cream px-8 md:px-20 py-28"
    >
      {/* Label section */}
      <p className="text-gold tracking-[0.4em] text-xs uppercase font-sans mb-4">
        About Me
      </p>

      <div className="flex flex-col lg:flex-row gap-16 items-start">

        {/* ── Kiri: Teks ── */}
        <div className="about-left flex-1 space-y-10">

          {/* Bio */}
          <div>
            <h2 className="font-serif text-charcoal text-5xl font-light leading-tight mb-4">
              Halo, saya <span className="text-gold italic">Adenatha Zauzi Magria</span>
            </h2>
            <p className="font-sans text-muted text-base leading-relaxed max-w-lg">
              Seorang programmer yang passionate dalam menciptakan pengalaman
              digital yang bermakna. Berasal dari Surabaya, Jawa Timur, saya percaya
              bahwa desain dan teknologi yang baik bisa mengubah cara orang
              berinteraksi dengan dunia.
            </p>
          </div>

          {/* Lokasi */}
          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-gold inline-block" />
            <span className="font-sans text-muted text-sm tracking-widest uppercase">
              Surabaya, Jawa Timur
            </span>
          </div>

          {/* Pengalaman Magang */}
          <div>
            <h3 className="font-serif text-charcoal text-2xl font-light mb-5">
              Pengalaman
            </h3>
            {experience.map((exp, i) => (
              <div
                key={i}
                className="border-l-2 border-gold pl-5 mb-4"
              >
                <span className="font-sans text-gold text-xs tracking-widest uppercase">
                  {exp.year}
                </span>
                <p className="font-serif text-charcoal text-lg mt-1">
                  {exp.role}{' '}
                  <span className="text-muted font-sans text-sm">
                    @ {exp.company}
                  </span>
                </p>
                <p className="font-sans text-muted text-sm mt-1 leading-relaxed">
                  {exp.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Riwayat Pendidikan */}
          <div>
            <h3 className="font-serif text-charcoal text-2xl font-light mb-5">
              Pendidikan
            </h3>
            <div className="relative border-l-2 border-gold/30 pl-6 space-y-6">
              {education.map((edu, i) => (
                <div key={i} className="timeline-item relative">
                  {/* Dot */}
                  <span className="absolute -left-[29px] top-1.5 w-3 h-3 rounded-full bg-gold border-2 border-cream" />

                  <span className="font-sans text-gold text-xs tracking-widest uppercase">
                    {edu.year}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-sans text-xs bg-charcoal text-cream px-2 py-0.5 rounded">
                      {edu.label}
                    </span>
                    <p className="font-serif text-charcoal text-lg">
                      {edu.name}
                    </p>
                  </div>
                  <p className="font-sans text-muted text-sm mt-0.5">
                    {edu.place}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── Kanan: Foto ── */}
        <div className="about-photo flex-shrink-0 w-full lg:w-80 xl:w-96">
          <div className="relative w-full aspect-[3/4] rounded-sm overflow-hidden">
            {/* Ganti src dengan foto kamu */}
            <Image
              src={FotoDiri}
              alt="Foto profil"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
            {/* Overlay gold aksen */}
            <div className="absolute inset-0 border border-gold/30 rounded-sm pointer-events-none" />
          </div>

          {/* Quote / tagline di bawah foto */}
          <p className="font-serif text-muted text-sm italic text-center mt-4 leading-relaxed">
            "I Saw, I Come, I Conquer"
          </p>
        </div>

      </div>
    </section>
  )
}