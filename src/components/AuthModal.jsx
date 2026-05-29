import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, Mail, User, ShieldCheck } from "lucide-react";

export default function AuthModal({ isOpen, onClose, onLogin }) {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || (!isLoginView && !name)) {
      setError("Please fill in all requested fields.");
      return;
    }

    if (password.length < 6) {
      setError("Security credentials must be at least 6 characters.");
      return;
    }

    // Call success handler
    const mockUser = {
      name: isLoginView ? (email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1)) : name,
      email: email,
      token: "mock-jwt-auth-token-12948"
    };

    onLogin(mockUser);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="auth-overlay-container">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="auth-backdrop"
          />

          {/* Centered Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="auth-modal-card glass"
          >
            {/* Close Button */}
            <button onClick={onClose} className="auth-close-btn">
              <X size={18} />
            </button>

            <div className="auth-split-layout">
              {/* Left Side: Editorial Art (Only visible on desktop) */}
              <div
                className="auth-artwork-side"
                style={{
                  backgroundImage: "linear-gradient(to right, rgba(20, 16, 12, 0.4), rgba(20, 16, 12, 0.85)), url('/cozy_bookstore_bg.png')"
                }}
              >
                <div className="auth-artwork-content">
                  <span className="auth-artwork-tag">Lumina Sanctuary</span>
                  <h3 className="font-serif auth-artwork-quote">
                    "A room without books is like a body without a soul."
                  </h3>
                  <span className="auth-artwork-author">— Cicero</span>
                </div>
              </div>

              {/* Right Side: Interactive Authentication Form */}
              <div className="auth-form-side">
                <div style={{ width: "100%", maxWidth: "340px" }}>
                  <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
                    <h2 className="font-serif" style={{ fontSize: "1.8rem", fontWeight: "800", color: "var(--text-primary)" }}>
                      {isLoginView ? "Welcome Back" : "Create Account"}
                    </h2>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.4rem" }}>
                      {isLoginView ? "Access your personalized literary catalog" : "Join the exclusive circle of book curators"}
                    </p>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="auth-error-box"
                    >
                      <span>{error}</span>
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {!isLoginView && (
                      <div className="auth-input-group">
                        <User size={16} className="auth-input-icon" />
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="auth-field-input"
                        />
                      </div>
                    )}

                    <div className="auth-input-group">
                      <Mail size={16} className="auth-input-icon" />
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="auth-field-input"
                      />
                    </div>

                    <div className="auth-input-group">
                      <Lock size={16} className="auth-input-icon" />
                      <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="auth-field-input"
                      />
                    </div>

                    <button type="submit" className="btn-primary" style={{ width: "100%", padding: "0.75rem", fontSize: "0.95rem", borderRadius: "10px", marginTop: "0.5rem" }}>
                      {isLoginView ? "Log In" : "Sign Up"}
                    </button>
                  </form>

                  <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
                    <button
                      onClick={() => {
                        setIsLoginView(!isLoginView);
                        setError("");
                      }}
                      className="auth-toggle-link"
                    >
                      {isLoginView ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
