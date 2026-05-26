import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GlobalBg({ theme, activeBook }) {
  const isDark = theme === "dark";
  
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -10,
        pointerEvents: "none",
        overflow: "hidden",
        backgroundColor: isDark ? "#06080d" : "#faf6f0",
        transition: "background-color 0.8s ease"
      }}
    >
      {/* Texture grain overlay for tactile book feel */}
      <div 
        style={{
          position: "absolute",
          inset: 0,
          opacity: isDark ? 0.025 : 0.035,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          zIndex: 2
        }}
      />

      <AnimatePresence mode="wait">
        {activeBook ? (
          <motion.div
            key={activeBook.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1
            }}
          >
            {/* Book theme color gradient blob */}
            <div
              style={{
                position: "absolute",
                width: "120vw",
                height: "120vh",
                background: activeBook.themeColor || `radial-gradient(circle, ${activeBook.coverAccent} 0%, transparent 60%)`,
                opacity: isDark ? 0.22 : 0.12,
                filter: "blur(130px)",
                transform: "translate3d(0, 0, 0)"
              }}
            />

            {/* Book-specific large blurred cover art */}
            {activeBook.image && (
              <div
                style={{
                  position: "absolute",
                  inset: "-10%",
                  backgroundImage: `url(${activeBook.image})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  filter: "blur(140px) saturate(1.3)",
                  opacity: isDark ? 0.16 : 0.08,
                  transform: "scale(1.2) translate3d(0,0,0)"
                }}
              />
            )}
          </motion.div>
        ) : (
          /* Default light/dark ambient atmospheric gradient */
          <motion.div
            key="default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 1
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-10%",
                right: "-10%",
                width: "70vw",
                height: "70vh",
                background: isDark 
                  ? "radial-gradient(circle, rgba(99, 102, 241, 0.06) 0%, transparent 70%)" 
                  : "radial-gradient(circle, rgba(168, 85, 247, 0.04) 0%, transparent 70%)",
                filter: "blur(90px)"
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-10%",
                left: "-10%",
                width: "60vw",
                height: "60vh",
                background: isDark 
                  ? "radial-gradient(circle, rgba(236, 72, 153, 0.04) 0%, transparent 70%)" 
                  : "radial-gradient(circle, rgba(6, 182, 212, 0.04) 0%, transparent 70%)",
                filter: "blur(90px)"
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
