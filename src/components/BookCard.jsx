import React from "react";
import { Star, Heart, Eye, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

export default function BookCard({ book, onOpen, onAddToCart, onToggleWishlist, isWishlisted }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="glass-card"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "1.25rem",
        position: "relative",
        overflow: "hidden",
        perspective: "800px"
      }}
    >
      {/* Category Tag Header & Wishlist Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem"
        }}
      >
        <span
          style={{
            fontSize: "0.7rem",
            textTransform: "uppercase",
            letterSpacing: "0.8px",
            fontWeight: "700",
            color: "var(--text-muted)"
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
            justifyContent: "center"
          }}
        >
          <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
        </motion.button>
      </div>

      {/* Book Cover Container with hover effects */}
      <motion.div
        onClick={onOpen}
        whileHover={{
          rotateY: 12,
          rotateX: -6,
          scale: 1.03,
          boxShadow: `0 15px 30px -5px ${book.glowColor || "rgba(0,0,0,0.4)"}`
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
        style={{
          position: "relative",
          width: "100%",
          height: "240px",
          borderRadius: "6px",
          background: book.image 
            ? `linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.65) 100%), url(${book.image}) center/cover no-repeat` 
            : book.themeColor,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "1.25rem",
          cursor: "pointer",
          boxShadow: `0 10px 25px -5px ${book.glowColor || "rgba(0,0,0,0.3)"}`,
          marginBottom: "1.25rem",
          overflow: "hidden",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          transformStyle: "preserve-3d"
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
            background: "linear-gradient(to right, rgba(0,0,0,0.2) 0%, rgba(255,255,255,0.05) 40%, rgba(0,0,0,0.15) 100%)",
            zIndex: 3
          }}
        />

        {/* Abstract Geometry */}
        {!book.image && (
          <div
            style={{
              position: "absolute",
              top: "15%",
              right: "-15%",
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${book.coverAccent}33`,
              zIndex: 1,
              pointerEvents: "none"
            }}
          />
        )}

        {!book.image && (
          <>
            <div style={{ zIndex: 2 }}>
              <div
                style={{
                  height: "2.5px",
                  width: "25px",
                  backgroundColor: book.coverAccent,
                  marginBottom: "0.5rem"
                }}
              />
              <h4
                className="font-serif"
                style={{
                  color: "#ffffff",
                  fontSize: "1.1rem",
                  fontWeight: "700",
                  lineHeight: "1.2",
                  textShadow: "0 2px 4px rgba(0,0,0,0.4)"
                }}
              >
                {book.title}
              </h4>
            </div>

            <p
              style={{
                color: "#e2e8f0",
                fontSize: "0.8rem",
                fontWeight: "500",
                zIndex: 2,
                textShadow: "0 1px 2px rgba(0,0,0,0.4)"
              }}
            >
              {book.author}
            </p>
          </>
        )}

        {/* Quick View Button Hover Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(2px)",
            zIndex: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            transition: "opacity 0.25s ease"
          }}
        >
          <span
            style={{
              background: "#ffffff",
              color: "#0f172a",
              padding: "0.5rem 1rem",
              borderRadius: "20px",
              fontSize: "0.8rem",
              fontWeight: "600",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
            }}
          >
            <Eye size={14} />
            Quick View
          </span>
        </motion.div>
      </motion.div>

      {/* Book Metadata */}
      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: "700",
              marginBottom: "0.25rem",
              color: "var(--text-primary)",
              lineHeight: "1.3"
            }}
          >
            {book.title}
          </h3>
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
            <div className="rating-stars">
              <Star size={13} fill="currentColor" />
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
                  padding: "0.2rem 0.5rem",
                  backgroundColor: "var(--bg-tertiary)",
                  color: "var(--text-secondary)",
                  borderRadius: "4px",
                  fontWeight: "500"
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
              color: "var(--accent-primary)",
              fontFamily: "var(--font-title)"
            }}
          >
            ${book.price}
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
              padding: "0.45rem 1rem",
              fontSize: "0.8rem",
              borderRadius: "8px"
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
