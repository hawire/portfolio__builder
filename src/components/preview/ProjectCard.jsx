import { usePortfolioStore } from "../../store/portfolioStore";
import { IconExternalLink, IconGithub } from "../common/Icons";

export default function ProjectCard({ project, template }) {
  const accentColor = usePortfolioStore((state) => state.accentColor) || "var(--brand-primary)";

  const isMinimal = template === "minimal";
  const isModern = template === "modern";
  const isCreative = template === "creative";
  const isExecutive = template === "executive";

  const techList = project.technologies
    ? project.technologies.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  let cardStyle = {
    padding: "20px",
    borderRadius: isMinimal ? "8px" : isCreative ? "16px" : "12px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    transition: "all var(--transition-normal)",
    backgroundColor: isMinimal
      ? "transparent"
      : isModern
      ? "var(--bg-surface)"
      : "var(--bg-surface-elevated)",
    border: isMinimal
      ? "1px solid var(--border-medium)"
      : isModern
      ? "1px solid rgba(229, 70, 131, 0.3)"
      : "1px solid var(--border-subtle)",
    boxShadow: isModern ? "0 4px 20px -2px rgba(229, 70, 131, 0.15)" : "none",
  };

  if (isExecutive) {
    cardStyle = {
      ...cardStyle,
      borderLeft: `4px solid ${accentColor}`,
    };
  }

  return (
    <div style={cardStyle} className="card-hover-glow">
      <div>
        <h4
          style={{
            fontSize: "1.1rem",
            fontWeight: "700",
            color: "var(--text-primary)",
            margin: "0 0 8px 0",
            letterSpacing: "-0.01em",
          }}
        >
          {project.title}
        </h4>

        {project.description && (
          <p
            style={{
              fontSize: "0.88rem",
              color: "var(--text-secondary)",
              lineHeight: "1.6",
              margin: "0 0 14px 0",
            }}
          >
            {project.description}
          </p>
        )}

        {techList.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "14px" }}>
            {techList.map((tech, i) => (
              <span
                key={i}
                style={{
                  fontSize: "0.72rem",
                  fontWeight: "600",
                  padding: "2px 8px",
                  borderRadius: "4px",
                  backgroundColor: "var(--bg-surface)",
                  border: "1px solid var(--border-subtle)",
                  color: isModern ? "var(--brand-secondary)" : "var(--text-muted)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>

      {(project.link || project.githubLink) && (
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginTop: "8px", paddingTop: "10px", borderTop: "1px solid var(--border-subtle)" }}>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                color: accentColor,
                fontWeight: "600",
                fontSize: "0.85rem",
              }}
            >
              <span>View Project</span>
              <IconExternalLink size={13} />
            </a>
          )}
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                color: "var(--text-secondary)",
                fontWeight: "500",
                fontSize: "0.85rem",
              }}
            >
              <IconGithub size={13} />
              <span>Source</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
}
