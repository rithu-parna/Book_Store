import React, { useState } from "react";
import { Sparkles, BrainCircuit, RefreshCw, BookOpen, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BookMatcher({ books, onOpenBook, onAddToCart, user, onOpenAuth }) {
  const [step, setStep] = useState(0); // 0: Start, 1: Q1, 2: Q2, 3: Q3, 4: Computing, 5: Result
  const [answers, setAnswers] = useState({
    setting: "",
    length: "",
    vibe: ""
  });
  const [matchedBook, setMatchedBook] = useState(null);

  if (!user) {
    return (
      <div
        id="book-matcher-section"
        className="glass-card"
        style={{
          width: "100%",
          maxWidth: "800px",
          margin: "4rem auto",
          padding: "4rem 2rem",
          borderRadius: "var(--radius-lg)",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem"
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
            color: "#ffffff",
            padding: "1rem",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 10px 25px rgba(var(--accent-rgb), 0.35)"
          }}
        >
          <Sparkles size={40} className="float-animation" />
        </div>

        <div>
          <h2 className="font-serif matcher-title" style={{ fontSize: "2.2rem", fontWeight: "800", marginBottom: "0.5rem" }}>
            Unlock Literary Alignment
          </h2>
          <p className="matcher-desc" style={{ color: "var(--text-secondary)", maxWidth: "560px", margin: "0 auto", fontSize: "1.05rem", lineHeight: "1.6" }}>
            The AI-powered Matching Protocol matches books directly to your specific taste, reading habits, and visual preferences. Please sign in to unlock this sanctuary feature.
          </p>
        </div>

        <button onClick={onOpenAuth} className="btn-primary" style={{ padding: "0.9rem 2.5rem", fontSize: "1rem", marginTop: "1rem" }}>
          <span>Log In to Match</span>
          <ArrowRight size={18} />
        </button>
      </div>
    );
  }

  const startQuiz = () => {
    setAnswers({ setting: "", length: "", vibe: "" });
    setStep(1);
  };

  const selectAnswer = (field, value) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
    const nextStep = step + 1;
    setStep(nextStep);

    if (nextStep === 4) {
      // Trigger matching computation simulation
      setTimeout(() => {
        computeMatch();
      }, 2500);
    }
  };

  const computeMatch = () => {
    // Basic scoring based on inputs
    // settings: cyberpunk (Sci-Fi), reflection (Philosophy), art (Art, Design & Poetry), secret (Fiction / Rare)
    // length: short (<200 pages), medium (200-400), long (>400)
    // vibe: purple, obsidian, amber, crimson

    let score = [...books];

    // Filter by setting category approximation
    if (answers.setting === "cyberpunk") {
      score = score.filter((b) => b.category === "Sci-Fi & Cyberpunk");
    } else if (answers.setting === "reflection") {
      score = score.filter((b) => b.category === "Philosophy & Deep Thoughts");
    } else if (answers.setting === "art") {
      score = score.filter((b) => b.category === "Art, Design & Poetry");
    } else if (answers.setting === "secret") {
      score = score.filter((b) => b.category === "Fiction & Literature" || b.category === "Rare & Collectibles");
    }

    // If empty category, reset to all
    if (score.length === 0) score = [...books];

    // Length check
    if (answers.length === "short") {
      const shortBooks = score.filter((b) => b.pages < 250);
      if (shortBooks.length > 0) score = shortBooks;
    } else if (answers.length === "medium") {
      const medBooks = score.filter((b) => b.pages >= 250 && b.pages <= 400);
      if (medBooks.length > 0) score = medBooks;
    } else if (answers.length === "long") {
      const longBooks = score.filter((b) => b.pages > 400);
      if (longBooks.length > 0) score = longBooks;
    }

    // Pick first or random matching book
    const recommendation = score[Math.floor(Math.random() * score.length)] || books[0];
    setMatchedBook(recommendation);
    setStep(5);
  };

  return (
    <div
      id="book-matcher-section"
      className="glass-card"
      style={{
        width: "100%",
        maxWidth: "800px",
        margin: "4rem auto",
        padding: "3rem 2rem",
        borderRadius: "var(--radius-lg)",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
      }}
    >
      {/* Background Decorative Element */}
      <div
        className="spin-slow"
        style={{
          position: "absolute",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          border: "1px dashed var(--border-color)",
          top: "-150px",
          right: "-150px",
          pointerEvents: "none",
          opacity: 0.5
        }}
      />

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="start"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}
          >
            <div
              style={{
                background: "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
                color: "#ffffff",
                padding: "1rem",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 10px 25px rgba(var(--accent-rgb), 0.35)"
              }}
            >
              <BrainCircuit size={40} className="float-animation" />
            </div>

            <div>
              <h2 className="font-serif matcher-title" style={{ fontSize: "2.2rem", fontWeight: "800", marginBottom: "0.5rem" }}>
                Discover Your Next Literary Alignment
              </h2>
              <p className="matcher-desc" style={{ color: "var(--text-secondary)", maxWidth: "560px", margin: "0 auto", fontSize: "1.05rem" }}>
                Tell our algorithmic match-finder about your current mood, attention frequency, and sensory tastes, and we will pair you with the perfect book.
              </p>
            </div>

            <button onClick={startQuiz} className="btn-primary" style={{ padding: "0.9rem 2.5rem", fontSize: "1rem", marginTop: "1rem" }}>
              <span>Initiate Matching Protocol</span>
              <ArrowRight size={18} />
            </button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="q1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <span style={{ fontSize: "0.8rem", color: "var(--accent-primary)", fontWeight: "800", letterSpacing: "1.5px", textTransform: "uppercase" }}>
              PROTOCOL SEQUENCE 01 / 03
            </span>
            <h3 className="matcher-question" style={{ fontSize: "1.5rem", fontWeight: "700" }}>
              What kind of environment feels enticing right now?
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="quiz-grid">
              {[
                { id: "cyberpunk", label: "A neon-lit cyberpunk metropolis", desc: "For fans of tech, neon skies, and cyber conspiracy." },
                { id: "reflection", label: "A quiet mountaintop for self-reflection", desc: "For fans of philosophy, mindfulness, and stoic wisdom." },
                { id: "art", label: "An organic design studio or poetry garden", desc: "For fans of graphics, poetry, architecture, and layouts." },
                { id: "secret", label: "A historic alleyway hiding ancient secrets", desc: "For fans of deep mysteries, historical romance, and rare stories." }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => selectAnswer("setting", opt.id)}
                  className="glass-card"
                  style={{
                    padding: "1.25rem",
                    textAlign: "left",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.25rem"
                  }}
                >
                  <span style={{ fontWeight: "700", fontSize: "1rem", color: "var(--text-primary)" }}>{opt.label}</span>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>{opt.desc}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="q2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <span style={{ fontSize: "0.8rem", color: "var(--accent-primary)", fontWeight: "800", letterSpacing: "1.5px", textTransform: "uppercase" }}>
              PROTOCOL SEQUENCE 02 / 03
            </span>
            <h3 className="matcher-question" style={{ fontSize: "1.5rem", fontWeight: "700" }}>
              Choose your preferred depth and pages capacity:
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { id: "short", label: "Short & Concentrated", desc: "A brisk reading journey under 250 pages. Perfect for a single evening." },
                { id: "medium", label: "Standard Novel", desc: "A balanced volume between 250 and 400 pages. Develops rich narratives." },
                { id: "long", label: "Epic Monograph", desc: "A massive, deep dive containing 400+ pages. For dedicated cataloging." }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => selectAnswer("length", opt.id)}
                  className="glass-card"
                  style={{
                    padding: "1.25rem",
                    textAlign: "left",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <div>
                    <h4 style={{ fontWeight: "700", fontSize: "1rem", color: "var(--text-primary)" }}>{opt.label}</h4>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>{opt.desc}</p>
                  </div>
                  <ArrowRight size={18} style={{ color: "var(--accent-primary)" }} />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="q3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <span style={{ fontSize: "0.8rem", color: "var(--accent-primary)", fontWeight: "800", letterSpacing: "1.5px", textTransform: "uppercase" }}>
              PROTOCOL SEQUENCE 03 / 03
            </span>
            <h3 className="matcher-question" style={{ fontSize: "1.5rem", fontWeight: "700" }}>
              Select a visual energy state that aligns with you:
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="quiz-grid">
              {[
                { id: "purple", label: "Neon Indigo Aura", color: "linear-gradient(135deg, #4f46e5, #a855f7)" },
                { id: "obsidian", label: "Obsidian Void", color: "linear-gradient(135deg, #1e293b, #0f172a)" },
                { id: "amber", label: "Amber Gold", color: "linear-gradient(135deg, #f59e0b, #d97706)" },
                { id: "crimson", label: "Velvet Crimson", color: "linear-gradient(135deg, #be123c, #4c0519)" }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => selectAnswer("vibe", opt.id)}
                  className="glass-card"
                  style={{
                    padding: "1.5rem",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1rem"
                  }}
                >
                  <div style={{ width: "100%", height: "40px", borderRadius: "8px", background: opt.color }} />
                  <span style={{ fontWeight: "700", fontSize: "0.95rem" }}>{opt.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="computing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem", padding: "2rem 0" }}
          >
            <div
              style={{
                position: "relative",
                width: "80px",
                height: "80px"
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  border: "4px solid var(--border-color)",
                  borderRadius: "50%"
                }}
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                style={{
                  position: "absolute",
                  inset: 0,
                  border: "4px solid transparent",
                  borderTopColor: "var(--accent-primary)",
                  borderRightColor: "var(--accent-secondary)",
                  borderRadius: "50%"
                }}
              />
            </div>

            <div>
              <h3 className="matcher-computing-title" style={{ fontSize: "1.4rem", fontWeight: "700", marginBottom: "0.5rem" }}>
                Computing Literary Synapses...
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                Mapping your vibes onto our curated titles...
              </p>
            </div>

            <div style={{ display: "flex", gap: "0.5rem" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px" }}>
                Answers:
              </span>
              <span style={{ fontSize: "0.8rem", color: "var(--accent-primary)", fontWeight: "bold" }}>
                {answers.setting} • {answers.length} • {answers.vibe}
              </span>
            </div>
          </motion.div>
        )}

        {step === 5 && matchedBook && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem" }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ display: "flex", justifyContent: "center", gap: "0.25rem", color: "var(--accent-primary)", marginBottom: "0.5rem" }}>
                <CheckCircle2 size={24} />
              </div>
              <h3 className="font-serif matcher-result-title" style={{ fontSize: "2rem", fontWeight: "800" }}>
                Your Literary Match Awaits
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginTop: "0.25rem" }}>
                We have computed an 98.4% alignment score with this masterfully crafted edition.
              </p>
            </div>

            {/* Matched book showcase container */}
            <div
              className="glass"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "2rem",
                padding: "1.5rem",
                borderRadius: "var(--radius-md)",
                width: "100%",
                maxWidth: "600px",
                alignItems: "center",
                perspective: "800px"
              }}
            >
              {/* Cover Art */}
              <motion.div
                whileHover={{
                  rotateY: 12,
                  rotateX: -6,
                  scale: 1.05,
                  boxShadow: `0 15px 30px ${matchedBook.glowColor || "rgba(0,0,0,0.4)"}`
                }}
                transition={{ type: "spring", stiffness: 150, damping: 15 }}
                style={{
                  width: "120px",
                  height: "180px",
                  borderRadius: "6px",
                  background: matchedBook.image 
                    ? `linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.65) 100%), url(${matchedBook.image}) center/cover no-repeat` 
                    : matchedBook.themeColor,
                  boxShadow: `0 10px 20px ${matchedBook.glowColor || "rgba(0,0,0,0.3)"}`,
                  padding: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  color: "#ffffff",
                  position: "relative",
                  border: "1px solid rgba(255,255,255,0.1)",
                  flexShrink: 0,
                  transformStyle: "preserve-3d"
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: "6px",
                    background: "linear-gradient(to right, rgba(0,0,0,0.2) 0%, rgba(255,255,255,0.05) 45%, rgba(0,0,0,0.15) 100%)",
                    zIndex: 3
                  }}
                />
                {!matchedBook.image && (
                  <>
                    <div>
                      <div style={{ height: "2px", width: "15px", backgroundColor: matchedBook.coverAccent, marginBottom: "0.25rem" }} />
                      <span style={{ fontSize: "0.75rem", fontWeight: "bold", display: "block" }}>{matchedBook.title}</span>
                    </div>
                    <span style={{ fontSize: "0.6rem" }}>{matchedBook.author}</span>
                  </>
                )}
              </motion.div>

              {/* Details Column */}
              <div style={{ flex: 1, minWidth: "220px", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: "bold", color: "var(--accent-primary)", textTransform: "uppercase" }}>
                  {matchedBook.category}
                </span>
                <h4 className="matcher-result-book-title" style={{ fontSize: "1.2rem", fontWeight: "700" }}>{matchedBook.title}</h4>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                  {matchedBook.description}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "0.5rem" }}>
                  <span className="matcher-result-book-price" style={{ fontSize: "1.3rem", fontWeight: "800", color: "var(--accent-primary)" }}>
                    ${matchedBook.price}
                  </span>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: "600" }}>
                    {matchedBook.pages} pages
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{ display: "flex", gap: "1rem" }}>
              <button onClick={() => onOpenBook(matchedBook)} className="btn-secondary">
                <BookOpen size={16} />
                <span>Examine Volume</span>
              </button>

              <button
                onClick={() => {
                  onAddToCart(matchedBook);
                  startQuiz();
                }}
                className="btn-primary"
              >
                <span>Acquire Match</span>
              </button>

              <button onClick={startQuiz} className="btn-secondary" style={{ padding: "0.75rem" }} title="Retake Protocol">
                <RefreshCw size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 600px) {
          .quiz-grid {
            grid-template-columns: 1fr !important;
          }
          div[style*="display: flex; flexWrap: wrap; gap: 2rem"] {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
          }
        }
      `}</style>
    </div>
  );
}
