import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Services", "Skills", "Experience", "Projects", "Contact"];

const TYPING_WORDS = [
  "Bilingual Customer Support",
  "Technical Support Specialist",
  "English Translation Expert",
  "Remote-First Professional",
];

const SERVICES = [
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
    ),
    title: "Technical Support",
    desc: "Diagnosing and resolving technical issues with precision. From software troubleshooting to step-by-step guidance, I ensure clients get back on track fast.",
    accent: "#3b82f6",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 3H3a2 2 0 00-2 2v14l4-4h16a2 2 0 002-2V5a2 2 0 00-2-2z"/>
      </svg>
    ),
    title: "Customer Support",
    desc: "Delivering empathetic, solution-focused support that turns frustrated customers into loyal advocates. Clear communication, quick resolution.",
    accent: "#60a5fa",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
      </svg>
    ),
    title: "Translation & Bilingual Assistance",
    desc: "Fluent English–Portuguese communication for documents, support tickets, live chat, and cross-cultural business interactions.",
    accent: "#93c5fd",
  },
];

const SKILLS = ["Customer Support", "Technical Troubleshooting", "English Communication", "Translation", "Ticket Systems", "Remote Communication", "Problem Solving"];
const TOOLS = ["Zendesk", "Slack", "Intercom", "Notion", "GitHub"];

const WHY = [
  { icon: "🌐", label: "Fluent English", desc: "Native-level communication since childhood" },
  { icon: "⚡", label: "Fast Learner", desc: "Adapts quickly to new tools and processes" },
  { icon: "📋", label: "Professional", desc: "Organized, punctual, and detail-oriented" },
  { icon: "💬", label: "Strong Communicator", desc: "Clear, empathetic, concise messaging" },
  { icon: "🏠", label: "Remote-First", desc: "Built for distributed international teams" },
  { icon: "🎯", label: "Customer-Centered", desc: "Every interaction focused on resolution" },
];

const PROJECTS = [
  {
    title: "Bilingual Customer Support Simulation",
    desc: "Simulated real-world support interactions in English and Portuguese across multiple channels, demonstrating ticket resolution, escalation handling, and customer satisfaction strategies.",
    tag: "Support",
  },
  {
    title: "Translation Examples",
    desc: "Collection of professional translations covering technical documentation, customer-facing content, and business communications between English and Brazilian Portuguese.",
    tag: "Translation",
  },
  {
    title: "Technical Troubleshooting Assistance",
    desc: "Documented end-to-end troubleshooting workflows for common software and connectivity issues, following international remote support standards.",
    tag: "Technical",
  },
];

function useTypingEffect(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout;
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx(i => (i + 1) % words.length);
    }
    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      setPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: `${pct}%`, height: "2px", background: "linear-gradient(90deg,#3b82f6,#93c5fd)", zIndex: 9999, transition: "width 0.1s linear" }} />
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      padding: "0 2rem",
      background: scrolled ? "rgba(8,10,14,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(59,130,246,0.12)" : "none",
      transition: "all 0.4s ease",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      height: "64px",
    }}>
      <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#fff", letterSpacing: "0.04em" }}>
        AM<span style={{ color: "#3b82f6" }}>.</span>
      </span>

      {/* Desktop */}
      <div style={{ display: "flex", gap: "2rem" }} className="desktop-nav">
        {NAV_LINKS.map(l => (
          <button key={l} onClick={() => scrollTo(l)}
            style={{ background: "none", border: "none", color: "#94a3b8", fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", transition: "color 0.2s" }}
            onMouseEnter={e => e.target.style.color = "#e2e8f0"}
            onMouseLeave={e => e.target.style.color = "#94a3b8"}
          >{l}</button>
        ))}
      </div>

      <button onClick={() => scrollTo("Contact")}
        style={{ background: "linear-gradient(135deg,#1d4ed8,#3b82f6)", border: "none", color: "#fff", padding: "0.5rem 1.25rem", borderRadius: "6px", fontFamily: "'DM Sans',sans-serif", fontSize: "0.82rem", letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer" }}
        className="desktop-nav"
      >Hire Me</button>

      <button onClick={() => setOpen(!open)} style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", display: "none" }} className="mobile-menu-btn">
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          {open ? <path d="M6 18L18 6M6 6l12 12"/> : <path d="M4 6h16M4 12h16M4 18h16"/>}
        </svg>
      </button>

      {open && (
        <div style={{ position: "absolute", top: "64px", left: 0, right: 0, background: "rgba(8,10,14,0.97)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(59,130,246,0.15)", padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => scrollTo(l)}
              style={{ background: "none", border: "none", color: "#94a3b8", fontFamily: "'DM Sans',sans-serif", fontSize: "0.9rem", textAlign: "left", cursor: "pointer" }}
            >{l}</button>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const typed = useTypingEffect(TYPING_WORDS);
  return (
    <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", padding: "0 1.5rem" }}>
      {/* Animated background */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(59,130,246,0.09) 0%, transparent 70%)" }} />
      <div className="grid-bg" style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      {/* Floating orbs */}
      <div className="orb orb1" style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)", top: "10%", right: "5%", pointerEvents: "none" }} />
      <div className="orb orb2" style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(96,165,250,0.06) 0%, transparent 70%)", bottom: "15%", left: "3%", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 800, textAlign: "center" }}>
        <div className="fade-up" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)", borderRadius: "100px", padding: "0.35rem 1rem", marginBottom: "2rem" }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#3b82f6", boxShadow: "0 0 8px #3b82f6" }} className="pulse-dot" />
          <span style={{ color: "#93c5fd", fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Available for Remote Work</span>
        </div>

        <h1 className="fade-up delay-1" style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 1.1, color: "#fff", marginBottom: "1rem", letterSpacing: "-0.02em" }}>
          Adryan Miqueias<br />
          <span style={{ background: "linear-gradient(135deg,#3b82f6,#93c5fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Oliveira Pereira</span>
        </h1>

        <div className="fade-up delay-2" style={{ height: "2.5rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(1rem, 2.5vw, 1.3rem)", color: "#60a5fa", fontWeight: 500 }}>
            {typed}<span className="cursor">|</span>
          </span>
        </div>

        <p className="fade-up delay-3" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "1.05rem", color: "#64748b", lineHeight: 1.7, maxWidth: 540, margin: "0 auto 2.5rem", fontWeight: 400 }}>
          Helping international clients with clear communication, fast problem solving, and professional bilingual support.
        </p>

        <div className="fade-up delay-4" style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}
            className="btn-primary"
            style={{ background: "linear-gradient(135deg,#1d4ed8,#3b82f6)", border: "none", color: "#fff", padding: "0.85rem 2rem", borderRadius: "8px", fontFamily: "'DM Sans',sans-serif", fontSize: "0.95rem", fontWeight: 600, cursor: "pointer", letterSpacing: "0.02em", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            Contact Me
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </button>
          <button onClick={() => document.getElementById("services").scrollIntoView({ behavior: "smooth" })}
            className="btn-ghost"
            style={{ background: "transparent", border: "1px solid rgba(59,130,246,0.35)", color: "#93c5fd", padding: "0.85rem 2rem", borderRadius: "8px", fontFamily: "'DM Sans',sans-serif", fontSize: "0.95rem", fontWeight: 500, cursor: "pointer", letterSpacing: "0.02em" }}>
            View Services
          </button>
        </div>

        <div className="fade-up delay-5" style={{ display: "flex", gap: "2rem", justifyContent: "center", marginTop: "3.5rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {[["São Paulo", "Brazil"], ["English", "Fluent"], ["Remote", "Ready"]].map(([a, b]) => (
            <div key={a} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1rem", color: "#e2e8f0" }}>{a}</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", color: "#475569", textTransform: "uppercase", letterSpacing: "0.1em" }}>{b}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" style={{ padding: "7rem 1.5rem", background: "rgba(15,18,24,0.5)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }} className="about-grid">
        <div>
          <div style={{ display: "inline-block", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: "4px", padding: "0.3rem 0.8rem", marginBottom: "1.5rem" }}>
            <span style={{ color: "#60a5fa", fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.12em" }}>About Me</span>
          </div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#f1f5f9", lineHeight: 1.2, marginBottom: "1.5rem", letterSpacing: "-0.02em" }}>
            Bridging Language &<br /><span style={{ color: "#3b82f6" }}>Technology</span>
          </h2>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "1rem", color: "#64748b", lineHeight: 1.85, marginBottom: "1.2rem" }}>
            I am a bilingual professional based in São Paulo, Brazil with experience in customer service, technical support, and English communication.
          </p>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "1rem", color: "#64748b", lineHeight: 1.85, marginBottom: "1.2rem" }}>
            I specialize in helping customers solve problems efficiently while maintaining professional and friendly communication. I have been speaking English since childhood and I am continuously improving my skills in technology, troubleshooting, and international customer support.
          </p>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "1rem", color: "#64748b", lineHeight: 1.85 }}>
            I am currently focused on <span style={{ color: "#60a5fa", fontWeight: 500 }}>remote opportunities with international companies</span>.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          {[
            { num: "2+", label: "Years Experience" },
            { num: "EN/PT", label: "Bilingual" },
            { num: "100%", label: "Remote Ready" },
            { num: "5+", label: "Tools Mastered" },
          ].map(({ num, label }) => (
            <div key={label} style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px",
              padding: "1.75rem", textAlign: "center", backdropFilter: "blur(10px)",
            }} className="stat-card">
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "2rem", color: "#3b82f6", marginBottom: "0.4rem" }}>{num}</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", color: "#475569", textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" style={{ padding: "7rem 1.5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div style={{ display: "inline-block", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: "4px", padding: "0.3rem 0.8rem", marginBottom: "1rem" }}>
            <span style={{ color: "#60a5fa", fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.12em" }}>Services</span>
          </div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#f1f5f9", letterSpacing: "-0.02em" }}>What I Offer</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }} className="services-grid">
          {SERVICES.map(({ icon, title, desc, accent }) => (
            <div key={title} className="service-card" style={{
              background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px",
              padding: "2.5rem 2rem", cursor: "default", transition: "all 0.3s ease", position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, transparent, ${accent}, transparent)`, opacity: 0.6 }} />
              <div style={{ width: 56, height: 56, borderRadius: "12px", background: `rgba(59,130,246,0.1)`, display: "flex", alignItems: "center", justifyContent: "center", color: accent, marginBottom: "1.5rem" }}>
                {icon}
              </div>
              <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1.15rem", color: "#f1f5f9", marginBottom: "0.75rem" }}>{title}</h3>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.9rem", color: "#64748b", lineHeight: 1.75 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" style={{ padding: "7rem 1.5rem", background: "rgba(15,18,24,0.5)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div style={{ display: "inline-block", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: "4px", padding: "0.3rem 0.8rem", marginBottom: "1rem" }}>
            <span style={{ color: "#60a5fa", fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.12em" }}>Skills & Tools</span>
          </div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#f1f5f9", letterSpacing: "-0.02em" }}>My Toolkit</h2>
        </div>

        <div style={{ marginBottom: "2.5rem" }}>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", color: "#3b82f6", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "1.25rem" }}>Core Skills</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            {SKILLS.map(s => (
              <span key={s} className="skill-badge" style={{
                background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)",
                color: "#93c5fd", padding: "0.5rem 1.2rem", borderRadius: "100px",
                fontFamily: "'DM Sans',sans-serif", fontSize: "0.87rem", fontWeight: 500,
                transition: "all 0.2s ease", cursor: "default",
              }}>{s}</span>
            ))}
          </div>
        </div>

        <div>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", color: "#3b82f6", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "1.25rem" }}>Tools</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            {TOOLS.map(t => (
              <span key={t} className="tool-badge" style={{
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
                color: "#94a3b8", padding: "0.5rem 1.2rem", borderRadius: "100px",
                fontFamily: "'DM Sans',sans-serif", fontSize: "0.87rem", fontWeight: 500,
                transition: "all 0.2s ease", cursor: "default",
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" style={{ padding: "7rem 1.5rem" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div style={{ display: "inline-block", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: "4px", padding: "0.3rem 0.8rem", marginBottom: "1rem" }}>
            <span style={{ color: "#60a5fa", fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.12em" }}>Experience</span>
          </div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#f1f5f9", letterSpacing: "-0.02em" }}>Work History</h2>
        </div>

        <div style={{ position: "relative", paddingLeft: "2rem" }}>
          <div style={{ position: "absolute", left: "7px", top: 0, bottom: 0, width: "1px", background: "linear-gradient(180deg, #3b82f6, transparent)" }} />

          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: "-2rem", top: "1.5rem", width: "14px", height: "14px", borderRadius: "50%", background: "#3b82f6", border: "3px solid #0d1117", boxShadow: "0 0 12px rgba(59,130,246,0.5)" }} />

            <div className="exp-card" style={{
              background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px",
              padding: "2rem", backdropFilter: "blur(10px)",
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.25rem" }}>
                <div>
                  <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1.2rem", color: "#f1f5f9", marginBottom: "0.3rem" }}>Customer Service Assistant</h3>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", color: "#60a5fa" }}>São Paulo, Brazil</p>
                </div>
                <span style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)", color: "#93c5fd", padding: "0.3rem 0.8rem", borderRadius: "100px", fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", whiteSpace: "nowrap" }}>
                  Dec 2025 – Feb 2026
                </span>
              </div>

              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {[
                  "Assisted customers with product support and communication",
                  "Organized products and maintained workflow efficiency",
                  "Helped solve customer questions quickly and professionally",
                ].map(item => (
                  <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#3b82f6", marginTop: "0.45rem", flexShrink: 0 }} />
                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.9rem", color: "#64748b", lineHeight: 1.6 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" style={{ padding: "7rem 1.5rem", background: "rgba(15,18,24,0.5)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div style={{ display: "inline-block", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: "4px", padding: "0.3rem 0.8rem", marginBottom: "1rem" }}>
            <span style={{ color: "#60a5fa", fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.12em" }}>Portfolio</span>
          </div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#f1f5f9", letterSpacing: "-0.02em" }}>Featured Projects</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }} className="projects-grid">
          {PROJECTS.map(({ title, desc, tag }, i) => (
            <div key={title} className="project-card" style={{
              background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px",
              overflow: "hidden", transition: "all 0.3s ease",
            }}>
              <div style={{
                height: 160, background: `linear-gradient(135deg, rgba(29,78,216,0.3) 0%, rgba(59,130,246,${0.1 + i * 0.05}) 100%)`,
                display: "flex", alignItems: "center", justifyContent: "center", position: "relative",
              }}>
                <div style={{ fontSize: "2.5rem", opacity: 0.4 }}>
                  {["💬", "🌐", "🔧"][i]}
                </div>
                <div style={{ position: "absolute", top: "1rem", right: "1rem", background: "rgba(59,130,246,0.2)", border: "1px solid rgba(59,130,246,0.3)", color: "#93c5fd", padding: "0.2rem 0.6rem", borderRadius: "100px", fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem" }}>
                  {tag}
                </div>
              </div>
              <div style={{ padding: "1.75rem" }}>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1rem", color: "#f1f5f9", marginBottom: "0.75rem", lineHeight: 1.4 }}>{title}</h3>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", color: "#64748b", lineHeight: 1.75 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Why() {
  return (
    <section id="why" style={{ padding: "7rem 1.5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div style={{ display: "inline-block", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: "4px", padding: "0.3rem 0.8rem", marginBottom: "1rem" }}>
            <span style={{ color: "#60a5fa", fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.12em" }}>Why Me</span>
          </div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#f1f5f9", letterSpacing: "-0.02em" }}>Why Work With Me</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }} className="why-grid">
          {WHY.map(({ icon, label, desc }) => (
            <div key={label} className="why-card" style={{
              background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px",
              padding: "1.75rem", display: "flex", gap: "1rem", alignItems: "flex-start",
              transition: "border-color 0.25s ease", cursor: "default",
            }}>
              <span style={{ fontSize: "1.5rem", flexShrink: 0, marginTop: "0.1rem" }}>{icon}</span>
              <div>
                <h4 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#e2e8f0", marginBottom: "0.35rem" }}>{label}</h4>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.83rem", color: "#64748b", lineHeight: 1.6 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" style={{ padding: "7rem 1.5rem 5rem", background: "rgba(15,18,24,0.5)" }}>
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: "4px", padding: "0.3rem 0.8rem", marginBottom: "1rem" }}>
          <span style={{ color: "#60a5fa", fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.12em" }}>Get in Touch</span>
        </div>
        <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#f1f5f9", letterSpacing: "-0.02em", marginBottom: "1rem" }}>
          Let's Work Together
        </h2>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "1rem", color: "#64748b", lineHeight: 1.75, marginBottom: "3rem" }}>
          Ready to bring clear communication and fast problem-solving to your team? Let's connect.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem", marginBottom: "2rem" }} className="contact-grid">
          {[
            { icon: "✉️", label: "Email", value: "adryan.mop75@gmail.com", href: "mailto:adryan.mop75@gmail.com" },
            { icon: "📱", label: "WhatsApp", value: "+55 (85) 9 9678-1258", href: "https://wa.me/5585996781258" },
          ].map(({ icon, label, value, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <div className="contact-card" style={{
                background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px",
                padding: "1.5rem", textAlign: "left", transition: "all 0.2s ease",
              }}>
                <div style={{ fontSize: "1.3rem", marginBottom: "0.5rem" }}>{icon}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", color: "#475569", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.3rem" }}>{label}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.88rem", color: "#93c5fd", fontWeight: 500 }}>{value}</div>
              </div>
            </a>
          ))}
        </div>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          {[
            { label: "LinkedIn", href: "https://www.linkedin.com/in/adryan-miqueias-oliveira-pereira-93b952384", icon: (
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            )},
            { label: "GitHub", href: "https://github.com/AdryanMiqueias", icon: (
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
            )},
          ].map(({ label, href, icon }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <div className="social-btn" style={{
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
                color: "#94a3b8", padding: "0.75rem 1.5rem", borderRadius: "8px",
                display: "flex", alignItems: "center", gap: "0.6rem",
                fontFamily: "'DM Sans',sans-serif", fontSize: "0.9rem", fontWeight: 500,
                transition: "all 0.2s ease",
              }}>
                {icon} {label}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ padding: "2rem 1.5rem", borderTop: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.82rem", color: "#334155" }}>
        © 2025 Adryan Miqueias Oliveira Pereira · São Paulo, Brazil
      </p>
    </footer>
  );
}

export default function Portfolio() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #080a0e; color: #f1f5f9; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0d1117; }
        ::-webkit-scrollbar-thumb { background: #1d4ed8; border-radius: 4px; }

        .cursor { animation: blink 1s step-end infinite; color: #3b82f6; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

        .pulse-dot { animation: pulse 2s ease infinite; }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(1.3)} }

        .orb1 { animation: float 8s ease-in-out infinite; }
        .orb2 { animation: float 10s ease-in-out infinite reverse; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-30px)} }

        .fade-up { animation: fadeUp 0.7s ease both; }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.35s; }
        .delay-4 { animation-delay: 0.5s; }
        .delay-5 { animation-delay: 0.65s; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }

        .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 8px 25px rgba(59,130,246,0.35); }
        .btn-ghost:hover { background: rgba(59,130,246,0.08) !important; border-color: rgba(59,130,246,0.6) !important; }
        .service-card:hover { background: rgba(59,130,246,0.06) !important; border-color: rgba(59,130,246,0.25) !important; transform: translateY(-3px); }
        .project-card:hover { border-color: rgba(59,130,246,0.3) !important; transform: translateY(-3px); }
        .why-card:hover { border-color: rgba(59,130,246,0.25) !important; }
        .skill-badge:hover { background: rgba(59,130,246,0.15) !important; border-color: rgba(59,130,246,0.4) !important; }
        .tool-badge:hover { background: rgba(255,255,255,0.07) !important; border-color: rgba(255,255,255,0.18) !important; color: #e2e8f0 !important; }
        .contact-card:hover { border-color: rgba(59,130,246,0.3) !important; transform: translateY(-2px); }
        .social-btn:hover { background: rgba(59,130,246,0.1) !important; border-color: rgba(59,130,246,0.3) !important; color: #93c5fd !important; }
        .stat-card:hover { border-color: rgba(59,130,246,0.25) !important; }

        @media (max-width: 768px) {
          .about-grid, .services-grid, .projects-grid, .why-grid { grid-template-columns: 1fr !important; gap: 1.25rem !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        @media (max-width: 900px) {
          .why-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .services-grid, .projects-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Skills />
        <Experience />
        <Projects />
        <Why />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
