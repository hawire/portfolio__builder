import { useState } from "react";
import { usePortfolioStore } from "../../store/portfolioStore";
import { compressImage } from "../../utils/imageCompression";
import { IconUser, IconTrash, IconPlus, IconMapPin, IconMail } from "../common/Icons";

export default function UserInfoForm() {
  const user = usePortfolioStore((state) => state.user);
  const updateUser = usePortfolioStore((state) => state.updateUser);
  const updateProfilePicture = usePortfolioStore((state) => state.updateProfilePicture);
  const removeProfilePicture = usePortfolioStore((state) => state.removeProfilePicture);

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg("");
    setIsProcessing(true);
    try {
      const compressedDataUrl = await compressImage(file, 360, 0.82);
      updateProfilePicture(compressedDataUrl);
    } catch (err) {
      console.error(err);
      setErrorMsg("Unable to process image. Please try a different photo.");
    } finally {
      setIsProcessing(false);
      if (e.target) e.target.value = "";
    }
  };

  return (
    <div style={{ marginBottom: "26px" }}>
      <h3 style={{ fontSize: "1rem", fontWeight: "700", color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
        <IconUser size={16} style={{ color: "var(--brand-primary)" }} />
        Personal & Profile Information
      </h3>

      {/* Avatar Management Card */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
          padding: "16px",
          borderRadius: "var(--radius-md)",
          backgroundColor: "var(--bg-surface-elevated)",
          border: "1px solid var(--border-subtle)",
          marginBottom: "16px",
        }}
      >
        <div style={{ position: "relative" }}>
          {user.profilePicture ? (
            <img
              src={user.profilePicture}
              alt="Profile preview"
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid var(--brand-primary)",
                boxShadow: "0 0 14px rgba(229, 70, 131, 0.3)",
              }}
            />
          ) : (
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "50%",
                backgroundColor: "var(--bg-surface)",
                border: "2px dashed var(--border-medium)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-muted)",
              }}
            >
              <IconUser size={30} />
            </div>
          )}
        </div>

        <div style={{ flex: 1 }}>
          <label className="input-label" style={{ marginBottom: "4px" }}>Profile Photo</label>
          <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "8px" }}>
            Recommended: Square JPG or PNG. Automatically optimized for web performance.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            <label
              className="btn-secondary"
              style={{
                padding: "6px 14px",
                fontSize: "0.82rem",
                cursor: isProcessing ? "wait" : "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <IconPlus size={14} />
              <span>{isProcessing ? "Optimizing..." : user.profilePicture ? "Change Photo" : "Upload Photo"}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                onClick={(e) => {
                  e.target.value = null;
                }}
                disabled={isProcessing}
                style={{ display: "none" }}
              />
            </label>

            {user.profilePicture && (
              <button
                type="button"
                onClick={removeProfilePicture}
                className="btn-danger"
                style={{ padding: "6px 12px", fontSize: "0.82rem" }}
              >
                <IconTrash size={13} />
                <span>Remove</span>
              </button>
            )}
          </div>

          {errorMsg && (
            <p style={{ color: "#ef4444", fontSize: "0.78rem", marginTop: "6px" }}>{errorMsg}</p>
          )}
        </div>
      </div>

      {/* Name and Title Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px", marginBottom: "12px" }}>
        <div>
          <label htmlFor="user-name" className="input-label">Full Name</label>
          <input
            id="user-name"
            className="input-field"
            placeholder="e.g. Alex Morgan"
            value={user.name || ""}
            onChange={(e) => updateUser("name", e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="user-title" className="input-label">Professional Headline</label>
          <input
            id="user-title"
            className="input-field"
            placeholder="e.g. Senior Software Engineer & Architect"
            value={user.title || ""}
            onChange={(e) => updateUser("title", e.target.value)}
          />
        </div>
      </div>

      {/* Location and Email Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px", marginBottom: "12px" }}>
        <div>
          <label htmlFor="user-location" className="input-label" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <IconMapPin size={12} /> Location
          </label>
          <input
            id="user-location"
            className="input-field"
            placeholder="e.g. San Francisco, CA or Remote"
            value={user.location || ""}
            onChange={(e) => updateUser("location", e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="user-email" className="input-label" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <IconMail size={12} /> Contact Email
          </label>
          <input
            id="user-email"
            type="email"
            className="input-field"
            placeholder="e.g. alex@example.com"
            value={user.email || ""}
            onChange={(e) => updateUser("email", e.target.value)}
          />
        </div>
      </div>

      {/* Bio / About */}
      <div>
        <label htmlFor="user-bio" className="input-label">About & Executive Summary</label>
        <textarea
          id="user-bio"
          className="input-field"
          rows={3}
          placeholder="Brief summary of your professional expertise, passions, and achievements..."
          value={user.bio || ""}
          onChange={(e) => updateUser("bio", e.target.value)}
          style={{ resize: "vertical" }}
        />
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "4px" }}>
          <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
            {(user.bio || "").length} characters
          </span>
        </div>
      </div>
    </div>
  );
}
