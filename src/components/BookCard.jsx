import React, { useState } from "react";
import { Star, Heart, Eye, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

export default function BookCard({ 
  book, 
  onOpen, 
  onAddToCart, 
  onToggleWishlist, 
  isWishlisted,
  onMouseEnter,
  onMouseLeave
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        y: isHovered ? -8 : 0, 
        borderColor: isHovered ? `${book.coverAccent}40` : "var(--border-color)", 
        boxShadow: isHovered 
          ? `0 20px 40px -15px ${book.glowColor || "rgba(0,0,0,0.15)"}` 
          : "0 4px 20px rgba(0,0,0,0.02)" 
      }}
      exit={{ opacity: 0, scale: 0.95 }}
      onMouseEnter={() => {
        setIsHovered(true);
        if (onMouseEnter) onMouseEnter();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        if (onMouseLeave) onMouseLeave();
      }}
      className="glass-card"
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "1.25rem",
        position: "relative",
        overflow: "visible", // Allowed overflow to prevent 3D clipping
        perspective: "1000px"
      }}
    >
      {/* Hover Glow Aura */}
      <motion.div
        className="card-glow"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 50% 35%, ${book.glowColor || book.coverAccent}22, transparent 75%)`,
          pointerEvents: "none",
          zIndex: 0,
          borderRadius: "var(--radius-md)"
        }}
      />

      {/* Category Tag Header & Wishlist Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
          zIndex: 2
        }}
      >
        <span
          style={{
            fontSize: "0.7rem",
            textTransform: "uppercase",
            letterSpacing: "1.2px",
            fontWeight: "800",
            color: book.coverAccent
          }}
        >
          {book.category}
        </span>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(book);
          }}
          style={{
            cursor: "pointer",
            color: isWishlisted ? "var(--accent-secondary)" : "var(--text-muted)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "none",
            border: "none",
            padding: 0
          }}
        >
          <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
        </motion.button>
      </div>

      {/* 3D Physical Book Model Container */}
      <motion.div
        style={{
          position: "relative",
          width: "100%",
          height: "240px",
          perspective: "1000px",
          marginBottom: "1.25rem",
          zIndex: 2
        }}
      >
        <motion.div
          onClick={onOpen}
          animate={{
            rotateY: isHovered ? 26 : 10,
            rotateX: isHovered ? 6 : 3,
            scale: isHovered ? 1.05 : 1,
            boxShadow: isHovered 
              ? `0 20px 35px -8px ${book.glowColor || "rgba(0,0,0,0.35)"}` 
              : `0 10px 20px -5px rgba(0,0,0,0.18)`
          }}
          transition={{ type: "spring", stiffness: 180, damping: 18 }}
          style={{
            position: "absolute",
            inset: 0,
            cursor: "pointer",
            transformStyle: "preserve-3d",
            borderRadius: "4px 8px 8px 4px"
          }}
        >
          {/* Front Cover Layer */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: book.image 
                ? `linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.0) 50%, rgba(0,0,0,0.2) 100%), url(${book.image}) center/cover no-repeat` 
                : book.themeColor,
              borderRadius: "4px 8px 8px 4px",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              transform: "translateZ(8px)",
              zIndex: 5
            }}
          >
            {/* Spine Shadow on Front Cover */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: "10px",
                background: "linear-gradient(to right, rgba(0,0,0,0.25) 0%, rgba(255,255,255,0.05) 40%, rgba(0,0,0,0.15) 100%)",
                zIndex: 6
              }}
            />
            
            {/* Cover Title/Author for abstract themeColor covers */}
            {!book.image && (
              <div style={{ padding: "1.25rem", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ height: "2.5px", width: "25px", backgroundColor: book.coverAccent, marginBottom: "0.5rem" }} />
                  <h4 className="font-serif" style={{ color: "#ffffff", fontSize: "1.1rem", fontWeight: "700", lineHeight: "1.2" }}>{book.title}</h4>
                </div>
                <p style={{ color: "#e2e8f0", fontSize: "0.8rem", fontWeight: "500" }}>{book.author}</p>
              </div>
            )}
          </div>

          {/* 3D Pages Stack (Right Edge depth) */}
          <div
            style={{
              position: "absolute",
              top: "2px",
              bottom: "2px",
              right: "0",
              width: "16px",
              backgroundColor: "var(--bg-secondary)",
              border: "1px solid var(--border-color)",
              backgroundImage: "repeating-linear-gradient(to bottom, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
              transform: "rotateY(90deg) translateZ(8px)",
              transformOrigin: "right center",
              borderRadius: "0 3px 3px 0",
              zIndex: 4
            }}
          />

          {/* 3D Bottom Pages (Bottom depth) */}
          <div
            style={{
              position: "absolute",
              left: "2px",
              right: "2px",
              bottom: "0",
              height: "16px",
              backgroundColor: "var(--bg-secondary)",
              border: "1px solid var(--border-color)",
              backgroundImage: "repeating-linear-gradient(to right, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
              transform: "rotateX(90deg) translateZ(8px)",
              transformOrigin: "center bottom",
              borderRadius: "0 0 3px 3px",
              zIndex: 4
            }}
          />

          {/* Quick View Button Hover Overlay */}
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(3px)",
              zIndex: 7, // above front cover layer
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "4px 8px 8px 4px",
              transform: "translateZ(9px)",
              pointerEvents: isHovered ? "auto" : "none" // Prevent blocking clicks when hidden
            }}
          >
            <span
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(4px)",
                color: "#0f172a",
                padding: "0.6rem 1.2rem",
                borderRadius: "40px",
                fontSize: "0.8rem",
                fontWeight: "700",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                border: "1px solid rgba(255,255,255,0.4)"
              }}
            >
              <Eye size={14} />
              Quick View
            </span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Book Metadata */}
      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", zIndex: 2 }}>
        <div>
          <motion.h3
            animate={{ color: isHovered ? book.coverAccent : "var(--text-primary)" }}
            transition={{ duration: 0.25 }}
            style={{
              fontSize: "1.05rem",
              fontWeight: "700",
              marginBottom: "0.3rem",
              lineHeight: "1.3"
            }}
          >
            {book.title}
          </motion.h3>
          <p
            style={{
              fontSize: "0.85rem",
              color: "var(--text-secondary)",
              marginBottom: "0.5rem"
            }}
          >
            {book.author}
          </p>

          {/* Rating */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.75rem" }}>
            <div style={{ display: "flex", alignItems: "center", color: "#eab308" }}>
              <Star size={13} fill="currentColor" stroke="currentColor" />
            </div>
            <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "var(--text-primary)" }}>{book.rating}</span>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>({book.reviewsCount})</span>
          </div>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1rem" }}>
            {book.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "0.7rem",
                  padding: "0.25rem 0.6rem",
                  backgroundColor: `${book.coverAccent}12`,
                  color: book.coverAccent,
                  border: `1px solid ${book.coverAccent}22`,
                  borderRadius: "6px",
                  fontWeight: "600",
                  letterSpacing: "0.2px"
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Price & Add to Cart Action */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid var(--border-color)",
            paddingTop: "0.75rem",
            marginTop: "auto"
          }}
        >
          <span
            style={{
              fontSize: "1.2rem",
              fontWeight: "800",
              color: book.coverAccent,
              fontFamily: "var(--font-title)"
            }}
          >
            ${book.price.toFixed(2)}
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(book);
            }}
            className="btn-primary"
            style={{
              padding: "0.5rem 1.2rem",
              fontSize: "0.8rem",
              borderRadius: "20px",
              color: "#ffffff",
              border: "none",
              boxShadow: `0 4px 12px ${book.glowColor || "rgba(0,0,0,0.2)"}`
            }}
          >
            <ShoppingCart size={14} />
            <span>Add</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
