import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, BookOpen, Star, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroSlider({ books, onOpenBook, theme = "dark" }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isDark = theme !== "light";
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const featuredBooks = books.slice(0, 4); // Showcase first 4 books

  const coverMotions = {
    1: { // Chasing the Neon Horizon: cyber energetic slide-in from right
      initial: { x: 120, y: -20, scale: 0.8, opacity: 0, rotate: 12 },
      animate: { x: 0, y: 0, scale: 1, opacity: 1, rotate: 3 },
      transition: { type: "spring", stiffness: 120, damping: 14 }
    },
    2: { // Echoes of the Void: float in slowly from below
      initial: { y: 80, scale: 0.9, opacity: 0, rotate: -10 },
      animate: { y: 0, scale: 1, opacity: 1, rotate: -3 },
      transition: { type: "spring", stiffness: 90, damping: 16 }
    },
    3: { // The Architecture of Dreams: spin in organically
      initial: { scale: 0.6, opacity: 0, rotate: -30 },
      animate: { scale: 1, opacity: 1, rotate: 4 },
      transition: { type: "spring", stiffness: 140, damping: 12 }
    },
    4: { // Shadows and Silk: elegant drift from left
      initial: { y: 100, x: -50, scale: 0.85, opacity: 0, rotate: -15 },
      animate: { y: 0, x: 0, scale: 1, opacity: 1, rotate: -2 },
      transition: { type: "spring", stiffness: 110, damping: 15 }
    }
  };

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = ((clientX - left) / width - 0.5) * 35;
    const y = ((clientY - top) / height - 0.5) * 35;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % featuredBooks.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + featuredBooks.length) % featuredBooks.length);
  };

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 }
      }
    },
    exit: (dir) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 }
      }
    })
  };

  if (featuredBooks.length === 0) return null;
  const currentBook = featuredBooks[currentIndex];

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="hero-slider-container"
      style={{
        position: "relative",
        width: "100%",
        height: "600px",
        overflow: "hidden",
        backgroundColor: "var(--bg-primary)",
        borderBottom: "1px solid var(--border-color)",
        display: "flex",
        alignItems: "center"
      }}
    >
      {/* Immersive Motion Background Cover Image (Slow Pan + Interactive Parallax) */}
      <motion.div
        animate={{
          x: [0, 8, -8, 0],
          y: [0, -5, 5, 0]
        }}
        transition={{
          x: { repeat: Infinity, repeatType: "mirror", duration: 25, ease: "linear" },
          y: { repeat: Infinity, repeatType: "mirror", duration: 25, ease: "linear" }
        }}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          overflow: "hidden"
        }}
      >
        <AnimatePresence mode="wait">
          {currentBook.image && (
            <motion.div
              key={currentBook.id}
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: isDark ? 0.38 : 1,
                x: mousePos.x * 0.4,
                y: mousePos.y * 0.4
              }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{
                opacity: { duration: 0.8 },
                scale: { duration: 0.8 },
                x: { type: "spring", stiffness: 80, damping: 20 },
                y: { type: "spring", stiffness: 80, damping: 20 }
              }}
              style={{
                position: "absolute",
                inset: "-20px",
                background: isDark
                  ? `linear-gradient(to left, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0) 100%), url(${currentBook.image}) left/cover no-repeat`
                  : `linear-gradient(to left, var(--bg-primary) 0%, rgba(250, 246, 240, 0.16) 50%, rgba(250, 246, 240, 0) 100%), url(${currentBook.image}) left/cover no-repeat`,
                filter: "contrast(1.05) brightness(0.8)"
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Dynamic Glowing Aura Background Layer (Responsive Volumetric Light) */}
      <motion.div
        animate={{
          x: mousePos.x * 0.5,
          y: mousePos.y * 0.5
        }}
        transition={{ type: "spring", stiffness: 80, damping: 15 }}
        style={{
          position: "absolute",
          inset: 0,
          background: currentBook.themeColor,
          opacity: isDark ? 0.16 : 0.02,
          filter: "blur(90px)",
          transform: "scale(1.2)",
          transition: "background 0.8s ease",
          zIndex: 1
        }}
      />
      <div className="slide-gradient-overlay" style={{ zIndex: 2 }} />

      {/* Main Slide Carousel Container */}
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 2rem",
          zIndex: 10,
          position: "relative"
        }}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="hero-slide-content"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "4rem",
              flexWrap: "wrap",
              minHeight: "450px"
            }}
          >
            {/* Left Column: Typography Details */}
            <motion.div
              animate={{ x: -mousePos.x * 0.25, y: -mousePos.y * 0.25 }}
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
              className="hero-slide-left"
              style={{ flex: "1 1 500px", zIndex: 10 }}
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="hero-slide-badge"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: `${currentBook.coverAccent}22`,
                  color: currentBook.coverAccent,
                  padding: "0.4rem 0.8rem",
                  borderRadius: "20px",
                  fontSize: "0.8rem",
                  fontWeight: "700",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  marginBottom: "1.5rem"
                }}
              >
                <Sparkles size={12} className="spin-slow" />
                <span>Featured Sanctuary Pick</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-serif hero-slide-title"
                style={{
                  fontSize: "3.2rem",
                  lineHeight: "1.1",
                  fontWeight: "800",
                  marginBottom: "1rem",
                  color: "#ffffff",
                  textShadow: "0 2px 12px rgba(0, 0, 0, 0.85)"
                }}
              >
                {currentBook.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="hero-slide-author"
                style={{
                  fontSize: "1.15rem",
                  color: "rgba(255, 255, 255, 0.9)",
                  fontWeight: "500",
                  marginBottom: "1rem",
                  textShadow: "0 2px 8px rgba(0, 0, 0, 0.85)"
                }}
              >
                by <span style={{ color: "#ffffff" }}>{currentBook.author}</span>
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="hero-slide-rating"
                style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}
              >
                <span className="rating-stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < Math.floor(currentBook.rating) ? "currentColor" : "none"}
                    />
                  ))}
                </span>
                <span style={{ fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.65)", fontWeight: "600" }}>
                  ({currentBook.reviewsCount} Literary Reviews)
                </span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="hero-slide-desc"
                style={{
                  fontSize: "1.05rem",
                  color: "rgba(255, 255, 255, 0.85)",
                  marginBottom: "2rem",
                  maxWidth: "520px",
                  lineHeight: "1.7",
                  textShadow: "0 2px 8px rgba(0, 0, 0, 0.85)"
                }}
              >
                {currentBook.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="hero-slide-actions"
                style={{ display: "flex", gap: "1rem", alignItems: "center" }}
              >
                <button
                  onClick={() => onOpenBook(currentBook)}
                  className="btn-primary"
                  style={{
                    padding: "0.85rem 2rem",
                    fontSize: "1rem",
                    background: `linear-gradient(135deg, ${currentBook.coverAccent}, ${currentBook.coverAccent}cc)`,
                    boxShadow: `0 4px 15px ${currentBook.glowColor || "rgba(0,0,0,0.35)"}`,
                    border: "none"
                  }}
                >
                  <BookOpen size={18} />
                  <span>Reveal Book Details</span>
                </button>
                <span
                  className="hero-slide-price"
                  style={{
                    fontSize: "1.6rem",
                    fontWeight: "800",
                    fontFamily: "var(--font-title)",
                    color: currentBook.coverAccent,
                    marginLeft: "1rem"
                  }}
                >
                  ${currentBook.price}
                </span>
              </motion.div>
            </motion.div>

            {/* Right Column: Floating 3D-effect Cover */}
            <div
              className="hero-cover-container"
              style={{
                flex: "1 1 350px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                perspective: "1000px"
              }}
            >
              <motion.div
                key={currentBook.id}
                initial={coverMotions[currentBook.id]?.initial || { scale: 0.8, opacity: 0, rotate: -5 }}
                animate={coverMotions[currentBook.id]?.animate || { scale: 1, opacity: 1, rotate: 3 }}
                transition={coverMotions[currentBook.id]?.transition || { type: "spring", stiffness: 100, delay: 0.2 }}
                whileHover={{
                  rotateY: 18,
                  rotateX: -12,
                  scale: 1.06,
                  y: -12,
                  boxShadow: `0 35px 60px -10px ${currentBook.glowColor || "rgba(0,0,0,0.6)"}`
                }}
                className="hero-cover-book float-animation"
                style={{
                  position: "relative",
                  width: "250px",
                  height: "360px",
                  borderRadius: "8px 16px 16px 8px",
                  background: currentBook.image
                    ? `linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%), url(${currentBook.image}) center/cover no-repeat`
                    : currentBook.themeColor,
                  boxShadow: `0 25px 50px -12px ${currentBook.glowColor || "rgba(0,0,0,0.5)"}`,
                  border: "1px solid rgba(255,255,255,0.1)",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "2rem",
                  cursor: "pointer",
                  transformStyle: "preserve-3d"
                }}
                onClick={() => onOpenBook(currentBook)}
              >
                {/* Book spine simulation overlay */}
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: "12px",
                    background: "linear-gradient(to right, rgba(0,0,0,0.3) 0%, rgba(255,255,255,0.1) 40%, rgba(0,0,0,0.2) 100%)",
                    borderRight: "1px solid rgba(255,255,255,0.05)",
                    zIndex: 3
                  }}
                />

                {/* Abstract Vector Artwork Pattern on Cover (Only show as fallback) */}
                {!currentBook.image && (
                  <div
                    style={{
                      position: "absolute",
                      top: "10%",
                      right: "-10%",
                      width: "180px",
                      height: "180px",
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.05)",
                      border: `1px solid ${currentBook.coverAccent}44`,
                      boxShadow: `inset 0 0 20px ${currentBook.coverAccent}22`,
                      pointerEvents: "none"
                    }}
                  />
                )}

                {!currentBook.image && (
                  <>
                    <div style={{ zIndex: 2 }}>
                      <div
                        style={{
                          height: "3px",
                          width: "40px",
                          backgroundColor: currentBook.coverAccent,
                          marginBottom: "1rem"
                        }}
                      />
                      <h3
                        className="font-serif"
                        style={{
                          color: "#ffffff",
                          fontSize: "1.4rem",
                          fontWeight: "700",
                          lineHeight: "1.2",
                          textShadow: "0 2px 4px rgba(0,0,0,0.3)"
                        }}
                      >
                        {currentBook.title}
                      </h3>
                    </div>

                    <div style={{ zIndex: 2 }}>
                      <p
                        style={{
                          color: "#94a3b8",
                          fontSize: "0.85rem",
                          textTransform: "uppercase",
                          letterSpacing: "1px"
                        }}
                      >
                        Author
                      </p>
                      <p
                        style={{
                          color: "#ffffff",
                          fontSize: "0.95rem",
                          fontWeight: "600",
                          textShadow: "0 1px 2px rgba(0,0,0,0.3)"
                        }}
                      >
                        {currentBook.author}
                      </p>
                    </div>
                  </>
                )}
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Navigation Controls */}
      <button
        onClick={handlePrev}
        className="hero-nav-btn prev"
        style={{
          position: "absolute",
          left: "2rem",
          zIndex: 25,
          cursor: "pointer",
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          color: "#ffffff",
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "var(--transition-fast)"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.18)";
          e.currentTarget.style.borderColor = currentBook.coverAccent;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
        }}
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={handleNext}
        className="hero-nav-btn next"
        style={{
          position: "absolute",
          right: "2rem",
          zIndex: 25,
          cursor: "pointer",
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          color: "#ffffff",
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "var(--transition-fast)"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.18)";
          e.currentTarget.style.borderColor = currentBook.coverAccent;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
        }}
      >
        <ChevronRight size={22} />
      </button>

      {/* Navigation Dot Indicators */}
      <div
        style={{
          position: "absolute",
          bottom: "1.5rem",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: "0.75rem",
          zIndex: 25
        }}
      >
        {featuredBooks.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            style={{
              width: currentIndex === i ? "24px" : "8px",
              height: "8px",
              borderRadius: "4px",
              backgroundColor: currentIndex === i ? currentBook.coverAccent : "rgba(255, 255, 255, 0.35)",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
          />
        ))}
      </div>
    </div>
  );
}
