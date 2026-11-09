import { usePortfolioStore } from "../../store/portfolioStore";
import { IconShare, IconGithub, IconLinkedin, IconTwitter, IconGlobe } from "../common/Icons";

export default function SocialLinksForm() {
  const socials = usePortfolioStore((state) => state.socials);
  const updateSocial = usePortfolioStore((state) => state.updateSocial);

  return (
    <div style={{ marginBottom: "26px" }}>
      <h3 style={{ fontSize: "1rem", fontWeight: "700", color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
        <IconShare size={16} style={{ color: "var(--brand-primary)" }} />
        Socials & Professional Links
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div>
          <label htmlFor="social-github" className="input-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <IconGithub size={14} /> GitHub Profile URL
          </label>
          <input
            id="social-github"
            className="input-field"
            placeholder="https://github.com/username"
            value={socials.github || ""}
            onChange={(e) => updateSocial("github", e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="social-linkedin" className="input-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <IconLinkedin size={14} /> LinkedIn Profile URL
          </label>
          <input
            id="social-linkedin"
            className="input-field"
            placeholder="https://linkedin.com/in/username"
            value={socials.linkedin || ""}
            onChange={(e) => updateSocial("linkedin", e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="social-twitter" className="input-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <IconTwitter size={14} /> Twitter / X Profile URL
          </label>
          <input
            id="social-twitter"
            className="input-field"
            placeholder="https://twitter.com/username"
            value={socials.twitter || ""}
            onChange={(e) => updateSocial("twitter", e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="social-website" className="input-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <IconGlobe size={14} /> Personal Website / Custom Domain
          </label>
          <input
            id="social-website"
            className="input-field"
            placeholder="https://mywebsite.dev"
            value={socials.website || ""}
            onChange={(e) => updateSocial("website", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
