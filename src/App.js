import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import "./App.css";

const skills = [
  { name: "C", level: 80, icon: "⚙️" },
  { name: "HTML", level: 90, icon: "🏗️" },
  { name: "CSS", level: 85, icon: "🎨" },
  { name: "JavaScript", level: 75, icon: "⚡" },
  { name: "React", level: 70, icon: "⚛️" },
];

const projects = [
  {
    title: "Portfolio Website",
    description: "Personal React portfolio with Framer Motion animations, resume download, and GitHub Pages deployment.",
    tech: ["React", "CSS", "Framer Motion"],
    link: "https://github.com/abhidev17/portfolio",
    color: "#38bdf8",
  },
  {
    title: "Campus Rideshare App",
    description: "Mobile application for students to share rides across campus — built with OOP principles.",
    tech: ["Java", "OOP"],
    link: "https://github.com/abhidev17/OOPs_Project",
    color: "#818cf8",
  },
];

function TypewriterText({ texts }) {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIndex];
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (charIndex < current.length) {
          setDisplayText(current.slice(0, charIndex + 1));
          setCharIndex(c => c + 1);
        } else {
          setTimeout(() => setDeleting(true), 1800);
        }
      } else {
        if (charIndex > 0) {
          setDisplayText(current.slice(0, charIndex - 1));
          setCharIndex(c => c - 1);
        } else {
          setDeleting(false);
          setTextIndex(i => (i + 1) % texts.length);
        }
      }
    }, deleting ? 50 : 80);
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, textIndex, texts]);

  return (
    <span className="typewriter">
      {displayText}<span className="cursor">|</span>
    </span>
  );
}

function ParticleField() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="particle-field">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="particle"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function App() {
  const [showScroll, setShowScroll] = useState(false);
  const [activeNav, setActiveNav] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 400);
      const sections = ["about", "skills", "projects", "contact"];
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const { top } = el.getBoundingClientRect();
          if (top <= 120) setActiveNav(s);
        }
      }
      if (window.scrollY < 200) setActiveNav("home");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <div className="app-root">
      {/* Progress Bar */}
      <motion.div className="progress-bar" style={{ width: progressWidth }} />

      {/* Navbar */}
      <motion.nav
        className="navbar"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="nav-inner">
          <motion.a href="#" className="logo" whileHover={{ scale: 1.04 }}>
            <span className="logo-bracket">&lt;</span>Abhidev<span className="logo-bracket">/&gt;</span>
          </motion.a>

          <div className={`nav-links ${menuOpen ? "open" : ""}`}>
            {["about", "skills", "projects", "contact"].map(s => (
              <motion.a
                key={s}
                href={`#${s}`}
                className={activeNav === s ? "active" : ""}
                onClick={() => setMenuOpen(false)}
                whileHover={{ y: -2 }}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
                {activeNav === s && <motion.div className="nav-dot" layoutId="nav-dot" />}
              </motion.a>
            ))}
            <motion.a
              href="./resume.pdf"
              className="nav-resume"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              Resume ↗
            </motion.a>
          </div>

          <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
            <span className={menuOpen ? "open" : ""}></span>
            <span className={menuOpen ? "open" : ""}></span>
            <span className={menuOpen ? "open" : ""}></span>
          </button>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="hero" id="home" ref={heroRef}>
        <ParticleField />
        <div className="hero-grid-bg" />

        <motion.div
          className="hero-content"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={item} className="hero-badge">
            <span className="badge-dot" />
            Open to internship opportunities
          </motion.div>

          <motion.div variants={item} className="profile-wrapper">
            <div className="profile-ring" />
            <img src="./me.jpeg" alt="Abhidev Mohan" className="profile-img" />
          </motion.div>

          <motion.h1 variants={item} className="hero-title">
            Abhidev Mohan
          </motion.h1>

          <motion.p variants={item} className="hero-subtitle">
            <TypewriterText texts={["CSE Student @ SJCET Palai", "React Developer", "UI Enthusiast", "Open Source Learner"]} />
          </motion.p>

          <motion.p variants={item} className="hero-bio">
            Crafting beautiful digital experiences through code. Passionate about building
            things that live on the internet.
          </motion.p>

          <motion.div variants={item} className="hero-actions">
            <motion.a
              href="https://github.com/abhidev17"
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
              whileHover={{ scale: 1.04, boxShadow: "0 0 28px rgba(56,189,248,0.5)" }}
              whileTap={{ scale: 0.97 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </motion.a>
            <motion.a
              href="./resume.pdf"
              className="btn-secondary"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              ↓ Resume
            </motion.a>
            <motion.a
              href="#contact"
              className="btn-ghost"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Say Hello →
            </motion.a>
          </motion.div>

          <motion.div variants={item} className="hero-stats">
            {[{ n: "2+", label: "Projects" }, { n: "5+", label: "Skills" }, { n: "1+", label: "Years Learning" }].map(s => (
              <div key={s.label} className="stat">
                <span className="stat-num">{s.n}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="hero-scroll-hint">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>↓</motion.div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="section">
        <div className="section-inner">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">01 — About</span>
            <h2>Who I Am</h2>
          </motion.div>

          <div className="about-grid">
            <motion.div
              className="about-text"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p>I'm a <strong>Computer Science Engineering student</strong> at SJCET Palai, Kerala, with a passion for creating elegant, functional web experiences.</p>
              <p>I love turning complex problems into simple, beautiful interfaces. When I'm not coding, I'm exploring new frameworks, contributing to open source, or tinkering with side projects.</p>
              <p>Currently focused on deepening my React skills and building projects that matter.</p>

              <div className="about-highlights">
                {[
                  { icon: "🎓", text: "B.Tech CSE @ SJCET Palai" },
                  { icon: "📍", text: "Kerala, India" },
                  { icon: "💡", text: "Always learning something new" },
                  { icon: "🚀", text: "Looking for opportunities" },
                ].map(h => (
                  <motion.div key={h.text} className="highlight-item" whileHover={{ x: 6 }}>
                    <span>{h.icon}</span> {h.text}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="about-card"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="card-glow" />
              <h3>Currently</h3>
              <ul>
                <li>📖 Learning advanced React patterns</li>
                <li>🔨 Building personal projects</li>
                <li>🤝 Open to collaborations</li>
                <li>✉️ Available for internships</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="section section-alt">
        <div className="section-inner">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">02 — Skills</span>
            <h2>What I Work With</h2>
          </motion.div>

          <motion.div
            className="skills-grid"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {skills.map((skill, i) => (
              <motion.div key={skill.name} className="skill-card" variants={item} whileHover={{ y: -6, scale: 1.02 }}>
                <div className="skill-top">
                  <span className="skill-icon">{skill.icon}</span>
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-pct">{skill.level}%</span>
                </div>
                <div className="skill-bar-bg">
                  <motion.div
                    className="skill-bar-fill"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="tech-tags"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="tech-label">Also familiar with:</p>
            {["Git", "GitHub Pages", "VS Code", "Linux", "Figma (basics)"].map(t => (
              <motion.span key={t} className="tech-tag" variants={item} whileHover={{ scale: 1.08 }}>{t}</motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="section">
        <div className="section-inner">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">03 — Projects</span>
            <h2>Things I've Built</h2>
          </motion.div>

          <motion.div
            className="projects-grid"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {projects.map((project) => (
              <motion.div
                key={project.title}
                className="project-card"
                variants={item}
                whileHover={{ y: -10 }}
              >
                <div className="project-accent" style={{ background: project.color }} />
                <div className="project-content">
                  <div className="project-header">
                    <span className="project-folder">⬡</span>
                    <div className="project-links">
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ scale: 1.15, rotate: 12 }}
                        aria-label="GitHub"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                      </motion.a>
                    </div>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {project.tech.map(t => (
                      <span key={t} className="tech-pill">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* More coming card */}
            <motion.div className="project-card project-card--ghost" variants={item}>
              <div className="ghost-content">
                <span className="ghost-icon">🚧</span>
                <p>More projects coming soon...</p>
                <a href="https://github.com/abhidev17" target="_blank" rel="noreferrer">See GitHub →</a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section section-alt">
        <div className="section-inner">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">04 — Contact</span>
            <h2>Get In Touch</h2>
          </motion.div>

          <motion.div
            className="contact-wrapper"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="contact-text">
              <p>I'm currently open to internship opportunities and collaborations. Whether you have a project idea, a question, or just want to say hi — my inbox is always open!</p>
            </div>
            <div className="contact-links">
              <motion.a
                href="mailto:abhidevmohan17@gmail.com"
                className="contact-email"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                ✉ abhidevmohan17@gmail.com
              </motion.a>
              <div className="social-row">
                {[
                  { label: "GitHub", href: "https://github.com/abhidev17", icon: "⌥" },
                  { label: "Email", href: "mailto:abhidevmohan17@gmail.com", icon: "✉" },
                ].map(s => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    className="social-btn"
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    whileHover={{ y: -4 }}
                  >
                    {s.label}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <span className="footer-logo">&lt;Abhidev /&gt;</span>
          <p>Designed & Built by Abhidev Mohan · {new Date().getFullYear()}</p>
          <p className="footer-sub">Made with React & Framer Motion</p>
        </div>
      </footer>

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            className="scroll-top"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;