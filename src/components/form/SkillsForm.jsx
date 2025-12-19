import { useState } from "react";
import { usePortfolioStore } from "../../store/portfolioStore";

export default function SkillsForm() {
  const [skillInput, setSkillInput] = useState("");
  const skills = usePortfolioStore((state) => state.skills);
  const addSkill = usePortfolioStore((state) => state.addSkill);
  const removeSkill = usePortfolioStore((state) => state.removeSkill);

  const handleAddSkill = () => {
    if (!skillInput.trim()) return;
    addSkill(skillInput.trim());
    setSkillInput("");
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>Skills</h3>

      <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
        <input
          placeholder="Add a skill"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          style={{
            flex: 1,
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={handleAddSkill}
          style={{
            padding: "8px 12px",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#0070f3",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {skills.map((skill, index) => (
          <li
            key={index}
            style={{
              marginBottom: "5px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "4px 8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            {skill}
            <button
              onClick={() => removeSkill(index)}
              style={{
                background: "red",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                padding: "2px 6px",
                cursor: "pointer",
              }}
            >
              x
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
