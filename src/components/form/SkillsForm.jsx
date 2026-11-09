import { useState } from "react";
import { usePortfolioStore } from "../../store/portfolioStore";
import { IconCode, IconPlus, IconTrash, IconEdit, IconCheck, IconClose } from "../common/Icons";

const SUGGESTED_SKILLS = [
  "React", "TypeScript", "Next.js", "Node.js", "Python",
  "Tailwind CSS", "PostgreSQL", "GraphQL", "Docker", "Figma", "AWS", "CI/CD"
];

export default function SkillsForm() {
  const skills = usePortfolioStore((state) => state.skills);
  const addSkill = usePortfolioStore((state) => state.addSkill);
  const updateSkill = usePortfolioStore((state) => state.updateSkill);
  const removeSkill = usePortfolioStore((state) => state.removeSkill);

  const [inputVal, setInputVal] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editVal, setEditVal] = useState("");

  const handleAdd = (nameToAdd) => {
    if (nameToAdd) {
      const trimmed = nameToAdd.trim();
      if (trimmed) addSkill(trimmed);
      return;
    }
    const val = inputVal.trim();
    if (!val) return;
    addSkill(val);
    setInputVal("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  const startEdit = (skill) => {
    const sId = skill.id || skill;
    const sName = skill.name || skill;
    setEditingId(sId);
    setEditVal(sName);
  };

  const saveEdit = (sId) => {
    if (editVal.trim()) {
      updateSkill(sId, editVal.trim());
    }
    setEditingId(null);
    setEditVal("");
  };

  return (
    <div style={{ marginBottom: "26px" }}>
      <h3 style={{ fontSize: "1rem", fontWeight: "700", color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
        <IconCode size={16} style={{ color: "var(--brand-primary)" }} />
        Skills & Technical Stack
      </h3>

      {/* Input Box with Add Button */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
        <input
          className="input-field"
          placeholder="e.g. React, Kubernetes, Distributed Systems... (Press Enter)"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Skill name"
        />
        <button
          type="button"
          onClick={() => handleAdd()}
          className="btn-primary"
          style={{ padding: "0 18px", flexShrink: 0 }}
        >
          <IconPlus size={16} />
          <span>Add</span>
        </button>
      </div>

      {/* Quick Add Suggestions */}
      <div style={{ marginBottom: "16px" }}>
        <span style={{ fontSize: "0.75rem", fontWeight: "600", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em", display: "block", marginBottom: "6px" }}>
          Quick Add Suggestions:
        </span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {SUGGESTED_SKILLS.map((item) => {
            const alreadyHas = skills.some((s) => (s.name || s).toLowerCase() === item.toLowerCase());
            if (alreadyHas) return null;
            return (
              <button
                key={item}
                type="button"
                onClick={() => handleAdd(item)}
                style={{
                  fontSize: "0.76rem",
                  padding: "3px 10px",
                  borderRadius: "var(--radius-full)",
                  backgroundColor: "var(--bg-surface-elevated)",
                  border: "1px solid var(--border-medium)",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  transition: "all var(--transition-fast)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--brand-primary)";
                  e.currentTarget.style.color = "var(--brand-secondary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-medium)";
                  e.currentTarget.style.color = "var(--text-secondary)";
                }}
              >
                <span>+</span>
                <span>{item}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Skills List */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          minHeight: "42px",
          padding: "10px",
          borderRadius: "var(--radius-md)",
          backgroundColor: "var(--bg-surface-elevated)",
          border: "1px solid var(--border-subtle)",
        }}
      >
        {skills.length === 0 ? (
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", margin: "auto" }}>
            No skills added yet. Type a skill above or click a suggestion.
          </p>
        ) : (
          skills.map((skill, index) => {
            const sId = skill.id || `idx_${index}`;
            const sName = skill.name || skill;
            const isEditing = editingId === sId;

            if (isEditing) {
              return (
                <div
                  key={sId}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    backgroundColor: "var(--bg-surface)",
                    padding: "3px 8px",
                    borderRadius: "var(--radius-full)",
                    border: "1px solid var(--brand-primary)",
                  }}
                >
                  <input
                    value={editVal}
                    onChange={(e) => setEditVal(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveEdit(sId);
                      if (e.key === "Escape") setEditingId(null);
                    }}
                    autoFocus
                    style={{
                      border: "none",
                      outline: "none",
                      background: "transparent",
                      fontSize: "0.82rem",
                      color: "var(--text-primary)",
                      width: "100px",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => saveEdit(sId)}
                    style={{ border: "none", background: "transparent", cursor: "pointer", color: "var(--brand-primary)" }}
                    title="Save"
                  >
                    <IconCheck size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingId(null)}
                    style={{ border: "none", background: "transparent", cursor: "pointer", color: "var(--text-muted)" }}
                    title="Cancel"
                  >
                    <IconClose size={13} />
                  </button>
                </div>
              );
            }

            return (
              <div
                key={sId}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "4px 10px",
                  borderRadius: "var(--radius-full)",
                  backgroundColor: "var(--bg-surface)",
                  border: "1px solid var(--border-medium)",
                  fontSize: "0.82rem",
                  fontWeight: "500",
                  color: "var(--text-primary)",
                  transition: "all var(--transition-fast)",
                }}
              >
                <span>{sName}</span>
                <button
                  type="button"
                  onClick={() => startEdit(skill)}
                  style={{
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    color: "var(--text-muted)",
                    padding: "0 2px",
                    display: "inline-flex",
                  }}
                  title="Edit skill"
                  aria-label={`Edit skill ${sName}`}
                >
                  <IconEdit size={12} />
                </button>
                <button
                  type="button"
                  onClick={() => removeSkill(skill.id || index)}
                  style={{
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    color: "var(--text-muted)",
                    padding: "0 2px",
                    display: "inline-flex",
                  }}
                  title="Remove skill"
                  aria-label={`Remove skill ${sName}`}
                  onMouseEnter={(e) => e.currentTarget.style.color = "#ef4444"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-muted)"}
                >
                  <IconTrash size={12} />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
