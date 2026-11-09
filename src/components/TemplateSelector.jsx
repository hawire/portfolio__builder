import { usePortfolioStore } from "../store/portfolioStore";
import { IconCheck, IconSparkles } from "./common/Icons";

const TEMPLATES = [
  {
    id: "default",
    name: "Modern Classic",
    badge: "Most Popular",
    desc: "Balanced card hierarchy with refined pink accents. Great for generalists & full-stack engineers.",
    previewColor: "#E54683",
    layoutType: "Grid Cards",
  },
  {
    id: "minimal",
    name: "Minimalist Editorial",
    badge: "Clean & Spacious",
    desc: "Typography-focused layout with sleek hairline borders. Clean, elegant, and distraction-free.",
    previewColor: "#94a3b8",
    layoutType: "Single Column",
  },
  {
    id: "modern",
    name: "Tech Vanguard",
    badge: "Developer Focus",
    desc: "Cyberpunk/developer glass cards with neon pink gradients and terminal-styled badges.",
    previewColor: "#6366f1",
    layoutType: "Dark Glass",
  },
  {
    id: "creative",
    name: "Creative Studio",
    badge: "Design & Art",
    desc: "Expressive visual hierarchy with dynamic spacing, bold headings, and stylized showcase cards.",
    previewColor: "#ec4899",
    layoutType: "Asymmetric",
  },
  {
    id: "executive",
    name: "Executive Pro",
    badge: "Corporate & PM",
    desc: "Formal structured metadata, timeline alignment, and crisp badges for leaders and consultants.",
    previewColor: "#0284c7",
    layoutType: "Structured",
  },
];

export default function TemplateSelector() {
  const template = usePortfolioStore((state) => state.template);
  const setTemplate = usePortfolioStore((state) => state.setTemplate);

  return (
    <div style={{ marginBottom: "28px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
        <div>
          <h3 style={{ fontSize: "1rem", fontWeight: "700", color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "8px" }}>
            <IconSparkles size={16} style={{ color: "var(--brand-primary)" }} />
            Select Portfolio Template
          </h3>
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "2px" }}>
            Switch layouts instantly while preserving all entered content.
          </p>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
          gap: "12px",
        }}
      >
        {TEMPLATES.map((tmpl) => {
          const isSelected = template === tmpl.id;
          return (
            <button
              key={tmpl.id}
              type="button"
              onClick={() => setTemplate(tmpl.id)}
              className="card-hover-glow"
              style={{
                textAlign: "left",
                padding: "14px",
                borderRadius: "var(--radius-md)",
                backgroundColor: isSelected ? "var(--bg-surface-hover)" : "var(--bg-surface)",
                border: isSelected
                  ? "2px solid var(--brand-primary)"
                  : "1px solid var(--border-medium)",
                cursor: "pointer",
                position: "relative",
                transition: "all var(--transition-fast)",
                boxShadow: isSelected ? "0 0 16px rgba(229, 70, 131, 0.25)" : "none",
              }}
            >
              {/* Active Indicator Checkmark */}
              {isSelected && (
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    backgroundColor: "var(--brand-primary)",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconCheck size={12} />
                </div>
              )}

              {/* Mini Template Visual Preview Wireframe */}
              <div
                style={{
                  height: "56px",
                  borderRadius: "6px",
                  backgroundColor: "var(--bg-app)",
                  border: "1px solid var(--border-subtle)",
                  marginBottom: "10px",
                  padding: "6px 8px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  overflow: "hidden",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: "16px", height: "16px", borderRadius: "50%", backgroundColor: tmpl.previewColor }} />
                  <div style={{ height: "6px", width: "45%", borderRadius: "3px", backgroundColor: isSelected ? "var(--brand-primary)" : "var(--border-strong)" }} />
                </div>
                <div style={{ display: "flex", gap: "4px" }}>
                  <div style={{ height: "14px", flex: 1, borderRadius: "3px", backgroundColor: "var(--border-subtle)" }} />
                  <div style={{ height: "14px", flex: 1, borderRadius: "3px", backgroundColor: "var(--border-subtle)" }} />
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                <span style={{ fontWeight: "700", fontSize: "0.9rem", color: isSelected ? "var(--brand-primary)" : "var(--text-primary)" }}>
                  {tmpl.name}
                </span>
              </div>

              <span
                style={{
                  display: "inline-block",
                  fontSize: "0.7rem",
                  fontWeight: "600",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  backgroundColor: isSelected ? "var(--brand-subtle)" : "var(--bg-surface-elevated)",
                  color: isSelected ? "var(--brand-secondary)" : "var(--text-muted)",
                  marginBottom: "6px",
                }}
              >
                {tmpl.badge}
              </span>

              <p style={{ fontSize: "0.76rem", color: "var(--text-muted)", lineHeight: "1.4", margin: 0 }}>
                {tmpl.desc}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
