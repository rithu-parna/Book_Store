import React, { useState, useEffect } from "react";
import { X, Star, ShoppingCart, Heart, BookOpen, Volume2, HelpCircle, FileText, Play, Pause, Calendar, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BookReaderPreview from "./BookReaderPreview";

export default function BookDetailModal({ book, onClose, onAddToCart, onToggleWishlist, isWishlisted }) {
  const [activeTab, setActiveTab] = useState("overview"); // overview, preview, audio, reviews
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  // Audio Playback simulation ticker
  useEffect(() => {
    let interval;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 1;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  if (!book) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        padding: "2rem",
        perspective: "1200px"
      }}
    >
      <motion.div
        initial={{ y: 80, rotateY: 12, rotateX: 4, scale: 0.92, opacity: 0 }}
        animate={{ y: 0, rotateY: 0, rotateX: 0, scale: 1, opacity: 1 }}
        exit={{ y: 80, rotateY: -12, rotateX: -4, scale: 0.92, opacity: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 24 }}
        onClick={(e) => e.stopPropagation()}
        className="glass"
        style={{
          width: "100%",
          maxWidth: "880px",
          height: "90vh",
          borderRadius: "var(--radius-lg)",
          overflowY: "auto",
          boxShadow: `0 30px 60px -15px ${book.glowColor || "rgba(0,0,0,0.5)"}`,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          transformStyle: "preserve-3d"
        }}
      >
        {/* Header Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1.25rem",
            right: "1.25rem",
            cursor: "pointer",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border-color)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--text-primary)",
            zIndex: 10,
            transition: "var(--transition-fast)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--bg-tertiary)";
            e.currentTarget.style.borderColor = "var(--accent-primary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
            e.currentTarget.style.borderColor = "var(--border-color)";
          }}
        >
          <X size={20} />
        </button>

        {/* Hero Banner Section (Cover gradient styling) */}
        <div
          style={{
            background: book.themeColor,
            padding: "3rem 2rem 2.5rem 2rem",
            position: "relative",
            borderBottom: "1px solid var(--border-color)",
            display: "flex",
            alignItems: "flex-end",
            gap: "2.5rem",
            flexWrap: "wrap"
          }}
        >
          {/* Subtle Spine/Shadow Accent */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.6) 100%)",
              zIndex: 1
            }}
          />

          {/* Glowing Aura */}
          <div
            style={{
              position: "absolute",
              width: "300px",
              height: "200px",
              background: book.coverAccent,
              filter: "blur(50px)",
              opacity: 0.3,
              bottom: "10%",
              left: "5%",
              zIndex: 0,
              pointerEvents: "none"
            }}
          />

          {/* 3D Physical Book Model Cover Art in Modal */}
          <div
            style={{
              position: "relative",
              width: "150px",
              height: "220px",
              perspective: "1000px",
              zIndex: 2
            }}
          >
            <motion.div
              initial={{ y: 20, rotateY: 15, rotateX: 6, opacity: 0 }}
              animate={{ y: 0, rotateY: 15, rotateX: 6, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
              style={{
                position: "absolute",
                inset: 0,
                transformStyle: "preserve-3d",
                boxShadow: `0 15px 30px rgba(0,0,0,0.4)`
              }}
            >
              {/* Front Cover */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: book.image 
                    ? `linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.55) 100%), url(${book.image}) center/cover no-repeat` 
                    : book.themeColor,
                  borderRadius: "3px 6px 6px 3px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  transform: "translateZ(6px)",
                  zIndex: 5
                }}
              >
                {/* Spine Shadow */}
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: "8px",
                    background: "linear-gradient(to right, rgba(0,0,0,0.25) 0%, rgba(255,255,255,0.05) 45%, rgba(0,0,0,0.2) 100%)",
                    zIndex: 6
                  }}
                />
                
                {/* Cover text for abstract covers */}
                {!book.image && (
                  <div style={{ padding: "1rem", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ height: "2px", width: "20px", backgroundColor: book.coverAccent, marginBottom: "0.25rem" }} />
                      <h5 className="font-serif" style={{ color: "#fff", fontSize: "0.85rem", fontWeight: "700", lineHeight: "1.2" }}>{book.title}</h5>
                    </div>
                    <p style={{ color: "#cbd5e1", fontSize: "0.65rem" }}>{book.author}</p>
                  </div>
                )}
              </div>

              {/* 3D Pages (Right Edge) */}
              <div
                style={{
                  position: "absolute",
                  top: "2px",
                  bottom: "2px",
                  right: "0",
                  width: "12px",
                  backgroundColor: "var(--bg-secondary)",
                  border: "1px solid var(--border-color)",
                  backgroundImage: "repeating-linear-gradient(to bottom, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
                  transform: "rotateY(90deg) translateZ(6px)",
                  transformOrigin: "right center",
                  borderRadius: "0 2px 2px 0",
                  zIndex: 4
                }}
              />

              {/* 3D Bottom Pages */}
              <div
                style={{
                  position: "absolute",
                  left: "2px",
                  right: "2px",
                  bottom: "0",
                  height: "12px",
                  backgroundColor: "var(--bg-secondary)",
                  border: "1px solid var(--border-color)",
                  backgroundImage: "repeating-linear-gradient(to right, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
                  transform: "rotateX(90deg) translateZ(6px)",
                  transformOrigin: "center bottom",
                  borderRadius: "0 0 2px 2px",
                  zIndex: 4
                }}
              />
            </motion.div>
          </div>

          {/* Editorial Book Title & Author */}
          <div style={{ zIndex: 2, flex: "1 1 300px" }}>
            <span
              style={{
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                fontWeight: "800",
                color: book.coverAccent,
                backgroundColor: "rgba(255,255,255,0.1)",
                padding: "0.25rem 0.6rem",
                borderRadius: "4px",
                marginBottom: "0.75rem",
                display: "inline-block"
              }}
            >
              {book.category}
            </span>
            <h2
              className="font-serif"
              style={{
                color: "#ffffff",
                fontSize: "2.2rem",
                fontWeight: "800",
                lineHeight: "1.2",
                marginBottom: "0.5rem",
                textShadow: "0 2px 4px rgba(0,0,0,0.4)"
              }}
            >
              {book.title}
            </h2>
            <p style={{ color: "#cbd5e1", fontSize: "1.1rem", fontWeight: "500" }}>
              by <span style={{ color: "#ffffff", fontWeight: "600" }}>{book.author}</span>
            </p>
          </div>
        </div>

        {/* Tab Selection Bar */}
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid var(--border-color)",
            backgroundColor: "var(--bg-secondary)",
            padding: "0 1.5rem"
          }}
        >
          {[
            { id: "overview", label: "Overview", icon: <FileText size={15} /> },
            { id: "preview", label: "Read Sample", icon: <BookOpen size={15} /> },
            { id: "audio", label: "Audio Preview", icon: <Volume2 size={15} /> },
            { id: "reviews", label: "Reviews", icon: <Star size={15} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "1rem 1.25rem",
                fontSize: "0.9rem",
                fontWeight: "600",
                color: activeTab === tab.id ? book.coverAccent : "var(--text-secondary)",
                borderBottom: activeTab === tab.id ? `2px solid ${book.coverAccent}` : "2px solid transparent",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                transition: "var(--transition-fast)"
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Display Area */}
        <div style={{ padding: "2rem", flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
              >
                {/* Meta stats cards grid */}
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <div
                    className="glass-card"
                    style={{
                      flex: "1 1 120px",
                      padding: "0.8rem 1rem",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "0.25rem",
                      textAlign: "center",
                      border: `1px solid ${book.coverAccent}22`,
                      background: `linear-gradient(to bottom, var(--card-bg), ${book.coverAccent}06)`
                    }}
                  >
                    <Calendar size={16} style={{ color: book.coverAccent }} />
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: "600" }}>PUBLISHED</span>
                    <span style={{ fontSize: "0.9rem", fontWeight: "700" }}>{book.publishYear}</span>
                  </div>

                  <div
                    className="glass-card"
                    style={{
                      flex: "1 1 120px",
                      padding: "0.8rem 1rem",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "0.25rem",
                      textAlign: "center",
                      border: `1px solid ${book.coverAccent}22`,
                      background: `linear-gradient(to bottom, var(--card-bg), ${book.coverAccent}06)`
                    }}
                  >
                    <BookOpen size={16} style={{ color: book.coverAccent }} />
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: "600" }}>PAGES</span>
                    <span style={{ fontSize: "0.9rem", fontWeight: "700" }}>{book.pages} Pages</span>
                  </div>

                  <div
                    className="glass-card"
                    style={{
                      flex: "1 1 120px",
                      padding: "0.8rem 1rem",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "0.25rem",
                      textAlign: "center",
                      border: `1px solid ${book.coverAccent}22`,
                      background: `linear-gradient(to bottom, var(--card-bg), ${book.coverAccent}06)`
                    }}
                  >
                    <Award size={16} style={{ color: book.coverAccent }} />
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: "600" }}>RATING</span>
                    <span style={{ fontSize: "0.9rem", fontWeight: "700", display: "flex", alignItems: "center", gap: "2px" }}>
                      {book.rating} <Star size={12} fill="currentColor" style={{ color: "#eab308" }} />
                    </span>
                  </div>
                </div>

                {/* Extended synopsis */}
                <div>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "0.75rem" }}>Synopsis</h4>
                  <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", fontSize: "0.95rem" }}>{book.synopsis}</p>
                </div>

                {/* Highlights / Tags list */}
                <div>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "0.75rem" }}>Subject Highlights</h4>
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {book.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: "0.8rem",
                          padding: "0.3rem 0.8rem",
                          borderRadius: "20px",
                          border: `1px solid ${book.coverAccent}25`,
                          backgroundColor: `${book.coverAccent}12`,
                          color: book.coverAccent,
                          fontWeight: "600"
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "preview" && (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
              >
                <BookReaderPreview book={book} />
              </motion.div>
            )}

            {activeTab === "audio" && (
              <motion.div
                key="audio"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "1.5rem",
                  backgroundColor: "rgba(0,0,0,0.15)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-color)"
                }}
              >
                {/* Audio Waves Simulation */}
                <div style={{ height: "60px", display: "flex", alignItems: "center", gap: "4px", marginBottom: "2rem" }}>
                  {isPlayingAudio ? (
                    Array.from({ length: 15 }).map((_, i) => (
                      <div
                        key={i}
                        className="audio-bar"
                        style={{
                          width: "4px",
                          backgroundColor: book.coverAccent,
                          borderRadius: "4px"
                        }}
                      />
                    ))
                  ) : (
                    Array.from({ length: 15 }).map((_, i) => (
                      <div
                        key={i}
                        style={{
                          width: "4px",
                          height: "6px",
                          backgroundColor: "var(--text-muted)",
                          borderRadius: "4px"
                        }}
                      />
                    ))
                  )}
                </div>

                {/* Narrator Meta */}
                <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: "700" }}>Audiobook Sample</h4>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "0.25rem" }}>
                    Narrated by: <span style={{ color: "var(--text-primary)", fontWeight: "600" }}>{book.audioNarrator}</span>
                  </p>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
                    Total Audiobook Duration: {book.audioDuration}
                  </p>
                </div>

                {/* Player Interface */}
                <div style={{ width: "100%", maxWidth: "400px", display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {/* Slider bar */}
                  <div style={{ position: "relative", width: "100%", height: "4px", backgroundColor: "var(--bg-tertiary)", borderRadius: "2px" }}>
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        height: "100%",
                        width: `${audioProgress}%`,
                        backgroundColor: book.coverAccent,
                        borderRadius: "2px"
                      }}
                    />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: "bold" }}>
                    <span>0:{(Math.floor(audioProgress * 0.45)).toString().padStart(2, "0")}</span>
                    <span>3:00</span>
                  </div>

                  {/* Play controls */}
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                      style={{
                        cursor: "pointer",
                        background: `linear-gradient(135deg, ${book.coverAccent}, ${book.coverAccent}cc)`,
                        color: "#fff",
                        width: "54px",
                        height: "54px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: `0 6px 15px ${book.glowColor || "rgba(0,0,0,0.3)"}`
                      }}
                    >
                      {isPlayingAudio ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" style={{ marginLeft: "3px" }} />}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "reviews" && (
              <motion.div
                key="reviews"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
              >
                {/* Score Summary Block */}
                <div style={{ display: "flex", gap: "2rem", alignItems: "center", flexWrap: "wrap" }}>
                  <div style={{ textAlign: "center" }}>
                    <h3 style={{ fontSize: "3rem", fontWeight: "800", fontFamily: "var(--font-title)", color: book.coverAccent }}>
                      {book.rating}
                    </h3>
                    <div className="rating-stars" style={{ marginBottom: "0.25rem" }}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={15} fill={i < Math.floor(book.rating) ? "currentColor" : "none"} />
                      ))}
                    </div>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: "600" }}>
                      Based on {book.reviewsCount} verified reviews
                    </span>
                  </div>

                  {/* Rating distribution progress bars */}
                  <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    {[
                      { stars: 5, pct: 85 },
                      { stars: 4, pct: 10 },
                      { stars: 3, pct: 3 },
                      { stars: 2, pct: 2 },
                      { stars: 1, pct: 0 }
                    ].map((row) => (
                      <div key={row.stars} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <span style={{ fontSize: "0.8rem", fontWeight: "600", width: "12px" }}>{row.stars}</span>
                        <Star size={11} fill="currentColor" style={{ color: "#fbbf24", opacity: 0.7 }} />
                        <div style={{ flexGrow: 1, height: "6px", backgroundColor: "var(--bg-tertiary)", borderRadius: "3px", overflow: "hidden" }}>
                          <div style={{ width: `${row.pct}%`, height: "100%", backgroundColor: book.coverAccent, borderRadius: "3px" }} />
                        </div>
                        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", width: "24px", textAlign: "right" }}>{row.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Selected Review Comments */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <h4 style={{ fontSize: "1rem", fontWeight: "700" }}>Top Critical & Creative Reviews</h4>
                  {[
                    { author: "Arthur Pendelton", rating: 5, comment: "Rarely does a modern publication encapsulate ideas with such visual and architectural elegance. A masterpiece of bookmaking.", date: "May 12, 2026" },
                    { author: "Evelyn K.", rating: 4, comment: "The prose is lyrical, and the chapter pacing was outstanding. I finished it in two sittings under a rainy window. Highly recommended.", date: "April 28, 2026" }
                  ].map((rev, idx) => (
                    <div key={idx} className="glass-card" style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontWeight: "700", fontSize: "0.9rem" }}>{rev.author}</span>
                        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{rev.date}</span>
                      </div>
                      <div className="rating-stars">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={11} fill={i < rev.rating ? "currentColor" : "none"} />
                        ))}
                      </div>
                      <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontStyle: "italic", lineHeight: "1.6" }}>
                        "{rev.comment}"
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Checkout Button */}
        <div
          style={{
            position: "sticky",
            bottom: 0,
            borderTop: "1px solid var(--border-color)",
            backgroundColor: "var(--glass-bg)",
            backdropFilter: "blur(8px)",
            padding: "1.25rem 2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "auto",
            zIndex: 10
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ fontSize: "0.95rem", color: "var(--text-secondary)", fontWeight: "600" }}>Sanctuary Price:</span>
            <span style={{ fontSize: "1.8rem", fontWeight: "800", fontFamily: "var(--font-title)", color: book.coverAccent }}>
              ${book.price}
            </span>
          </div>

          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              onClick={() => onToggleWishlist(book)}
              className="btn-secondary"
              style={{
                padding: "0.75rem 1.25rem",
                color: isWishlisted ? "var(--accent-secondary)" : "var(--text-primary)"
              }}
            >
              <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
              <span>{isWishlisted ? "Wishlisted" : "Add to Wishlist"}</span>
            </button>

            <button
              onClick={() => {
                onAddToCart(book);
                onClose();
              }}
              className="btn-primary"
              style={{
                padding: "0.75rem 2rem",
                background: `linear-gradient(135deg, ${book.coverAccent}, ${book.coverAccent}d9)`,
                color: "#ffffff",
                border: "none",
                boxShadow: `0 4px 15px ${book.glowColor || "rgba(0,0,0,0.2)"}`
              }}
            >
              <ShoppingCart size={18} />
              <span>Acquire Volume</span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
