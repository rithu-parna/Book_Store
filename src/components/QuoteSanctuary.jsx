import React, { useState, useEffect } from "react";
import { MessageSquare, RefreshCw, Feather } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const QUOTES = [
  {
    text: "The only way to deal with an unfree world is to become so absolutely free that your very existence is an act of rebellion.",
    author: "Albert Camus",
    source: "The Rebel",
    color: "#8b5cf6"
  },
  {
    text: "We are all in the gutter, but some of us are looking at the stars.",
    author: "Oscar Wilde",
    source: "Lady Windermere's Fan",
    color: "#06b6d4"
  },
  {
    text: "I am not afraid of storms, for I am learning how to sail my ship.",
    author: "Louisa May Alcott",
    source: "Little Women",
    color: "#f59e0b"
  },
  {
    text: "The mystery of life isn't a problem to solve, but a reality to experience.",
    author: "Frank Herbert",
    source: "Dune",
    color: "#e11d48"
  },
  {
    text: "Reality is that which, when you stop believing in it, doesn't go away.",
    author: "Philip K. Dick",
    source: "How To Build A Universe",
    color: "#10b981"
  },
  {
    text: "We are cups, constantly and quietly being filled. The trick is, knowing how to tip ourselves over and let the beautiful stuff out.",
    author: "Ray Bradbury",
    source: "Zen in the Art of Writing",
    color: "#fb7185"
  }
];

export default function QuoteSanctuary() {
  const [index, setIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const activeQuote = QUOTES[index];

  useEffect(() => {
    let currentIdx = 0;
    setTypedText("");
    const interval = setInterval(() => {
      if (currentIdx < activeQuote.text.length) {
        setTypedText((prev) => prev + activeQuote.text.charAt(currentIdx));
        currentIdx++;
      } else {
        clearInterval(interval);
      }
    }, 35); // typing speed

    return () => clearInterval(interval);
  }, [index]);

  const handleNextQuote = () => {
    setIndex((prev) => (prev + 1) % QUOTES.length);
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "4rem auto",
        padding: "0 2rem"
      }}
    >
      <div
        className="glass"
        style={{
          borderRadius: "var(--radius-lg)",
          border: `1px solid ${activeQuote.color}33`,
          padding: "2.5rem",
          position: "relative",
          overflow: "hidden",
          boxShadow: `0 15px 40px -10px ${activeQuote.color}15`,
          background: "linear-gradient(135deg, rgba(9, 14, 30, 0.6) 0%, rgba(3, 5, 12, 0.8) 100%)",
          transition: "border-color 0.8s ease, box-shadow 0.8s ease"
        }}
      >
        {/* Abstract Constellation Accents */}
        <div
          style={{
            position: "absolute",
            top: "-20px",
            right: "-20px",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background: `${activeQuote.color}05`,
            border: `1px dashed ${activeQuote.color}22`,
            pointerEvents: "none"
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1.5rem"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Feather size={18} style={{ color: activeQuote.color, transition: "color 0.8s ease" }} />
            <span style={{ fontSize: "0.75rem", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1.5px", color: "var(--text-muted)" }}>
              Quotation Sanctuary
            </span>
          </div>

          <button
            onClick={handleNextQuote}
            style={{
              cursor: "pointer",
              color: "var(--text-secondary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.4rem",
              borderRadius: "50%",
              border: "1px solid var(--border-color)",
              backgroundColor: "rgba(255,255,255,0.03)",
              transition: "transform 0.5s ease"
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "rotate(180deg)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "rotate(0deg)"}
          >
            <RefreshCw size={14} />
          </button>
        </div>

        <div style={{ minHeight: "100px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <p
            className="font-serif"
            style={{
              fontSize: "1.35rem",
              lineHeight: "1.6",
              color: "var(--text-primary)",
              fontStyle: "italic",
              marginBottom: "1.5rem",
              position: "relative"
            }}
          >
            "{typedText}"
            <span
              style={{
                width: "2px",
                height: "1.2rem",
                display: "inline-block",
                backgroundColor: activeQuote.color,
                marginLeft: "3px",
                animation: "pulse 0.8s infinite"
              }}
            />
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "0.5rem"
            }}
          >
            <span style={{ fontSize: "0.9rem", fontWeight: "700", color: activeQuote.color, transition: "color 0.8s ease" }}>
              — {activeQuote.author}
            </span>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              in {activeQuote.source}
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
