import { useEffect } from "react";
import { IconTrash, IconClose } from "./Icons";

export default function ConfirmationModal({
  isOpen,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmLabel = "Confirm",
  confirmVariant = "danger",
  onConfirm,
  onCancel,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) onCancel();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        backdropFilter: "blur(6px)",
      }}
      onClick={onCancel}
    >
      <div
        className="card-surface animate-fade-in"
        style={{
          width: "100%",
          maxWidth: "440px",
          backgroundColor: "var(--bg-surface)",
          border: "1px solid var(--border-medium)",
          borderRadius: "var(--radius-lg)",
          padding: "24px",
          boxShadow: "var(--shadow-lg)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "rgba(239, 68, 68, 0.12)",
                color: "#ef4444",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconTrash size={20} />
            </div>
            <h3 style={{ fontSize: "1.15rem", fontWeight: "700", color: "var(--text-primary)", margin: 0 }}>
              {title}
            </h3>
          </div>
          <button
            onClick={onCancel}
            className="btn-ghost"
            style={{ padding: "6px", color: "var(--text-muted)" }}
            aria-label="Close dialog"
          >
            <IconClose size={18} />
          </button>
        </div>

        <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: "1.6", marginBottom: "24px" }}>
          {message}
        </p>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          <button onClick={onCancel} className="btn-secondary" style={{ padding: "8px 16px" }}>
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={confirmVariant === "danger" ? "btn-danger" : "btn-primary"}
            style={{ padding: "8px 18px" }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
