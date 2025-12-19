import { usePortfolioStore } from "../../store/portfolioStore";

export default function ProjectCard({ project, template }) {
  const theme = usePortfolioStore((state) => state.theme);

  let cardStyle = {
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "12px",
    transition: "all 0.3s ease",
  };

  if (template === "default") {
    cardStyle = {
      ...cardStyle,
      backgroundColor: theme === "light" ? "#fff" : "#1e1e1e",
      boxShadow:
        theme === "light"
          ? "0 2px 10px rgba(0,0,0,0.05)"
          : "0 2px 10px rgba(0,0,0,0.5)",
      border: "1px solid #ccc",
    };
  } else if (template === "modern") {
    cardStyle = {
      ...cardStyle,
      backgroundColor: theme === "light" ? "#d0f0ff" : "#1b1b2f",
      border: "1px solid #0070f3",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    };
  } else if (template === "minimal") {
    cardStyle = { ...cardStyle, backgroundColor: "transparent", border: "none" };
  }

  return (
    <div style={cardStyle}>
      <h4 style={{ margin: "5px 0" }}>{project.title}</h4>
      <p style={{ margin: "5px 0" }}>{project.description}</p>
      {project.link && (
        <a href={project.link} target="_blank" rel="noreferrer" style={{ color: "#0070f3" }}>
          View Project
        </a>
      )}
    </div>
  );
}
