import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HeroSlider from "./components/HeroSlider";
import BookCard from "./components/BookCard";
import BookDetailModal from "./components/BookDetailModal";
import BookMatcher from "./components/BookMatcher";
import CartDrawer from "./components/CartDrawer";
import GlobalBg from "./components/GlobalBg";
import { booksData, categories } from "./data/books";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, Library, Compass, HelpCircle } from "lucide-react";

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Filter States
  const [activeCategory, setActiveCategory] = useState("All Collections");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterWishlistOnly, setIsFilterWishlistOnly] = useState(false);

  // Selected Book for Modal
  const [selectedBook, setSelectedBook] = useState(null);
  const [hoveredBook, setHoveredBook] = useState(null);

  // Toast Notifications State
  const [toasts, setToasts] = useState([]);

  // Apply Theme class to document root
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.remove("theme-light");
      root.classList.add("theme-dark");
    } else {
      root.classList.remove("theme-dark");
      root.classList.add("theme-light");
    }
  }, [theme]);

  // Toast triggers
  const addToast = (message, type = "success") => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    addToast(`Switched to ${theme === "dark" ? "Warm Alabaster" : "Midnight Onyx"} Theme`, "info");
  };

  // Add to cart logic
  const handleAddToCart = (book) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === book.id);
      if (existing) {
        return prev.map((item) =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...book, quantity: 1 }];
    });
    addToast(`"${book.title}" added to acquisition cart!`);
  };

  // Update quantity inside cart drawer
  const handleUpdateCartQty = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveCartItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  // Remove single item from cart
  const handleRemoveCartItem = (id) => {
    const item = cartItems.find((t) => t.id === id);
    setCartItems((prev) => prev.filter((i) => i.id !== id));
    if (item) {
      addToast(`Removed "${item.title}" from cart`, "info");
    }
  };

  // Clear entire cart upon successful checkout
  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist toggle logic
  const handleToggleWishlist = (book) => {
    const isAlreadyWishlisted = wishlistItems.some((item) => item.id === book.id);
    if (isAlreadyWishlisted) {
      setWishlistItems((prev) => prev.filter((item) => item.id !== book.id));
      addToast(`Removed "${book.title}" from wishlist`, "info");
    } else {
      setWishlistItems((prev) => [...prev, book]);
      addToast(`Added "${book.title}" to wishlist!`);
    }
  };

  // Filter books list
  const filteredBooks = booksData.filter((book) => {
    const matchesCategory =
      activeCategory === "All Collections" || book.category === activeCategory;
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesWishlist = !isFilterWishlistOnly || wishlistItems.some((item) => item.id === book.id);

    return matchesCategory && matchesSearch && matchesWishlist;
  });

  const handleOpenWishlistFilter = () => {
    setIsFilterWishlistOnly((prev) => {
      const targetState = !prev;
      if (targetState) {
        addToast("Showing wishlisted volumes", "info");
      } else {
        addToast("Showing all volumes", "info");
      }
      return targetState;
    });
  };

  // Scroll smooth helper
  const handleScrollToQuiz = () => {
    const el = document.getElementById("book-matcher-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      addToast("Aligned matching scanner initialized", "info");
    }
  };

  return (
    <div className="app-container">
      {/* Global Interactive Motion Background */}
      <GlobalBg theme={theme} activeBook={selectedBook || hoveredBook} />

      {/* Navigation */}
      <Navbar
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        wishlistCount={wishlistItems.length}
        theme={theme}
        toggleTheme={handleToggleTheme}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={handleOpenWishlistFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        setActiveCategory={(cat) => {
          setActiveCategory(cat);
          setIsFilterWishlistOnly(false); // Reset wishlist filter when category changes
        }}
        categories={categories}
        onScrollToQuiz={handleScrollToQuiz}
      />

      {/* Main App Workspace */}
      <div className="app-workspace">
        {/* Main Page Content */}
        <main className="main-content">
        {/* Slides / Hero Section */}
        <HeroSlider books={booksData} onOpenBook={setSelectedBook} theme={theme} />

        {/* Catalog Section Header */}
        <div style={{ maxWidth: "1200px", margin: "4rem auto 0 auto", padding: "0 2rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "1.5rem",
              marginBottom: "2rem",
              borderBottom: "1px solid var(--border-color)",
              paddingBottom: "1.5rem"
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--accent-primary)", marginBottom: "0.5rem" }}>
                <Library size={18} />
                <span style={{ fontSize: "0.8rem", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1.5px" }}>
                  {isFilterWishlistOnly ? "My Wishlist" : activeCategory}
                </span>
              </div>
              <h2 className="font-serif" style={{ fontSize: "2.4rem", fontWeight: "800" }}>
                {isFilterWishlistOnly ? "Reserved Sanctuary Volumes" : "Explore Our Collections"}
              </h2>
            </div>

            {/* Quick Collections Toggles */}
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setIsFilterWishlistOnly(false);
                  }}
                  className={activeCategory === cat && !isFilterWishlistOnly ? "btn-primary" : "btn-secondary"}
                  style={{
                    padding: "0.5rem 1rem",
                    fontSize: "0.85rem",
                    borderRadius: "20px"
                  }}
                >
                  {cat}
                </button>
              ))}
              {wishlistItems.length > 0 && (
                <button
                  onClick={handleOpenWishlistFilter}
                  className={isFilterWishlistOnly ? "btn-primary" : "btn-secondary"}
                  style={{
                    padding: "0.5rem 1rem",
                    fontSize: "0.85rem",
                    borderRadius: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem"
                  }}
                >
                  <Heart size={14} fill={isFilterWishlistOnly ? "currentColor" : "none"} style={{ color: isFilterWishlistOnly ? "#fff" : "var(--accent-secondary)" }} />
                  <span>Wishlisted ({wishlistItems.length})</span>
                </button>
              )}
            </div>
          </div>

          {/* Book Cards Grid Shelf */}
          <AnimatePresence mode="popLayout">
            {filteredBooks.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  padding: "5rem 0",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1rem"
                }}
              >
                <Compass size={40} style={{ color: "var(--text-muted)", strokeWidth: 1.5 }} />
                <h3 style={{ fontSize: "1.2rem", fontWeight: "700" }}>No matching archives located</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", maxWidth: "340px" }}>
                  Adjust your search parameters or check our other Collections sections.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory("All Collections");
                    setSearchQuery("");
                    setIsFilterWishlistOnly(false);
                  }}
                  className="btn-secondary"
                  style={{ marginTop: "0.5rem" }}
                >
                  Reset Catalog Filters
                </button>
              </motion.div>
            ) : (
              <motion.div className="grid-responsive" style={{ minHeight: "400px" }}>
                {filteredBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onOpen={() => setSelectedBook(book)}
                    onAddToCart={handleAddToCart}
                    onToggleWishlist={handleToggleWishlist}
                    isWishlisted={wishlistItems.some((w) => w.id === book.id)}
                    onMouseEnter={() => setHoveredBook(book)}
                    onMouseLeave={() => setHoveredBook(null)}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Quotation Sanctuary */}

        {/* Book Matcher Recommendation Widget */}
        <div style={{ padding: "0 2rem", margin: "6rem 0" }}>
          <BookMatcher
            books={booksData}
            onOpenBook={setSelectedBook}
            onAddToCart={handleAddToCart}
          />
        </div>
      </main>

      {/* Footer Branding */}
      <footer
        style={{
          borderTop: "1px solid var(--border-color)",
          padding: "3rem 2rem",
          textAlign: "center",
          backgroundColor: "var(--bg-secondary)",
          color: "var(--text-muted)",
          fontSize: "0.9rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center"
        }}
      >
        <span className="font-serif" style={{ fontSize: "1.2rem", fontWeight: "700", color: "var(--text-primary)" }}>
          Lumina Books • Sanctuary of Letters
        </span>
        <p style={{ maxWidth: "420px", margin: "0 auto", lineHeight: "1.6" }}>
          A highly premium digital catalog celebrating independent authors, philosophical inquiries, futuristic visions, and rare historical prints.
        </p>
        <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "1rem" }}>
          © 2026 Lumina Literary Trust. All credentials verified.
        </span>
      </footer>
      </div>

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* Book details modal */}
      <AnimatePresence>
        {selectedBook && (
          <BookDetailModal
            book={selectedBook}
            onClose={() => setSelectedBook(null)}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={wishlistItems.some((w) => w.id === selectedBook.id)}
          />
        )}
      </AnimatePresence>

      {/* Custom Toast Notifications Container */}
      <div
        style={{
          position: "fixed",
          bottom: "2rem",
          left: "2rem",
          zIndex: 110,
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          pointerEvents: "none"
        }}
      >
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: -50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              style={{
                pointerEvents: "auto",
                padding: "1rem 1.25rem",
                borderRadius: "var(--radius-md)",
                backgroundColor: "var(--bg-secondary)",
                color: "var(--text-primary)",
                borderLeft: "4px solid var(--accent-primary)",
                boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                fontSize: "0.85rem",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                maxWidth: "320px",
                border: "1px solid var(--border-color)",
                borderLeftWidth: "4px"
              }}
            >
              <Sparkles size={16} style={{ color: "var(--accent-primary)", flexShrink: 0 }} />
              <span>{toast.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
