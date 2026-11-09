import { usePortfolioStore } from "../../store/portfolioStore";
import { IconMapPin, IconMail } from "../common/Icons";

export default function ProfileHeader() {
  const user = usePortfolioStore((state) => state.user);
  const template = usePortfolioStore((state) => state.template);
  const accentColor = usePortfolioStore((state) => state.accentColor) || "var(--brand-primary)";

  const isMinimal = template === "minimal";
  const isModern = template === "modern";
  const isCreative = template === "creative";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "24px",
        flexWrap: "wrap",
        marginBottom: isMinimal ? "28px" : "20px",
      }}
      className="profile-header-wrap"
    >
      {/* Profile Picture */}
      {user.profilePicture ? (
        <img
          src={user.profilePicture}
          alt={user.name || "Profile"}
          style={{
            width: isMinimal ? "90px" : "110px",
            height: isMinimal ? "90px" : "110px",
            borderRadius: isCreative ? "18px" : "50%",
            objectFit: "cover",
            border: isModern ? `3px solid ${accentColor}` : isMinimal ? "2px solid var(--border-medium)" : `3px solid ${accentColor}`,
            boxShadow: isModern ? `0 0 20px rgba(229, 70, 131, 0.35)` : "var(--shadow-md)",
            flexShrink: 0,
          }}
        />
      ) : (
        <div
          style={{
            width: isMinimal ? "80px" : "100px",
            height: isMinimal ? "80px" : "100px",
            borderRadius: isCreative ? "18px" : "50%",
            backgroundColor: "var(--brand-subtle)",
            border: `2px dashed ${accentColor}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: accentColor,
            fontWeight: "800",
            fontSize: "1.8rem",
            flexShrink: 0,
          }}
        >
          {(user.name || "U").charAt(0).toUpperCase()}
        </div>
      )}

      {/* Profile Details */}
      <div style={{ flex: 1, minWidth: "220px" }}>
        <h1
          style={{
            margin: 0,
            fontSize: isMinimal ? "1.85rem" : "2.1rem",
            fontWeight: isMinimal ? "600" : "800",
            letterSpacing: "-0.03em",
            color: "var(--text-primary)",
            lineHeight: "1.2",
          }}
        >
          {user.name || "Your Name"}
        </h1>

        <h2
          style={{
            margin: "6px 0 10px 0",
            fontWeight: "600",
            fontSize: "1.05rem",
            color: accentColor,
            letterSpacing: "-0.01em",
          }}
        >
          {user.title || "Your Professional Title"}
        </h2>

        {user.bio && (
          <p
            style={{
              margin: 0,
              fontSize: "0.92rem",
              lineHeight: "1.65",
              color: "var(--text-secondary)",
              maxWidth: "680px",
            }}
          >
            {user.bio}
          </p>
        )}

        {/* Location & Email Badges */}
        {(user.location || user.email) && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              marginTop: "10px",
              fontSize: "0.8rem",
              color: "var(--text-muted)",
            }}
          >
            {user.location && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                <IconMapPin size={13} /> {user.location}
              </span>
            )}
            {user.email && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                <IconMail size={13} /> {user.email}
              </span>
            )}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 540px) {
          .profile-header-wrap {
            flex-direction: column !important;
            text-align: center !important;
            align-items: center !important;
          }
          .profile-header-wrap div {
            align-items: center !important;
          }
        }
      `}</style>
    </div>
  );
}
