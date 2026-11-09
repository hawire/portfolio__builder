import { useState } from "react";
import { usePortfolioStore } from "../../store/portfolioStore";
import { IconBriefcase, IconPlus, IconEdit, IconTrash, IconClose, IconCheck, IconExternalLink, IconGithub } from "../common/Icons";

const initialFormState = {
  title: "",
  description: "",
  technologies: "",
  link: "",
  githubLink: "",
};

export default function ProjectsForm() {
  const projects = usePortfolioStore((state) => state.projects);
  const addProject = usePortfolioStore((state) => state.addProject);
  const updateProject = usePortfolioStore((state) => state.updateProject);
  const removeProject = usePortfolioStore((state) => state.removeProject);

  const [form, setForm] = useState(initialFormState);
  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!form.title.trim()) {
      setErrorMsg("Please enter a project title.");
      return;
    }
    setErrorMsg("");

    if (editingId !== null) {
      updateProject(editingId, form);
      setEditingId(null);
    } else {
      addProject(form);
    }

    setForm(initialFormState);
    setShowAddForm(false);
  };

  const handleEdit = (proj) => {
    setEditingId(proj.id);
    setForm({
      title: proj.title || "",
      description: proj.description || "",
      technologies: proj.technologies || "",
      link: proj.link || "",
      githubLink: proj.githubLink || "",
    });
    setShowAddForm(true);
    setErrorMsg("");
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm(initialFormState);
    setShowAddForm(false);
    setErrorMsg("");
  };

  return (
    <div style={{ marginBottom: "26px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
        <h3 style={{ fontSize: "1rem", fontWeight: "700", color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "8px" }}>
          <IconBriefcase size={16} style={{ color: "var(--brand-primary)" }} />
          Projects Showcase ({projects.length})
        </h3>
        {!showAddForm && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm(initialFormState);
              setShowAddForm(true);
            }}
            className="btn-primary"
            style={{ padding: "6px 14px", fontSize: "0.82rem" }}
          >
            <IconPlus size={14} />
            <span>Add Project</span>
          </button>
        )}
      </div>

      {/* Add / Edit Project Drawer */}
      {showAddForm && (
        <form
          onSubmit={handleSubmit}
          className="card-surface animate-fade-in"
          style={{
            padding: "18px",
            marginBottom: "16px",
            border: "1px solid var(--brand-primary)",
            backgroundColor: "var(--bg-surface-elevated)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <h4 style={{ fontSize: "0.92rem", fontWeight: "700", color: "var(--brand-primary)" }}>
              {editingId ? "Edit Project" : "Add New Project"}
            </h4>
            <button
              type="button"
              onClick={handleCancel}
              className="btn-ghost"
              style={{ padding: "4px" }}
              aria-label="Cancel"
            >
              <IconClose size={16} />
            </button>
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label className="input-label" htmlFor="proj-title">Project Title *</label>
            <input
              id="proj-title"
              className="input-field"
              placeholder="e.g. AI-Powered Analytics Dashboard"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              autoFocus
            />
            {errorMsg && <p style={{ color: "#ef4444", fontSize: "0.78rem", marginTop: "4px" }}>{errorMsg}</p>}
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label className="input-label" htmlFor="proj-desc">Project Description</label>
            <textarea
              id="proj-desc"
              className="input-field"
              rows={3}
              placeholder="What problem does it solve? Key achievements, architecture highlights..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label className="input-label" htmlFor="proj-tech">Technologies Used</label>
            <input
              id="proj-tech"
              className="input-field"
              placeholder="e.g. React 19, TypeScript, PostgreSQL, Tailwind"
              value={form.technologies}
              onChange={(e) => setForm({ ...form, technologies: e.target.value })}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px", marginBottom: "16px" }}>
            <div>
              <label className="input-label" htmlFor="proj-link">Live Demo URL</label>
              <input
                id="proj-link"
                className="input-field"
                placeholder="https://myproject.com"
                value={form.link}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
              />
            </div>
            <div>
              <label className="input-label" htmlFor="proj-gh">GitHub Repository URL</label>
              <input
                id="proj-gh"
                className="input-field"
                placeholder="https://github.com/..."
                value={form.githubLink}
                onChange={(e) => setForm({ ...form, githubLink: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
            <button
              type="button"
              onClick={handleCancel}
              className="btn-secondary"
              style={{ padding: "8px 16px", fontSize: "0.85rem" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              style={{ padding: "8px 18px", fontSize: "0.85rem" }}
            >
              <IconCheck size={15} />
              <span>{editingId ? "Save Changes" : "Create Project"}</span>
            </button>
          </div>
        </form>
      )}

      {/* Project Cards List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {projects.length === 0 ? (
          <div
            style={{
              padding: "24px",
              textAlign: "center",
              borderRadius: "var(--radius-md)",
              backgroundColor: "var(--bg-surface-elevated)",
              border: "1px dashed var(--border-medium)",
              color: "var(--text-muted)",
              fontSize: "0.88rem",
            }}
          >
            <p>No projects added yet.</p>
            <p style={{ fontSize: "0.8rem", marginTop: "4px" }}>
              Click <strong>&quot;Add Project&quot;</strong> above to feature your best engineering achievements.
            </p>
          </div>
        ) : (
          projects.map((proj, idx) => {
            const pId = proj.id || idx;
            return (
              <div
                key={pId}
                className="card-surface"
                style={{
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  border: "1px solid var(--border-medium)",
                  backgroundColor: "var(--bg-surface)",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
                  <div>
                    <h4 style={{ fontSize: "0.98rem", fontWeight: "700", color: "var(--text-primary)", margin: 0 }}>
                      {proj.title}
                    </h4>
                    {proj.technologies && (
                      <span style={{ fontSize: "0.76rem", color: "var(--brand-secondary)", fontWeight: "600", marginTop: "2px", display: "inline-block" }}>
                        {proj.technologies}
                      </span>
                    )}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <button
                      type="button"
                      onClick={() => handleEdit(proj)}
                      className="btn-ghost"
                      style={{ padding: "6px" }}
                      title="Edit project"
                      aria-label={`Edit project ${proj.title}`}
                    >
                      <IconEdit size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (editingId === proj.id || editingId === idx) {
                          handleCancel();
                        }
                        removeProject(proj.id || idx);
                      }}
                      className="btn-ghost"
                      style={{ padding: "6px", color: "#ef4444" }}
                      title="Delete project"
                      aria-label={`Delete project ${proj.title}`}
                    >
                      <IconTrash size={14} />
                    </button>
                  </div>
                </div>

                {proj.description && (
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: "1.5", margin: 0 }}>
                    {proj.description}
                  </p>
                )}

                {(proj.link || proj.githubLink) && (
                  <div style={{ display: "flex", gap: "12px", marginTop: "4px", fontSize: "0.78rem" }}>
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: "var(--brand-primary)", display: "inline-flex", alignItems: "center", gap: "4px" }}
                      >
                        <IconExternalLink size={12} />
                        <span>Live Demo</span>
                      </a>
                    )}
                    {proj.githubLink && (
                      <a
                        href={proj.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: "var(--text-secondary)", display: "inline-flex", alignItems: "center", gap: "4px" }}
                      >
                        <IconGithub size={12} />
                        <span>Source Code</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
