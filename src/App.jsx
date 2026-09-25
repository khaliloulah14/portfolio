import { useEffect, useRef, useState } from 'react'

const CONTACT_EMAIL = 'ibrahima.diaite@email.com'
const EMAIL_A_CONFIRMER = CONTACT_EMAIL.endsWith('@email.com')

const navigation = [
  { href: '#hero', label: 'Accueil' },
  { href: '#about', label: 'À propos' },
  { href: '#projects', label: 'Projets' },
]

const technologies = [
  'React',
  'Vite',
  'Tailwind CSS',
  'JavaScript',
  'HTML',
  'CSS',
  'Git',
  'GitHub',
  'WordPress',
  'SQLite',
  'Supabase',
  'Figma',
  'Canva Pro',
]

const skills = [
  {
    icon: 'devicon-react-original colored',
    name: 'React',
    label: 'Framework principal',
  },
  {
    icon: 'devicon-html5-plain colored',
    name: 'HTML / CSS',
    label: 'Base solide',
  },
  {
    icon: 'devicon-git-plain colored',
    name: 'Git',
    label: 'Versioning & GitHub',
  },
  {
    icon: 'devicon-wordpress-plain',
    iconStyle: { color: '#21759b' },
    name: 'WordPress',
    label: 'CMS & sites sur mesure',
  },
]

const designSkills = [
  { name: 'Canva Pro', label: 'Création visuelle & branding', canva: true },
  {
    icon: 'devicon-figma-plain colored',
    name: 'UI / UX',
    label: 'Sensibilité design',
  },
]

const projects = [
  {
    number: 'Projet 01',
    title: 'SencodeQr',
    description:
      'Générateur de QR codes dynamiques : personnalisation (couleur, forme, logo au centre), destination modifiable même après impression et suivi des scans. Aperçu scannable encodé directement dans le navigateur.',
    tags: ['React', 'Vite', 'Tailwind CSS', 'Supabase'],
    url: 'https://sen-code-qr.vercel.app/',
    image: '/projets/sen-code-qr.jpg',
    imageAlt: "Page d'accueil de SencodeQr avec le générateur de QR code et son aperçu scannable",
  },
  {
    number: 'Projet 02',
    title: 'Xelcom Chic',
    description:
      'Boutique en ligne sénégalaise : prêt-à-porter, marakis premium, huiles parfumées et accessoires, avec catalogue produits et section contact.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    url: 'https://xelkom-chic.vercel.app/',
    image: '/projets/xelcom-chic.jpg',
    imageAlt: "Page d'accueil de Xelcom Chic avec sa collection de tenues traditionnelles sénégalaises",
  },
  {
    number: 'Projet 03',
    title: 'Tolluwaay',
    description:
      'Suivi de la mémorisation des Xassidas des talibés pour le Magal : gestion des élèves, chapitres et grille de progression, avec données stockées localement.',
    tags: ['HTML', 'CSS', 'SQLite'],
    url: 'https://tolluwaay.vercel.app/',
    image: '/projets/tolluwaay.jpg',
    imageAlt: "Tableau de bord de Tolluwaay avec la date du Magal, la progression générale et le nombre de talibés inscrits",
  },
  {
    number: 'Projet 04',
    title: "Keyna's Class Shop",
    description:
      'Boutique de bijoux et accessoires faits main : colliers, sacs à main et huiles de parfum, commande directe via WhatsApp. Livraison en 48h à Dakar et partout au Sénégal, paiement à la livraison et échange sous 7 jours.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    url: 'https://keynas-boutique.vercel.app/',
    image: '/projets/keynas-boutique.jpg',
    imageAlt: "Page d'accueil de Keyna's Class Shop avec sa collection de bijoux dorés et son titre L'élégance à votre portée",
  },
]

const sujets = ['Un projet à réaliser', 'Une collaboration', 'Une question', 'Autre']

const champ =
  'w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:outline-none dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-indigo-400 dark:focus:bg-slate-950'

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (event) => setReduced(event.matches)
    setReduced(query.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return reduced
}

function useInView(threshold = 0.2) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(element)
        }
      },
      { threshold },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, visible]
}

function Reveal({ children, className = '', delay = 0 }) {
  const [ref, visible] = useInView(0.08)

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-[opacity,transform] duration-700 ease-out ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  )
}

function SplitText({ text, className = '', wordClassName = '', delay = 0, step = 65 }) {
  const [ref, visible] = useInView(0.3)
  const reduced = usePrefersReducedMotion()
  const words = text.split(' ')

  return (
    <span ref={ref} className={className}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden pb-[0.14em] align-bottom">
          <span
            style={{ transitionDelay: reduced ? '0ms' : `${delay + index * step}ms` }}
            className={`inline-block transition-transform duration-700 ease-out ${wordClassName} ${
              visible ? 'translate-y-0' : 'translate-y-full'
            }`}
          >
            {word}
            {index < words.length - 1 ? '\u00A0' : ''}
          </span>
        </span>
      ))}
    </span>
  )
}

function Magnetic({ children, strength = 12, className = '' }) {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()

  const onPointerMove = (event) => {
    const element = ref.current
    if (!element || reduced) return
    const rect = element.getBoundingClientRect()
    const x = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
    const y = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
    element.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`
  }

  const onPointerLeave = () => {
    const element = ref.current
    if (element) element.style.transform = 'translate3d(0, 0, 0)'
  }

  return (
    <span
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={`inline-block transition-transform duration-300 ease-out ${className}`}
    >
      {children}
    </span>
  )
}

function CursorGlow() {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const element = ref.current
    if (!element || reduced || !window.matchMedia('(pointer: fine)').matches) return undefined

    let frame = 0
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let targetX = x
    let targetY = y

    const loop = () => {
      x += (targetX - x) * 0.13
      y += (targetY - y) * 0.13
      element.style.transform = `translate3d(${x}px, ${y}px, 0)`
      frame = Math.abs(targetX - x) > 0.5 || Math.abs(targetY - y) > 0.5 ? requestAnimationFrame(loop) : 0
    }

    const onMove = (event) => {
      targetX = event.clientX
      targetY = event.clientY
      element.style.opacity = '1'
      if (!frame) frame = requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [reduced])

  return <div ref={ref} className="cursor-glow hidden md:block" aria-hidden="true" />
}

function SectionHeading({ eyebrow, title, centered = false }) {
  return (
    <div className={centered ? 'text-center' : ''}>
      <Reveal>
        <p
          className={`mb-3 inline-flex items-center gap-2 text-xs font-bold tracking-[0.12em] text-indigo-600 uppercase before:h-0.5 before:w-5 before:rounded-full before:bg-indigo-600 before:content-[''] dark:text-indigo-400 dark:before:bg-indigo-400 ${
            centered ? 'justify-center' : ''
          }`}
        >
          {eyebrow}
        </p>
      </Reveal>
      <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
        <SplitText text={title} />
      </h2>
    </div>
  )
}

function CanvaIcon() {
  return (
    <svg className="size-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#7B2FBE" />
      <circle cx="12" cy="8.5" r="2.5" fill="white" />
      <circle cx="6.5" cy="16" r="2" fill="white" />
      <circle cx="17.5" cy="16" r="2" fill="white" />
      <path d="m12 8.5-5.5 7.5m5.5-7.5 5.5 7.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function IconSend({ className = 'size-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" />
    </svg>
  )
}

function IconMail({ className = 'size-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <path d="m2.5 7 8.4 5.6a2 2 0 0 0 2.2 0L21.5 7" />
    </svg>
  )
}

function IconPin({ className = 'size-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function IconSpark({ className = 'size-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v4m0 10v4M3 12h4m10 0h4M5.6 5.6l2.8 2.8m7.2 7.2 2.8 2.8m0-12.8-2.8 2.8m-7.2 7.2-2.8 2.8" />
    </svg>
  )
}

function ThemeToggle() {
  const [theme, setTheme] = useState(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light',
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const dark = theme === 'dark'

  const toggleTheme = () => {
    const next = dark ? 'light' : 'dark'
    setTheme(next)
    try {
      localStorage.setItem('theme', next)
    } catch {
      /* stockage indisponible (navigation privée) */
    }
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={dark ? 'Activer le thème clair' : 'Activer le thème sombre'}
      aria-pressed={dark}
      className="relative flex size-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-indigo-500 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-indigo-400 dark:hover:text-indigo-300"
    >
      <svg
        className={`absolute size-4.5 transition-all duration-300 ${dark ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
      </svg>
      <svg
        className={`absolute size-4.5 transition-all duration-300 ${dark ? '-rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32 1.41-1.41" />
      </svg>
    </button>
  )
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const root = document.documentElement
      const max = root.scrollHeight - root.clientHeight
      setProgress(max > 0 ? root.scrollTop / max : 0)
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="fixed inset-x-0 top-0 z-60 h-0.5" aria-hidden="true">
      <div
        className="h-full origin-left bg-linear-to-r from-indigo-600 via-violet-500 to-sky-500 transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  )
}

function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 480)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Revenir en haut de la page"
      className={`fixed right-5 bottom-5 z-50 flex size-11 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-600 shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-300 dark:hover:border-indigo-400 dark:hover:text-indigo-300 ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <svg
        className="size-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m5 12 7-7 7 7M12 19V5" />
      </svg>
    </button>
  )
}

function SkillCard({ icon, iconStyle, name, label, canva = false }) {
  return (
    <article className="group flex items-center gap-3.5 rounded-xl border border-slate-200 bg-white px-4 py-4 transition duration-200 hover:-translate-y-0.5 hover:border-indigo-600 hover:shadow-[0_4px_20px_rgb(79_70_229_/_0.1)] dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500 dark:hover:shadow-[0_4px_24px_rgb(99_102_241_/_0.18)]">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 transition duration-200 group-hover:scale-105 group-hover:bg-indigo-50 dark:bg-slate-800 dark:group-hover:bg-indigo-500/15">
        {canva ? <CanvaIcon /> : <i className={`${icon} text-[1.4rem]`} style={iconStyle} aria-hidden="true" />}
      </div>
      <div>
        <h3 className="font-display text-sm leading-none font-bold text-slate-900 dark:text-slate-100">{name}</h3>
        <p className="mt-1 text-[0.68rem] text-slate-500 dark:text-slate-400">{label}</p>
      </div>
    </article>
  )
}

function ProjectCard({ project }) {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()

  const onPointerMove = (event) => {
    const card = ref.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    card.style.setProperty('--spot-x', `${x}px`)
    card.style.setProperty('--spot-y', `${y}px`)

    if (reduced) return
    const rotateX = ((y / rect.height) - 0.5) * -4
    const rotateY = ((x / rect.width) - 0.5) * 4
    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`
  }

  const onPointerLeave = () => {
    const card = ref.current
    if (card) card.style.transform = ''
  }

  return (
    <article
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="spotlight tilt-card group relative flex h-full flex-col gap-6 rounded-2xl border border-slate-200 bg-slate-50 p-6 hover:-translate-y-1 hover:border-indigo-600 hover:shadow-[0_10px_40px_rgb(0_0_0_/_0.1)] sm:flex-row sm:items-center sm:gap-6 md:gap-8 md:p-8 lg:gap-10 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500 dark:hover:shadow-[0_10px_40px_rgb(0_0_0_/_0.5)]"
    >
      <div className="overflow-hidden rounded-xl border border-slate-200 sm:w-[45%] sm:shrink-0 dark:border-slate-800">
        <img
          src={project.image}
          alt={project.imageAlt}
          loading="lazy"
          width="1200"
          height="600"
          className="aspect-[2/1] w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col">
        <p className="text-[0.7rem] font-bold tracking-[0.12em] text-indigo-600 uppercase dark:text-indigo-400">{project.number}</p>
        <h3 className="font-display mt-4 text-xl font-bold tracking-tight text-slate-900 lg:text-2xl dark:text-white">{project.title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">{project.description}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-md border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-600 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-300">
              {tag}
            </span>
          ))}
        </div>
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-indigo-600 transition-all duration-200 hover:gap-2.5 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          Voir le site
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 17 17 7M9 7h8v8" />
          </svg>
        </a>
      </div>
    </article>
  )
}

function TechnologyMarquee() {
  const row = (key) => (
    <li key={key} className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={key === 'bis'}>
      {technologies.map((technology) => (
        <span key={technology} className="flex items-center gap-10 text-sm font-semibold tracking-[0.16em] text-slate-400 uppercase dark:text-slate-500">
          {technology}
          <span className="size-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
        </span>
      ))}
    </li>
  )

  return (
    <section aria-label="Technologies utilisées" className="overflow-hidden border-y border-slate-200 bg-white py-7 dark:border-slate-800 dark:bg-slate-950">
      <ul className="marquee-mask flex w-max animate-marquee hover:[animation-play-state:paused]">
        {row('principal')}
        {row('bis')}
      </ul>
    </section>
  )
}

function Hero() {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const section = ref.current
    if (!section || reduced) return undefined

    let frame = 0
    let pointerX = 0
    let pointerY = 0

    const apply = () => {
      frame = 0
      const rect = section.getBoundingClientRect()
      const scrolled = Math.min(Math.max(-rect.top, 0), window.innerHeight)
      const content = section.querySelector('[data-hero-content]')
      const glows = section.querySelectorAll('[data-hero-glow]')

      if (content) {
        content.style.transform = `translate3d(${pointerX * 14}px, ${scrolled * 0.16 + pointerY * 10}px, 0)`
        content.style.opacity = `${Math.max(1 - scrolled / 520, 0)}`
      }

      glows.forEach((glow, index) => {
        const dir = index === 0 ? 1 : -1
        glow.style.translate = `${pointerX * 26 * dir}px ${pointerY * 26 * dir}px`
      })
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(apply)
    }

    const onPointerMove = (event) => {
      const rect = section.getBoundingClientRect()
      pointerX = (event.clientX - rect.width / 2) / rect.width
      pointerY = (event.clientY - rect.height / 2) / rect.height
      schedule()
    }

    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    section.addEventListener('pointermove', onPointerMove, { passive: true })
    apply()

    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      section.removeEventListener('pointermove', onPointerMove)
      cancelAnimationFrame(frame)
    }
  }, [reduced])

  return (
    <section ref={ref} id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-[5%] pt-24 pb-16 text-center dark:bg-slate-950">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="hero-grid absolute inset-0" />
        <div data-hero-glow className="absolute -top-32 -right-24 size-[36rem] animate-float-slow rounded-full bg-[radial-gradient(circle,rgb(99_102_241_/_0.12),transparent_70%)] dark:bg-[radial-gradient(circle,rgb(99_102_241_/_0.22),transparent_70%)]" />
        <div data-hero-glow className="absolute -bottom-24 left-[8%] size-96 animate-float-slower rounded-full bg-[radial-gradient(circle,rgb(139_92_246_/_0.1),transparent_70%)] dark:bg-[radial-gradient(circle,rgb(139_92_246_/_0.18),transparent_70%)]" />
      </div>

      <div data-hero-content className="relative z-10 max-w-xl">
        <div className="mb-7 inline-flex animate-[fade-up_0.5s_ease_both] items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-1.5 text-xs font-semibold tracking-[0.04em] text-indigo-600 uppercase dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-300">
          <span className="size-1.5 animate-[pulse-ring_2s_infinite] rounded-full bg-green-500" />
          Disponible pour des projets
        </div>
        <h1 className="font-display text-5xl leading-none font-extrabold tracking-tight text-slate-900 sm:text-7xl dark:text-white">
          <SplitText text="Ibrahima" delay={120} />
          <br />
          <SplitText text="Diaite" delay={300} wordClassName="text-gradient" />
        </h1>
        <p className="mt-3 animate-[fade-up_0.5s_0.2s_ease_both] text-base text-slate-500 sm:text-lg dark:text-slate-400">
          <strong className="font-semibold text-slate-700 dark:text-slate-200">Développeur Web</strong> — React & Frontend
        </p>
        <p className="mx-auto mt-6 max-w-lg animate-[fade-up_0.5s_0.3s_ease_both] text-[0.95rem] leading-7 text-slate-500 dark:text-slate-400">
          Je conçois et développe des interfaces web modernes, performantes et accessibles. Passionné par le code propre et les expériences utilisateur mémorables.
        </p>
        <div className="mt-9 flex animate-[fade-up_0.5s_0.4s_ease_both] flex-wrap justify-center gap-3.5">
          <Magnetic>
            <a href="#projects" className="shine group inline-flex items-center gap-2 rounded-[10px] bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-[0_4px_14px_rgb(79_70_229_/_0.3)] transition hover:-translate-y-0.5 hover:bg-indigo-500 hover:shadow-[0_8px_24px_rgb(79_70_229_/_0.38)] dark:bg-indigo-500 dark:shadow-[0_4px_18px_rgb(99_102_241_/_0.35)] dark:hover:bg-indigo-400">
              Voir mes projets
              <svg className="size-4 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#contact" className="inline-block rounded-[10px] border-2 border-slate-300 px-7 py-3 text-sm font-medium text-slate-700 transition hover:border-indigo-600 hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-indigo-400 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-300">
              Me contacter
            </a>
          </Magnetic>
        </div>
      </div>

      <div aria-hidden="true" className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 sm:block">
        <div className="flex h-9 w-6 justify-center rounded-full border border-slate-300 pt-2 dark:border-slate-700">
          <span className="size-1 rounded-full bg-slate-400 animate-trail dark:bg-slate-600" />
        </div>
      </div>
    </section>
  )
}

function Field({ id, label, erreur, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs font-semibold tracking-wide text-slate-600 dark:text-slate-300">
        {label}
      </label>
      {children}
      {erreur && (
        <p id={`${id}-erreur`} className="mt-1.5 text-xs font-medium text-rose-600 dark:text-rose-400">
          {erreur}
        </p>
      )}
    </div>
  )
}

function ContactForm() {
  const [valeurs, setValeurs] = useState({ nom: '', email: '', sujet: sujets[0], message: '', piege: '' })
  const [erreurs, setErreurs] = useState({})
  const [etat, setEtat] = useState('repos')
  const [erreurEnvoi, setErreurEnvoi] = useState('')

  const actif = !EMAIL_A_CONFIRMER

  const maj = (champNom) => (event) => {
    const { value } = event.target
    setValeurs((precedent) => ({ ...precedent, [champNom]: value }))
    setErreurs((precedent) => (precedent[champNom] ? { ...precedent, [champNom]: undefined } : precedent))
  }

  const valider = () => {
    const trouvees = {}
    if (valeurs.nom.trim().length < 2) trouvees.nom = 'Indique ton nom ou ton prénom.'
    if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(valeurs.email.trim())) trouvees.email = 'Cette adresse e-mail semble invalide.'
    if (valeurs.message.trim().length < 20) trouvees.message = 'Détaille un peu ton message (20 caractères minimum).'
    return trouvees
  }

  const envoyer = async (event) => {
    event.preventDefault()
    const trouvees = valider()
    setErreurs(trouvees)
    if (Object.keys(trouvees).length > 0) return

    setEtat('envoi')
    setErreurEnvoi('')

    try {
      const reponse = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          Nom: valeurs.nom.trim(),
          'E-mail': valeurs.email.trim(),
          Sujet: valeurs.sujet,
          Message: valeurs.message.trim(),
          _subject: `Portfolio — ${valeurs.sujet}`,
          _replyto: valeurs.email.trim(),
          _template: 'table',
          _honey: valeurs.piege,
        }),
      })

      const donnees = await reponse.json().catch(() => null)
      if (!reponse.ok || !donnees || String(donnees.success) !== 'true') {
        throw new Error(donnees?.message || "L'envoi n'a pas abouti.")
      }

      setEtat('succes')
      setValeurs({ nom: '', email: '', sujet: sujets[0], message: '', piege: '' })
    } catch (erreur) {
      setEtat('erreur')
      setErreurEnvoi(
        typeof erreur?.message === 'string' && erreur.message && !erreur.message.includes('Failed to fetch')
          ? erreur.message
          : `L'envoi a échoué. Réessaie dans un instant ou écris-moi à ${CONTACT_EMAIL}.`,
      )
    }
  }

  if (etat === 'succes') {
    return (
      <div className="glow-border relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center sm:px-12 dark:border-slate-800 dark:bg-slate-900">
        <span className="mx-auto flex size-14 animate-pop-in items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-500/15 dark:text-green-400">
          <svg className="size-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m5 13 4.5 4.5L19 7" />
          </svg>
        </span>
        <h3 className="font-display mt-6 text-xl font-bold text-slate-900 dark:text-white">Message envoyé, merci !</h3>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
          Je viens de recevoir ton message et je te réponds très vite à l&apos;adresse indiquée.
        </p>
        <button
          type="button"
          onClick={() => setEtat('repos')}
          className="mt-8 rounded-[10px] border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:border-indigo-600 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-indigo-400 dark:hover:text-indigo-300"
        >
          Envoyer un autre message
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={envoyer}
      noValidate
      className="glow-border relative rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_1px_3px_rgb(0_0_0_/_0.06),0_4px_16px_rgb(0_0_0_/_0.06)] sm:p-9 dark:border-slate-800 dark:bg-slate-900 dark:shadow-[0_1px_3px_rgb(0_0_0_/_0.4),0_4px_24px_rgb(0_0_0_/_0.35)]"
    >
      <div className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="nom" label="Nom" erreur={erreurs.nom}>
            <input
              id="nom"
              name="nom"
              type="text"
              autoComplete="name"
              value={valeurs.nom}
              onChange={maj('nom')}
              aria-invalid={Boolean(erreurs.nom)}
              aria-describedby={erreurs.nom ? 'nom-erreur' : undefined}
              placeholder="Ton nom"
              className={`${champ} ${erreurs.nom ? 'border-rose-400 dark:border-rose-500' : ''}`}
            />
          </Field>
          <Field id="email" label="E-mail" erreur={erreurs.email}>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={valeurs.email}
              onChange={maj('email')}
              aria-invalid={Boolean(erreurs.email)}
              aria-describedby={erreurs.email ? 'email-erreur' : undefined}
              placeholder="ton@adresse.com"
              className={`${champ} ${erreurs.email ? 'border-rose-400 dark:border-rose-500' : ''}`}
            />
          </Field>
        </div>

        <Field id="sujet" label="Sujet">
          <select id="sujet" name="sujet" value={valeurs.sujet} onChange={maj('sujet')} className={champ}>
            {sujets.map((sujet) => (
              <option key={sujet} value={sujet}>
                {sujet}
              </option>
            ))}
          </select>
        </Field>

        <Field id="message" label="Message" erreur={erreurs.message}>
          <textarea
            id="message"
            name="message"
            rows="6"
            value={valeurs.message}
            onChange={maj('message')}
            aria-invalid={Boolean(erreurs.message)}
            aria-describedby={erreurs.message ? 'message-erreur' : undefined}
            placeholder="Parle-moi de ton projet, de tes objectifs ou de ta question…"
            className={`${champ} resize-y ${erreurs.message ? 'border-rose-400 dark:border-rose-500' : ''}`}
          />
        </Field>

        <div className="hidden" aria-hidden="true">
          <label htmlFor="piege">Ne pas remplir ce champ</label>
          <input id="piege" name="piege" type="text" tabIndex="-1" autoComplete="off" value={valeurs.piege} onChange={maj('piege')} />
        </div>

        {erreurEnvoi && (
          <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs leading-5 font-medium text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300">
            {erreurEnvoi}
          </p>
        )}

        {!actif && (
          <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-5 font-medium text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
            Le formulaire sera actif dès que l&apos;adresse de réception sera confirmée.
          </p>
        )}

        <div className="flex flex-wrap items-center gap-4 pt-1">
          <Magnetic strength={8}>
            <button
              type="submit"
              disabled={etat === 'envoi' || !actif}
              className="shine inline-flex items-center gap-2 rounded-[10px] bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-[0_4px_14px_rgb(79_70_229_/_0.3)] transition hover:-translate-y-0.5 hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 dark:bg-indigo-500 dark:hover:bg-indigo-400"
            >
              {etat === 'envoi' ? 'Envoi en cours…' : 'Envoyer le message'}
              <IconSend />
            </button>
          </Magnetic>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Tes coordonnées servent uniquement à te répondre.
          </p>
        </div>
      </div>
    </form>
  )
}

function ContactSection() {
  const coordonnees = [
    { icone: <IconMail />, titre: 'E-mail', contenu: CONTACT_EMAIL, lien: `mailto:${CONTACT_EMAIL}` },
    { icone: <IconPin />, titre: 'Localisation', contenu: 'Sénégal — disponible à distance' },
    { icone: <IconSpark />, titre: 'Disponibilité', contenu: 'Ouvert aux missions freelance et aux collaborations' },
  ]

  return (
    <section id="contact" className="border-t border-slate-200 bg-slate-50 px-[5%] py-16 transition-colors duration-300 sm:py-24 dark:border-slate-800 dark:bg-slate-900/40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Contact" title="Travaillons ensemble" centered />

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <Reveal className="space-y-6">
            <p className="text-[0.92rem] leading-7 text-slate-600 dark:text-slate-400">
              Tu as un projet en tête, une idée à concrétiser ou simplement une question ? Écris-moi : je lis chaque message et je réponds personnellement.
            </p>

            <ul className="space-y-3">
              {coordonnees.map((item) => (
                <li key={item.titre}>
                  <div className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 transition duration-200 hover:-translate-y-0.5 hover:border-indigo-600 hover:shadow-[0_6px_24px_rgb(79_70_229_/_0.08)] dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500 dark:hover:shadow-[0_6px_24px_rgb(99_102_241_/_0.16)]">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:scale-105 dark:bg-indigo-500/15 dark:text-indigo-300">
                      {item.icone}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[0.7rem] font-bold tracking-[0.1em] text-slate-400 uppercase dark:text-slate-500">{item.titre}</p>
                      {item.lien ? (
                        <a href={item.lien} className="mt-1 block truncate text-sm font-medium text-slate-700 underline-offset-4 transition hover:text-indigo-600 hover:underline dark:text-slate-200 dark:hover:text-indigo-300">
                          {item.contenu}
                        </a>
                      ) : (
                        <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-200">{item.contenu}</p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <a href="https://github.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-[10px] border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-500 transition hover:-translate-y-0.5 hover:border-indigo-600 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-indigo-400 dark:hover:text-indigo-300">
                <i className="devicon-github-original" aria-hidden="true" /> GitHub
              </a>
              <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-[10px] border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-500 transition hover:-translate-y-0.5 hover:border-indigo-600 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-indigo-400 dark:hover:text-indigo-300">
                <i className="devicon-linkedin-plain colored" aria-hidden="true" /> LinkedIn
              </a>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const lienFooter =
    'group inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-300'

  return (
    <footer className="relative border-t border-slate-200 bg-white px-[5%] pt-14 pb-8 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950">
      <div aria-hidden="true" className="hairline absolute inset-x-0 top-0 h-px" />

      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <p className="font-display text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Ibrahima <span className="text-gradient">Diaite</span>
            </p>
            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-500 dark:text-slate-400">
              Développeur web basé au Sénégal. Je transforme des idées en interfaces modernes, rapides et accessibles.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-[0.7rem] font-semibold tracking-wide text-slate-500 uppercase dark:border-slate-800 dark:text-slate-400">
              <span className="size-1.5 animate-[pulse-ring_2s_infinite] rounded-full bg-green-500" />
              Disponible pour des projets
            </p>
          </div>

          <nav aria-label="Navigation du pied de page">
            <p className="text-[0.7rem] font-bold tracking-[0.14em] text-slate-900 uppercase dark:text-white">Navigation</p>
            <ul className="mt-4 space-y-2.5">
              {[...navigation, { href: '#contact', label: 'Contact' }].map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={lienFooter}>
                    <span className="h-px w-0 rounded-full bg-indigo-600 transition-all duration-300 group-hover:w-4 dark:bg-indigo-400" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-[0.7rem] font-bold tracking-[0.14em] text-slate-900 uppercase dark:text-white">Projets</p>
            <ul className="mt-4 space-y-2.5">
              {projects.map((project) => (
                <li key={project.title}>
                  <a href={project.url} target="_blank" rel="noreferrer" className={lienFooter}>
                    <span className="h-px w-0 rounded-full bg-indigo-600 transition-all duration-300 group-hover:w-4 dark:bg-indigo-400" />
                    {project.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[0.7rem] font-bold tracking-[0.14em] text-slate-900 uppercase dark:text-white">Me joindre</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className={`${lienFooter} break-all`}>
                  <IconMail className="size-4" />
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a href="https://github.com/" target="_blank" rel="noreferrer" className={lienFooter}>
                  <i className="devicon-github-original text-base" aria-hidden="true" /> GitHub
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className={lienFooter}>
                  <i className="devicon-linkedin-plain colored text-base" aria-hidden="true" /> LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-slate-200 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:text-slate-500">
          <span>© {new Date().getFullYear()} Ibrahima Diaite — Tous droits réservés.</span>
          <span className="inline-flex items-center gap-1.5">
            Conçu et développé avec
            <span className="font-semibold text-slate-500 dark:text-slate-400">React</span>
            &amp;
            <span className="font-semibold text-slate-500 dark:text-slate-400">Tailwind CSS</span>
          </span>
        </div>
      </div>
    </footer>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries.find((entry) => entry.isIntersecting)
        if (activeEntry) setActiveSection(activeEntry.target.id)
      },
      { rootMargin: '-25% 0px -60%', threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <ScrollProgress />
      <CursorGlow />

      <header className="fixed inset-x-0 top-0 z-50 h-[68px] border-b border-slate-200 bg-white/88 backdrop-blur-xl transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950/80">
        <nav className="mx-auto flex h-full w-[90%] max-w-7xl items-center justify-end" aria-label="Navigation principale">
          <div className="flex items-center gap-1.5 md:gap-3">
            <ul className="hidden items-center gap-10 md:flex">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`relative text-sm font-medium transition after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-indigo-600 after:transition-all after:duration-300 after:content-[''] dark:after:bg-indigo-400 ${
                      activeSection === item.href.slice(1)
                        ? 'text-indigo-600 after:w-full dark:text-indigo-400'
                        : 'text-slate-500 after:w-0 hover:text-indigo-600 hover:after:w-full dark:text-slate-400 dark:hover:text-indigo-300'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contact" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400">
                  Contact
                </a>
              </li>
            </ul>

            <ThemeToggle />

            <button
              type="button"
              className="flex flex-col gap-1.5 rounded p-2 md:hidden"
              aria-label="Ouvrir le menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className={`h-0.5 w-[22px] rounded bg-slate-700 transition dark:bg-slate-300 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
              <span className={`h-0.5 w-[22px] rounded bg-slate-700 transition dark:bg-slate-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 w-[22px] rounded bg-slate-700 transition dark:bg-slate-300 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
            </button>
          </div>
        </nav>

        {menuOpen && (
          <ul className="absolute inset-x-0 top-[67px] flex animate-[fade-up_0.25s_ease_both] flex-col items-center gap-5 border-b border-slate-200 bg-white/97 py-6 shadow-xl backdrop-blur-xl md:hidden dark:border-slate-800 dark:bg-slate-950/95">
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-sm font-medium text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-300" onClick={closeMenu}>
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#contact" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white dark:bg-indigo-500" onClick={closeMenu}>
                Contact
              </a>
            </li>
          </ul>
        )}
      </header>

      <main>
        <Hero />

        <TechnologyMarquee />

        <section id="about" className="border-b border-slate-200 bg-slate-50 px-[5%] py-16 transition-colors duration-300 sm:py-24 dark:border-slate-800 dark:bg-slate-900/40">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow="À propos" title="Qui suis-je ?" />
            <Reveal className="mt-12 grid items-start gap-12 lg:grid-cols-2 lg:gap-20" delay={80}>
              <div className="space-y-4 text-[0.92rem] leading-7 text-slate-700 dark:text-slate-300">
                <p>
                  Bonjour ! Je me nomme <strong className="font-semibold text-slate-900 dark:text-white">Ibrahima Diaite</strong>, développeur web basé au Sénégal. Je me spécialise dans la création d&apos;applications web modernes avec <strong className="font-semibold text-slate-900 dark:text-white">React</strong> et les technologies frontend actuelles.
                </p>
                <p>
                  Mon objectif est de transformer des idées en expériences digitales fluides et élégantes. J&apos;accorde une grande importance à la <strong className="font-semibold text-slate-900 dark:text-white">qualité du code</strong>, la <strong className="font-semibold text-slate-900 dark:text-white">performance</strong> et l&apos;<strong className="font-semibold text-slate-900 dark:text-white">expérience utilisateur</strong>.
                </p>
                <p>
                  Toujours en apprentissage, je suis passionné par les nouvelles technologies et les défis créatifs que le développement web offre.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <p className="col-span-full mt-3 border-b border-slate-200 pb-2 text-[0.65rem] font-bold tracking-[0.18em] text-slate-400 uppercase dark:border-slate-800 dark:text-slate-500">Développement</p>
                {skills.map((skill, index) => (
                  <Reveal key={skill.name} delay={index * 70}>
                    <SkillCard {...skill} />
                  </Reveal>
                ))}
                <p className="col-span-full mt-3 border-b border-slate-200 pb-2 text-[0.65rem] font-bold tracking-[0.18em] text-slate-400 uppercase dark:border-slate-800 dark:text-slate-500">Design & Outils</p>
                {designSkills.map((skill, index) => (
                  <Reveal key={skill.name} delay={index * 70}>
                    <SkillCard {...skill} />
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="projects" className="bg-white px-[5%] py-16 transition-colors duration-300 sm:py-24 dark:bg-slate-950">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow="Projets" title="Mes réalisations" />
            <div className="mt-12 grid gap-6">
              {projects.map((project, index) => (
                <Reveal key={project.title} delay={index * 80}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <ContactSection />
      </main>

      <Footer />

      <BackToTop />
    </>
  )
}

export default App
