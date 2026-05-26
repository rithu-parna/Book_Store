import React from "react";

export default function GlobalBg({ theme }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -10,
        pointerEvents: "none",
        overflow: "hidden",
        backgroundColor: theme === "dark" ? "#000000" : "#faf6f0",
        transition: "background-color 0.8s ease"
      }}
    />
  );
}
