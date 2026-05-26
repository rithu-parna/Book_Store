import React, { useState } from "react";
import { BookOpen, Search, ShoppingBag, Heart, Sun, Moon, Sparkles, Menu, X, Feather } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({
  cartCount,
  wishlistCount,
  theme,
  toggleTheme,
  onOpenCart,
  onOpenWishlist,
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  categories,
  onScrollToQuiz
}) {
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="glass"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "80px",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 2rem",
        borderBottom: "1px solid var(--border-color)",
        background: theme === "dark" 
          ? "linear-gradient(to bottom, rgba(9, 14, 30, 0.65) 0%, rgba(3, 5, 12, 0.75) 100%)"
          : "linear-gradient(to bottom, rgba(251, 249, 246, 0.8) 0%, rgba(244, 237, 212, 0.85) 100%)",
        backdropFilter: "blur(20px)",
        boxShadow: theme === "dark"
          ? "0 4px 30px rgba(139, 92, 246, 0.08), inset 0 -1px 0 rgba(255, 255, 255, 0.05)"
          : "0 4px 30px rgba(217, 119, 6, 0.08)"
      }}
    >
      {/* Brand Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <motion.div
          whileHover={{ scale: 1.1, rotate: 10 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer"
          }}
        >
          <img 
            src="/logo.png" 
            alt="Lumina Books Logo" 
            style={{ 
              width: "39px", 
              height: "39px", 
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(139, 92, 246, 0.25)",
              border: "1px solid var(--border-color)"
            }} 
          />
        </motion.div>
        <span
          className="font-serif"
          style={{
            fontSize: "1.4rem",
            fontWeight: "800",
            letterSpacing: "0.5px",
            background: "linear-gradient(135deg, var(--text-primary) 30%, var(--accent-primary) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          Lumina<span style={{ fontWeight: "300", fontStyle: "italic" }}>Books</span>
        </span>
      </div>

      {/* Navigation Links & Search - Desktop */}
      <div style={{ display: "flex", alignItems: "center", gap: "2rem" }} className="desktop-nav">
        {/* Category Dropdown */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowCategoriesDropdown(!showCategoriesDropdown)}
            onBlur={() => setTimeout(() => setShowCategoriesDropdown(false), 200)}
            style={{
              cursor: "pointer",
              fontSize: "0.95rem",
              fontWeight: "600",
              color: activeCategory !== "All Collections" ? "var(--accent-primary)" : "var(--text-primary)",
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
              padding: "0.5rem 0.75rem",
              borderRadius: "var(--radius-sm)",
              transition: "var(--transition-fast)"
            }}
          >
            <span>Collections</span>
            <span style={{ fontSize: "0.8rem", transform: showCategoriesDropdown ? "rotate(180deg)" : "rotate(0)" }}>▼</span>
          </button>
          <AnimatePresence>
            {showCategoriesDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="glass"
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  width: "240px",
                  borderRadius: "var(--radius-md)",
                  padding: "0.5rem",
                  marginTop: "0.5rem",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.25rem"
                }}
              >
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      setShowCategoriesDropdown(false);
                    }}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "0.6rem 0.8rem",
                      borderRadius: "var(--radius-sm)",
                      fontSize: "0.9rem",
                      fontWeight: activeCategory === cat ? "700" : "500",
                      backgroundColor: activeCategory === cat ? "rgba(var(--accent-rgb), 0.15)" : "transparent",
                      color: activeCategory === cat ? "var(--accent-primary)" : "var(--text-secondary)",
                      cursor: "pointer",
                      transition: "var(--transition-fast)"
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* AI Quiz Recommendation Link */}
        <button
          onClick={onScrollToQuiz}
          style={{
            cursor: "pointer",
            fontSize: "0.95rem",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "var(--text-primary)",
            padding: "0.5rem 0.75rem",
            borderRadius: "var(--radius-sm)"
          }}
        >
          <Sparkles size={16} className="spin-slow" style={{ color: "var(--accent-secondary)" }} />
          <span>Book Matcher</span>
        </button>

        {/* Search Bar */}
        <div style={{ position: "relative", width: "240px" }}>
          <input
            type="text"
            placeholder="Search sanctuary..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-premium"
            style={{
              width: "100%",
              padding: "0.5rem 1rem 0.5rem 2.2rem",
              fontSize: "0.85rem",
              borderRadius: "20px"
            }}
          />
          <Search
            size={15}
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-muted)",
              pointerEvents: "none"
            }}
          />
        </div>
      </div>

      {/* Action Buttons & Menu - Right */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {/* Wishlist Trigger */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenWishlist}
          style={{
            position: "relative",
            cursor: "pointer",
            padding: "0.5rem",
            borderRadius: "var(--radius-circle)",
            color: wishlistCount > 0 ? "var(--accent-secondary)" : "var(--text-secondary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Heart size={22} fill={wishlistCount > 0 ? "currentColor" : "none"} />
          <AnimatePresence>
            {wishlistCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="badge"
                style={{
                  position: "absolute",
                  top: "-4px",
                  right: "-4px"
                }}
              >
                {wishlistCount}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Cart Trigger */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenCart}
          style={{
            position: "relative",
            cursor: "pointer",
            padding: "0.5rem",
            borderRadius: "var(--radius-circle)",
            color: "var(--text-secondary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <ShoppingBag size={22} />
          <AnimatePresence>
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="badge"
                style={{
                  position: "absolute",
                  top: "-4px",
                  right: "-4px"
                }}
              >
                {cartCount}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Premium Literary Theme Toggle */}
        <div
          onClick={toggleTheme}
          style={{
            position: "relative",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            background: "var(--bg-secondary)",
            border: "1px solid var(--border-color)",
            borderRadius: "24px",
            padding: "3px 6px",
            width: "70px",
            height: "36px",
            userSelect: "none",
            overflow: "hidden",
            boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)",
            marginLeft: "0.5rem"
          }}
        >
          {/* Active Capsule Overlay */}
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{
              position: "absolute",
              top: "3px",
              bottom: "3px",
              left: theme === "dark" ? "3px" : "calc(50% + 1px)",
              width: "calc(50% - 4px)",
              background: theme === "dark" 
                ? "linear-gradient(135deg, var(--accent-primary), rgba(139, 92, 246, 0.6))"
                : "linear-gradient(135deg, #f59e0b, #d97706)",
              borderRadius: "20px",
              zIndex: 1,
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)"
            }}
          />

          {/* Dark Mode Label */}
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px",
              fontSize: "0.75rem",
              fontWeight: "700",
              zIndex: 2,
              color: theme === "dark" ? "#ffffff" : "var(--text-muted)",
              transition: "color 0.3s ease"
            }}
          >
            <Moon size={12} />
            {/* <span>Midnight</span> */}
          </div>

          {/* Light Mode Label */}
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px",
              fontSize: "0.75rem",
              fontWeight: "700",
              zIndex: 2,
              color: theme !== "dark" ? "#ffffff" : "var(--text-muted)",
              transition: "color 0.3s ease"
            }}
          >
            <Feather size={12} />
            {/* <span>Alabaster</span> */}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpenMobileMenu(!isOpenMobileMenu)}
          className="mobile-menu-btn"
          style={{
            cursor: "pointer",
            padding: "0.5rem",
            color: "var(--text-primary)",
            display: "none",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {isOpenMobileMenu ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* CSS adjustments to support mobile menu & hide/show states */}
      <style>{`
        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
      `}</style>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isOpenMobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass"
            style={{
              position: "absolute",
              top: "80px",
              left: 0,
              right: 0,
              padding: "1.5rem",
              borderBottom: "1px solid var(--border-color)",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
              boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
              zIndex: 49
            }}
          >
            {/* Search Input for Mobile */}
            <div style={{ position: "relative" }}>
              <input
                type="text"
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-premium"
                style={{
                  width: "100%",
                  padding: "0.5rem 1rem 0.5rem 2.2rem",
                  fontSize: "0.9rem",
                  borderRadius: "20px"
                }}
              />
              <Search
                size={16}
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                  pointerEvents: "none"
                }}
              />
            </div>

            {/* Collection Selection for Mobile */}
            <div>
              <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--text-muted)", fontWeight: "bold" }}>Collections</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", marginTop: "0.5rem" }}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      setIsOpenMobileMenu(false);
                    }}
                    style={{
                      textAlign: "left",
                      padding: "0.5rem 0.75rem",
                      borderRadius: "var(--radius-sm)",
                      fontSize: "0.9rem",
                      fontWeight: activeCategory === cat ? "700" : "500",
                      backgroundColor: activeCategory === cat ? "rgba(var(--accent-rgb), 0.1)" : "transparent",
                      color: activeCategory === cat ? "var(--accent-primary)" : "var(--text-secondary)",
                      cursor: "pointer"
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                onScrollToQuiz();
                setIsOpenMobileMenu(false);
              }}
              style={{
                cursor: "pointer",
                padding: "0.75rem",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-color)",
                backgroundColor: "var(--bg-secondary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                fontSize: "0.95rem",
                fontWeight: "600"
              }}
            >
              <Sparkles size={16} style={{ color: "var(--accent-secondary)" }} />
              <span>Launch Book Matcher Quiz</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
