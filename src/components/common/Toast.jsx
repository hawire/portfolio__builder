import { useEffect } from "react";
import { IconCheck, IconClose } from "./Icons";

export default function Toast({ message, isVisible, onClose, duration = 3000 }) {
  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="glass-panel animate-fade-in"
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 90,
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "12px 18px",
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--border-medium)",
        boxShadow: "var(--shadow-lg)",
        backgroundColor: "var(--bg-surface)",
      }}
    >
      <div
        style={{
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          backgroundColor: "var(--brand-subtle)",
          color: "var(--brand-primary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconCheck size={14} />
      </div>
      <span style={{ fontSize: "0.9rem", fontWeight: "500", color: "var(--text-primary)" }}>
        {message}
      </span>
      <button
        onClick={onClose}
        className="btn-ghost"
        style={{ padding: "4px", marginLeft: "6px", color: "var(--text-muted)" }}
        aria-label="Dismiss message"
      >
        <IconClose size={14} />
      </button>
    </div>
  );
}
