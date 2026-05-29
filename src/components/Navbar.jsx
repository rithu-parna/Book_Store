import React, { useState } from "react";
import { BookOpen, Search, ShoppingBag, Heart, Sun, Moon, Sparkles, Folder, List, LayoutGrid, HelpCircle, User, LogOut } from "lucide-react";
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
  onScrollToQuiz,
  user,
  onOpenAuth,
  onLogout
}) {
  const [showMobileCategories, setShowMobileCategories] = useState(false);

  return (
    <>
      {/* DESKTOP SIDEBAR NAVIGATION (Width: 280px) */}
      <nav className="desktop-sidebar glass">
        {/* Brand Logo Header */}
        <div className="sidebar-brand">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              cursor: "pointer"
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 15px rgba(var(--accent-rgb), 0.3)"
              }}
            >
              <BookOpen size={18} style={{ color: "#ffffff" }} />
            </div>
            <span
              className="font-serif"
              style={{
                fontSize: "1.25rem",
                fontWeight: "800",
                background: "linear-gradient(135deg, var(--text-primary) 30%, var(--accent-primary) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "0.5px"
              }}
            >
              Lumina<span style={{ fontWeight: "300", fontStyle: "italic" }}>Books</span>
            </span>
          </motion.div>
        </div>

        {/* Search sanctuary input */}
        <div style={{ padding: "0 1.5rem", marginBottom: "1.5rem" }}>
          <div style={{ position: "relative", width: "100%" }}>
            <input
              type="text"
              placeholder="Search volumes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-premium"
              style={{
                width: "100%",
                padding: "0.6rem 1rem 0.6rem 2.2rem",
                fontSize: "0.8rem",
                borderRadius: "10px",
                backgroundColor: "var(--bg-primary)"
              }}
            />
            <Search
              size={13}
              style={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-muted)",
                pointerEvents: "none"
              }}
            />
          </div>
        </div>

        {/* Scrollable middle container to prevent sidebar footer from getting pushed off-screen */}
        <div 
          className="hide-scrollbar" 
          style={{ 
            flexGrow: 1, 
            overflowY: "auto", 
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem"
          }}
        >
          {/* Primary Action Links */}
          <div className="sidebar-links-section" style={{ marginBottom: 0 }}>
            <span className="sidebar-section-title">Navigation</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
              <button
                onClick={() => {
                  setActiveCategory("All Collections");
                  // Scroll to top of catalog
                  window.scrollTo({ top: 500, behavior: "smooth" });
                }}
                className="sidebar-link active-hover"
                style={{
                  backgroundColor: activeCategory === "All Collections" ? "var(--sidebar-active-bg)" : "transparent",
                  color: activeCategory === "All Collections" ? "var(--sidebar-active-text)" : "var(--text-primary)"
                }}
              >
                <LayoutGrid size={16} />
                <span>Explore Catalog</span>
              </button>

              <button
                onClick={onScrollToQuiz}
                className="sidebar-link active-hover"
              >
                <Sparkles size={16} className="spin-slow" style={{ color: "var(--accent-secondary)" }} />
                <span>Book Matcher</span>
              </button>

              <button
                onClick={onOpenWishlist}
                className="sidebar-link active-hover"
                style={{
                  color: wishlistCount > 0 ? "var(--accent-secondary)" : "var(--text-primary)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexGrow: 1 }}>
                  <Heart size={16} fill={wishlistCount > 0 ? "currentColor" : "none"} />
                  <span>My Wishlist</span>
                </div>
                {wishlistCount > 0 && <span className="badge" style={{ transform: "scale(0.85)" }}>{wishlistCount}</span>}
              </button>

              <button
                onClick={onOpenCart}
                className="sidebar-link active-hover"
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexGrow: 1 }}>
                  <ShoppingBag size={16} />
                  <span>Acquisition Cart</span>
                </div>
                {cartCount > 0 && <span className="badge" style={{ transform: "scale(0.85)" }}>{cartCount}</span>}
              </button>
            </div>
          </div>

          {/* Collections Dropdown Filter */}
          <div className="sidebar-links-section" style={{ marginBottom: 0 }}>
            <span className="sidebar-section-title">Collections</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              {categories.map((cat) => {
                const isSelected = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                    }}
                    className="sidebar-category-link"
                    style={{
                      backgroundColor: isSelected ? "var(--sidebar-active-bg)" : "transparent",
                      color: isSelected ? "var(--sidebar-active-text)" : "var(--text-secondary)",
                      fontWeight: isSelected ? "700" : "500",
                      borderLeft: isSelected ? "3px solid var(--accent-primary)" : "3px solid transparent",
                      paddingLeft: isSelected ? "0.6rem" : "0.75rem"
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* User Auth Section inside Sidebar */}
        <div style={{ padding: "1.25rem 1.5rem", borderTop: "1px solid var(--border-color)", marginTop: "auto" }}>
          {user ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(var(--accent-rgb), 0.15)",
                  border: "1px solid var(--accent-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "700",
                  color: "var(--accent-primary)"
                }}>
                  {user.name ? user.name[0].toUpperCase() : "U"}
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "0.85rem", fontWeight: "700", color: "var(--text-primary)" }}>{user.name}</span>
                  <span style={{ fontSize: "0.7rem", color: "var(--accent-secondary)", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>Curator Member</span>
                </div>
              </div>
              <button 
                onClick={onLogout}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "#f87171",
                  padding: "0.25rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
                title="Log Out"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="btn-primary"
              style={{ width: "100%", padding: "0.6rem 1rem", fontSize: "0.8rem", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
            >
              <User size={14} />
              <span>Enter Sanctuary</span>
            </button>
          )}
        </div>

        {/* Sidebar Footer Info Card & Theme Toggle */}
        <div className="sidebar-footer">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: "600" }}>CURRENT ARCHIVE</span>
              <span style={{ fontSize: "0.85rem", fontWeight: "700" }}>Lumina Curators</span>
            </div>
            
            <button
              onClick={toggleTheme}
              style={{
                cursor: "pointer",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: "var(--bg-tertiary)",
                border: "1px solid var(--border-color)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--accent-primary)",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                transition: "var(--transition-fast)"
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--accent-primary)"}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border-color)"}
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE TOP SLIM BRAND HEADER (Height: 65px) */}
      <header className="mobile-top-bar glass">
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <BookOpen size={14} style={{ color: "#ffffff" }} />
          </div>
          <span className="font-serif" style={{ fontSize: "1.1rem", fontWeight: "800" }}>
            Lumina<span style={{ fontWeight: "300" }}>Books</span>
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {/* Small inline search bar for mobile */}
          <div style={{ position: "relative", width: "120px" }}>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-premium"
              style={{
                width: "100%",
                padding: "0.4rem 0.6rem 0.4rem 1.8rem",
                fontSize: "0.75rem",
                borderRadius: "8px",
                backgroundColor: "var(--bg-secondary)"
              }}
            />
            <Search
              size={11}
              style={{
                position: "absolute",
                left: "8px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-muted)"
              }}
            />
          </div>

          {/* User Auth Avatar / Sign In */}
          {user ? (
            <button
              onClick={onLogout}
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                backgroundColor: "rgba(var(--accent-rgb), 0.15)",
                border: "1px solid var(--accent-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "700",
                color: "var(--accent-primary)",
                fontSize: "0.75rem",
                cursor: "pointer",
                background: "none"
              }}
              title={`Sign Out (${user.name})`}
            >
              {user.name ? user.name[0].toUpperCase() : "U"}
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "var(--accent-primary)"
              }}
              title="Sign In"
            >
              <User size={18} />
            </button>
          )}
        </div>
      </header>

      {/* MOBILE FLOATING BOTTOM NAV BAR */}
      <nav className="mobile-bottom-nav glass">
        {/* Explore Button */}
        <button
          onClick={() => {
            setActiveCategory("All Collections");
            setShowMobileCategories(false);
          }}
          className="mobile-nav-btn"
          style={{ color: activeCategory === "All Collections" && !showMobileCategories ? "var(--accent-primary)" : "var(--text-secondary)" }}
        >
          <LayoutGrid size={20} />
          <span>Explore</span>
        </button>

        {/* Collections Dropdown Trigger */}
        <button
          onClick={() => setShowMobileCategories(!showMobileCategories)}
          className="mobile-nav-btn"
          style={{ color: showMobileCategories ? "var(--accent-primary)" : "var(--text-secondary)" }}
        >
          <Folder size={20} />
          <span>Collections</span>
        </button>

        {/* Matcher Button */}
        <button
          onClick={() => {
            setShowMobileCategories(false);
            onScrollToQuiz();
          }}
          className="mobile-nav-btn"
        >
          <Sparkles size={20} className="spin-slow" style={{ color: "var(--accent-secondary)" }} />
          <span>Matcher</span>
        </button>

        {/* Wishlist Button */}
        <button
          onClick={() => {
            setShowMobileCategories(false);
            onOpenWishlist();
          }}
          className="mobile-nav-btn"
          style={{
            position: "relative",
            color: wishlistCount > 0 ? "var(--accent-secondary)" : "var(--text-secondary)"
          }}
        >
          <Heart size={20} fill={wishlistCount > 0 ? "currentColor" : "none"} />
          <span>Wishlist</span>
          {wishlistCount > 0 && <span className="badge" style={{ position: "absolute", top: "2px", right: "12px", transform: "scale(0.7)" }}>{wishlistCount}</span>}
        </button>

        {/* Cart Button */}
        <button
          onClick={() => {
            setShowMobileCategories(false);
            onOpenCart();
          }}
          className="mobile-nav-btn"
          style={{ position: "relative" }}
        >
          <ShoppingBag size={20} />
          <span>Cart</span>
          {cartCount > 0 && <span className="badge" style={{ position: "absolute", top: "2px", right: "12px", transform: "scale(0.7)" }}>{cartCount}</span>}
        </button>

        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="mobile-nav-btn">
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          <span>Theme</span>
        </button>
      </nav>

      {/* MOBILE CATEGORY FLOATING DRAWER */}
      <AnimatePresence>
        {showMobileCategories && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileCategories(false)}
              style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "#000000",
                zIndex: 48
              }}
            />

            {/* Menu List */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="glass"
              style={{
                position: "fixed",
                bottom: "75px",
                left: "1rem",
                right: "1rem",
                borderRadius: "var(--radius-lg)",
                padding: "1.25rem",
                boxShadow: "0 -10px 25px rgba(0,0,0,0.15)",
                zIndex: 49,
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem" }}>
                <span style={{ fontSize: "0.8rem", fontWeight: "800", textTransform: "uppercase", color: "var(--text-muted)", letterSpacing: "1px" }}>
                  Select Collection
                </span>
                <button onClick={() => setShowMobileCategories(false)} style={{ color: "var(--text-muted)", fontSize: "0.85rem", fontWeight: "bold" }}>
                  Done
                </button>
              </div>

              {categories.map((cat) => {
                const isSelected = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      setShowMobileCategories(false);
                    }}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "0.75rem 1rem",
                      borderRadius: "var(--radius-sm)",
                      fontSize: "0.9rem",
                      fontWeight: isSelected ? "700" : "500",
                      backgroundColor: isSelected ? "rgba(var(--accent-rgb), 0.1)" : "transparent",
                      color: isSelected ? "var(--accent-primary)" : "var(--text-secondary)",
                      transition: "all 0.2s ease"
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* SIDEBAR NAVIGATION CSS INJECTIONS */}
      <style>{`
        /* Desktop sidebar configurations */
        .desktop-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: 280px;
          display: flex;
          flex-direction: column;
          z-index: 40;
          border-right: 1px solid var(--border-color);
          border-top: none;
          border-left: none;
          border-bottom: none;
          background: var(--sidebar-bg);
          border-top-right-radius: var(--radius-xl);
          border-bottom-right-radius: var(--radius-xl);
        }

        .sidebar-brand {
          padding: 2rem 1.5rem;
          border-bottom: 1px solid var(--border-color);
          margin-bottom: 1.5rem;
        }

        .sidebar-links-section {
          padding: 0 1.5rem;
          margin-bottom: 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .sidebar-section-title {
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: var(--text-muted);
          margin-left: 0.5rem;
        }

        .sidebar-link {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition-fast);
          text-align: left;
        }

        .sidebar-link:hover {
          background-color: var(--bg-tertiary);
          transform: translateX(4px);
        }

        .sidebar-category-link {
          width: 100%;
          display: flex;
          align-items: center;
          padding: 0.5rem 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          cursor: pointer;
          transition: var(--transition-fast);
          text-align: left;
        }

        .sidebar-category-link:hover {
          background-color: rgba(var(--accent-rgb), 0.05);
          color: var(--accent-primary);
          transform: translateX(4px);
        }

        .sidebar-footer {
          padding: 1.5rem;
          border-top: 1px solid var(--border-color);
          margin-top: auto;
          display: flex;
          align-items: center;
        }

        /* Mobile specific layouts */
        .mobile-top-bar {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 65px;
          padding: 0 1.25rem;
          align-items: center;
          justify-content: space-between;
          z-index: 45;
          border-bottom: 1px solid var(--border-color);
          border-top: none;
          border-left: none;
          border-right: none;
          background: var(--sidebar-bg);
        }

        .mobile-bottom-nav {
          display: none;
          position: fixed;
          bottom: 15px;
          left: 15px;
          right: 15px;
          height: 65px;
          border-radius: 40px;
          z-index: 45;
          align-items: center;
          justify-content: space-around;
          box-shadow: 0 8px 30px rgba(0,0,0,0.3);
          border: 1px solid var(--border-color);
          background: var(--sidebar-bg);
          padding: 0 0.5rem;
        }

        .mobile-nav-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
          color: var(--text-secondary);
          font-size: 0.65rem;
          font-weight: 700;
          cursor: pointer;
          flex-grow: 1;
          height: 100%;
        }

        @media (max-width: 900px) {
          .desktop-sidebar {
            display: none !important;
          }
          .mobile-top-bar, .mobile-bottom-nav {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}
