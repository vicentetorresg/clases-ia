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
    title: 'Taller IA para Profesionales — Grupo 1',
    start: 'Martes 9 de Septiembre, 2026',
    dates: '9, 16, 23, 30 Sept',
    time: '19:00 — 20:30 hrs',
    spots: 5,
    taken: 2,
  },
  {
    id: 2,
    title: 'Taller IA para Profesionales — Grupo 2',
    start: 'Martes 7 de Octubre, 2026',
    dates: '7, 14, 21, 28 Oct',
    time: '19:00 — 20:30 hrs',
    spots: 5,
    taken: 0,
  },
  {
    id: 3,
    title: 'Taller IA para Profesionales — Grupo 3',
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
    title: 'Ads, Pixeles & Generacion de Demanda',
    topics: [
      'Meta Ads + TikTok Ads: estructura de campanas con IA',
      'Instalacion de pixeles y tracking avanzado',
      'Generar landing pages que conviertan',
      'Automatizar reportes de campanas',
    ],
  },
  {
    week: '03',
    title: 'Conectar Todo: Integraciones & Automatizaciones',
    topics: [
      'Supabase: base de datos en la nube sin codigo',
      'Webhooks, crons y edge functions',
      'Conectar formularios, CRMs y notificaciones',
      'Email automatizado con Resend',
    ],
  },
  {
    week: '04',
    title: 'Dashboards & Presentacion de Resultados',
    topics: [
      'Crear dashboards interactivos con IA',
      'Visualizacion de datos para toma de decisiones',
      'Deploy profesional: dominio, SSL, Vercel',
      'Proyecto final: tu producto digital funcionando',
    ],
  },
]

const FAQS = [
  {
    q: 'Necesito saber programar?',
    a: 'No. El taller esta disenado para profesionales sin experiencia tecnica. La IA hace el trabajo pesado, tu das las instrucciones.',
  },
  {
    q: 'Cuantas personas hay por grupo?',
    a: 'Maximo 5 personas por grupo. Esto permite atencion personalizada y que todos avancen a buen ritmo.',
  },
  {
    q: 'Puede inscribirse mi equipo completo?',
    a: 'Si. Puedes reservar un grupo completo para tu empresa. Adaptamos los ejercicios a tu industria.',
  },
  {
    q: 'Donde son las clases?',
    a: 'Presenciales en Santiago. La ubicacion exacta se confirma al inscribirse.',
  },
  {
    q: 'Que incluye el precio?',
    a: '4 sesiones de 1.5 horas, material digital, acceso a grupo de WhatsApp exclusivo y soporte entre sesiones.',
  },
  {
    q: 'Puedo pagar en cuotas?',
    a: 'Si, aceptamos hasta 3 cuotas sin interes con tarjeta de credito.',
  },
  {
    q: 'Que pasa si falto a una sesion?',
    a: 'Grabamos un resumen de cada sesion y te enviamos el material. Tambien puedes recuperarla en el siguiente grupo.',
  },
  {
    q: 'Hay certificado?',
    a: 'Si, al completar las 4 sesiones recibes un certificado digital de finalizacion.',
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
          className="text-5xl font-bold text-lime"
          style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', animation: 'shimmer 2s ease-in-out infinite' }}
        >
          IA
        </div>
        <div className="mt-2 text-xs font-mono text-text-muted tracking-[0.4em] uppercase">
          Talleres
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
    <section ref={ref} id={id} className={`px-6 ${className}`} style={{ paddingTop: 'clamp(80px,10vw,160px)', paddingBottom: 'clamp(80px,10vw,160px)' }}>
      <div className="mx-auto" style={{ maxWidth: 1280 }}>
        {children}
      </div>
    </section>
  )
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-xs text-lime uppercase tracking-[0.4em] mb-6">
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
        className="w-full flex items-center justify-between py-5 text-left cursor-pointer"
        aria-expanded={open}
      >
        <span className="text-lg font-medium text-text-primary pr-4">{q}</span>
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
            <p className="pb-5 text-base text-text-secondary leading-relaxed">{a}</p>
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
          <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: '100svh' }}>
            {/* BG gradient */}
            <div className="absolute inset-0 bg-obsidian" />
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 120%, rgba(212,255,79,0.08) 0%, transparent 60%)' }} />
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

            <div className="relative z-10 text-center px-6" style={{ maxWidth: 900 }}>
              <div className="font-mono text-xs text-lime uppercase tracking-[0.4em] mb-8">
                Talleres Presenciales · 2026
              </div>
              <h1 style={{ fontSize: 'clamp(36px, 6vw, 72px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                <span className="font-bold text-text-primary">Sube tu nivel con </span>
                <span className="font-serif italic text-lime">Inteligencia Artificial</span>
              </h1>
              <p className="mt-6 text-lg text-text-secondary mx-auto leading-relaxed" style={{ maxWidth: 560 }}>
                4 sesiones presenciales. Grupos de 5 personas.
                De cero a productivo con las herramientas que estan cambiando el juego.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="#talleres"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-lime text-obsidian font-bold text-base transition-colors hover:bg-lime-dark"
                >
                  Ver proximos talleres
                  <span aria-hidden="true">&rarr;</span>
                </motion.a>
                <motion.a
                  href="#temario"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-border text-text-primary font-medium text-base transition-colors hover:border-border-hover hover:bg-surface"
                >
                  Ver temario
                </motion.a>
              </div>
              <div className="mt-16 flex flex-wrap justify-center gap-8 text-text-muted text-sm font-mono">
                <span>5 personas max.</span>
                <span>4 semanas</span>
                <span>Martes 19:00</span>
                <span>Presencial</span>
              </div>
            </div>
          </section>

          {/* ══════ WHAT YOU'LL LEARN ══════ */}
          <Section id="que-aprenderas">
            <Eyebrow>Que vas a aprender</Eyebrow>
            <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', lineHeight: 1.15, letterSpacing: '-0.02em' }} className="font-bold text-text-primary mb-4">
              Herramientas reales,{' '}
              <span className="font-serif italic text-lime">resultados inmediatos</span>
            </h2>
            <p className="text-text-secondary text-lg mb-16 max-w-xl">
              No es teoria. Cada sesion terminas con algo funcionando. Desde tu primer deploy hasta tu dashboard en produccion.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: '>', title: 'Claude Code', desc: 'Programa sin saber programar. Crea apps, scripts y automatizaciones con lenguaje natural.' },
                { icon: '$', title: 'Ads & Pixeles', desc: 'Meta Ads, TikTok Ads, pixeles de tracking. Campanas que generan demanda real.' },
                { icon: '{}', title: 'Integraciones', desc: 'Conecta todo: formularios, bases de datos, emails, webhooks. Sin depender de nadie.' },
                { icon: '#', title: 'Dashboards', desc: 'Visualiza tus datos. Crea dashboards interactivos para tomar mejores decisiones.' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4 }}
                  className="p-6 rounded-2xl border border-border bg-surface transition-colors hover:border-border-hover hover:bg-surface-hover"
                >
                  <div className="w-12 h-12 rounded-xl bg-lime/10 flex items-center justify-center mb-4 font-mono text-lime text-lg font-bold">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-text-primary mb-2">{item.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* ══════ SYLLABUS ══════ */}
          <Section id="temario" className="bg-surface">
            <Eyebrow>Temario Clase a Clase</Eyebrow>
            <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', lineHeight: 1.15, letterSpacing: '-0.02em' }} className="font-bold text-text-primary mb-16">
              4 semanas para{' '}
              <span className="font-serif italic text-lime">transformar tu trabajo</span>
            </h2>
            <div className="space-y-8">
              {SYLLABUS.map((s, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 4 }}
                  className="flex flex-col md:flex-row gap-6 md:gap-12 p-6 md:p-8 rounded-2xl border border-border bg-obsidian/50 transition-colors hover:border-border-hover"
                >
                  <div className="shrink-0">
                    <div className="font-mono text-4xl font-bold text-lime/30">{s.week}</div>
                    <div className="font-mono text-xs text-text-muted mt-1 uppercase">Semana</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text-primary mb-4">{s.title}</h3>
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
            <Eyebrow>Proximos Talleres</Eyebrow>
            <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', lineHeight: 1.15, letterSpacing: '-0.02em' }} className="font-bold text-text-primary mb-4">
              Elige tu grupo e{' '}
              <span className="font-serif italic text-lime">inscribete</span>
            </h2>
            <p className="text-text-secondary text-lg mb-16 max-w-xl">
              $500.000 + IVA por persona. 4 sesiones de 1.5 horas. Todos los martes a las 19:00 hrs.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {WORKSHOPS.map((w, i) => {
                const available = w.spots - w.taken
                const isFeatured = i === 0
                return (
                  <motion.div
                    key={w.id}
                    whileHover={{ y: -6 }}
                    className={`relative p-8 rounded-2xl border transition-colors flex flex-col ${
                      isFeatured
                        ? 'border-lime/40 bg-lime/[0.03]'
                        : 'border-border bg-surface hover:border-border-hover'
                    }`}
                    style={isFeatured ? { boxShadow: '0 0 80px rgba(212,255,79,0.06)' } : {}}
                  >
                    {isFeatured && (
                      <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-lime text-obsidian text-xs font-bold uppercase tracking-wider">
                        Proximo
                      </div>
                    )}
                    <div className="font-mono text-xs text-text-muted uppercase tracking-wider mb-3">
                      Grupo {w.id}
                    </div>
                    <h3 className="text-lg font-bold text-text-primary mb-4">{w.title}</h3>
                    <div className="space-y-2 text-sm text-text-secondary mb-6">
                      <div className="flex items-center gap-2">
                        <span className="text-lime">&#9654;</span> Inicio: {w.start}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lime">&#9654;</span> Sesiones: {w.dates}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lime">&#9654;</span> Horario: {w.time}
                      </div>
                    </div>
                    <div className="mt-auto">
                      <div className="flex items-baseline gap-1 mb-1">
                        <span className="text-3xl font-bold text-text-primary">$500.000</span>
                        <span className="text-sm text-text-muted">+ IVA</span>
                      </div>
                      <div className="text-xs text-text-muted mb-6">4 sesiones · 1 mes</div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-mono text-text-secondary">
                          {available} de {w.spots} cupos disponibles
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
                        href={`https://wa.me/56957823672?text=Hola!%20Quiero%20inscribirme%20en%20el%20Taller%20IA%20Grupo%20${w.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full inline-flex items-center justify-center py-3.5 rounded-xl font-bold text-sm transition-colors ${
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
            <Eyebrow>Como Funciona</Eyebrow>
            <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', lineHeight: 1.15, letterSpacing: '-0.02em' }} className="font-bold text-text-primary mb-16">
              Simple, directo,{' '}
              <span className="font-serif italic text-lime">sin relleno</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { n: '01', title: 'Elige tu grupo', desc: 'Revisa las fechas disponibles y reserva tu cupo. Maximo 5 personas por grupo para asegurar atencion personalizada.' },
                { n: '02', title: 'Asiste cada martes', desc: '4 martes seguidos, 19:00 a 20:30. Cada sesion es practica: llegas, aprendes, construyes algo real.' },
                { n: '03', title: 'Aplica desde el dia 1', desc: 'Terminas cada clase con herramientas funcionando. Al final del mes, tu flujo de trabajo es otro.' },
              ].map((step, i) => (
                <div key={i} className="text-center md:text-left">
                  <div className="font-mono text-5xl font-bold text-lime/20 mb-4">{step.n}</div>
                  <h3 className="text-xl font-bold text-text-primary mb-3">{step.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* ══════ SOCIAL PROOF ══════ */}
          <Section>
            <Eyebrow>Para Quien Es</Eyebrow>
            <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', lineHeight: 1.15, letterSpacing: '-0.02em' }} className="font-bold text-text-primary mb-16">
              Profesionales que quieren{' '}
              <span className="font-serif italic text-lime">ir mas rapido</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { role: 'Emprendedores', desc: 'Que necesitan lanzar productos digitales sin equipo tecnico. Landing pages, CRMs, automatizaciones.' },
                { role: 'Equipos de Marketing', desc: 'Que quieren dominar ads, tracking, pixeles y dashboards de resultados con IA.' },
                { role: 'Profesionales', desc: 'De cualquier area que quieran multiplicar su productividad y destacar con herramientas de vanguardia.' },
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-2xl border border-border bg-surface">
                  <div className="w-10 h-10 rounded-full bg-lime/10 flex items-center justify-center mb-4 font-mono text-lime text-sm font-bold">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-lg font-bold text-text-primary mb-2">{item.role}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* ══════ FAQ ══════ */}
          <Section id="faq" className="bg-surface">
            <Eyebrow>Preguntas Frecuentes</Eyebrow>
            <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', lineHeight: 1.15, letterSpacing: '-0.02em' }} className="font-bold text-text-primary mb-12">
              Dudas?{' '}
              <span className="font-serif italic text-lime">Aqui las resolvemos</span>
            </h2>
            <div className="max-w-2xl mx-auto">
              {FAQS.map((faq, i) => (
                <FAQItem key={i} q={faq.q} a={faq.a} />
              ))}
            </div>
          </Section>

          {/* ══════ FINAL CTA ══════ */}
          <section className="relative py-32 px-6 text-center overflow-hidden">
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(212,255,79,0.1) 0%, transparent 50%)' }} />
            <div className="relative z-10">
              <div className="font-mono text-xs text-lime uppercase tracking-[0.4em] mb-6">
                No esperes mas
              </div>
              <h2 style={{ fontSize: 'clamp(32px,5vw,56px)', lineHeight: 1.1, letterSpacing: '-0.02em' }} className="font-bold text-text-primary mb-4">
                Listo para{' '}
                <span className="font-serif italic text-lime">subir tu nivel?</span>
              </h2>
              <p className="text-text-secondary text-lg mb-10 mx-auto" style={{ maxWidth: 480 }}>
                Los cupos son limitados. Reserva tu lugar en el proximo taller.
              </p>
              <motion.a
                href="#talleres"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-10 py-5 rounded-2xl bg-lime text-obsidian font-bold text-lg transition-colors hover:bg-lime-dark"
              >
                Ver proximos talleres
                <span aria-hidden="true">&rarr;</span>
              </motion.a>
            </div>
            {/* Marquee */}
            <div className="mt-20 overflow-hidden">
              <div
                className="flex whitespace-nowrap font-mono text-sm text-text-muted uppercase tracking-[0.3em] hover:[animation-play-state:paused]"
                style={{ animation: 'marquee 20s linear infinite', width: 'max-content' }}
              >
                {Array.from({ length: 2 }).map((_, i) => (
                  <span key={i}>
                    &nbsp;&nbsp;PRESENCIAL &middot; GRUPOS DE 5 &middot; CLAUDE CODE &middot; ADS &middot; DASHBOARDS &middot; PRODUCTIVIDAD &middot; INTEGRACIONES &middot; DEPLOY &middot;&nbsp;&nbsp;
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* ══════ FOOTER ══════ */}
          <footer className="border-t border-border px-6 py-12">
            <div className="mx-auto flex flex-col md:flex-row items-center justify-between gap-6" style={{ maxWidth: 1280 }}>
              <div className="flex items-center gap-3">
                <span className="font-serif italic text-2xl text-lime">IA</span>
                <span className="text-sm text-text-muted">Talleres Presenciales</span>
              </div>
              <div className="flex gap-8 text-sm text-text-secondary">
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
