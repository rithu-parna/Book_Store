import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Folder, Search, Check, Heart } from "lucide-react";

export default function AdvancedDropdown({
  categories,
  activeCategory,
  setActiveCategory,
  isFilterWishlistOnly,
  setIsFilterWishlistOnly,
  wishlistItems,
  booksData
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownSearch, setDropdownSearch] = useState("");
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getCategoryCount = (cat) => {
    if (cat === "All Collections") {
      return booksData.length;
    }
    return booksData.filter((book) => book.category === cat).length;
  };

  const filteredCategories = categories.filter((cat) =>
    cat.toLowerCase().includes(dropdownSearch.toLowerCase())
  );

  return (
    <div className="advanced-dropdown-wrapper"  ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setDropdownSearch("");
        }}
        className="advanced-dropdown-trigger glass"
        style={{
          width: "100%"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {isFilterWishlistOnly ? (
            <Heart size={18} fill="currentColor" style={{ color: "var(--accent-secondary)" }} />
          ) : (
            <Folder size={18} style={{ color: "var(--accent-primary)" }} />
          )}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "2px" }}>
            <span style={{ fontSize: "0.7rem", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)", letterSpacing: "1px" }}>
              Collection Archive
            </span>
            <span style={{ fontSize: "0.95rem", fontWeight: "700", color: "var(--text-primary)" }}>
              {isFilterWishlistOnly ? `Wishlisted Sanctuary (${wishlistItems.length})` : activeCategory}
            </span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span className="dropdown-counter-badge">
            {isFilterWishlistOnly ? wishlistItems.length : getCategoryCount(activeCategory)}
          </span>
          <ChevronDown
            size={18}
            style={{
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              color: "var(--text-muted)"
            }}
          />
        </div>
      </button>

      {/* Dropdown Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="advanced-dropdown-menu glass"
          >
            {/* Search filter inside dropdown */}
            <div className="dropdown-search-box">
              <Search size={14} style={{ color: "var(--text-muted)", marginLeft: "0.5rem" }} />
              <input
                type="text"
                placeholder="Search collection categories..."
                value={dropdownSearch}
                onChange={(e) => setDropdownSearch(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className="dropdown-search-input"
              />
            </div>

            {/* Category Option List */}
            <div className="dropdown-options-list hide-scrollbar">
              {/* Wishlist option (prioritized at the top if present) */}
              {wishlistItems.length > 0 && (
                <button
                  onClick={() => {
                    setIsFilterWishlistOnly(true);
                    setIsOpen(false);
                  }}
                  className={`dropdown-option-item ${isFilterWishlistOnly ? "active" : ""}`}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <Heart
                      size={16}
                      fill={isFilterWishlistOnly ? "currentColor" : "none"}
                      style={{ color: "var(--accent-secondary)" }}
                    />
                    <span style={{ fontWeight: isFilterWishlistOnly ? "700" : "500" }}>
                      Wishlisted Sanctuary
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span className="dropdown-item-badge wishlist-badge">
                      {wishlistItems.length}
                    </span>
                    {isFilterWishlistOnly && <Check size={14} style={{ color: "var(--accent-secondary)" }} />}
                  </div>
                </button>
              )}

              {filteredCategories.map((cat) => {
                const isSelected = activeCategory === cat && !isFilterWishlistOnly;
                const count = getCategoryCount(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      setIsFilterWishlistOnly(false);
                      setIsOpen(false);
                    }}
                    className={`dropdown-option-item ${isSelected ? "active" : ""}`}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                      <Folder
                        size={16}
                        style={{
                          color: isSelected ? "var(--accent-primary)" : "var(--text-muted)"
                        }}
                      />
                      <span style={{ fontWeight: isSelected ? "700" : "500" }}>{cat}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span className="dropdown-item-badge">{count}</span>
                      {isSelected && <Check size={14} style={{ color: "var(--accent-primary)" }} />}
                    </div>
                  </button>
                );
              })}

              {filteredCategories.length === 0 && (
                <div className="dropdown-no-results">No collections matching search</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
