'use client'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { useEffect, useRef, useState, useCallback } from 'react'
import League from '../../../public/image/lol.jpg'
import HSR from '../../../public/image/hsr.jpg'
import Genshin from '../../../public/image/genshin.jpg'
import Minecraft from '../../../public/image/minecraft.png'
import ZZZ from '../../../public/image/zenless.png'
import Endfield from '../../../public/image/arkendfield.jpg'
import Uma from '../../../public/image/uma.jpg'
import CS2 from '../../../public/image/CS2.png'
import Mafia from '../../../public/image/mafia.jpg'
import L4D2 from '../../../public/image/L4D2.jpg'
import SOSFMT from '../../../public/image/SOSFMT.jpg'
import Strinova from '../../../public/image/strinova.png'
import NFS from '../../../public/image/nfsmw.jpg'
import Detroit from '../../../public/image/Detroit.jpg'
import Silent from '../../../public/image/SHF.jpg'
import DBD from '../../../public/image/DBD.jpg'
import Hitman from '../../../public/image/Hitman.jpg'
import PUBGM from '../../../public/image/pubgm.jpg'
import Roblox from '../../../public/image/roblox.jpg'
import LOL from '../../../public/image/lol.jpg'
import Reading from '../../../public/image/readbook.jpg'
import Listening from '../../../public/image/listeningmusic.png'
import Gaming from '../../../public/image/gamingset.png'
import Cooking from '../../../public/image/cooking.png'

gsap.registerPlugin(ScrollTrigger)

// ═══════════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════════

const topGames = [
  { title: 'League of Legends',        genre: 'MOBA',             cover: League,   glow: '#7eb8f7' },
  { title: 'Honkai: Star Rail',        genre: 'Turn-Based',       cover: HSR,      glow: '#f7c97e' },
  { title: 'Genshin Impact',           genre: 'RPG Open World',   cover: Genshin,  glow: '#ff4655' },
  { title: 'Minecraft',                genre: 'Sandbox',          cover: Minecraft, glow: '#6fcb6f' },
  { title: 'Zenless Zone Zero',        genre: 'RPG',              cover: ZZZ,      glow: '#ee0000' },
  { title: 'Arknight: Endfield',       genre: 'RPG Open World',   cover: Endfield, glow: '#ffd700' },
  { title: 'Uma Musume: Pretty Derby', genre: 'Sport Simulation', cover: Uma,      glow: '#c9a84c' },
]

const allGames = [
  { title: 'Counter Strike 2',          genre: 'Shooter',          cover: CS2,      glow: '#3a8fff' },
  { title: 'Mafia: Definitive Edition', genre: 'Action-adventure', cover: Mafia,    glow: '#c9a84c' },
  { title: 'Left 4 Dead 2',            genre: 'Co-op Shooter',    cover: L4D2,     glow: '#c0392b' },
  { title: 'Story Of Seasons: FOMT',   genre: 'Life Simulation',  cover: SOSFMT,   glow: '#6fcb6f' },
  { title: 'Strinova',                 genre: 'Shooter',          cover: Strinova, glow: '#c84b4b' },
  { title: 'NFS: Most Wanted',         genre: 'Racing',           cover: NFS,      glow: '#2ecc71' },
  { title: 'Detroit: Become Human',    genre: 'Action-adventure', cover: Detroit,  glow: '#9b59b6' },
  { title: 'SILENT HILL f',            genre: 'Horror',           cover: Silent,   glow: '#e91e8c' },
  { title: 'Dead by Daylight',         genre: 'Survival Horror',  cover: DBD,      glow: '#f39c12' },
  { title: 'Hitman: Absolution',       genre: 'Action-adventure', cover: Hitman,   glow: '#3498db' },
  { title: 'PUBGM',                    genre: 'Battle Royale',    cover: PUBGM,    glow: '#e74c3c' },
  { title: 'Roblox',                   genre: 'Platformer',       cover: Roblox,   glow: '#7f8c8d' },
]

const topMusicGenres = [
  { genre: 'Emo Metalcore', color: '#7eb8f7', icon: '💀' },
  { genre: 'Nu-Metal', color: '#f7a1c4', icon: '🤘' },
  { genre: 'Metalcore',     color: '#a8e6cf', icon: '🎸' },
  { genre: 'Pop',         color: '#ff6b6b', icon: '🎵' },
  { genre: 'Hip-Hop',   color: '#c9a84c', icon: '🎤' },
]

// ─── CARA MENAMBAH LAGU DENGAN FILE AUDIO LOKAL ───────────────────
//
// 1. Letakkan file .mp3 / .ogg / .wav di folder:  /public/audio/
//    Contoh:  /public/audio/idol.mp3
//
// 2. Di objek lagu, tambahkan field:  src: '/audio/idol.mp3'
//
// Contoh:
//   { title: 'Idol', artist: 'YOASOBI', cover: '...', color: '...', src: '/audio/idol.mp3' }
//
// Kalau field `src` tidak ada / dikosongi → player tetap muncul
// tapi tombol play tidak aktif dan badge "—" muncul di song card.
// ─────────────────────────────────────────────────────────────────

type Song = {
  title:  string
  artist: string
  cover:  string
  color:  string
  src?:   string   // path ke file audio di /public/audio/
}

const songs: Song[] = [
  { title: 'Caraphernelia',        artist: 'Pierce The Veil',      cover: '/hobby/music/clair.jpg',      color: '#7eb8f7' },
  { title: 'Usseewa',              artist: 'Ado',                  cover: '/hobby/music/usseewa.jpg',    color: '#9b59b6' },
  { title: 'Sleepwalking',         artist: 'Bring Me The Horizon',              cover: '/hobby/music/idol.jpg',       color: '#f1c40f' },
  { title: 'Hand Of Blood',     artist: 'Bullet For My Valentine',          cover: '/hobby/music/okayone.jpg',    color: '#e74c3c' },
  { title: 'Breaking The Habit',        artist: 'Linkin Park',                 cover: '/hobby/music/glimpse.jpg',    color: '#95a5a6' },
  { title: 'Blind',            artist: 'Korn',           cover: '/hobby/music/aesthetic.jpg',  color: '#a8e6cf' },
  { title: 'Memento Mori',            artist: 'Lamb Of God',        cover: '/hobby/music/nightowl.jpg',   color: '#3498db' },
  { title: 'Rollin',           artist: 'Limp Bizkit',          cover: '/hobby/music/spacesong.jpg',  color: '#1abc9c' },
  { title: 'Vermilion',            artist: 'Slipknot',          cover: '/hobby/music/sunflower.jpg',  color: '#f39c12' },
  { title: 'The Ghost Of You',              artist: 'My Chemical Romance',          cover: '/hobby/music/circles.jpg',    color: '#e67e22' },
  { title: 'Voice of The Soul',              artist: 'Death',        cover: '/hobby/music/badguy.jpg',     color: '#2ecc71' },
  { title: 'Lose Yourself',               artist: 'Eminem', cover: '/hobby/music/lovely.jpg',     color: '#9b59b6' },
  { title: 'Save Your Tears',                      artist: 'The Weeknd',                 cover: '/hobby/music/clair.jpg',      color: '#7eb8f7' },
]

const topReadGenres = [
  { genre: 'Fantasy',       color: '#9b59b6', icon: '🧙' },
  { genre: 'Romance Comedy',        color: '#3498db', icon: '🌹' },
  { genre: 'Action',   color: '#f1c40f', icon: '⚔️' },
  { genre: 'Thriller',      color: '#e74c3c', icon: '🔪' },
  { genre: 'Slice of Life', color: '#2ecc71', icon: '🌱' },
]

const books = [
  { title: 'Solo Leveling',                           type: 'Manhwa',  cover: '/hobby/books/sololeveling.jpg', glow: '#3498db' },
  { title: 'One Piece',                               type: 'Manga',   cover: '/hobby/books/onepiece.jpg',     glow: '#f39c12' },
  { title: 'Attack on Titan',                         type: 'Manga',   cover: '/hobby/books/aot.jpg',          glow: '#c0392b' },
  { title: 'Chainsaw Man',                            type: 'Manga',   cover: '/hobby/books/chainsawman.jpg',  glow: '#e74c3c' },
  { title: 'Jujutsu Kaisen',                          type: 'Manga',   cover: '/hobby/books/jjk.jpg',          glow: '#9b59b6' },
  { title: 'Mushoku Tensei',                          type: 'LN',      cover: '/hobby/books/mushoku.jpg',      glow: '#f1c40f' },
  { title: 'Re:Zero',                                 type: 'LN',      cover: '/hobby/books/rezero.jpg',       glow: '#1abc9c' },
  { title: 'Overlord',                                type: 'LN',      cover: '/hobby/books/overlord.jpg',     glow: '#2c3e50' },
  { title: 'That Time I Got Reincarnated as a Slime', type: 'LN',      cover: '/hobby/books/slime.jpg',        glow: '#3498db' },
  { title: 'The Rising of the Shield Hero',           type: 'LN',      cover: '/hobby/books/shieldhero.jpg',   glow: '#27ae60' },
]

const cookingFavs = [
  { name: 'Nasi Goreng Spesial', desc: 'Nasi goreng dengan topping telur mata sapi, ayam suwir, dan acar.',       emoji: '🍳', color: '#f39c12' },
  { name: 'Mie Goreng Jawa',     desc: 'Mie goreng khas Jawa dengan bumbu rempah yang kaya dan cabai merah.',     emoji: '🍜', color: '#e67e22' },
  { name: 'Ayam Bakar Kecap',    desc: 'Ayam bakar dengan marinasi kecap manis, bawang, dan rempah pilihan.',     emoji: '🍗', color: '#c0392b' },
  { name: 'Soto Ayam',           desc: 'Sup ayam kuning khas Indonesia dengan kuah bening yang gurih dan segar.', emoji: '🍲', color: '#f1c40f' },
  { name: 'Rendang',             desc: 'Daging sapi slow-cooked dengan santan dan rempah khas Minang.',           emoji: '🥩', color: '#8e44ad' },
  { name: 'Indomie Telur Keju',  desc: 'Classic late-night meal. Indomie rebus/goreng + telur + keju melt.',     emoji: '🍝', color: '#3498db' },
]
// ═══════════════════════════════════════════════════════════════════
// GLOBAL STYLES — inject sekali, tidak ada duplikat
// ═══════════════════════════════════════════════════════════════════

const GLOBAL_STYLES = `
  @keyframes toastIn {
    from { opacity: 0; transform: translateX(-50%) translateY(16px); }
    to   { opacity: 1; transform: translateX(-50%) translateY(0); }
  }
  .card-glow {
    transition: box-shadow 0.25s ease, border-color 0.25s ease, transform 0.25s ease, background-color 0.25s ease;
  }
  .card-glow:hover { transform: translateY(-3px); }
`

// ═══════════════════════════════════════════════════════════════════
// MASONRY BACKGROUND HERO
// Layout: kolom kiri 1 foto (span 2 baris), kolom tengah + kanan 2 baris
// ═══════════════════════════════════════════════════════════════════

function MasonryBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="h-full w-full gap-[3px]"
        style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gridTemplateRows: '1fr 1fr' }}
      >
        {/* Foto 1 — kolom kiri, span 2 baris */}
        <div className="relative overflow-hidden" style={{ gridRow: '1 / 3' }}>
          <Image src={LOL} alt="photo 1" fill className="object-cover"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
        </div>
        {/* Foto 2 — kolom tengah atas */}
        <div className="relative overflow-hidden">
          <Image src={Cooking} alt="photo 2" fill className="object-cover"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
        </div>
        {/* Foto 3 — kolom kanan atas */}
        <div className="relative overflow-hidden">
          <Image src={Reading} alt="photo 3" fill className="object-cover"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
        </div>
        {/* Foto 4 — kolom tengah bawah */}
        <div className="relative overflow-hidden">
          <Image src={Gaming} alt="photo 4" fill className="object-cover"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
        </div>
        {/* Foto 5 — kolom kanan bawah */}
        <div className="relative overflow-hidden">
          <Image src={Listening} alt="photo 5" fill className="object-cover"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
        </div>
      </div>

      {/* Glass blur + dim overlay — memisahkan teks dari foto */}
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: 'blur(3px) saturate(0.75)',
          WebkitBackdropFilter: 'blur(3px) saturate(0.75)',
          background: 'rgba(0,0,0,0.48)',
        }}
      />
      {/* Gradient vignette */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.5) 100%)' }}
      />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════
// GAME CARD
// ═══════════════════════════════════════════════════════════════════

function GameCard({ game }: { game: typeof allGames[0] }) {
  return (
    <div
      className="card-glow relative rounded-sm overflow-hidden cursor-pointer group"
      style={{ border: `1px solid ${game.glow}33`, backgroundColor: '#111' }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = game.glow + '99'
        el.style.boxShadow   = `0 0 22px 4px ${game.glow}44`
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = game.glow + '33'
        el.style.boxShadow   = 'none'
      }}
    >
      <div className="relative w-full" style={{ height: '140px' }}>
        <Image src={game.cover} alt={game.title} fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 40%, #111 100%)' }} />
      </div>
      <div className="px-3 pb-3 pt-1">
        <p className="font-sans text-white text-xs font-medium truncate">{game.title}</p>
        <p className="font-sans text-[10px] tracking-widest" style={{ color: game.glow }}>{game.genre}</p>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════
// MUSIC TOAST PLAYER — audio HTML5 native
// ═══════════════════════════════════════════════════════════════════

function MusicToast({ song, onClose, onPrev, onNext,
  isLoop, isShuffle, isLoopOne,
  onToggleLoop, onToggleShuffle, onToggleLoopOne }: {
  song: Song
  onClose: () => void; onPrev: () => void; onNext: () => void
  isLoop: boolean; isShuffle: boolean; isLoopOne: boolean
  onToggleLoop: () => void; onToggleShuffle: () => void; onToggleLoopOne: () => void
}) {
  const audioRef              = useRef<HTMLAudioElement>(null)
  const [playing,  setPlaying]  = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    setProgress(0)
    setDuration(0)
    setPlaying(false)
    if (song.src) {
      audio.src = song.src
      audio.load()
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
    }
  }, [song])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onTime     = () => setProgress(audio.currentTime)
    const onDuration = () => setDuration(audio.duration || 0)
    const onEnded    = () => { setPlaying(false); onNext() }
    audio.addEventListener('timeupdate',     onTime)
    audio.addEventListener('loadedmetadata', onDuration)
    audio.addEventListener('ended',          onEnded)
    return () => {
      audio.removeEventListener('timeupdate',     onTime)
      audio.removeEventListener('loadedmetadata', onDuration)
      audio.removeEventListener('ended',          onEnded)
    }
  }, [onNext])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio || !song.src) return
    if (playing) { audio.pause(); setPlaying(false) }
    else         { audio.play();  setPlaying(true) }
  }

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    if (!audio || !duration) return
    const rect  = e.currentTarget.getBoundingClientRect()
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * duration
  }

  const pct = duration ? (progress / duration) * 100 : 0
  const fmt = (s: number) => `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, '0')}`

  return (
    <div className="fixed bottom-6 left-1/2 z-[999] rounded-sm overflow-hidden"
      style={{
        transform: 'translateX(-50%)',
        width: '390px',
        backgroundColor: 'rgba(10,10,10,0.95)',
        backdropFilter: 'blur(24px)',
        border: `1px solid ${song.color}44`,
        boxShadow: `0 0 32px ${song.color}33, 0 10px 40px rgba(0,0,0,0.8)`,
        animation: 'toastIn 0.35s cubic-bezier(0.34,1.56,0.64,1)',
      }}
    >
      <audio ref={audioRef} />

      {/* Clickable progress bar */}
      <div className="w-full h-[3px] cursor-pointer" style={{ backgroundColor: 'rgba(255,255,255,0.07)' }} onClick={seek}>
        <div className="h-full" style={{ width: `${pct}%`, backgroundColor: song.color, transition: 'width 0.1s linear' }} />
      </div>

      <div className="flex items-center gap-3 px-4 py-3">
        {/* Cover */}
        <div className="relative w-12 h-12 rounded-sm overflow-hidden shrink-0" style={{ border: `1px solid ${song.color}44` }}>
          <Image src={song.cover} alt={song.title} fill className="object-cover"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '0' }} />
          <div className="absolute inset-0 flex items-center justify-center text-lg">🎵</div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="font-sans text-white text-xs font-medium truncate">{song.title}</p>
          <p className="font-sans text-[10px] truncate" style={{ color: 'rgba(255,255,255,0.4)' }}>{song.artist}</p>
          <p className="font-sans text-[9px] mt-0.5" style={{ color: duration ? song.color : 'rgba(255,100,100,0.6)' }}>
            {duration ? `${fmt(progress)} / ${fmt(duration)}` : song.src ? 'Memuat...' : 'Tidak ada file audio'}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1">
          <button onClick={onToggleShuffle}
            className="w-7 h-7 flex items-center justify-center rounded-sm text-sm transition-all"
            style={{ color: isShuffle ? song.color : '#555', backgroundColor: isShuffle ? `${song.color}18` : 'transparent' }}>⇄</button>
          <button onClick={onPrev}
            className="w-7 h-7 flex items-center justify-center rounded-sm text-sm hover:text-white transition-colors"
            style={{ color: '#888' }}>⏮</button>
          <button onClick={togglePlay}
            className="w-8 h-8 flex items-center justify-center rounded-full text-sm active:scale-95 transition-transform"
            style={{ backgroundColor: song.src ? song.color : '#333', color: '#000' }}>
            {playing ? '⏸' : '▶'}
          </button>
          <button onClick={onNext}
            className="w-7 h-7 flex items-center justify-center rounded-sm text-sm hover:text-white transition-colors"
            style={{ color: '#888' }}>⏭</button>
          <button onClick={onToggleLoopOne}
            className="w-7 h-7 flex items-center justify-center rounded-sm text-[10px] transition-all"
            style={{ color: isLoopOne ? song.color : '#555', backgroundColor: isLoopOne ? `${song.color}18` : 'transparent' }}>🔂</button>
          <button onClick={onToggleLoop}
            className="w-7 h-7 flex items-center justify-center rounded-sm text-[10px] transition-all"
            style={{ color: isLoop ? song.color : '#555', backgroundColor: isLoop ? `${song.color}18` : 'transparent' }}>🔁</button>
          <button onClick={onClose}
            className="w-6 h-6 flex items-center justify-center text-xs ml-1 hover:text-white transition-colors"
            style={{ color: '#555' }}>✕</button>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════
// SONG CARD
// ═══════════════════════════════════════════════════════════════════

function SongCard({ song, index, isActive, onClick }: {
  song: Song; index: number; isActive: boolean; onClick: () => void
}) {
  return (
    <div
      onClick={onClick}
      className="card-glow relative flex items-center gap-3 p-3 rounded-sm cursor-pointer"
      style={{
        backgroundColor: isActive ? `${song.color}15` : 'rgba(255,255,255,0.03)',
        border: `1px solid ${isActive ? song.color + '55' : 'rgba(255,255,255,0.06)'}`,
        boxShadow: isActive ? `0 0 16px ${song.color}33` : 'none',
      }}
      onMouseEnter={e => {
        if (isActive) return
        const el = e.currentTarget as HTMLElement
        el.style.borderColor     = song.color + '44'
        el.style.boxShadow       = `0 0 12px ${song.color}22`
        el.style.backgroundColor = `${song.color}08`
      }}
      onMouseLeave={e => {
        if (isActive) return
        const el = e.currentTarget as HTMLElement
        el.style.borderColor     = 'rgba(255,255,255,0.06)'
        el.style.boxShadow       = 'none'
        el.style.backgroundColor = 'rgba(255,255,255,0.03)'
      }}
    >
      <span className="font-sans text-[10px] w-5 text-center shrink-0" style={{ color: isActive ? song.color : '#555' }}>
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="relative w-10 h-10 rounded-sm overflow-hidden shrink-0">
        <Image src={song.cover} alt={song.title} fill className="object-cover"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '0' }} />
        <div className="absolute inset-0 flex items-center justify-center text-base">🎵</div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-sans text-white text-xs font-medium truncate">{song.title}</p>
        <p className="font-sans text-[10px] truncate" style={{ color: '#555' }}>{song.artist}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {/* Badge: ada file audio atau tidak */}
        <span className="font-sans text-[9px] px-1.5 py-0.5 rounded-sm"
          style={{
            color:           song.src ? '#2ecc71' : '#444',
            border:          `1px solid ${song.src ? '#2ecc7144' : '#33333355'}`,
            backgroundColor: song.src ? '#2ecc7111' : 'transparent',
          }}
        >{song.src ? '♫' : '—'}</span>
        {isActive && <span className="text-xs animate-pulse" style={{ color: song.color }}>▶</span>}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════
// MAIN HOBBY PAGE
// ═══════════════════════════════════════════════════════════════════

export default function Hobby() {
  const container = useRef(null)

  const [activeSong, setActiveSong] = useState<number | null>(null)
  const [isLoop,     setIsLoop]     = useState(false)
  const [isShuffle,  setIsShuffle]  = useState(false)
  const [isLoopOne,  setIsLoopOne]  = useState(false)

  const handleSongClick = (i: number) => setActiveSong(prev => prev === i ? null : i)
  const handleClose     = () => setActiveSong(null)

  const handleNext = useCallback(() => {
    if (activeSong === null) return
    if (isShuffle) { setActiveSong(Math.floor(Math.random() * songs.length)); return }
    const next = activeSong + 1
    if (next >= songs.length) { if (isLoop) setActiveSong(0); else setActiveSong(null) }
    else setActiveSong(next)
  }, [activeSong, isShuffle, isLoop])

  const handlePrev = useCallback(() => {
    if (activeSong === null) return
    const prev = activeSong - 1
    setActiveSong(prev < 0 ? (isLoop ? songs.length - 1 : 0) : prev)
  }, [activeSong, isLoop])

  const scrollTo = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

  useGSAP(() => {
    gsap.from('.hobby-hero-glass', { opacity: 0, y: 40, scale: 0.97, duration: 1.1, ease: 'power4.out', delay: 0.2 })
    gsap.from('.hobby-hero-card',  { opacity: 0, y: 25, scale: 0.94, duration: 0.5, stagger: 0.1, ease: 'back.out(1.4)', delay: 0.8 })

    ;['.gaming-header', '.music-header', '.reading-header', '.cooking-header'].forEach(s => {
      gsap.from(s, { opacity: 0, y: 30, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: s, start: 'top 85%' } })
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, { scope: container })

  // ── Shared helpers ──
  const SectionLabel = ({ color, text }: { color: string; text: string }) => (
    <p className="font-sans text-[11px] tracking-[0.5em] uppercase mb-2" style={{ color }}>{text}</p>
  )
  const SectionTitle = ({ line1, line2, accent, shadow }: { line1: string; line2: string; accent: string; shadow: string }) => (
    <h2 className="font-sans text-4xl md:text-6xl font-bold text-white leading-tight mb-4"
      style={{ textShadow: shadow, fontFamily: "'Courier New', monospace" }}>
      {line1}<br /><span style={{ color: accent }}>{line2}</span>
    </h2>
  )

  return (
    <div ref={container} id="hobby" style={{ backgroundColor: '#000' }}>
      <style>{GLOBAL_STYLES}</style>

      {/* ══════════════════════════════════════════════════════════
          HERO — masonry bg + glass text card
      ══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        <MasonryBackground />

        <div className="relative z-10 flex flex-col items-center text-center gap-8">
          {/* Glass card untuk teks agar terbaca di atas foto */}
          <div className="hobby-hero-glass px-10 py-10 rounded-lg"
            style={{
              backdropFilter: 'blur(20px) saturate(1.3)',
              WebkitBackdropFilter: 'blur(20px) saturate(1.3)',
              backgroundColor: 'rgba(0,0,0,0.38)',
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 8px 48px rgba(0,0,0,0.55)',
            }}
          >
            <p className="font-sans text-[11px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(201,168,76,0.95)' }}>
              — Beyond The Code —
            </p>
            <h1 className="text-5xl md:text-7xl font-bold leading-none"
              style={{
                fontFamily: "'Courier New', monospace",
                color: '#fff',
                textShadow: '0 2px 20px rgba(0,0,0,0.9)',
                letterSpacing: '0.05em',
              }}>
              MY<span style={{ color: '#C9A84C', textShadow: '0 0 20px #C9A84C88' }}> HOBBY</span>
            </h1>
            <p className="font-sans text-sm md:text-base mt-4 max-w-sm mx-auto leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.8)' }}>
              Di luar dunia coding, inilah hal-hal yang mengisi hari-hariku dengan warna.
            </p>
          </div>

          {/* Nav cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Gaming',  emoji: '🎮', href: '#gaming'  },
              { label: 'Musik',   emoji: '🎵', href: '#music'   },
              { label: 'Membaca', emoji: '📚', href: '#reading' },
              { label: 'Memasak', emoji: '🍳', href: '#cooking' },
            ].map((card) => (
              <button key={card.href} onClick={() => scrollTo(card.href)}
                className="hobby-hero-card card-glow flex flex-col items-center gap-3 px-8 py-5 rounded-sm"
                style={{
                  backdropFilter: 'blur(12px)',
                  backgroundColor: 'rgba(0,0,0,0.42)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor     = 'rgba(201,168,76,0.55)'
                  el.style.boxShadow       = '0 0 22px rgba(201,168,76,0.22)'
                  el.style.backgroundColor = 'rgba(0,0,0,0.55)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor     = 'rgba(255,255,255,0.12)'
                  el.style.boxShadow       = 'none'
                  el.style.backgroundColor = 'rgba(0,0,0,0.42)'
                }}
              >
                <span className="text-3xl">{card.emoji}</span>
                <span className="font-sans text-xs tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  {card.label}
                </span>
              </button>
            ))}
          </div>

          <div className="flex flex-col items-center gap-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
            <span className="font-sans text-[10px] tracking-widest uppercase">Scroll untuk eksplorasi</span>
            <span className="animate-bounce text-sm">↓</span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          GAMING
      ══════════════════════════════════════════════════════════ */}
      <section id="gaming" className="relative min-h-screen">
        <div className="absolute inset-0 overflow-hidden">
          <Image src="/hobby/bg-gaming.jpg" alt="Gaming bg" fill className="object-cover"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(3px)' }} />
        </div>
        <div className="relative z-10 py-24 px-6 md:px-20 max-w-6xl mx-auto">
          <div className="gaming-header mb-14">
            <SectionLabel color="rgba(255,70,85,0.85)" text="🎮 Section 01" />
            <SectionTitle line1="Gaming" line2="with Passion" accent="#ff4655" shadow="0 0 30px rgba(255,70,85,0.4)" />
            <p className="font-sans text-sm leading-relaxed max-w-xl" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Game bukan sekadar hiburan bagiku — ini adalah cara aku menjelajahi dunia lain,
              merasakan cerita yang luar biasa, dan bertemu karakter-karakter yang membekas di hati.
            </p>
          </div>

          <div className="mb-16">
            <p className="font-sans text-[10px] tracking-[0.4em] uppercase mb-6" style={{ color: 'rgba(255,255,255,0.3)' }}>✦ 7 Game Favorit Teratas</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {topGames.map((game, i) => (
                <div key={i}
                  className="card-glow relative rounded-sm overflow-hidden group cursor-pointer"
                  style={{ border: `1px solid ${game.glow}44`, backgroundColor: '#111' }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = game.glow + '99'
                    el.style.boxShadow   = `0 0 22px 4px ${game.glow}44`
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = game.glow + '44'
                    el.style.boxShadow   = 'none'
                  }}
                >
                  <div className="relative w-full" style={{ height: '120px' }}>
                    <Image src={game.cover} alt={game.title} fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.9) 100%)' }} />
                  </div>
                  <div className="p-2">
                    <p className="font-sans text-white text-[10px] font-semibold leading-tight truncate">{game.title}</p>
                    <p className="font-sans text-[9px]" style={{ color: game.glow }}>{game.genre}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="font-sans text-[10px] tracking-[0.4em] uppercase mb-6" style={{ color: 'rgba(255,255,255,0.3)' }}>✦ Game Lainnya yang Kusuka</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {allGames.map((game, i) => <GameCard key={i} game={game} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          MUSIK
      ══════════════════════════════════════════════════════════ */}
      <section id="music" className="relative min-h-screen">
        <div className="absolute inset-0 overflow-hidden">
          <Image src="/hobby/bg-music.jpg" alt="Music bg" fill className="object-cover"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(3px)' }} />
        </div>
        <div className="relative z-10 py-24 px-6 md:px-20 max-w-6xl mx-auto">
          <div className="music-header mb-14">
            <SectionLabel color="rgba(247,161,196,0.85)" text="🎵 Section 02" />
            <SectionTitle line1="Music" line2="is My Mood" accent="#f7a1c4" shadow="0 0 30px rgba(247,161,196,0.4)" />
            <p className="font-sans text-sm leading-relaxed max-w-xl" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Musik adalah teman setia saat coding, bersantai, maupun saat overthinking tengah malam.
            </p>
          </div>

          <div className="mb-14">
            <p className="font-sans text-[10px] tracking-[0.4em] uppercase mb-6" style={{ color: 'rgba(255,255,255,0.3)' }}>✦ 5 Genre Favorit</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {topMusicGenres.map((g, i) => (
                <div key={i}
                  className="card-glow flex flex-col items-center gap-3 py-6 px-4 rounded-sm text-center"
                  style={{ backgroundColor: `${g.color}10`, border: `1px solid ${g.color}33` }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = g.color + '88'
                    el.style.boxShadow   = `0 0 22px ${g.color}44`
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = g.color + '33'
                    el.style.boxShadow   = 'none'
                  }}
                >
                  <span className="text-3xl">{g.icon}</span>
                  <span className="font-sans text-xs font-medium" style={{ color: g.color }}>{g.genre}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="font-sans text-[10px] tracking-[0.4em] uppercase mb-6" style={{ color: 'rgba(255,255,255,0.3)' }}>✦ 20 Lagu Favorit — Klik untuk Play</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {songs.map((song, i) => (
                <SongCard key={i} song={song} index={i} isActive={activeSong === i} onClick={() => handleSongClick(i)} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          MEMBACA
      ══════════════════════════════════════════════════════════ */}
      <section id="reading" className="relative min-h-screen">
        <div className="absolute inset-0 overflow-hidden">
          <Image src="/hobby/bg-reading.jpg" alt="Reading bg" fill className="object-cover"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.78)', backdropFilter: 'blur(3px)' }} />
        </div>
        <div className="relative z-10 py-24 px-6 md:px-20 max-w-6xl mx-auto">
          <div className="reading-header mb-14">
            <SectionLabel color="rgba(168,230,207,0.85)" text="📚 Section 03" />
            <SectionTitle line1="Read" line2="to Escape" accent="#a8e6cf" shadow="0 0 30px rgba(168,230,207,0.35)" />
            <p className="font-sans text-sm leading-relaxed max-w-xl" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Dari manga shonen, light novel isekai, hingga novel klasik yang mengubah perspektif.
            </p>
          </div>

          <div className="mb-14">
            <p className="font-sans text-[10px] tracking-[0.4em] uppercase mb-6" style={{ color: 'rgba(255,255,255,0.3)' }}>✦ 5 Genre Favorit</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {topReadGenres.map((g, i) => (
                <div key={i}
                  className="card-glow flex flex-col items-center gap-3 py-6 px-4 rounded-sm text-center"
                  style={{ backgroundColor: `${g.color}10`, border: `1px solid ${g.color}33` }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = g.color + '88'
                    el.style.boxShadow   = `0 0 22px ${g.color}44`
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = g.color + '33'
                    el.style.boxShadow   = 'none'
                  }}
                >
                  <span className="text-3xl">{g.icon}</span>
                  <span className="font-sans text-xs font-medium" style={{ color: g.color }}>{g.genre}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="font-sans text-[10px] tracking-[0.4em] uppercase mb-6" style={{ color: 'rgba(255,255,255,0.3)' }}>✦ 18 Novel / Manga Favorit</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {books.map((book, i) => (
                <div key={i}
                  className="card-glow relative group cursor-pointer rounded-sm overflow-hidden"
                  style={{ border: `1px solid ${book.glow}33`, backgroundColor: '#111' }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = book.glow + '88'
                    el.style.boxShadow   = `0 0 20px ${book.glow}44`
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = book.glow + '33'
                    el.style.boxShadow   = 'none'
                  }}
                >
                  <div className="relative w-full" style={{ height: '160px' }}>
                    <Image src={book.cover} alt={book.title} fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.95) 100%)' }} />
                  </div>
                  <div className="p-2" style={{ backgroundColor: '#0d0d0d' }}>
                    <p className="font-sans text-white text-[10px] font-medium leading-tight line-clamp-2">{book.title}</p>
                    <span className="font-sans text-[9px] px-1 py-[1px] rounded-sm mt-1 inline-block"
                      style={{ color: book.glow, border: `1px solid ${book.glow}44` }}>{book.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          MEMASAK
      ══════════════════════════════════════════════════════════ */}
      <section id="cooking" className="relative min-h-screen">
        <div className="absolute inset-0 overflow-hidden">
          <Image src="/hobby/bg-cooking.jpg" alt="Cooking bg" fill className="object-cover"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(3px)' }} />
        </div>
        <div className="relative z-10 py-24 px-6 md:px-20 max-w-6xl mx-auto">
          <div className="cooking-header mb-14">
            <SectionLabel color="rgba(243,156,18,0.85)" text="🍳 Section 04" />
            <SectionTitle line1="Cook" line2="with Love" accent="#f39c12" shadow="0 0 30px rgba(243,156,18,0.4)" />
            <p className="font-sans text-sm leading-relaxed max-w-xl" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Memasak adalah cara aku me-reset pikiran setelah seharian di depan layar.
            </p>
          </div>

          <div>
            <p className="font-sans text-[10px] tracking-[0.4em] uppercase mb-8" style={{ color: 'rgba(255,255,255,0.3)' }}>✦ Masakan Favorit yang Sering Kubuat</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {cookingFavs.map((dish, i) => (
                <div key={i}
                  className="card-glow flex items-start gap-4 p-5 rounded-sm"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    backdropFilter: 'blur(8px)',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = dish.color + '55'
                    el.style.boxShadow   = `0 0 20px ${dish.color}22`
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = 'rgba(255,255,255,0.07)'
                    el.style.boxShadow   = 'none'
                  }}
                >
                  <span className="text-4xl shrink-0">{dish.emoji}</span>
                  <div>
                    <h3 className="font-sans text-white text-sm font-semibold mb-1">{dish.name}</h3>
                    <p className="font-sans text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{dish.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ══ FOOTER ══ */}
          <footer className="mt-28">
            <div className="flex items-center gap-4 mb-10">
              <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.35))' }} />
              <span style={{ color: 'rgba(201,168,76,0.5)', fontSize: '10px', letterSpacing: '0.3em' }}>✦ END OF HOBBY ✦</span>
              <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(201,168,76,0.35))' }} />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              {/* Tombol kembali ke home */}
              <a href="/"
                className="card-glow inline-flex items-center gap-3 px-6 py-3 rounded-sm font-sans text-sm tracking-widest uppercase"
                style={{
                  color: '#C9A84C',
                  border: '1px solid rgba(201,168,76,0.35)',
                  backgroundColor: 'rgba(201,168,76,0.06)',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor     = 'rgba(201,168,76,0.7)'
                  el.style.boxShadow       = '0 0 22px rgba(201,168,76,0.28)'
                  el.style.backgroundColor = 'rgba(201,168,76,0.12)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor     = 'rgba(201,168,76,0.35)'
                  el.style.boxShadow       = 'none'
                  el.style.backgroundColor = 'rgba(201,168,76,0.06)'
                }}
              >
                <span>←</span><span>Kembali ke Home</span>
              </a>

              {/* Quick jump ke setiap section */}
              <div className="flex items-center gap-3">
                {[
                  { href: '#gaming',  emoji: '🎮', label: 'Gaming'  },
                  { href: '#music',   emoji: '🎵', label: 'Musik'   },
                  { href: '#reading', emoji: '📚', label: 'Membaca' },
                  { href: '#cooking', emoji: '🍳', label: 'Memasak' },
                ].map(({ href, emoji, label }) => (
                  <button key={href} onClick={() => scrollTo(href)} title={label}
                    className="card-glow w-10 h-10 flex items-center justify-center rounded-sm text-lg"
                    style={{ border: '1px solid rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.04)' }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor     = 'rgba(255,255,255,0.22)'
                      el.style.backgroundColor = 'rgba(255,255,255,0.09)'
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor     = 'rgba(255,255,255,0.08)'
                      el.style.backgroundColor = 'rgba(255,255,255,0.04)'
                    }}
                  >{emoji}</button>
                ))}
              </div>

              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="card-glow font-sans text-[10px] tracking-widest flex items-center gap-2 px-4 py-2 rounded-sm"
                style={{ color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.07)' }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.color       = 'rgba(255,255,255,0.6)'
                  el.style.borderColor = 'rgba(255,255,255,0.18)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.color       = 'rgba(255,255,255,0.3)'
                  el.style.borderColor = 'rgba(255,255,255,0.07)'
                }}
              >
                ↑ <span>Scroll to top</span>
              </button>
            </div>
          </footer>
        </div>
      </section>

      {/* MUSIC TOAST */}
      {activeSong !== null && (
        <MusicToast
          song={songs[activeSong]}
          onClose={handleClose}
          onPrev={handlePrev}
          onNext={handleNext}
          isLoop={isLoop}
          isShuffle={isShuffle}
          isLoopOne={isLoopOne}
          onToggleLoop={() => setIsLoop(p => !p)}
          onToggleShuffle={() => setIsShuffle(p => !p)}
          onToggleLoopOne={() => setIsLoopOne(p => !p)}
        />
      )}
    </div>
  )
}