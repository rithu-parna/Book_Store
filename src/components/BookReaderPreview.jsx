import React, { useState } from "react";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BookReaderPreview({ book }) {
  const [pageIndex, setPageIndex] = useState(0); // 0, 1, 2, 3 corresponding to samplePages
  const [isFlipping, setIsFlipping] = useState(false);

  const pages = book.samplePages || [
    "No sample pages available for this volume.",
    "Please check back later."
  ];

  const handleNext = () => {
    if (pageIndex < pages.length - 1 && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setPageIndex((prev) => prev + 1);
        setIsFlipping(false);
      }, 400);
    }
  };

  const handlePrev = () => {
    if (pageIndex > 0 && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setPageIndex((prev) => prev - 1);
        setIsFlipping(false);
      }, 400);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1.5rem",
        backgroundColor: "rgba(0,0,0,0.2)",
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--border-color)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Background Page Accent Glow */}
      <div
        style={{
          position: "absolute",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${book.glowColor || "rgba(99,102,241,0.2)"} 0%, transparent 70%)`,
          top: "10%",
          left: "25%",
          filter: "blur(20px)",
          pointerEvents: "none"
        }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
        <BookOpen size={16} style={{ color: "var(--accent-primary)" }} />
        <span style={{ fontSize: "0.85rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", color: "var(--text-secondary)" }}>
          Sample Reading Mode (Page {pageIndex + 1} of {pages.length})
        </span>
      </div>

      {/* 3D Book Layout */}
      <div
        style={{
          display: "flex",
          width: "100%",
          maxWidth: "680px",
          height: "360px",
          perspective: "1200px",
          margin: "1rem 0"
        }}
      >
        {/* Book Left Page */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#fcf8ef",
            color: "#1e293b",
            borderTopLeftRadius: "6px",
            borderBottomLeftRadius: "6px",
            boxShadow: "-8px 10px 20px rgba(0,0,0,0.15), inset -20px 0 30px rgba(0,0,0,0.06)",
            border: "1px solid rgba(0,0,0,0.08)",
            padding: "1.5rem 2rem 1.5rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative"
          }}
        >
          {/* Paper Texture Overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(circle at 70% 50%, rgba(255,255,255,0.4) 0%, rgba(0,0,0,0.02) 100%)",
              pointerEvents: "none"
            }}
          />

          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              color: "rgba(0,0,0,0.4)"
            }}
          >
            {book.title}
          </span>

          <div
            style={{
              fontSize: "0.95rem",
              lineHeight: "1.7",
              fontFamily: "Georgia, serif",
              margin: "1rem 0",
              height: "200px",
              overflowY: "auto",
              paddingRight: "0.25rem",
              textAlign: "justify",
              fontStyle: "italic",
              opacity: isFlipping ? 0.3 : 1,
              transition: "opacity 0.2s"
            }}
          >
            {/* If odd index, show pageIndex-1 on left or keep page index content static */}
            {pages[Math.max(0, pageIndex - (pageIndex % 2 === 0 ? 0 : 1))]}
          </div>

          <span style={{ fontSize: "0.8rem", color: "rgba(0,0,0,0.4)", fontWeight: "600", alignSelf: "flex-start" }}>
            {Math.max(1, pageIndex - (pageIndex % 2 === 0 ? 0 : 1) + 1)}
          </span>
        </div>

        {/* Middle Spine Binding */}
        <div
          style={{
            width: "16px",
            background: "linear-gradient(to right, #e2d9c2 0%, #a39574 50%, #e2d9c2 100%)",
            boxShadow: "0 10px 20px rgba(0,0,0,0.2), inset 0 0 5px rgba(0,0,0,0.3)",
            zIndex: 10
          }}
        />

        {/* Book Right Page */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#fcf8ef",
            color: "#1e293b",
            borderTopRightRadius: "6px",
            borderBottomRightRadius: "6px",
            boxShadow: "8px 10px 20px rgba(0,0,0,0.15), inset 20px 0 30px rgba(0,0,0,0.06)",
            border: "1px solid rgba(0,0,0,0.08)",
            padding: "1.5rem 1.5rem 1.5rem 2rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative"
          }}
        >
          {/* Paper Texture Overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.4) 0%, rgba(0,0,0,0.02) 100%)",
              pointerEvents: "none"
            }}
          />

          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              color: "rgba(0,0,0,0.4)",
              alignSelf: "flex-end"
            }}
          >
            {book.author}
          </span>

          <div
            style={{
              fontSize: "0.95rem",
              lineHeight: "1.7",
              fontFamily: "Georgia, serif",
              margin: "1rem 0",
              height: "200px",
              overflowY: "auto",
              paddingRight: "0.25rem",
              textAlign: "justify",
              fontStyle: "italic",
              opacity: isFlipping ? 0.3 : 1,
              transition: "opacity 0.2s"
            }}
          >
            {/* Show pageIndex+1 or default next page info */}
            {pages[Math.max(0, pageIndex - (pageIndex % 2 === 0 ? 0 : 1)) + 1] || (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: "1rem", opacity: 0.5 }}>
                <BookOpen size={28} />
                <span style={{ fontSize: "0.8rem", textAlign: "center" }}>End of Sample Chapters.<br/>Purchase the book to unlock.</span>
              </div>
            )}
          </div>

          <span style={{ fontSize: "0.8rem", color: "rgba(0,0,0,0.4)", fontWeight: "600", alignSelf: "flex-end" }}>
            {Math.max(1, pageIndex - (pageIndex % 2 === 0 ? 0 : 1) + 1) + 1}
          </span>
        </div>
      </div>

      {/* Reader Controls */}
      <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", marginTop: "1rem" }}>
        <button
          onClick={handlePrev}
          disabled={pageIndex <= 0}
          style={{
            cursor: pageIndex <= 0 ? "not-allowed" : "pointer",
            opacity: pageIndex <= 0 ? 0.4 : 1,
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border-color)",
            color: "var(--text-primary)",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "var(--transition-fast)"
          }}
        >
          <ChevronLeft size={18} />
        </button>

        <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: "600" }}>
          Chapter Preview
        </span>

        <button
          onClick={handleNext}
          disabled={pageIndex >= pages.length - 1}
          style={{
            cursor: pageIndex >= pages.length - 1 ? "not-allowed" : "pointer",
            opacity: pageIndex >= pages.length - 1 ? 0.4 : 1,
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border-color)",
            color: "var(--text-primary)",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "var(--transition-fast)"
          }}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
