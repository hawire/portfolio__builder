import { usePortfolioStore } from "../../store/portfolioStore";

export default function ProfileHeader() {
  const user = usePortfolioStore((state) => state.user);

  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "20px", gap: "15px" }}>
      {user.profilePicture && (
        <img
          src={user.profilePicture}
          alt="Profile"
          style={{ width: "135px", height: "135px", borderRadius: "50%", objectFit: "cover", border: "2px solid #0070f3" }}
        />
      )}

      <div>
        <h1 style={{ margin: 0 }}>{user.name}</h1>
        <h2 style={{ margin: 0, fontWeight: "normal", fontSize: "16px", color: "#555" }}>{user.title}</h2>
      </div>
    </div>
  );
}
