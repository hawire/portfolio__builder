import { usePortfolioStore } from "../store/portfolioStore";
import { IconSun, IconMoon, IconPalette } from "./common/Icons";

const ACCENT_COLORS = [
  { name: "Signature Pink", hex: "#E54683" },
  { name: "Violet", hex: "#6366f1" },
  { name: "Ocean Sky", hex: "#0284c7" },
  { name: "Emerald", hex: "#10b981" },
  { name: "Amber", hex: "#f59e0b" },
];

export default function ThemeSwitcher() {
  const theme = usePortfolioStore((state) => state.theme);
  const setTheme = usePortfolioStore((state) => state.setTheme);
  const accentColor = usePortfolioStore((state) => state.accentColor);
  const setAccentColor = usePortfolioStore((state) => state.setAccentColor);

  return (
    <div style={{ marginBottom: "26px", padding: "16px", backgroundColor: "var(--bg-surface-elevated)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
        {/* Mode Toggle */}
        <div>
          <label className="input-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <IconPalette size={14} style={{ color: "var(--brand-primary)" }} />
            Display Appearance
          </label>
          <div
            style={{
              display: "inline-flex",
              padding: "3px",
              borderRadius: "var(--radius-md)",
              backgroundColor: "var(--bg-surface)",
              border: "1px solid var(--border-medium)",
              gap: "4px",
            }}
          >
            <button
              type="button"
              onClick={() => setTheme("dark")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 14px",
                borderRadius: "var(--radius-sm)",
                border: "none",
                fontSize: "0.82rem",
                fontWeight: "600",
                cursor: "pointer",
                backgroundColor: theme === "dark" ? "var(--brand-primary)" : "transparent",
                color: theme === "dark" ? "#ffffff" : "var(--text-secondary)",
                transition: "all var(--transition-fast)",
              }}
            >
              <IconMoon size={14} />
              <span>Dark</span>
            </button>
            <button
              type="button"
              onClick={() => setTheme("light")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 14px",
                borderRadius: "var(--radius-sm)",
                border: "none",
                fontSize: "0.82rem",
                fontWeight: "600",
                cursor: "pointer",
                backgroundColor: theme === "light" ? "var(--brand-primary)" : "transparent",
                color: theme === "light" ? "#ffffff" : "var(--text-secondary)",
                transition: "all var(--transition-fast)",
              }}
            >
              <IconSun size={14} />
              <span>Light</span>
            </button>
          </div>
        </div>

        {/* Accent Color Swatches */}
        <div>
          <label className="input-label">Theme Accent</label>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {ACCENT_COLORS.map((col) => {
              const isSelected = (accentColor || "#E54683").toLowerCase() === col.hex.toLowerCase();
              return (
                <button
                  key={col.hex}
                  type="button"
                  onClick={() => setAccentColor(col.hex)}
                  title={col.name}
                  aria-label={`Select ${col.name} accent`}
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    backgroundColor: col.hex,
                    border: isSelected ? "3px solid #ffffff" : "2px solid transparent",
                    boxShadow: isSelected ? `0 0 10px ${col.hex}` : "none",
                    cursor: "pointer",
                    outline: isSelected ? `2px solid ${col.hex}` : "none",
                    transition: "transform var(--transition-fast)",
                    transform: isSelected ? "scale(1.15)" : "scale(1)",
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
