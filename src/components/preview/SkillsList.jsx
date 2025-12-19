import { usePortfolioStore } from "../../store/portfolioStore";

export default function SkillsList() {
  const skills = usePortfolioStore((state) => state.skills);

  if (skills.length === 0) return null;

  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>Skills</h3>
      <ul style={{ display: "flex", flexWrap: "wrap", gap: "10px", listStyle: "none", padding: 0 }}>
        {skills.map((skill, index) => (
          <li
            key={index}
            style={{
              backgroundColor: "#0070f3",
              color: "#fff",
              padding: "5px 10px",
              borderRadius: "4px",
              fontSize: "0.9rem",
            }}
          >
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}
