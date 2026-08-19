import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './index.css'

gsap.registerPlugin(ScrollTrigger)

/* ─── DATA ─── */

const WORKSHOPS = [
  {
    id: 1,
    title: 'Up or Out — Grupo 1',
    start: 'Martes 9 de Septiembre, 2026',
    dates: '9, 16, 23, 30 Sept',
    time: '19:00 — 20:30 hrs',
    spots: 5,
    taken: 2,
  },
  {
    id: 2,
    title: 'Up or Out — Grupo 2',
    start: 'Martes 7 de Octubre, 2026',
    dates: '7, 14, 21, 28 Oct',
    time: '19:00 — 20:30 hrs',
    spots: 5,
    taken: 0,
  },
  {
    id: 3,
    title: 'Up or Out — Grupo 3',
    start: 'Martes 4 de Noviembre, 2026',
    dates: '4, 11, 18, 25 Nov',
    time: '19:00 — 20:30 hrs',
    spots: 5,
    taken: 0,
  },
]

const SYLLABUS = [
  {
    week: '01',
    title: 'Claude Code & Productividad con IA',
    topics: [
      'Setup de Claude Code y entorno de trabajo',
      'Automatizar tareas repetitivas con IA',
      'Crear scripts, conectar APIs y deployar en minutos',
      'Workflow: de la idea al producto en 1 hora',
    ],
  },
  {
    week: '02',
    title: 'Ads, Píxeles & Generación de Demanda',
    topics: [
      'Meta Ads + TikTok Ads: estructura de campañas con IA',
      'Instalación de píxeles y tracking avanzado',
      'Generar landing pages que conviertan',
      'Automatizar reportes de campañas',
    ],
  },
  {
    week: '03',
    title: 'Conectar Todo: Integraciones & Automatizaciones',
    topics: [
      'Supabase: base de datos en la nube sin código',
      'Webhooks, crons y edge functions',
      'Conectar formularios, CRMs y notificaciones',
      'Email automatizado con Resend',
    ],
  },
  {
    week: '04',
    title: 'Dashboards & Presentación de Resultados',
    topics: [
      'Crear dashboards interactivos con IA',
      'Visualización de datos para toma de decisiones',
      'Deploy profesional: dominio, SSL, Vercel',
      'Proyecto final: tu producto digital funcionando',
    ],
  },
]

const FAQS = [
  {
    q: '¿Necesito saber programar?',
    a: 'No. El taller está diseñado para profesionales sin experiencia técnica. La IA hace el trabajo pesado, tú das las instrucciones.',
  },
  {
    q: '¿Cuántas personas hay por grupo?',
    a: 'Máximo 5 personas por grupo. Esto permite atención personalizada y que todos avancen a buen ritmo.',
  },
  {
    q: '¿Puede inscribirse mi equipo completo?',
    a: 'Sí. Puedes reservar un grupo completo para tu empresa. Adaptamos los ejercicios a tu industria.',
  },
  {
    q: '¿Dónde son las clases?',
    a: 'Presenciales cerca del Metro Manquehue, Las Condes. La dirección exacta se confirma al inscribirse.',
  },
  {
    q: '¿Qué incluye el precio?',
    a: '4 sesiones de 1.5 horas, material digital, acceso a grupo de WhatsApp exclusivo y soporte entre sesiones.',
  },
  {
    q: '¿Puedo pagar en cuotas?',
    a: 'Sí, aceptamos hasta 3 cuotas sin interés con tarjeta de crédito.',
  },
  {
    q: '¿Qué pasa si falto a una sesión?',
    a: 'Grabamos un resumen de cada sesión y te enviamos el material. También puedes recuperarla en el siguiente grupo.',
  },
  {
    q: '¿Hay certificado?',
    a: 'Sí, al completar las 4 sesiones recibes un certificado digital de finalización.',
  },
]

/* ─── COMPONENTS ─── */

function Loader({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2500)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div
          className="text-4xl sm:text-5xl font-bold text-lime"
          style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', animation: 'shimmer 2s ease-in-out infinite' }}
        >
          Up or Out
        </div>
        <div className="mt-2 text-xs font-mono text-text-muted tracking-[0.4em] uppercase">
          Talleres IA
        </div>
      </motion.div>
    </motion.div>
  )
}

function Section({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
        }
      )
    })
    return () => mm.revert()
  }, [])

  return (
    <section ref={ref} id={id} className={`px-6 sm:px-12 md:px-20 lg:px-32 ${className}`} style={{ paddingTop: 'clamp(60px,10vw,160px)', paddingBottom: 'clamp(60px,10vw,160px)' }}>
      <div className="mx-auto" style={{ maxWidth: 1120 }}>
        {children}
      </div>
    </section>
  )
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[10px] sm:text-xs text-lime uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-4 sm:mb-6">
      {children}
    </div>
  )
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="border-b border-border"
      style={{ borderLeft: open ? '2px solid #D4FF4F' : '2px solid transparent', paddingLeft: open ? 14 : 16 }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 sm:py-5 text-left cursor-pointer"
        aria-expanded={open}
      >
        <span className="text-base sm:text-lg font-medium text-text-primary pr-4">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-lime text-2xl shrink-0"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm sm:text-base text-text-secondary leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── APP ─── */

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      <AnimatePresence>{loading && <Loader onDone={() => setLoading(false)} />}</AnimatePresence>

      {!loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.1 }}>

          {/* ══════ HERO ══════ */}
          <section className="relative grid place-content-center overflow-hidden px-6 sm:px-12 md:px-20 lg:px-32 min-h-screen">
            {/* BG gradient */}
            <div className="absolute inset-0 bg-obsidian" />
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 120%, rgba(212,255,79,0.08) 0%, transparent 60%)' }} />
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

            <div className="relative z-10 text-center mx-auto w-full py-20" style={{ maxWidth: 900 }}>
              <div className="font-mono text-[10px] sm:text-xs text-lime uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-6">
                Talleres Presenciales de IA · 2026
              </div>
              <h1 style={{ fontSize: 'clamp(36px, 7vw, 80px)', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
                <span className="font-serif italic text-lime block">Up or Out.</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-text-secondary mx-auto leading-relaxed" style={{ maxWidth: 620 }}>
                La IA ya está cambiando cómo se trabaja.<br className="hidden sm:block" />
                Quien no la domine, queda obsoleto. Así de simple.
              </p>
              <p className="mt-3 text-sm sm:text-base text-text-muted mx-auto" style={{ maxWidth: 520 }}>
                4 sesiones presenciales. Grupos de 5. De cero a productivo en 1 mes.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <motion.a
                  href="#talleres"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 sm:px-8 sm:py-4 rounded-2xl bg-lime text-obsidian font-bold text-sm sm:text-base transition-colors hover:bg-lime-dark"
                >
                  Quiero subir
                  <span aria-hidden="true">&uarr;</span>
                </motion.a>
                <motion.a
                  href="#temario"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 sm:px-8 sm:py-4 rounded-2xl border border-border text-text-primary font-medium text-sm sm:text-base transition-colors hover:border-border-hover hover:bg-surface"
                >
                  Ver temario
                </motion.a>
              </div>
              <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-text-muted text-xs sm:text-sm font-mono">
                <span>5 personas max.</span>
                <span>4 semanas</span>
                <span>Martes 19:00</span>
                <span>Metro Manquehue, Las Condes</span>
              </div>
            </div>
          </section>

          {/* ══════ WHAT YOU'LL LEARN ══════ */}
          <Section id="que-aprenderas">
            <Eyebrow>Lo que vas a dominar</Eyebrow>
            <h2 style={{ fontSize: 'clamp(24px,4vw,48px)', lineHeight: 1.15, letterSpacing: '-0.02em' }} className="font-bold text-text-primary mb-3 sm:mb-4">
              Las herramientas que{' '}
              <span className="font-serif italic text-lime">te hacen irremplazable</span>
            </h2>
            <p className="text-text-secondary text-base sm:text-lg mb-10 sm:mb-16 max-w-xl">
              No es teoría. Cada sesión terminas con algo funcionando. Tu competencia no sabe esto — esa es tu ventaja.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                { icon: '>', title: 'Claude Code', desc: 'Programa sin saber programar. Crea apps, scripts y automatizaciones con lenguaje natural.' },
                { icon: '$', title: 'Ads & Píxeles', desc: 'Meta Ads, TikTok Ads, píxeles de tracking. Campañas que generan demanda real.' },
                { icon: '{}', title: 'Integraciones', desc: 'Conecta todo: formularios, bases de datos, emails, webhooks. Sin depender de nadie.' },
                { icon: '#', title: 'Dashboards', desc: 'Visualiza tus datos. Crea dashboards interactivos para tomar mejores decisiones.' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4 }}
                  className="p-5 sm:p-6 rounded-2xl border border-border bg-surface transition-colors hover:border-border-hover hover:bg-surface-hover"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-lime/10 flex items-center justify-center mb-3 sm:mb-4 font-mono text-lime text-base sm:text-lg font-bold">
                    {item.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-text-primary mb-2">{item.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* ══════ SYLLABUS ══════ */}
          <Section id="temario" className="bg-surface">
            <Eyebrow>Temario Clase a Clase</Eyebrow>
            <h2 style={{ fontSize: 'clamp(24px,4vw,48px)', lineHeight: 1.15, letterSpacing: '-0.02em' }} className="font-bold text-text-primary mb-10 sm:mb-16">
              4 semanas para{' '}
              <span className="font-serif italic text-lime">dejar atrás al resto</span>
            </h2>
            <div className="space-y-4 sm:space-y-8">
              {SYLLABUS.map((s, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 4 }}
                  className="flex flex-col sm:flex-row gap-4 sm:gap-12 p-5 sm:p-8 rounded-2xl border border-border bg-obsidian/50 transition-colors hover:border-border-hover"
                >
                  <div className="shrink-0 flex sm:block items-center gap-3">
                    <div className="font-mono text-3xl sm:text-4xl font-bold text-lime/30">{s.week}</div>
                    <div className="font-mono text-xs text-text-muted sm:mt-1 uppercase">Semana</div>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-3 sm:mb-4">{s.title}</h3>
                    <ul className="space-y-2">
                      {s.topics.map((t, j) => (
                        <li key={j} className="flex items-start gap-3 text-text-secondary text-sm leading-relaxed">
                          <span className="text-lime mt-0.5 shrink-0">&#10003;</span>
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* ══════ WORKSHOPS / PRICING ══════ */}
          <Section id="talleres">
            <Eyebrow>Próximos Grupos</Eyebrow>
            <h2 style={{ fontSize: 'clamp(24px,4vw,48px)', lineHeight: 1.15, letterSpacing: '-0.02em' }} className="font-bold text-text-primary mb-3 sm:mb-4">
              Elige tu grupo.{' '}
              <span className="font-serif italic text-lime">Decide subir.</span>
            </h2>
            <p className="text-text-secondary text-base sm:text-lg mb-10 sm:mb-16 max-w-xl">
              $500.000 + IVA por persona. 4 sesiones de 1.5 horas. Todos los martes a las 19:00 hrs.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {WORKSHOPS.map((w, i) => {
                const available = w.spots - w.taken
                const isFeatured = i === 0
                return (
                  <motion.div
                    key={w.id}
                    whileHover={{ y: -6 }}
                    className={`relative p-6 sm:p-8 rounded-2xl border transition-colors flex flex-col ${
                      isFeatured
                        ? 'border-lime/40 bg-lime/[0.03]'
                        : 'border-border bg-surface hover:border-border-hover'
                    }`}
                    style={isFeatured ? { boxShadow: '0 0 80px rgba(212,255,79,0.06)' } : {}}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
                        Grupo {w.id}
                      </span>
                      {isFeatured && (
                        <span className="px-2.5 py-0.5 rounded-full bg-lime text-obsidian text-[10px] font-bold uppercase tracking-wider">
                          Proximo
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-text-primary mb-4">{w.title}</h3>
                    <div className="space-y-2 text-sm text-text-secondary mb-6">
                      <div className="flex items-center gap-2">
                        <span className="text-lime shrink-0">&#9654;</span> Inicio: {w.start}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lime shrink-0">&#9654;</span> Sesiones: {w.dates}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lime shrink-0">&#9654;</span> Horario: {w.time}
                      </div>
                    </div>
                    <div className="mt-auto">
                      <div className="flex items-baseline gap-1 mb-1">
                        <span className="text-2xl sm:text-3xl font-bold text-text-primary">$500.000</span>
                        <span className="text-sm text-text-muted">+ IVA</span>
                      </div>
                      <div className="text-xs text-text-muted mb-5 sm:mb-6">4 sesiones · 1 mes</div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-mono text-text-secondary">
                          {available}/{w.spots} cupos
                        </span>
                        <div className="flex gap-1">
                          {Array.from({ length: w.spots }).map((_, j) => (
                            <div
                              key={j}
                              className={`w-2.5 h-2.5 rounded-full ${j < w.taken ? 'bg-text-muted' : 'bg-lime'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <motion.a
                        href={`https://wa.me/56994366697?text=Hola!%20Quiero%20inscribirme%20en%20Up%20or%20Out%20Grupo%20${w.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full inline-flex items-center justify-center py-3 sm:py-3.5 rounded-xl font-bold text-sm transition-colors ${
                          isFeatured
                            ? 'bg-lime text-obsidian hover:bg-lime-dark'
                            : 'border border-border text-text-primary hover:border-border-hover hover:bg-surface-hover'
                        }`}
                      >
                        {available > 0 ? 'Inscribirme' : 'Lista de espera'}
                        <span className="ml-2" aria-hidden="true">&rarr;</span>
                      </motion.a>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </Section>

          {/* ══════ HOW IT WORKS ══════ */}
          <Section id="como-funciona" className="bg-surface">
            <Eyebrow>Cómo Funciona</Eyebrow>
            <h2 style={{ fontSize: 'clamp(24px,4vw,48px)', lineHeight: 1.15, letterSpacing: '-0.02em' }} className="font-bold text-text-primary mb-10 sm:mb-16">
              Simple, directo,{' '}
              <span className="font-serif italic text-lime">sin relleno</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { n: '01', title: 'Elige tu grupo', desc: 'Revisa las fechas disponibles y reserva tu cupo. Máximo 5 personas por grupo para asegurar atención personalizada.' },
                { n: '02', title: 'Asiste cada martes', desc: '4 martes seguidos, 19:00 a 20:30. Cada sesión es práctica: llegas, aprendes, construyes algo real.' },
                { n: '03', title: 'Aplica desde el día 1', desc: 'Terminas cada clase con herramientas funcionando. Al final del mes, tu flujo de trabajo es otro.' },
              ].map((step, i) => (
                <div key={i} className="text-left">
                  <div className="font-mono text-4xl sm:text-5xl font-bold text-lime/20 mb-3 sm:mb-4">{step.n}</div>
                  <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-2 sm:mb-3">{step.title}</h3>
                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* ══════ FOR WHO ══════ */}
          <Section>
            <Eyebrow>Para Quién Es</Eyebrow>
            <h2 style={{ fontSize: 'clamp(24px,4vw,48px)', lineHeight: 1.15, letterSpacing: '-0.02em' }} className="font-bold text-text-primary mb-10 sm:mb-16">
              Para los que eligen{' '}
              <span className="font-serif italic text-lime">subir</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {[
                { role: 'Emprendedores', desc: 'Que necesitan lanzar productos digitales sin equipo técnico. Landing pages, CRMs, automatizaciones.' },
                { role: 'Equipos de Marketing', desc: 'Que quieren dominar ads, tracking, píxeles y dashboards de resultados con IA.' },
                { role: 'Profesionales', desc: 'De cualquier área que quieran multiplicar su productividad y destacar con herramientas de vanguardia.' },
              ].map((item, i) => (
                <div key={i} className="p-5 sm:p-6 rounded-2xl border border-border bg-surface">
                  <div className="w-10 h-10 rounded-full bg-lime/10 flex items-center justify-center mb-3 sm:mb-4 font-mono text-lime text-sm font-bold">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-text-primary mb-2">{item.role}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* ══════ FAQ ══════ */}
          <Section id="faq" className="bg-surface">
            <Eyebrow>Preguntas Frecuentes</Eyebrow>
            <h2 style={{ fontSize: 'clamp(24px,4vw,48px)', lineHeight: 1.15, letterSpacing: '-0.02em' }} className="font-bold text-text-primary mb-8 sm:mb-12">
              ¿Dudas?{' '}
              <span className="font-serif italic text-lime">Aquí las resolvemos</span>
            </h2>
            <div className="max-w-2xl">
              {FAQS.map((faq, i) => (
                <FAQItem key={i} q={faq.q} a={faq.a} />
              ))}
            </div>
          </Section>

          {/* ══════ FINAL CTA ══════ */}
          <section className="relative py-20 sm:py-32 px-6 sm:px-12 md:px-20 lg:px-32 text-center overflow-hidden">
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(212,255,79,0.1) 0%, transparent 50%)' }} />
            <div className="relative z-10">
              <div className="font-mono text-[10px] sm:text-xs text-lime uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-4 sm:mb-6">
                La decisión es tuya
              </div>
              <h2 style={{ fontSize: 'clamp(28px,5vw,56px)', lineHeight: 1.1, letterSpacing: '-0.02em' }} className="font-bold text-text-primary mb-4">
                <span className="font-serif italic text-lime">Up</span> or out.
              </h2>
              <p className="text-text-secondary text-base sm:text-lg mb-8 sm:mb-10 mx-auto" style={{ maxWidth: 480 }}>
                La IA no va a esperar por ti. Los cupos son limitados. Decide ahora.
              </p>
              <motion.a
                href="#talleres"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-8 py-4 sm:px-10 sm:py-5 rounded-2xl bg-lime text-obsidian font-bold text-base sm:text-lg transition-colors hover:bg-lime-dark"
              >
                Quiero subir
                <span aria-hidden="true">&uarr;</span>
              </motion.a>
            </div>
            {/* Marquee */}
            <div className="mt-16 sm:mt-20 overflow-hidden">
              <div
                className="flex whitespace-nowrap font-mono text-xs sm:text-sm text-text-muted uppercase tracking-[0.2em] sm:tracking-[0.3em] hover:[animation-play-state:paused]"
                style={{ animation: 'marquee 20s linear infinite', width: 'max-content' }}
              >
                {Array.from({ length: 2 }).map((_, i) => (
                  <span key={i}>
                    &nbsp;&nbsp;UP OR OUT &middot; PRESENCIAL &middot; GRUPOS DE 5 &middot; CLAUDE CODE &middot; ADS &middot; DASHBOARDS &middot; INTEGRACIONES &middot; DEPLOY &middot;&nbsp;&nbsp;
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* ══════ FOOTER ══════ */}
          <footer className="border-t border-border px-6 sm:px-12 md:px-20 lg:px-32 py-8 sm:py-12">
            <div className="mx-auto flex flex-col md:flex-row items-center justify-between gap-6" style={{ maxWidth: 1120 }}>
              <div className="flex items-center gap-3">
                <span className="font-serif italic text-2xl text-lime">Up or Out</span>
                <span className="text-sm text-text-muted">Talleres IA Presenciales</span>
              </div>
              <div className="flex gap-6 sm:gap-8 text-sm text-text-secondary">
                <a href="#temario" className="hover:text-lime transition-colors">Temario</a>
                <a href="#talleres" className="hover:text-lime transition-colors">Talleres</a>
                <a href="#faq" className="hover:text-lime transition-colors">FAQ</a>
              </div>
              <div className="text-xs text-text-muted">
                &copy; 2026 · Santiago, Chile
              </div>
            </div>
          </footer>

        </motion.div>
      )}
    </>
  )
}
