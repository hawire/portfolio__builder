import UserInfoForm from "../components/form/UserInfoForm";
import SkillsForm from "../components/form/SkillsForm";
import ProjectsForm from "../components/form/ProjectsForm";
import SocialLinksForm from "../components/form/SocialLinksForm";
import PortfolioPreview from "../components/preview/PortfolioPreview";
import TemplateSelector from "../components/TemplateSelector";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { usePortfolioStore } from "../store/portfolioStore";

export default function Builder() {
  const portfolioData = usePortfolioStore((state) => state);

  const resetPortfolio = () => {
    localStorage.removeItem("portfolioData");
    window.location.reload();
  };

  const exportPortfolio = () => {
    // same export logic as before
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "row",
    gap: "25px",
    flexWrap: "wrap",
  };

  const formCardStyle = {
    flex: 1,
    minWidth: "320px",
    backgroundColor: portfolioData.theme === "light" ? "#fff" : "#1e1e1e",
    padding: "25px",
    borderRadius: "12px",
    boxShadow:
      portfolioData.theme === "light"
        ? "0 4px 20px rgba(0,0,0,0.05)"
        : "0 4px 20px rgba(0,0,0,0.5)",
    transition: "all 0.3s ease",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "20px", gap: "20px" }}>
      <div style={containerStyle}>
        {/* Forms */}
        <div style={formCardStyle}>
          <TemplateSelector />
          <ThemeSwitcher />
          <UserInfoForm />
          <SkillsForm />
          <ProjectsForm />
          <SocialLinksForm />

          <button
            onClick={resetPortfolio}
            style={{
              marginTop: "20px",
              padding: "12px 18px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "red",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            Reset Portfolio
          </button>

          <button
            onClick={exportPortfolio}
            style={{
              marginTop: "12px",
              padding: "12px 18px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#0070f3",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            Export Portfolio
          </button>
        </div>

        {/* Live Preview */}
        <div style={{ flex: 1, minWidth: "320px" }}>
          <PortfolioPreview />
        </div>
      </div>
    </div>
  );
}
