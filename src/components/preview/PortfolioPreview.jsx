import ProfileHeader from "./ProfileHeader";
import SkillsList from "./SkillsList";
import ProjectCard from "./ProjectCard";
import SocialLinks from "./SocialLinks";
import { usePortfolioStore } from "../../store/portfolioStore";
import { IconSparkles, IconBriefcase, IconCode, IconShare } from "../common/Icons";

export default function PortfolioPreview() {
  const projects = usePortfolioStore((state) => state.projects) || [];
  const template = usePortfolioStore((state) => state.template) || "default";
  const accentColor = usePortfolioStore((state) => state.accentColor) || "var(--brand-primary)";

  const isMinimal = template === "minimal";
  const isModern = template === "modern";

  // Section card wrapper style
  const sectionCardStyle = {
    padding: isMinimal ? "20px 0" : "24px",
    borderRadius: isMinimal ? "0" : "var(--radius-lg)",
    backgroundColor: isMinimal ? "transparent" : "var(--bg-surface)",
    border: isMinimal ? "none" : isModern ? "1px solid rgba(229, 70, 131, 0.2)" : "1px solid var(--border-subtle)",
    borderBottom: isMinimal ? "1px solid var(--border-medium)" : undefined,
    marginBottom: "24px",
    boxShadow: isMinimal ? "none" : isModern ? "0 8px 30px -10px rgba(229, 70, 131, 0.15)" : "var(--shadow-sm)",
  };

  const renderSectionHeader = (title, icon) => (
    <h3
      style={{
        fontSize: "1.1rem",
        fontWeight: "700",
        color: "var(--text-primary)",
        marginBottom: "16px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        letterSpacing: "-0.02em",
      }}
    >
      <span
        style={{
          width: "4px",
          height: "16px",
          backgroundColor: accentColor,
          borderRadius: "2px",
          display: "inline-block",
        }}
      />
      {icon}
      <span>{title}</span>
    </h3>
  );

  return (
    <div
      style={{
        fontFamily: isMinimal ? "var(--font-mono), var(--font-sans)" : "var(--font-sans)",
        transition: "all var(--transition-normal)",
      }}
    >
      {/* Profile Header Section */}
      <div style={sectionCardStyle}>
        <ProfileHeader />
      </div>

      {/* Skills Section (Rendered in ALL templates!) */}
      <div style={sectionCardStyle}>
        {renderSectionHeader("Skills & Technical Expertise", <IconCode size={16} style={{ color: accentColor }} />)}
        <SkillsList />
      </div>

      {/* Projects Section */}
      <div style={sectionCardStyle}>
        {renderSectionHeader("Featured Projects", <IconBriefcase size={16} style={{ color: accentColor }} />)}
        {projects.length === 0 ? (
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0, fontStyle: "italic" }}>
            No projects added yet. Click &quot;Add Project&quot; in the editor to showcase your work.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMinimal ? "1fr" : "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "16px",
            }}
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id || index}
                project={project}
                template={template}
              />
            ))}
          </div>
        )}
      </div>

      {/* Social Links Section (Rendered in ALL templates!) */}
      <div style={sectionCardStyle}>
        {renderSectionHeader("Connect & Profiles", <IconShare size={16} style={{ color: accentColor }} />)}
        <SocialLinks />
      </div>

      {/* Portfolio Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "20px 0 10px 0",
          color: "var(--text-muted)",
          fontSize: "0.78rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
        }}
      >
        <IconSparkles size={13} style={{ color: accentColor }} />
        <span>Crafted with PortfolioCraft</span>
      </footer>
    </div>
  );
}
