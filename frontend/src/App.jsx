import { useEffect, useMemo, useState } from 'react'

const Section = ({ id, title, children }) => (
  <section id={id} className="py-20">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-6">{title}</h2>
      {children}
    </div>
  </section>
)

const Nav = () => (
  <header className="fixed top-0 left-0 right-0 z-50">
    <div className="max-w-6xl mx-auto px-4">
      <div className="mt-3 h-14 rounded-full border border-white/10 bg-black/30 backdrop-blur-xl shadow-[0_8px_30px_rgb(2,6,23,0.4)] flex items-center justify-between px-3">
        <a href="#home" className="font-extrabold bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-400 bg-clip-text text-transparent px-3">
          Channakeshava
        </a>
        <nav className="hidden md:flex items-center gap-2">
          {[
            ['About', '#about'],
            ['Skills', '#skills'],
            ['Projects', '#projects'],
            ['Experience', '#experience'],
            ['Education', '#education'],
            ['Contact', '#contact'],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="relative px-3 py-2 rounded-full text-white/80 hover:text-white transition hover:bg-white/10"
            >
              {label}
            </a>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener"
            className="px-4 py-2 rounded-full bg-violet-600 hover:bg-violet-700 text-white transition ml-2"
          >
            Resume
          </a>
        </nav>
      </div>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"></div>
    </div>
  </header>
)

const GlassCard = ({ title, children, actions }) => (
  <div className="rounded-2xl border border-white/20 bg-white/5 p-6 hover:bg-white/10 transition flex flex-col h-full">
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <div className="text-white/80 flex-1">{children}</div>
    {actions && <div className="mt-4">{actions}</div>}
  </div>
)

const Hero = () => {
  useEffect(() => {}, [])
  const [imgError, setImgError] = useState(false)
  const gradient = useMemo(
    () =>
      'bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-400 bg-clip-text text-transparent',
    []
  )
  return (
    <section id="home" className="pt-24 md:pt-28">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className={`text-4xl md:text-5xl font-extrabold ${gradient}`}>Channakeshava</h1>
          <p className="mt-3 text-white/80">Passionate about building projects and contributing effectively as both a team leader and collaborative member.</p>
          <div className="mt-5 flex gap-3">
            <a href="#projects" className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 transition">View Projects</a>
            <a href="#contact" className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition">Contact Me</a>
            <a href="/resume.pdf" target="_blank" rel="noopener" className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition">Resume</a>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-square rounded-3xl border border-white/20 overflow-hidden bg-white/5">
            {!imgError ? (
              <img
                src="/channakeshava.jpg"
                alt="Channakeshava"
                className="w-full h-full object-cover"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-full grid place-items-center text-7xl">👨‍💻</div>
            )}
          </div>
          <div className="absolute -z-10 inset-0 blur-3xl opacity-50 bg-gradient-to-tr from-violet-600 to-blue-500"></div>
        </div>
      </div>
    </section>
  )
}

const Skills = () => (
  <Section id="skills" title="Skills">
    <div className="grid md:grid-cols-3 gap-4">
      <GlassCard title="Languages">
        C++, Python, JavaScript, Data Structures & Algorithms
      </GlassCard>
      <GlassCard title="Frameworks">
        HTML5, CSS3, Node.js, Express.js, REST APIs
      </GlassCard>
      <GlassCard title="Tools">
        MongoDB, SQL, Google Cloud Platform (Basics), Git, VS Code, Postman
      </GlassCard>
    </div>
  </Section>
)

const ToolIcon = ({ abbr, label, from, to }) => (
  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
    <svg viewBox="0 0 48 48" width="40" height="40" className="hover:animate-pulse">
      <defs>
        <linearGradient id={`grad-${abbr}`} x1="0" x2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="20" fill="none" stroke={`url(#grad-${abbr})`} strokeWidth="4" />
      <text x="24" y="29" textAnchor="middle" fontSize="13" fill="white">{abbr}</text>
    </svg>
    <span className="text-white/90">{label}</span>
  </div>
)

const Tools = () => (
  <Section id="tools" title="Tools">
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
      <ToolIcon abbr="GIT" label="Git" from="#f97316" to="#ef4444" />
      <ToolIcon abbr="VS" label="VS Code" from="#60a5fa" to="#2563eb" />
      <ToolIcon abbr="POST" label="Postman" from="#f59e0b" to="#d97706" />
      <ToolIcon abbr="MDB" label="MongoDB" from="#34d399" to="#059669" />
      <ToolIcon abbr="SQL" label="SQL" from="#a78bfa" to="#7c3aed" />
      <ToolIcon abbr="GCP" label="GCP" from="#f472b6" to="#22d3ee" />
    </div>
  </Section>
)

const Projects = () => (
  <Section id="projects" title="Projects">
    <div className="grid md:grid-cols-2 gap-6 items-stretch">
      <GlassCard
        title="Smart Evaluator"
        actions={
          <div className="mt-3 flex gap-2">
            <a className="px-3 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 transition text-sm" href="https://github.com/Channakeshava96/smartevaluator" target="_blank" rel="noopener">Code</a>
          </div>
        }
      >
        Automated script evaluation using Google Cloud Vision API; SBERT compares answers with rubrics; backend in Node.js and Python.
      </GlassCard>
      <GlassCard
        title="Retrieval-Augmented Generation (RAG) System"
        actions={
          <div className="mt-3 flex gap-2">
            <a className="px-3 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition text-sm" href="https://drive.google.com/file/d/1N3uQ0nxnsi0m6yL_2E_WekdgyQBiaBHu/view?usp=sharing" target="_blank" rel="noopener">Demo</a>
          </div>
        }
      >
        Knowledge-grounded responses from LLMs; integrates local files and Google Drive data with chunking and embeddings; Gemini models for context-aware answers.
      </GlassCard>
    </div>
  </Section>
)

const Experience = () => (
  <Section id="experience" title="Experience">
    <ul className="grid gap-4">
      <li className="rounded-2xl border border-white/20 bg-white/5 p-4 grid grid-cols-[1fr_auto] items-start gap-4">
        <div>
          <h3 className="font-semibold">Web Developer Intern — Shobha Packers & Movers</h3>
          <p className="text-white/80">Developed and deployed the company website to improve online presence and engagement; designed features to enhance UX and operational efficiency.</p>
          <a className="underline text-white/80" href="https://shobhamovers.com" target="_blank" rel="noopener">Website</a>
        </div>
        <span className="text-white/60 whitespace-nowrap">Jan 2025 – Feb 2025</span>
      </li>
    </ul>
  </Section>
)

const Education = () => (
  <Section id="education" title="Education">
    <div className="grid md:grid-cols-2 gap-6 items-stretch">
      <div className="rounded-2xl border border-white/20 bg-white/5 p-6 flex flex-col">
        <h3 className="text-xl font-semibold">BMS Institute of Technology and Management (BMSITM), Bengaluru</h3>
        <p className="text-white/80">BE in Computer Science Engineering, CGPA: 8.61/10</p>
        <span className="text-white/60">Dec 2022 – Present</span>
      </div>
      <div className="rounded-2xl border border-white/20 bg-white/5 p-6 flex flex-col">
        <h3 className="text-xl font-semibold">Jnana Jyothi PU College</h3>
        <p className="text-white/80">Class XII, Percentage: 95.50%</p>
        <span className="text-white/60">2019 – 2021</span>
      </div>
      <div className="rounded-2xl border border-white/20 bg-white/5 p-6 flex flex-col md:col-span-2">
        <h3 className="text-xl font-semibold">Little Angel’s Garden English High School</h3>
        <p className="text-white/80">Class X, Percentage: 96.00%</p>
        <span className="text-white/60">2012 – 2019</span>
      </div>
    </div>
  </Section>
)

const Contact = () => (
  <Section id="contact" title="Contact">
    <div className="grid md:grid-cols-2 gap-8 items-stretch">
      <div className="rounded-2xl border border-white/20 bg-white/5 p-6 space-y-4">
        <p className="text-white/80">Reach out for opportunities, collaboration, or a chat.</p>
        <div className="grid gap-3">
          <a className="flex items-center gap-3 hover:text-white transition" href="mailto:channa964348@gmail.com">
            <span className="text-lg">✉️</span>
            <span>channa964348@gmail.com</span>
          </a>
          <a className="flex items-center gap-3 hover:text-white transition" href="tel:+917795521459">
            <span className="text-lg">📞</span>
            <span>+91 77955 21459</span>
          </a>
          <a className="flex items-center gap-3 hover:text-white transition" href="https://www.linkedin.com/in/channakeshavaL06" target="_blank" rel="noopener">
            <span className="text-lg">🔗</span>
            <span>channakeshavaL06</span>
          </a>
          <a className="flex items-center gap-3 hover:text-white transition" href="https://github.com/Channakeshava96" target="_blank" rel="noopener">
            <span className="text-lg">💻</span>
            <span>Channakeshava96</span>
          </a>
        </div>
      </div>
      <ContactForm />
    </div>
  </Section>
)

export default function App() {
  useEffect(() => {}, [])
  return (
    <div>
      <Nav />
      <Hero />
      <Section id="about" title="About">
        <p className="text-white/80">I have hands-on experience with AI-driven products, specializing in Generative AI and Retrieval-Augmented Generation (RAG), backed by scalable cloud infrastructure on AWS and GCP. I enjoy solving real-world problems, designing clean system architectures, and delivering end-to-end solutions — from intelligent backend logic to cloud deployment.</p>
      </Section>
      <Skills />
      <Tools />
      <Projects />
      <Experience />
      <Education />
      <Contact />
      <footer className="border-t border-white/10">
        <div className="max-w-6xl mx-auto h-16 px-4 flex items-center justify-between">
          <p>© {new Date().getFullYear()} Channakeshava</p>
          <a className="px-3 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition text-sm" href="#" download>Download Resume</a>
        </div>
      </footer>
    </div>
  )
}

function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('idle')

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })
      const data = await res.json()
      if (data.ok) {
        setStatus('success')
        setName(''); setEmail(''); setMessage('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-white/20 bg-white/5 p-6">
        <p className="text-lg">Thank you, I’ll get back to you soon!</p>
        <p className="text-white/60">Your message has been received.</p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-white/20 bg-white/5 p-6 grid gap-4">
      <input value={name} onChange={(e) => setName(e.target.value)} className="px-4 py-3 rounded-xl bg-black/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white placeholder-white/60" placeholder="Name" />
      <input value={email} onChange={(e) => setEmail(e.target.value)} className="px-4 py-3 rounded-xl bg-black/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white placeholder-white/60" placeholder="Email" />
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="px-4 py-3 rounded-xl bg-black/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white placeholder-white/60" rows="5" placeholder="Message" />
      <button disabled={status==='sending'} className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-700 transition">{status==='sending' ? 'Sending…' : 'Send'}</button>
      {status==='error' && <p className="text-red-400">Something went wrong. Please try again.</p>}
    </form>
  )
}
