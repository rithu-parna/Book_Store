import React from "react";
import { motion } from "framer-motion";

export default function GlobalBg({ theme }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -10,
        pointerEvents: "none",
        overflow: "hidden",
        backgroundColor: theme === "dark" ? "#03050c" : "#fbf9f6",
        transition: "background-color 0.8s ease"
      }}
    >
      {theme === "dark" ? (
        <>
          {/* Constellation Backdrop Image (Slow Parallax Panning/Zooming) */}
          <motion.div
            animate={{
              scale: [1.02, 1.08, 1.02],
              x: [0, 15, -15, 0],
              y: [0, -10, 10, 0]
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "linear"
            }}
            style={{
              position: "absolute",
              inset: "-40px",
              background: "url(/cosmic_bg.png) center/cover no-repeat",
              opacity: 0.16,
              filter: "blur(1px) saturate(0.85)"
            }}
          />

          {/* Glowing Ambient Light Blobs */}
          <motion.div
            animate={{
              x: [0, 80, -80, 0],
              y: [0, -60, 60, 0]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut"
            }}
            style={{
              position: "absolute",
              top: "20%",
              left: "15%",
              width: "450px",
              height: "450px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(139,92,246,0.14) 0%, rgba(0,0,0,0) 70%)",
              filter: "blur(60px)"
            }}
          />

          <motion.div
            animate={{
              x: [0, -100, 100, 0],
              y: [0, 80, -80, 0]
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut"
            }}
            style={{
              position: "absolute",
              bottom: "15%",
              right: "10%",
              width: "500px",
              height: "500px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(6,182,212,0.11) 0%, rgba(0,0,0,0) 70%)",
              filter: "blur(70px)"
            }}
          />
        </>
      ) : (
        <>
          {/* Light Theme: Cozy Parchment / Alabaster Ambient Lights */}
          <motion.div
            animate={{
              x: [0, 50, -50, 0],
              y: [0, -40, 40, 0]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut"
            }}
            style={{
              position: "absolute",
              top: "10%",
              right: "15%",
              width: "400px",
              height: "400px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(217,119,6,0.06) 0%, rgba(0,0,0,0) 70%)",
              filter: "blur(50px)"
            }}
          />

          <motion.div
            animate={{
              x: [0, -60, 60, 0],
              y: [0, 50, -50, 0]
            }}
            transition={{
              duration: 28,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut"
            }}
            style={{
              position: "absolute",
              bottom: "10%",
              left: "15%",
              width: "450px",
              height: "450px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(180,83,9,0.05) 0%, rgba(0,0,0,0) 70%)",
              filter: "blur(60px)"
            }}
          />
        </>
      )}
    </div>
  );
}
