import { useEffect, useRef, useState } from 'react'

const navigation = [
  { href: '#hero', label: 'Accueil' },
  { href: '#about', label: 'À propos' },
  { href: '#projects', label: 'Projets' },
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

const trackPointer = (event) => {
  const card = event.currentTarget
  const rect = card.getBoundingClientRect()
  card.style.setProperty('--spot-x', `${event.clientX - rect.left}px`)
  card.style.setProperty('--spot-y', `${event.clientY - rect.top}px`)
}

function Reveal({ children, className = '', delay = 0 }) {
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
      { threshold: 0.08 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

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

function SectionHeading({ eyebrow, title, centered = false }) {
  return (
    <div className={centered ? 'text-center' : ''}>
      <p
        className={`mb-3 inline-flex items-center gap-2 text-xs font-bold tracking-[0.12em] text-indigo-600 uppercase before:h-0.5 before:w-5 before:rounded-full before:bg-indigo-600 before:content-[''] dark:text-indigo-400 dark:before:bg-indigo-400 ${
          centered ? 'justify-center' : ''
        }`}
      >
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
        {title}
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
        <section id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-[5%] pt-24 pb-16 text-center dark:bg-slate-950">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="hero-grid absolute inset-0" />
            <div className="absolute -top-32 -right-24 size-[36rem] animate-float-slow rounded-full bg-[radial-gradient(circle,rgb(99_102_241_/_0.12),transparent_70%)] dark:bg-[radial-gradient(circle,rgb(99_102_241_/_0.22),transparent_70%)]" />
            <div className="absolute -bottom-24 left-[8%] size-96 animate-float-slower rounded-full bg-[radial-gradient(circle,rgb(139_92_246_/_0.1),transparent_70%)] dark:bg-[radial-gradient(circle,rgb(139_92_246_/_0.18),transparent_70%)]" />
          </div>

          <div className="relative z-10 max-w-xl">
            <div className="mb-7 inline-flex animate-[fade-up_0.5s_ease_both] items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-1.5 text-xs font-semibold tracking-[0.04em] text-indigo-600 uppercase dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-300">
              <span className="size-1.5 animate-[pulse-ring_2s_infinite] rounded-full bg-green-500" />
              Disponible pour des projets
            </div>
            <h1 className="font-display animate-[fade-up_0.5s_0.1s_ease_both] text-5xl leading-none font-extrabold tracking-tight text-slate-900 sm:text-7xl dark:text-white">
              Ibrahima<br />
              <span className="text-gradient">Diaite</span>
            </h1>
            <p className="mt-3 animate-[fade-up_0.5s_0.2s_ease_both] text-base text-slate-500 sm:text-lg dark:text-slate-400">
              <strong className="font-semibold text-slate-700 dark:text-slate-200">Développeur Web</strong> — React & Frontend
            </p>
            <p className="mx-auto mt-6 max-w-lg animate-[fade-up_0.5s_0.3s_ease_both] text-[0.95rem] leading-7 text-slate-500 dark:text-slate-400">
              Je conçois et développe des interfaces web modernes, performantes et accessibles. Passionné par le code propre et les expériences utilisateur mémorables.
            </p>
            <div className="mt-9 flex animate-[fade-up_0.5s_0.4s_ease_both] flex-wrap justify-center gap-3.5">
              <a href="#projects" className="group inline-flex items-center gap-2 rounded-[10px] bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-[0_4px_14px_rgb(79_70_229_/_0.3)] transition hover:-translate-y-0.5 hover:bg-indigo-500 hover:shadow-[0_8px_24px_rgb(79_70_229_/_0.38)] dark:bg-indigo-500 dark:shadow-[0_4px_18px_rgb(99_102_241_/_0.35)] dark:hover:bg-indigo-400">
                Voir mes projets
                <svg className="size-4 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </a>
              <a href="#contact" className="rounded-[10px] border-2 border-slate-300 px-7 py-3 text-sm font-medium text-slate-700 transition hover:border-indigo-600 hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-indigo-400 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-300">
                Me contacter
              </a>
            </div>
          </div>
        </section>

        <section id="about" className="border-y border-slate-200 bg-slate-50 px-[5%] py-16 transition-colors duration-300 sm:py-24 dark:border-slate-800 dark:bg-slate-900/40">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionHeading eyebrow="À propos" title="Qui suis-je ?" />
            </Reveal>
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
                {skills.map((skill) => <SkillCard key={skill.name} {...skill} />)}
                <p className="col-span-full mt-3 border-b border-slate-200 pb-2 text-[0.65rem] font-bold tracking-[0.18em] text-slate-400 uppercase dark:border-slate-800 dark:text-slate-500">Design & Outils</p>
                {designSkills.map((skill) => <SkillCard key={skill.name} {...skill} />)}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="projects" className="bg-white px-[5%] py-16 transition-colors duration-300 sm:py-24 dark:bg-slate-950">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionHeading eyebrow="Projets" title="Mes réalisations" />
            </Reveal>
            <div className="mt-12 grid gap-6">
              {projects.map((project, index) => (
                <Reveal key={project.title} delay={index * 80}>
                  <article
                    onMouseMove={trackPointer}
                    className="spotlight group relative flex h-full flex-col gap-6 rounded-2xl border border-slate-200 bg-slate-50 p-6 transition duration-250 hover:-translate-y-1 hover:border-indigo-600 hover:shadow-[0_10px_40px_rgb(0_0_0_/_0.1)] sm:flex-row sm:items-center sm:gap-6 md:gap-8 md:p-8 lg:gap-10 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500 dark:hover:shadow-[0_10px_40px_rgb(0_0_0_/_0.5)]"
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
                          <span key={tag} className="rounded-md border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-600 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-300">{tag}</span>
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
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="border-t border-slate-200 bg-slate-50 px-[5%] py-16 transition-colors duration-300 sm:py-24 dark:border-slate-800 dark:bg-slate-900/40">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionHeading eyebrow="Contact" title="Travaillons ensemble" centered />
            </Reveal>
            <Reveal className="mx-auto mt-12 max-w-xl rounded-3xl border border-slate-200 bg-white px-6 py-10 text-center shadow-[0_1px_3px_rgb(0_0_0_/_0.06),0_4px_16px_rgb(0_0_0_/_0.06)] sm:px-12 dark:border-slate-800 dark:bg-slate-900 dark:shadow-[0_1px_3px_rgb(0_0_0_/_0.4),0_4px_24px_rgb(0_0_0_/_0.35)]" delay={80}>
              <p className="text-[0.92rem] leading-7 text-slate-500 dark:text-slate-400">
                Tu as un projet en tête ? Une idée à concrétiser ? N&apos;hésite pas à me contacter. Je suis ouvert aux opportunités de collaboration, aux projets freelance et aux nouvelles expériences.
              </p>
              <a href="mailto:ibrahima.diaite@email.com" className="mt-8 inline-block rounded-[10px] bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-[0_4px_14px_rgb(79_70_229_/_0.3)] transition hover:-translate-y-0.5 hover:bg-indigo-500 dark:bg-indigo-500 dark:shadow-[0_4px_18px_rgb(99_102_241_/_0.35)] dark:hover:bg-indigo-400">
                Envoyer un message
              </a>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <a href="https://github.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-[10px] border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-500 transition hover:border-indigo-600 hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-400 dark:hover:border-indigo-400 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-300">
                  <i className="devicon-github-original" aria-hidden="true" /> GitHub
                </a>
                <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-[10px] border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-500 transition hover:border-indigo-600 hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-400 dark:hover:border-indigo-400 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-300">
                  <i className="devicon-linkedin-plain colored" aria-hidden="true" /> LinkedIn
                </a>
                <a href="mailto:ibrahima.diaite@email.com" className="inline-flex items-center gap-2 rounded-[10px] border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-500 transition hover:border-indigo-600 hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-400 dark:hover:border-indigo-400 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-300">
                  <span aria-hidden="true">✉</span> Email
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="flex flex-col items-center justify-between gap-2 border-t border-slate-200 bg-white px-[5%] py-6 text-center text-xs text-slate-400 transition-colors duration-300 sm:flex-row sm:text-left dark:border-slate-800 dark:bg-slate-950 dark:text-slate-500">
        <span>© {new Date().getFullYear()} Ibrahima Diaite</span>
        <span>Développé avec React & Tailwind CSS</span>
      </footer>

      <BackToTop />
    </>
  )
}

export default App
