import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Award, CheckCircle2, Lock, Copy, Sparkles, User, BookOpen, Heart, ShoppingBag, MessageSquare } from "lucide-react";

export default function CuratorAchievementsModal({
  isOpen,
  onClose,
  achievements,
  addToast
}) {
  const totalAchievements = Object.keys(achievements).length;
  const completedCount = Object.values(achievements).filter(Boolean).length;
  const progressPercent = (completedCount / totalAchievements) * 100;

  // Coupon definitions based on completion thresholds
  const couponRewards = [
    { threshold: 2, code: "SCHOLAR20", discount: "20% Off", desc: "Unlock at least 2 milestones" },
    { threshold: 4, code: "BIBLIOPHILE25", discount: "25% Off", desc: "Unlock at least 4 milestones" },
    { threshold: 6, code: "SAGE35", discount: "35% Off", desc: "Complete all 6 milestones" }
  ];

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    addToast(`Coupon "${code}" copied to clipboard!`, "success");
  };

  const achievementList = [
    {
      key: "profileActivated",
      title: "Sanctuary Initiate",
      desc: "Create or enter a curator account.",
      icon: <User size={20} />,
      color: "#a855f7"
    },
    {
      key: "alignmentSynced",
      title: "Algorithmic Alignment",
      desc: "Initiate and complete the Book Matcher quiz.",
      icon: <Sparkles size={20} />,
      color: "#6366f1"
    },
    {
      key: "sampleRead",
      title: "Scholar's Preview",
      desc: "Explore the internal pages of a sample text.",
      icon: <BookOpen size={20} />,
      color: "#f59e0b"
    },
    {
      key: "curatedWishlist",
      title: "Sanctuary Registry",
      desc: "Reserve 2 or more books in your wishlist.",
      icon: <Heart size={20} />,
      color: "#ec4899"
    },
    {
      key: "manifestPrepared",
      title: "Curator's Intent",
      desc: "Add at least 1 volume to your acquisition cart.",
      icon: <ShoppingBag size={20} />,
      color: "#10b981"
    },
    {
      key: "reviewWritten",
      title: "Literary Critic",
      desc: "Submit a review on any volume.",
      icon: <MessageSquare size={20} />,
      color: "#ef4444"
    }
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          backdropFilter: "blur(12px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 150,
          padding: "1.5rem"
        }}
      >
        <motion.div
          initial={{ scale: 0.93, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.93, y: 30, opacity: 0 }}
          transition={{ type: "spring", stiffness: 250, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
          className="glass"
          style={{
            width: "100%",
            maxWidth: "680px",
            maxHeight: "85vh",
            borderRadius: "var(--radius-lg)",
            overflowY: "auto",
            padding: "2.5rem 2rem",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
            position: "relative"
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "1.25rem",
              right: "1.25rem",
              cursor: "pointer",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              backgroundColor: "var(--bg-secondary)",
              border: "1px solid var(--border-color)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--text-primary)",
              transition: "var(--transition-fast)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--bg-tertiary)";
              e.currentTarget.style.borderColor = "var(--accent-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
              e.currentTarget.style.borderColor = "var(--border-color)";
            }}
          >
            <X size={20} />
          </button>

          {/* Title Header */}
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
                color: "#ffffff",
                padding: "0.8rem",
                borderRadius: "50%",
                marginBottom: "0.75rem",
                boxShadow: "0 8px 20px rgba(var(--accent-rgb), 0.3)"
              }}
            >
              <Award size={28} />
            </div>
            <h2 className="font-serif" style={{ fontSize: "2rem", fontWeight: "800", color: "var(--text-primary)" }}>
              Curator Milestones
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", maxWidth: "440px", margin: "0.25rem auto 0 auto" }}>
              Interact with the Lumina Sanctuary archives, unlock scholarly achievements, and earn exclusive acquisitions discounts.
            </p>
          </div>

          {/* Progress Bar Display */}
          <div
            style={{
              backgroundColor: "var(--bg-secondary)",
              border: "1px solid var(--border-color)",
              padding: "1.25rem",
              borderRadius: "var(--radius-md)",
              marginBottom: "2rem"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
              <span style={{ fontSize: "0.85rem", fontWeight: "700", color: "var(--text-primary)" }}>
                Registry Alignment Progress
              </span>
              <span style={{ fontSize: "0.85rem", fontWeight: "800", color: "var(--accent-primary)" }}>
                {completedCount} / {totalAchievements} Milestones ({Math.round(progressPercent)}%)
              </span>
            </div>
            <div style={{ width: "100%", height: "8px", backgroundColor: "var(--bg-tertiary)", borderRadius: "4px", overflow: "hidden" }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{
                  height: "100%",
                  background: "linear-gradient(to right, var(--accent-primary), var(--accent-secondary))",
                  borderRadius: "4px"
                }}
              />
            </div>
          </div>

          {/* Grid of Milestones */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }} className="achievements-grid">
            {achievementList.map((item) => {
              const isCompleted = !!achievements[item.key];
              return (
                <div
                  key={item.key}
                  className="glass-card"
                  style={{
                    padding: "1.25rem",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "1rem",
                    border: isCompleted ? `1px solid ${item.color}50` : "1px solid var(--border-color)",
                    backgroundColor: isCompleted ? `${item.color}05` : "var(--card-bg)",
                    opacity: isCompleted ? 1 : 0.75
                  }}
                >
                  <div
                    style={{
                      padding: "0.5rem",
                      borderRadius: "10px",
                      backgroundColor: isCompleted ? `${item.color}15` : "var(--bg-tertiary)",
                      color: isCompleted ? item.color : "var(--text-muted)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0
                    }}
                  >
                    {item.icon}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem", minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      <span
                        style={{
                          fontSize: "0.9rem",
                          fontWeight: "750",
                          color: isCompleted ? "var(--text-primary)" : "var(--text-muted)",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis"
                        }}
                      >
                        {item.title}
                      </span>
                      {isCompleted ? (
                        <CheckCircle2 size={13} style={{ color: item.color, flexShrink: 0 }} />
                      ) : (
                        <Lock size={11} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
                      )}
                    </div>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", lineHeight: "1.4" }}>
                      {item.desc}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Coupon rewards section */}
          <div>
            <h3 className="font-serif" style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "1rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem" }}>
              Scholarly Rewards
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {couponRewards.map((reward) => {
                const isUnlocked = completedCount >= reward.threshold;
                return (
                  <div
                    key={reward.code}
                    className="glass-card"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "1rem 1.25rem",
                      border: isUnlocked ? "1px solid rgba(16, 185, 129, 0.3)" : "1px solid var(--border-color)",
                      backgroundColor: isUnlocked ? "rgba(16, 185, 129, 0.03)" : "var(--card-bg)"
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ fontSize: "0.95rem", fontWeight: "750", color: isUnlocked ? "var(--text-primary)" : "var(--text-muted)" }}>
                          {reward.discount} Coupon
                        </span>
                        {isUnlocked && (
                          <span style={{ fontSize: "0.65rem", backgroundColor: "rgba(16, 185, 129, 0.15)", color: "#10b981", padding: "0.15rem 0.4rem", borderRadius: "4px", fontWeight: "800", textTransform: "uppercase" }}>
                            Unlocked
                          </span>
                        )}
                      </div>
                      <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.15rem" }}>
                        {reward.desc}
                      </p>
                    </div>

                    {isUnlocked ? (
                      <button
                        onClick={() => handleCopyCode(reward.code)}
                        className="btn-secondary"
                        style={{
                          padding: "0.4rem 0.85rem",
                          fontSize: "0.75rem",
                          borderRadius: "6px",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.4rem",
                          border: "1px solid rgba(16, 185, 129, 0.2)",
                          color: "#10b981"
                        }}
                      >
                        <span style={{ fontFamily: "monospace", fontWeight: "bold" }}>{reward.code}</span>
                        <Copy size={12} />
                      </button>
                    ) : (
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.3rem",
                          color: "var(--text-muted)",
                          fontSize: "0.75rem",
                          fontWeight: "600",
                          backgroundColor: "var(--bg-tertiary)",
                          padding: "0.4rem 0.85rem",
                          borderRadius: "6px"
                        }}
                      >
                        <Lock size={12} />
                        <span>Locked</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        <style>{`
          @media (max-width: 600px) {
            .achievements-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
}
