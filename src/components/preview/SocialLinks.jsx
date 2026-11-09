import { usePortfolioStore } from "../../store/portfolioStore";
import { IconGithub, IconLinkedin, IconTwitter, IconGlobe, IconExternalLink } from "../common/Icons";

export default function SocialLinks() {
  const socials = usePortfolioStore((state) => state.socials) || {};
  const template = usePortfolioStore((state) => state.template);
  const accentColor = usePortfolioStore((state) => state.accentColor) || "var(--brand-primary)";

  const links = [
    { key: "github", label: "GitHub", url: socials.github, icon: IconGithub },
    { key: "linkedin", label: "LinkedIn", url: socials.linkedin, icon: IconLinkedin },
    { key: "twitter", label: "Twitter / X", url: socials.twitter, icon: IconTwitter },
    { key: "website", label: "Website", url: socials.website, icon: IconGlobe },
  ].filter((item) => Boolean(item.url));

  if (links.length === 0) {
    return (
      <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0, fontStyle: "italic" }}>
        No social links configured yet. Add them in the editor.
      </p>
    );
  }

  const isMinimal = template === "minimal";
  const isModern = template === "modern";

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
      {links.map((link) => {
        const IconComponent = link.icon;
        return (
          <a
            key={link.key}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: isMinimal ? "6px 14px" : "8px 16px",
              borderRadius: isMinimal ? "4px" : "var(--radius-md)",
              backgroundColor: isMinimal ? "transparent" : "var(--bg-surface-elevated)",
              border: isMinimal
                ? "1px solid var(--border-medium)"
                : isModern
                ? "1px solid rgba(229, 70, 131, 0.25)"
                : "1px solid var(--border-subtle)",
              color: "var(--text-primary)",
              fontSize: "0.86rem",
              fontWeight: "600",
              transition: "all var(--transition-fast)",
            }}
            className="card-hover-glow"
          >
            <IconComponent size={15} style={{ color: accentColor }} />
            <span>{link.label}</span>
            <IconExternalLink size={12} style={{ color: "var(--text-muted)" }} />
          </a>
        );
      })}
    </div>
  );
}
