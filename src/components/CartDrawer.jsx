import React, { useState } from "react";
import { X, Trash2, ShoppingCart, Plus, Minus, Tag, Check, ArrowRight, Loader } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { couponCodes } from "../data/books";

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onClearCart
}) {
  const [couponCode, setCouponCode] = useState("");
  const [activeDiscount, setActiveDiscount] = useState(0); // decimal e.g. 0.20
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState(false);

  const [checkoutStep, setCheckoutStep] = useState(0); // 0: Review, 1: Submitting, 2: Done

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const isFlatDiscount = activeDiscount >= 1.0;
  const discountAmount = isFlatDiscount ? activeDiscount : subtotal * activeDiscount;
  const total = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = () => {
    setCouponError("");
    setCouponSuccess(false);

    const formattedCode = couponCode.trim().toUpperCase();
    const allCoupons = {
      ...couponCodes,
      "SCHOLAR20": 0.20,
      "BIBLIOPHILE25": 0.25,
      "SAGE35": 0.35
    };

    if (allCoupons[formattedCode] !== undefined) {
      setActiveDiscount(allCoupons[formattedCode]);
      setCouponSuccess(true);
    } else {
      setCouponError("Invalid literary coupon");
    }
  };

  const handleCheckout = () => {
    setCheckoutStep(1);
    setTimeout(() => {
      setCheckoutStep(2);
    }, 2500);
  };

  const resetCheckout = () => {
    setCheckoutStep(0);
    onClearCart();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "#000000",
              zIndex: 90
            }}
          />

          {/* Sliding Cart Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="glass"
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "100%",
              maxWidth: "450px",
              zIndex: 95,
              boxShadow: "-10px 0 40px rgba(0,0,0,0.3)",
              display: "flex",
              flexDirection: "column"
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "1.5rem",
                borderBottom: "1px solid var(--border-color)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <ShoppingCart size={20} style={{ color: "var(--accent-primary)" }} />
                <h3 className="font-serif cart-drawer-title" style={{ fontSize: "1.25rem", fontWeight: "700" }}>Your Cart</h3>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: "bold" }}>
                  ({cartItems.length} items)
                </span>
              </div>
              <button
                onClick={onClose}
                style={{
                  cursor: "pointer",
                  padding: "0.5rem",
                  color: "var(--text-primary)",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Switcher depending on Checkout Step */}
            <div style={{ flexGrow: 1, overflowY: "auto", padding: "1.5rem" }}>
              {checkoutStep === 0 && (
                <>
                  {cartItems.length === 0 ? (
                    <div style={{ height: "60%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.5rem", color: "var(--text-muted)" }}>
                      <ShoppingCart size={48} style={{ strokeWidth: 1 }} />
                      <span style={{ fontSize: "0.95rem" }}>Your reading basket is empty.</span>
                      <button onClick={onClose} className="btn-secondary" style={{ fontSize: "0.85rem", padding: "0.5rem 1rem" }}>
                        Browse Sanctuary
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      {cartItems.map((item) => (
                        <motion.div
                          layout
                          key={item.id}
                          style={{
                            display: "flex",
                            gap: "1rem",
                            padding: "0.85rem",
                            borderRadius: "var(--radius-md)",
                            backgroundColor: "var(--bg-secondary)",
                            border: "1px solid var(--border-color)",
                            alignItems: "center"
                          }}
                        >
                          {/* Mini book cover */}
                          <div
                            style={{
                              width: "50px",
                              height: "75px",
                              borderRadius: "4px",
                              background: item.themeColor,
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-between",
                              padding: "0.4rem",
                              color: "#ffffff",
                              fontSize: "0.5rem",
                              border: "1px solid rgba(255, 255, 255, 0.1)",
                              flexShrink: 0,
                              position: "relative"
                            }}
                          >
                            <div
                              style={{
                                position: "absolute",
                                left: 0,
                                top: 0,
                                bottom: 0,
                                width: "4px",
                                background: "linear-gradient(to right, rgba(0,0,0,0.2) 0%, rgba(255,255,255,0.05) 45%, rgba(0,0,0,0.15) 100%)"
                              }}
                            />
                            <span style={{ fontWeight: "bold", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.title}</span>
                            <span style={{ fontSize: "0.4rem", opacity: 0.8 }}>{item.author}</span>
                          </div>

                          {/* Info Column */}
                          <div style={{ flexGrow: 1, minWidth: 0 }}>
                            <h4 className="cart-item-title" style={{ fontSize: "0.9rem", fontWeight: "700", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                              {item.title}
                            </h4>
                            <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                              ${item.price}
                            </p>

                            {/* Quantity buttons */}
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                              <button
                                onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                                style={{
                                  cursor: "pointer",
                                  width: "20px",
                                  height: "20px",
                                  borderRadius: "50%",
                                  backgroundColor: "var(--bg-tertiary)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center"
                                }}
                              >
                                <Minus size={10} />
                              </button>
                              <span style={{ fontSize: "0.85rem", fontWeight: "700", width: "16px", textAlign: "center" }}>
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                                style={{
                                  cursor: "pointer",
                                  width: "20px",
                                  height: "20px",
                                  borderRadius: "50%",
                                  backgroundColor: "var(--bg-tertiary)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center"
                                }}
                              >
                                <Plus size={10} />
                              </button>
                            </div>
                          </div>

                          {/* Delete Item */}
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            style={{
                              cursor: "pointer",
                              color: "var(--text-muted)",
                              padding: "0.5rem"
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.color = "var(--accent-secondary)"}
                            onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-muted)"}
                          >
                            <Trash2 size={16} />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {checkoutStep === 1 && (
                <div style={{ height: "80%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.5rem", textAlign: "center" }}>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    style={{ color: "var(--accent-primary)" }}
                  >
                    <Loader size={48} />
                  </motion.div>
                  <div>
                    <h4 className="cart-checkout-title" style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "0.5rem" }}>
                      Processing Secured Transaction...
                    </h4>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                      Authorizing vaults with Lumina Cryptographic clearance.
                    </p>
                  </div>
                </div>
              )}

              {checkoutStep === 2 && (
                <div style={{ height: "80%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.5rem", textAlign: "center" }}>
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    style={{
                      background: "linear-gradient(135deg, #10b981, #059669)",
                      color: "#ffffff",
                      padding: "1rem",
                      borderRadius: "50%",
                      boxShadow: "0 10px 20px rgba(16,185,129,0.3)"
                    }}
                  >
                    <Check size={48} />
                  </motion.div>
                  <div>
                    <h4 className="font-serif cart-success-title" style={{ fontSize: "1.3rem", fontWeight: "800", marginBottom: "0.5rem" }}>
                      Volumes Cleared!
                    </h4>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", maxWidth: "260px", margin: "0 auto" }}>
                      Your literary acquisitions have been unlocked. Shipping manifests sent to coordinates.
                    </p>
                  </div>
                  <button onClick={resetCheckout} className="btn-primary" style={{ marginTop: "1rem" }}>
                    <span>Browse More Works</span>
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Checkout Panel */}
            {cartItems.length > 0 && checkoutStep === 0 && (
              <div
                style={{
                  padding: "1.5rem",
                  borderTop: "1px solid var(--border-color)",
                  backgroundColor: "var(--bg-secondary)"
                }}
              >
                {/* Coupon Code Section */}
                <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
                  <div style={{ position: "relative", flexGrow: 1 }}>
                    <input
                      type="text"
                      placeholder="Promo Code (e.g. READMORE)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="input-premium"
                      style={{
                        width: "100%",
                        padding: "0.5rem 1rem 0.5rem 2rem",
                        fontSize: "0.8rem",
                        borderRadius: "8px"
                      }}
                    />
                    <Tag size={12} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                  </div>
                  <button
                    onClick={handleApplyCoupon}
                    className="btn-secondary"
                    style={{
                      padding: "0.5rem 1rem",
                      fontSize: "0.8rem",
                      borderRadius: "8px"
                    }}
                  >
                    Apply
                  </button>
                </div>

                {/* Coupon validation messages */}
                {couponError && <p style={{ color: "#ef4444", fontSize: "0.75rem", marginBottom: "1rem", fontWeight: "bold" }}>{couponError}</p>}
                {couponSuccess && (
                  <p style={{ color: "#10b981", fontSize: "0.75rem", marginBottom: "1rem", fontWeight: "bold", display: "flex", alignItems: "center", gap: "2px" }}>
                    <Check size={12} /> Coupon Applied ({isFlatDiscount ? `$${activeDiscount.toFixed(2)} off` : `${(activeDiscount * 100).toFixed(0)}% off`})
                  </p>
                )}

                {/* Subtotals & Final sum */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.25rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    <span>Original Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {activeDiscount > 0 && (
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "#10b981" }}>
                      <span>Discount</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    <span>Shipping Manifest</span>
                    <span style={{ color: "#10b981", fontWeight: "bold" }}>FREE</span>
                  </div>
                  <div className="cart-total-row" style={{ display: "flex", justifyContent: "space-between", fontSize: "1.15rem", fontWeight: "800", color: "var(--text-primary)", borderTop: "1px solid var(--border-color)", paddingTop: "0.5rem", marginTop: "0.25rem" }}>
                    <span>Acquisition Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Trigger */}
                <button
                  onClick={handleCheckout}
                  className="btn-primary"
                  style={{
                    width: "100%",
                    padding: "0.85rem",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem"
                  }}
                >
                  <span>Begin Secure Acquirement</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
