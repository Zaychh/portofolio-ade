'use client'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image, { StaticImageData } from 'next/image'
import { useRef } from 'react'
import imgNext from '../../public/icons/NextJs.png'
import imgReact from '../../public/icons/React.png'
import imgVite from '../../public/icons/vite.jpg'
import imgTailwind from '../../public/icons/Tailwind.png'
import imgGSAP from '../../public/icons/GSAP.jpg'
import imgLaravel from '../../public/icons/Laravel.png'
import imgExpress from '../../public/icons/expressjs.png'
import imgElysia from '../../public/icons/ELysia.png'
import imgRails from '../../public/icons/ruby.png'
import imgTS from '../../public/icons/TypeScript.png'
import imgJS from '../../public/icons/javascript.png'
import imgPHP from '../../public/icons/php.png'
import imgCsharp from '../../public/icons/csharp.png'
import imgLuau from '../../public/icons/luau.png'
import imgMySQL from '../../public/icons/mysql.png'
import imgMongoDB from '../../public/icons/mongodb.png'
import imgFigma from '../../public/icons/figma.png'
import imgBlender from '../../public/icons/blender.png'
import imgUnity from '../../public/icons/unity.png'
import imgRoblox from '../../public/icons/robloxstudio.png'


gsap.registerPlugin(ScrollTrigger)

// ── TIPE ─────────────────────────────────────────────────────────
type Skill = {
  name: string
  icon: StaticImageData   // path di /public/icons/  (e.g. /icons/nextjs.svg)
  mastery: number // 0–100
  glow: string   // warna neon glow CSS
}

type SkillGroup = {
  category: string
  emoji: string
  skills: Skill[]
}

// ── DATA SKILL ───────────────────────────────────────────────────
// Ganti nilai `mastery` sesuai kemampuan aslimu
// Ganti `icon` dengan path logo di /public/icons/
// Download logo SVG dari https://svgl.app atau https://simpleicons.org
const skillGroups: SkillGroup[] = [
  {
    category: 'Frontend',
    emoji: '🖥️',
    skills: [
      { name: 'Next.js',     icon: imgNext,     mastery: 72, glow: '#ffffff' },
      { name: 'React',       icon: imgReact,       mastery: 80, glow: '#61DAFB' },
      { name: 'Vite',        icon: imgVite,        mastery: 80, glow: '#BD34FE' },
      { name: 'TailwindCSS', icon: imgTailwind,    mastery: 85, glow: '#38BDF8' },
      { name: 'GSAP',        icon: imgGSAP,        mastery: 70, glow: '#88CE02' },
    ],
  },
  {
    category: 'Backend',
    emoji: '⚙️',
    skills: [
      { name: 'Laravel',      icon: imgLaravel,      mastery: 75, glow: '#FF2D20' },
      { name: 'Express.js',   icon: imgExpress,      mastery: 90, glow: '#ffffff' },
      { name: 'Elysia.js',    icon: imgElysia,       mastery: 42, glow: '#A78BFA' },
      { name: 'Ruby on Rails',icon: imgRails,        mastery: 20, glow: '#CC0000' },
    ],
  },
  {
    category: 'Language',
    emoji: '📝',
    skills: [
      { name: 'TypeScript', icon: imgTS, mastery: 75, glow: '#3178C6' },
      { name: 'JavaScript', icon: imgJS, mastery: 85, glow: '#F7DF1E' },
      { name: 'PHP',        icon: imgPHP,        mastery: 80, glow: '#8892BF' },
      { name: 'C#',         icon: imgCsharp,     mastery: 45, glow: '#9B59B6' },
      { name: 'Luau',       icon: imgLuau,       mastery: 89, glow: '#e00' },
    ],
  },
  {
    category: 'Database',
    emoji: '🗄️',
    skills: [
      { name: 'MySQL',   icon: imgMySQL,   mastery: 82, glow: '#4479A1' },
      { name: 'MongoDB', icon: imgMongoDB, mastery: 30, glow: '#47A248' },
    ],
  },
  {
    category: 'Tools & Design',
    emoji: '🎨',
    skills: [
      { name: 'Figma',         icon: imgFigma,         mastery: 70, glow: '#F24E1E' },
      { name: 'Blender',       icon: imgBlender,       mastery: 10, glow: '#EA7600' },
      { name: 'Unity',         icon: imgUnity,         mastery: 45, glow: '#ffffff' },
      { name: 'Roblox Studio', icon: imgRoblox,        mastery: 55, glow: '#e00' },
    ],
  },
]

// ── MASTERY LABEL ────────────────────────────────────────────────
function masteryLabel(pct: number) {
  if (pct >= 85) return 'Expert'
  if (pct >= 70) return 'Advanced'
  if (pct >= 55) return 'Intermediate'
  return 'Learning'
}

// ── SKILL CARD ───────────────────────────────────────────────────
function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  // Alternate float direction per card for natural rhythm
  const floatClass = index % 2 === 0 ? 'animate-float-a' : 'animate-float-b'

  return (
    <div
      className={`skill-card relative flex flex-col items-center gap-3 px-4 pt-5 pb-4 rounded-sm bg-[#161616] border border-white/5 cursor-default ${floatClass}`}
      style={{
        // Neon glow border on hover via CSS var
        '--glow': skill.glow,
      } as React.CSSProperties}
    >
      {/* Neon glow edge */}
      <div
        className="neon-ring absolute inset-0 rounded-sm pointer-events-none transition-opacity duration-500 opacity-40"
        style={{ boxShadow: `0 0 12px 2px ${skill.glow}55, inset 0 0 8px 1px ${skill.glow}22` }}
      />

      {/* Icon */}
      <div className="relative w-10 h-10">
        <Image
          src={skill.icon}
          alt={skill.name}
          fill
          className="object-contain"
        />
      </div>

      {/* Name */}
      <p className="font-sans text-cream text-xs font-medium tracking-wide text-center leading-tight">
        {skill.name}
      </p>

      {/* Mastery bar */}
      <div className="w-full flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <span className="font-sans text-[9px] text-muted uppercase tracking-widest">
            {masteryLabel(skill.mastery)}
          </span>
          <span className="font-sans text-[9px] tracking-wide" style={{ color: skill.glow }}>
            {skill.mastery}%
          </span>
        </div>
        <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden">
          <div
            className="mastery-bar h-full rounded-full transition-all duration-1000"
            style={{
              width: `${skill.mastery}%`,
              background: `linear-gradient(90deg, ${skill.glow}88, ${skill.glow})`,
              boxShadow: `0 0 6px 1px ${skill.glow}66`,
            }}
          />
        </div>
      </div>
    </div>
  )
}

// ── MAIN SECTION ─────────────────────────────────────────────────
export default function Skills() {
  const container = useRef(null)

  useGSAP(() => {
    // Header
    gsap.from('.skills-label', {
      opacity: 0, y: 30, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: '.skills-label', start: 'top 88%' },
    })
    gsap.from('.skills-title', {
      opacity: 0, y: 50, duration: 1, ease: 'power4.out',
      scrollTrigger: { trigger: '.skills-title', start: 'top 88%' },
    })

    // Category headers
    gsap.from('.cat-header', {
      opacity: 0, x: -20, duration: 0.6, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: '.skill-groups', start: 'top 85%' },
    })

    // Cards stagger per group
    gsap.from('.skill-card', {
      opacity: 0, y: 40, scale: 0.92, duration: 0.6,
      stagger: { amount: 0.8, from: 'start' },
      ease: 'power3.out',
      scrollTrigger: { trigger: '.skill-groups', start: 'top 82%' },
    })

    // Animate mastery bars after cards appear
    gsap.from('.mastery-bar', {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 1,
      stagger: { amount: 1 },
      ease: 'power2.out',
      delay: 0.3,
      scrollTrigger: { trigger: '.skill-groups', start: 'top 82%' },
    })
  }, { scope: container })

  return (
    <section
      ref={container}
      id="skills"
      className="bg-[#0e0e0e] py-24 px-6 md:px-20"
    >
      {/* Floating keyframes injected via style tag */}
      <style>{`
        @keyframes floatA {
          0%, 100% { transform: translateY(0px);   }
          50%       { transform: translateY(-8px);  }
        }
        @keyframes floatB {
          0%, 100% { transform: translateY(-5px);  }
          50%       { transform: translateY(4px);   }
        }
        .animate-float-a {
          animation: floatA 4s ease-in-out infinite;
        }
        .animate-float-b {
          animation: floatB 4.8s ease-in-out infinite;
        }
        /* Pause float on hover */
        .skill-card:hover {
          animation-play-state: paused;
        }
        /* Brighten glow on hover */
        .skill-card:hover .neon-ring {
          opacity: 1 !important;
          box-shadow: 0 0 22px 5px var(--glow, #C9A84C), inset 0 0 14px 2px var(--glow, #C9A84C)33 !important;
        }
      `}</style>

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <p className="skills-label text-gold tracking-[0.4em] text-xs uppercase font-sans mb-3">
            Expertise
          </p>
          <h2 className="skills-title font-serif text-cream text-5xl md:text-6xl font-light leading-tight">
            Tech &amp; <br />
            <span className="italic text-gold">Skills</span>
          </h2>
        </div>

        {/* Groups */}
        <div className="skill-groups flex flex-col gap-14">
          {skillGroups.map((group) => (
            <div key={group.category}>
              {/* Category header */}
              <div className="cat-header flex items-center gap-3 mb-6">
                <span className="text-lg">{group.emoji}</span>
                <h3 className="font-sans text-cream/60 text-xs tracking-[0.35em] uppercase">
                  {group.category}
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-gold/20 to-transparent" />
              </div>

              {/* Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {group.skills.map((skill, i) => (
                  <SkillCard key={skill.name} skill={skill} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom ornament */}
        <div className="flex items-center gap-4 mt-20">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold/20" />
          <span className="text-gold/30 text-xs tracking-widest">✦</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold/20" />
        </div>

      </div>
    </section>
  )
}