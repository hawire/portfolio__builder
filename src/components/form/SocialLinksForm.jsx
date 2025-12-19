import { usePortfolioStore } from "../../store/portfolioStore";

export default function SocialLinksForm() {
  const socials = usePortfolioStore((state) => state.socials);
  const updateSocial = usePortfolioStore((state) => state.updateSocial);

  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>Social Links</h3>

      <input
        placeholder="GitHub URL"
        value={socials.github}
        onChange={(e) => updateSocial("github", e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />

      <input
        placeholder="LinkedIn URL"
        value={socials.linkedin}
        onChange={(e) => updateSocial("linkedin", e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
    </div>
  );
}
