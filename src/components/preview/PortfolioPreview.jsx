import ProfileHeader from "./ProfileHeader";
import SkillsList from "./SkillsList";
import ProjectCard from "./ProjectCard";
import SocialLinks from "./SocialLinks";
import { usePortfolioStore } from "../../store/portfolioStore";

export default function PortfolioPreview() {
  const projects = usePortfolioStore((state) => state.projects);
  const template = usePortfolioStore((state) => state.template);
  const theme = usePortfolioStore((state) => state.theme);

  const baseStyle = {
    padding: "30px",
    borderRadius: "12px",
    minHeight: "80vh",
    fontFamily: "'Roboto', sans-serif",
    transition: "all 0.3s ease",
    color: theme === "light" ? "#222" : "#fff",
    backgroundColor: theme === "light" ? "#f9f9f9" : "#121212",
  };

  const sectionStyle = {
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "25px",
    transition: "all 0.3s ease",
  };

  const defaultStyle = {
    ...sectionStyle,
    backgroundColor: theme === "light" ? "#fff" : "#1e1e1e",
    boxShadow:
      theme === "light"
        ? "0 2px 10px rgba(0,0,0,0.05)"
        : "0 2px 10px rgba(0,0,0,0.5)",
  };

  const modernStyle = {
    ...sectionStyle,
    backgroundColor: theme === "light" ? "#e0f7ff" : "#1b1b2f",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    border: "1px solid #0070f3",
  };

  const minimalStyle = {
    ...sectionStyle,
    backgroundColor: "transparent",
    boxShadow: "none",
  };

  const renderProjects = () =>
    projects.length === 0 ? (
      <p>No projects added yet.</p>
    ) : (
      projects.map((project, index) => (
        <ProjectCard key={index} project={project} template={template} />
      ))
    );

  return (
    <div style={baseStyle}>
      {template === "default" && (
        <>
          <div style={defaultStyle}>
            <ProfileHeader />
          </div>
          <div style={defaultStyle}>
            <h3>Skills</h3>
            <SkillsList />
          </div>
          <div style={defaultStyle}>
            <h3>Projects</h3>
            {renderProjects()}
          </div>
          <div style={defaultStyle}>
            <SocialLinks />
          </div>
        </>
      )}

      {template === "minimal" && (
        <>
          <div style={minimalStyle}>
            <ProfileHeader />
          </div>
          <div style={minimalStyle}>
            <h3>Projects</h3>
            {renderProjects()}
          </div>
        </>
      )}

      {template === "modern" && (
        <>
          <div style={modernStyle}>
            <ProfileHeader />
          </div>
          <div style={modernStyle}>
            <h3>Skills</h3>
            <SkillsList />
          </div>
          <div style={modernStyle}>
            <h3>Projects</h3>
            {renderProjects()}
          </div>
          <div style={modernStyle}>
            <SocialLinks />
          </div>
        </>
      )}
    </div>
  );
}
