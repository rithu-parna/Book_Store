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
import AdvancedDropdown from "./components/AdvancedDropdown";
import AuthModal from "./components/AuthModal";
import AmbientPlayer from "./components/AmbientPlayer";
import CuratorAchievementsModal from "./components/CuratorAchievementsModal";
import { Sparkles, Heart, Library, Compass, HelpCircle, ChevronDown, Folder, ChevronLeft, ChevronRight, Star } from "lucide-react";

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Dynamic Books State (supports live review submission)
  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem("lumina_books");
    return saved ? JSON.parse(saved) : booksData;
  });

  // Gamification Milestones States
  const [achievements, setAchievements] = useState(() => {
    const saved = localStorage.getItem("lumina_achievements");
    return saved ? JSON.parse(saved) : {
      profileActivated: false,
      alignmentSynced: false,
      sampleRead: false,
      curatedWishlist: false,
      manifestPrepared: false,
      reviewWritten: false
    };
  });
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);

  // Authentication States
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("lumina_user")) || null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Filter States
  const [activeCategory, setActiveCategory] = useState("All Collections");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterWishlistOnly, setIsFilterWishlistOnly] = useState(false);

  const [selectedBook, setSelectedBook] = useState(null);
  const [hoveredBook, setHoveredBook] = useState(null);

  const [toasts, setToasts] = useState([]);

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

  // Persist Dynamic books
  useEffect(() => {
    localStorage.setItem("lumina_books", JSON.stringify(books));
  }, [books]);

  // Persist Curator Milestones
  useEffect(() => {
    localStorage.setItem("lumina_achievements", JSON.stringify(achievements));
  }, [achievements]);

  // State-driven automatic milestone triggers
  useEffect(() => {
    if (user) {
      unlockMilestone("profileActivated");
    }
  }, [user]);

  useEffect(() => {
    if (wishlistItems.length >= 2) {
      unlockMilestone("curatedWishlist");
    }
  }, [wishlistItems]);

  useEffect(() => {
    if (cartItems.length >= 1) {
      unlockMilestone("manifestPrepared");
    }
  }, [cartItems]);

  // Unlocks specific milestone and schedules alerts
  const unlockMilestone = (key) => {
    setAchievements((prev) => {
      if (prev[key]) return prev;
      const next = { ...prev, [key]: true };

      const prevCompleted = Object.values(prev).filter(Boolean).length;
      const nextCompleted = Object.values(next).filter(Boolean).length;

      if (nextCompleted > prevCompleted) {
        setTimeout(() => {
          addToast(`🏆 Milestone Unlocked: ${getMilestoneName(key)}!`, "info");
          if (nextCompleted === 2) {
            addToast("🎟️ Unlocked 20% Coupon Code: SCHOLAR20!", "success");
          } else if (nextCompleted === 4) {
            addToast("🎟️ Unlocked 25% Coupon Code: BIBLIOPHILE25!", "success");
          } else if (nextCompleted === 6) {
            addToast("🎟️ Unlocked 35% Coupon Code: SAGE35!", "success");
          }
        }, 500);
      }
      return next;
    });
  };

  const getMilestoneName = (key) => {
    switch (key) {
      case "profileActivated": return "Sanctuary Initiate";
      case "alignmentSynced": return "Algorithmic Alignment";
      case "sampleRead": return "Scholar's Preview";
      case "curatedWishlist": return "Sanctuary Registry";
      case "manifestPrepared": return "Curator's Intent";
      case "reviewWritten": return "Literary Critic";
      default: return "Scholar Milestone";
    }
  };

  // Add review and update dynamic book averages
  const handleAddReview = (bookId, newReview) => {
    setBooks((prevBooks) =>
      prevBooks.map((b) => {
        if (b.id === bookId) {
          const currentReviews = b.reviews || [
            { author: "Arthur Pendelton", rating: 5, comment: "Rarely does a publication encapsulate ideas with such visual and architectural elegance. A masterpiece of bookmaking.", date: "May 12, 2026" },
            { author: "Evelyn K.", rating: 4, comment: "The prose is lyrical, and the chapter pacing was outstanding. I finished it in two sittings under a rainy window. Highly recommended.", date: "April 28, 2026" }
          ];
          const updatedReviews = [newReview, ...currentReviews];
          const totalRating = updatedReviews.reduce((sum, r) => sum + r.rating, 0);
          const avgRating = parseFloat((totalRating / updatedReviews.length).toFixed(1));

          return {
            ...b,
            reviews: updatedReviews,
            reviewsCount: updatedReviews.length + 140,
            rating: avgRating
          };
        }
        return b;
      })
    );

    // Sync selected book details if open
    setSelectedBook((prevSelected) => {
      if (prevSelected && prevSelected.id === bookId) {
        const currentReviews = prevSelected.reviews || [
          { author: "Arthur Pendelton", rating: 5, comment: "Rarely does a modern publication encapsulate ideas with such visual and architectural elegance. A masterpiece of bookmaking.", date: "May 12, 2026" },
          { author: "Evelyn K.", rating: 4, comment: "The prose is lyrical, and the chapter pacing was outstanding. I finished it in two sittings under a rainy window. Highly recommended.", date: "April 28, 2026" }
        ];
        const updatedReviews = [newReview, ...currentReviews];
        const totalRating = updatedReviews.reduce((sum, r) => sum + r.rating, 0);
        const avgRating = parseFloat((totalRating / updatedReviews.length).toFixed(1));

        return {
          ...prevSelected,
          reviews: updatedReviews,
          reviewsCount: updatedReviews.length + 140,
          rating: avgRating
        };
      }
      return prevSelected;
    });

    unlockMilestone("reviewWritten");
  };

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

  // Authentication Handlers
  const handleLogin = (mockUser) => {
    setUser(mockUser);
    localStorage.setItem("lumina_user", JSON.stringify(mockUser));
    addToast(`Welcome to the Sanctuary, ${mockUser.name}!`);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("lumina_user");
    addToast("Signed out of Lumina Sanctuary", "info");
  };

  const requireAuth = (action, message) => {
    if (!user) {
      setIsAuthModalOpen(true);
      if (message) addToast(message, "info");
      return false;
    }
    action();
    return true;
  };

  // Add to cart logic
  const handleAddToCart = (book) => {
    requireAuth(() => {
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
    }, "Please sign in to acquire literary volumes.");
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
    requireAuth(() => {
      const isAlreadyWishlisted = wishlistItems.some((item) => item.id === book.id);
      if (isAlreadyWishlisted) {
        setWishlistItems((prev) => prev.filter((item) => item.id !== book.id));
        addToast(`Removed "${book.title}" from wishlist`, "info");
      } else {
        setWishlistItems((prev) => [...prev, book]);
        addToast(`Added "${book.title}" to wishlist!`);
      }
    }, "Please sign in to manage your wishlist.");
  };

  // Filter books list
  const filteredBooks = books.filter((book) => {
    const matchesCategory =
      activeCategory === "All Collections" || book.category === activeCategory;
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesWishlist = !isFilterWishlistOnly || wishlistItems.some((item) => item.id === book.id);

    return matchesCategory && matchesSearch && matchesWishlist;
  });

  const arrivalsRef = React.useRef(null);
  
  const scrollArrivals = (direction) => {
    if (arrivalsRef.current) {
      const scrollAmount = 320;
      arrivalsRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const newArrivals = [...books]
    .sort((a, b) => b.publishYear - a.publishYear)
    .slice(0, 10);

  const curations = [
    {
      id: "cur-1",
      title: "Cosmic Odyssey",
      description: "Explore the universe",
      booksCount: 128,
      category: "Sci-Fi & Cyberpunk",
      bgImage: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "cur-2",
      title: "Cyberpunk Realms",
      description: "Neon futures await",
      booksCount: 96,
      category: "Sci-Fi & Cyberpunk",
      bgImage: "https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "cur-3",
      title: "Philosophical Depths",
      description: "Wisdom timeless",
      booksCount: 64,
      category: "Philosophy & Deep Thoughts",
      bgImage: "https://images.unsplash.com/photo-1608155686393-8fdd966d784d?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "cur-4",
      title: "Epic Fantasies",
      description: "Legends reborn",
      booksCount: 112,
      category: "Fantasy & Mythology",
      bgImage: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80"
    }
  ];

  const handleOpenWishlistFilter = () => {
    requireAuth(() => {
      setIsFilterWishlistOnly((prev) => {
        const targetState = !prev;
        if (targetState) {
          addToast("Showing wishlisted volumes", "info");
        } else {
          addToast("Showing all volumes", "info");
        }
        return targetState;
      });
      setTimeout(() => {
        document.getElementById("catalog-section")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }, "Please sign in to view your wishlist.");
  };

  // Scroll smooth helper
  const handleScrollToQuiz = () => {
    requireAuth(() => {
      const el = document.getElementById("book-matcher-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        addToast("Aligned matching scanner initialized", "info");
      }
    }, "Please sign in to access the Book Matcher.");
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
        onOpenCart={() => requireAuth(() => setIsCartOpen(true), "Please sign in to view your cart.")}
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
        user={user}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onOpenAchievements={() => requireAuth(() => setIsAchievementsOpen(true), "Please sign in to view your milestones.")}
      />

      {/* Main App Workspace */}
      <div className="app-workspace">
        {/* Main Page Content */}
        <main className="main-content">
        {/* Slides / Hero Section */}
        <HeroSlider books={books} onOpenBook={setSelectedBook} theme={theme} />

        {/* Curated for Your Journey Section */}
        <section className="curated-section">
          <div className="curated-header">
            <h2 className="curated-header-title">
              <span style={{ color: "var(--accent-primary)" }}>✦</span> Curated for Your Journey
            </h2>
            <a 
              className="curated-link" 
              onClick={() => {
                setActiveCategory("All Collections");
                setIsFilterWishlistOnly(false);
                const catalogEl = document.getElementById("catalog-section");
                if (catalogEl) catalogEl.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span>View All Collections</span>
              <Compass size={14} style={{ transform: "rotate(45deg)" }} />
            </a>
          </div>

          <div className="curated-grid">
            {curations.map((cur) => (
              <div 
                key={cur.id} 
                className="curated-card"
                style={{ backgroundImage: `url(${cur.bgImage})` }}
                onClick={() => {
                  setActiveCategory(cur.category);
                  setIsFilterWishlistOnly(false);
                  const catalogEl = document.getElementById("catalog-section");
                  if (catalogEl) catalogEl.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <div className="curated-card-content">
                  <div className="curated-card-top">
                    <h3>{cur.title}</h3>
                    <p>{cur.description}</p>
                  </div>
                  <div className="curated-card-bottom">
                    {cur.booksCount} Books
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* New Arrivals Section */}
        <section className="arrivals-section">
          <div className="arrivals-header">
            <div className="arrivals-title-wrapper">
              <span className="arrivals-badge">NEW</span>
              <h2 className="curated-header-title" style={{ margin: 0 }}>New Arrivals</h2>
            </div>
            <div className="arrivals-controls">
              <button className="arrivals-btn" onClick={() => scrollArrivals("left")}>
                <ChevronLeft size={18} />
              </button>
              <button className="arrivals-btn" onClick={() => scrollArrivals("right")}>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="arrivals-carousel-container" ref={arrivalsRef}>
            {newArrivals.map((book) => (
              <div 
                key={book.id} 
                className="arrivals-card"
                onClick={() => setSelectedBook(book)}
              >
                <div className="arrivals-cover-wrapper">
                  <img src={book.image || "/covers/default.png"} alt={book.title} />
                </div>
                <div className="arrivals-info">
                  <h3 className="arrivals-book-title">{book.title}</h3>
                  <p className="arrivals-book-author">{book.author}</p>
                  <div className="arrivals-rating">
                    <Star size={12} fill="currentColor" />
                    <span>{book.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Catalog Section Header */}
        <div id="catalog-section" style={{ maxWidth: "1200px", margin: "4rem auto 0 auto", padding: "0 2rem" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
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
              <h2 className="font-serif catalog-title" style={{ fontSize: "2.4rem", fontWeight: "800" }}>
                {isFilterWishlistOnly ? "Reserved Sanctuary Volumes" : "Explore Our Collections"}
              </h2>
            </div>

            {/* Custom Responsive Collections Selector */}
            <div className="collections-selector-container">
              {/* Desktop view: Horizontal scrolling pills */}
              <div className="desktop-collections-toggles hide-scrollbar">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      setIsFilterWishlistOnly(false);
                    }}
                    className={activeCategory === cat && !isFilterWishlistOnly ? "btn-primary" : "btn-secondary"}
                    style={{
                      padding: "0.5rem 1.25rem",
                      fontSize: "0.85rem",
                      borderRadius: "20px",
                      flexShrink: 0
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
                      padding: "0.5rem 1.25rem",
                      fontSize: "0.85rem",
                      borderRadius: "20px",
                      flexShrink: 0,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.4rem"
                    }}
                  >
                    <Heart size={14} fill={isFilterWishlistOnly ? "currentColor" : "none"} style={{ color: isFilterWishlistOnly ? "#fff" : "var(--accent-secondary)" }} />
                    <span>Wishlisted ({wishlistItems.length})</span>
                  </button>
                )}
              </div>

              {/* Mobile view: Advanced Dropdown Selector */}
              <div className="mobile-collections-dropdown">
                <AdvancedDropdown
                  categories={categories}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                  isFilterWishlistOnly={isFilterWishlistOnly}
                  setIsFilterWishlistOnly={setIsFilterWishlistOnly}
                  wishlistItems={wishlistItems}
                  booksData={books}
                />
              </div>
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
                <h3 className="no-results-title" style={{ fontSize: "1.2rem", fontWeight: "700" }}>No matching archives located</h3>
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
            books={books}
            onOpenBook={setSelectedBook}
            onAddToCart={handleAddToCart}
            user={user}
            onOpenAuth={() => setIsAuthModalOpen(true)}
            onQuizComplete={() => unlockMilestone("alignmentSynced")}
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
        <span className="font-serif footer-title" style={{ fontSize: "1.2rem", fontWeight: "700", color: "var(--text-primary)" }}>
          Lumina Books • Sanctuary of Letters
        </span>
        <p className="footer-desc" style={{ maxWidth: "420px", margin: "0 auto", lineHeight: "1.6" }}>
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
            user={user}
            onAddReview={handleAddReview}
            onReadSample={() => unlockMilestone("sampleRead")}
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

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
      />

      {/* Interactive Ambient Soundscape Player */}
      <AmbientPlayer />

      {/* Curator Milestone Achievements Modal */}
      <CuratorAchievementsModal
        isOpen={isAchievementsOpen}
        onClose={() => setIsAchievementsOpen(false)}
        achievements={achievements}
        addToast={addToast}
      />
    </div>
  );
}
