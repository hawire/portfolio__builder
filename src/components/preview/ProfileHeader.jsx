import { usePortfolioStore } from "../../store/portfolioStore";

export default function ProfileHeader() {
  const user = usePortfolioStore((state) => state.user);

  return (
    <div style={{ display: "flex", alignItems: "flex-start", marginBottom: "20px", gap: "15px" }}>
      {/* Profile Picture */}
      {user.profilePicture && (
        <img
          src={user.profilePicture}
          alt="Profile"
          style={{
            width: "135px",
            height: "135px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid #0070f3",
          }}
        />
      )}

      {/* Name, Title, Bio */}
      <div>
        <h1 style={{ margin: 0 }}>{user.name || "Your Name"}</h1>
        <h2 style={{ margin: "4px 0", fontWeight: "normal", fontSize: "16px", color: "#555" }}>
          {user.title || "Your Title"}
        </h2>

        {/* Bio */}
        {user.bio && (
          <p style={{ marginTop: "8px", fontSize: "14px", color: "#333", lineHeight: "1.4" }}>
            {user.bio}
          </p>
        )}
      </div>
    </div>
  );
}
