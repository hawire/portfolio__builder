import { usePortfolioStore } from "../../store/portfolioStore";

export default function SkillsList() {
  const skills = usePortfolioStore((state) => state.skills);
  const template = usePortfolioStore((state) => state.template);
  const accentColor = usePortfolioStore((state) => state.accentColor) || "var(--brand-primary)";

  if (!skills || skills.length === 0) {
    return (
      <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0, fontStyle: "italic" }}>
        No skills added yet. Add your technical stack in the editor.
      </p>
    );
  }

  const isMinimal = template === "minimal";
  const isModern = template === "modern";
  const isCreative = template === "creative";

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", margin: 0 }}>
      {skills.map((skill, index) => {
        const sId = skill.id || index;
        const sName = typeof skill === "object" ? skill.name : skill;

        let chipStyle = {
          display: "inline-flex",
          alignItems: "center",
          padding: "6px 14px",
          borderRadius: isCreative ? "6px" : "var(--radius-full)",
          fontSize: "0.85rem",
          fontWeight: "600",
          transition: "all var(--transition-fast)",
        };

        if (isMinimal) {
          chipStyle = {
            ...chipStyle,
            backgroundColor: "transparent",
            border: "1px solid var(--border-medium)",
            color: "var(--text-primary)",
          };
        } else if (isModern) {
          chipStyle = {
            ...chipStyle,
            backgroundColor: "rgba(229, 70, 131, 0.12)",
            border: `1px solid ${accentColor}`,
            color: "var(--brand-secondary)",
            boxShadow: "0 0 10px rgba(229, 70, 131, 0.1)",
          };
        } else {
          // Default & Creative & Executive
          chipStyle = {
            ...chipStyle,
            backgroundColor: "var(--bg-surface-elevated)",
            border: "1px solid var(--border-subtle)",
            color: "var(--text-primary)",
          };
        }

        return (
          <span key={sId} style={chipStyle}>
            {sName}
          </span>
        );
      })}
    </div>
  );
}
