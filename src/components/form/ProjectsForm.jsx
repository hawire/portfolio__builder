import { useState } from "react";
import { usePortfolioStore } from "../../store/portfolioStore";

export default function ProjectsForm() {
  const addProject = usePortfolioStore((state) => state.addProject);
  const projects = usePortfolioStore((state) => state.projects);
  const removeProject = usePortfolioStore((state) => state.removeProject);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  const handleAddProject = () => {
    if (!title.trim()) return;
    addProject({
      title: title.trim(),
      description: description.trim(),
      link: link.trim(),
    });
    setTitle("");
    setDescription("");
    setLink("");
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>Projects</h3>

      <input
        placeholder="Project title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />

      <textarea
        placeholder="Project description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />

      <input
        placeholder="Project link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />

      <button
        onClick={handleAddProject}
        style={{
          padding: "8px 12px",
          borderRadius: "4px",
          border: "none",
          backgroundColor: "#0070f3",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Add Project
      </button>

      <ul style={{ listStyle: "none", padding: 0, marginTop: "10px" }}>
        {projects.map((project, index) => (
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
            {project.title}
            <button
              onClick={() => removeProject(index)}
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
