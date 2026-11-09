import { useState } from "react";
import UserInfoForm from "../components/form/UserInfoForm";
import SkillsForm from "../components/form/SkillsForm";
import ProjectsForm from "../components/form/ProjectsForm";
import SocialLinksForm from "../components/form/SocialLinksForm";
import PortfolioPreview from "../components/preview/PortfolioPreview";
import TemplateSelector from "../components/TemplateSelector";
import ThemeSwitcher from "../components/ThemeSwitcher";
import ConfirmationModal from "../components/common/ConfirmationModal";
import Toast from "../components/common/Toast";
import Navbar from "../components/common/Navbar";
import { usePortfolioStore } from "../store/portfolioStore";
import { exportPortfolioHTML } from "../utils/exportPortfolio";
import {
  IconDownload,
  IconPrinter,
  IconRefresh,
  IconLayers,
  IconUser,
  IconCode,
  IconBriefcase,
  IconShare,
  IconEye,
  IconEdit,
} from "../components/common/Icons";

const EDITOR_TABS = [
  { id: "template", label: "Design & Theme", icon: IconLayers },
  { id: "profile", label: "Profile", icon: IconUser },
  { id: "skills", label: "Skills", icon: IconCode },
  { id: "projects", label: "Projects", icon: IconBriefcase },
  { id: "socials", label: "Socials", icon: IconShare },
];

export default function Builder() {
  const [activeTab, setActiveTab] = useState("template");
  const [mobileView, setMobileView] = useState("editor"); // "editor" | "preview"
  const [previewDevice, setPreviewDevice] = useState("desktop"); // "desktop" | "tablet" | "mobile"
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isToastOpen, setIsToastOpen] = useState(false);

  // Granular Zustand selectors to prevent full-page re-renders on keystroke
  const resetStore = usePortfolioStore((state) => state.resetStore);
  const template = usePortfolioStore((state) => state.template);
  const skillsCount = usePortfolioStore((state) => state.skills?.length || 0);
  const projectsCount = usePortfolioStore((state) => state.projects?.length || 0);

  const showToast = (msg) => {
    setToastMessage(msg);
    setIsToastOpen(true);
  };

  const handleExport = () => {
    const fullData = usePortfolioStore.getState();
    exportPortfolioHTML(fullData);
    showToast("Portfolio exported as standalone HTML file!");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleConfirmReset = () => {
    resetStore();
    setIsResetModalOpen(false);
    showToast("Portfolio restored to initial defaults.");
  };

  // Preview canvas maximum container width depending on selected device simulator
  const previewMaxWidth =
    previewDevice === "mobile" ? "390px" : previewDevice === "tablet" ? "768px" : "100%";

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-app)", display: "flex", flexDirection: "column" }}>
      <Navbar />

      {/* Builder Sub-Header Toolbar */}
      <div
        className="glass-panel no-print"
        style={{
          borderBottom: "1px solid var(--border-subtle)",
          padding: "10px 24px",
          position: "sticky",
          top: "65px",
          zIndex: 40,
        }}
      >
        <div
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          {/* Status Indicator & Mobile Segmented Toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#10b981",
                  boxShadow: "0 0 8px #10b981",
                }}
              />
              <span style={{ fontSize: "0.82rem", fontWeight: "600", color: "var(--text-muted)" }}>
                Autosaved to LocalStorage
              </span>
            </div>

            {/* Mobile View Switcher (Only visible on small screens) */}
            <div
              className="mobile-view-toggle"
              style={{
                display: "none",
                padding: "3px",
                borderRadius: "var(--radius-sm)",
                backgroundColor: "var(--bg-surface-elevated)",
                border: "1px solid var(--border-medium)",
              }}
            >
              <button
                type="button"
                onClick={() => setMobileView("editor")}
                style={{
                  padding: "5px 12px",
                  borderRadius: "4px",
                  border: "none",
                  fontSize: "0.8rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  backgroundColor: mobileView === "editor" ? "var(--brand-primary)" : "transparent",
                  color: mobileView === "editor" ? "#ffffff" : "var(--text-secondary)",
                }}
              >
                <IconEdit size={13} />
                <span>Editor</span>
              </button>
              <button
                type="button"
                onClick={() => setMobileView("preview")}
                style={{
                  padding: "5px 12px",
                  borderRadius: "4px",
                  border: "none",
                  fontSize: "0.8rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  backgroundColor: mobileView === "preview" ? "var(--brand-primary)" : "transparent",
                  color: mobileView === "preview" ? "#ffffff" : "var(--text-secondary)",
                }}
              >
                <IconEye size={13} />
                <span>Live Preview</span>
              </button>
            </div>
          </div>

          {/* Action Buttons Toolbar */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => setIsResetModalOpen(true)}
              className="btn-ghost"
              style={{ padding: "8px 12px", fontSize: "0.84rem", color: "#ef4444" }}
              title="Reset portfolio data"
            >
              <IconRefresh size={14} />
              <span>Reset</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="btn-secondary"
              style={{ padding: "8px 14px", fontSize: "0.84rem" }}
              title="Print portfolio or save as PDF"
            >
              <IconPrinter size={15} />
              <span>Print / PDF</span>
            </button>

            <button
              type="button"
              onClick={handleExport}
              className="btn-primary"
              style={{ padding: "8px 16px", fontSize: "0.84rem" }}
              title="Download standalone HTML file"
            >
              <IconDownload size={15} />
              <span>Export HTML</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Dual-Pane Workspace */}
      <main
        style={{
          maxWidth: "1440px",
          width: "100%",
          margin: "0 auto",
          padding: "24px 20px 60px 20px",
          display: "flex",
          gap: "28px",
          flex: 1,
          alignItems: "flex-start",
        }}
        className="builder-workspace-container"
      >
        {/* Left Pane: Editor Controls */}
        <section
          className={`editor-pane ${mobileView === "preview" ? "mobile-hidden" : ""} no-print`}
          style={{
            flex: "1 1 500px",
            maxWidth: "640px",
            width: "100%",
          }}
        >
          {/* Section Navigation Tabs */}
          <div
            style={{
              display: "flex",
              gap: "6px",
              padding: "4px",
              borderRadius: "var(--radius-md)",
              backgroundColor: "var(--bg-surface-elevated)",
              border: "1px solid var(--border-subtle)",
              marginBottom: "20px",
              overflowX: "auto",
            }}
          >
            {EDITOR_TABS.map((tab) => {
              const IconComp = tab.icon;
              const isActive = activeTab === tab.id;
              let badge = null;
              if (tab.id === "skills") badge = skillsCount;
              if (tab.id === "projects") badge = projectsCount;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    flex: "1 1 auto",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    padding: "8px 12px",
                    borderRadius: "var(--radius-sm)",
                    border: "none",
                    fontSize: "0.82rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    backgroundColor: isActive ? "var(--bg-surface)" : "transparent",
                    color: isActive ? "var(--brand-primary)" : "var(--text-secondary)",
                    boxShadow: isActive ? "var(--shadow-sm)" : "none",
                    transition: "all var(--transition-fast)",
                    whiteSpace: "nowrap",
                  }}
                >
                  <IconComp size={14} />
                  <span>{tab.label}</span>
                  {badge !== null && (
                    <span
                      style={{
                        fontSize: "0.68rem",
                        padding: "1px 6px",
                        borderRadius: "10px",
                        backgroundColor: isActive ? "var(--brand-subtle)" : "var(--border-subtle)",
                        color: isActive ? "var(--brand-primary)" : "var(--text-muted)",
                      }}
                    >
                      {badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Content Cards */}
          <div
            className="card-surface"
            style={{
              padding: "26px",
              boxShadow: "var(--shadow-md)",
              backgroundColor: "var(--bg-surface)",
              border: "1px solid var(--border-medium)",
            }}
          >
            {activeTab === "template" && (
              <div className="animate-fade-in">
                <TemplateSelector />
                <ThemeSwitcher />
              </div>
            )}

            {activeTab === "profile" && (
              <div className="animate-fade-in">
                <UserInfoForm />
              </div>
            )}

            {activeTab === "skills" && (
              <div className="animate-fade-in">
                <SkillsForm />
              </div>
            )}

            {activeTab === "projects" && (
              <div className="animate-fade-in">
                <ProjectsForm />
              </div>
            )}

            {activeTab === "socials" && (
              <div className="animate-fade-in">
                <SocialLinksForm />
              </div>
            )}

            {/* Quick Next Step Helper Footer */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "24px",
                paddingTop: "16px",
                borderTop: "1px solid var(--border-subtle)",
              }}
            >
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                Step {EDITOR_TABS.findIndex((t) => t.id === activeTab) + 1} of {EDITOR_TABS.length}
              </span>
              <div style={{ display: "flex", gap: "8px" }}>
                {activeTab !== "template" && (
                  <button
                    type="button"
                    onClick={() => {
                      const idx = EDITOR_TABS.findIndex((t) => t.id === activeTab);
                      if (idx > 0) setActiveTab(EDITOR_TABS[idx - 1].id);
                    }}
                    className="btn-secondary"
                    style={{ padding: "6px 12px", fontSize: "0.8rem" }}
                  >
                    Previous
                  </button>
                )}
                {activeTab !== "socials" ? (
                  <button
                    type="button"
                    onClick={() => {
                      const idx = EDITOR_TABS.findIndex((t) => t.id === activeTab);
                      if (idx < EDITOR_TABS.length - 1) setActiveTab(EDITOR_TABS[idx + 1].id);
                    }}
                    className="btn-primary"
                    style={{ padding: "6px 14px", fontSize: "0.8rem" }}
                  >
                    Next Section →
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleExport}
                    className="btn-primary"
                    style={{ padding: "6px 14px", fontSize: "0.8rem" }}
                  >
                    Export Portfolio 🚀
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Right Pane: Sticky Live Preview */}
        <section
          className={`preview-pane ${mobileView === "editor" ? "mobile-hidden" : ""}`}
          style={{
            flex: "1 1 600px",
            width: "100%",
            position: "sticky",
            top: "140px",
          }}
        >
          {/* Simulated Browser Window Frame */}
          <div
            style={{
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border-medium)",
              backgroundColor: "var(--bg-surface)",
              boxShadow: "var(--shadow-lg)",
              overflow: "hidden",
            }}
          >
            {/* Window Chrome Header */}
            <div
              className="no-print"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 16px",
                backgroundColor: "var(--bg-surface-elevated)",
                borderBottom: "1px solid var(--border-subtle)",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              {/* Traffic Light Dots */}
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#ef4444" }} />
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#f59e0b" }} />
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#10b981" }} />
                <span style={{ marginLeft: "8px", fontSize: "0.78rem", fontWeight: "600", color: "var(--text-muted)" }}>
                  Live Portfolio Preview
                </span>
              </div>

              {/* Viewport Simulation Selector (Desktop, Tablet, Mobile) */}
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div
                  style={{
                    display: "inline-flex",
                    padding: "2px",
                    borderRadius: "var(--radius-sm)",
                    backgroundColor: "var(--bg-surface)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setPreviewDevice("desktop")}
                    title="Desktop Preview"
                    style={{
                      padding: "3px 8px",
                      borderRadius: "4px",
                      border: "none",
                      fontSize: "0.72rem",
                      fontWeight: "600",
                      cursor: "pointer",
                      backgroundColor: previewDevice === "desktop" ? "var(--brand-primary)" : "transparent",
                      color: previewDevice === "desktop" ? "#ffffff" : "var(--text-muted)",
                    }}
                  >
                    Desktop
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewDevice("tablet")}
                    title="Tablet Preview"
                    style={{
                      padding: "3px 8px",
                      borderRadius: "4px",
                      border: "none",
                      fontSize: "0.72rem",
                      fontWeight: "600",
                      cursor: "pointer",
                      backgroundColor: previewDevice === "tablet" ? "var(--brand-primary)" : "transparent",
                      color: previewDevice === "tablet" ? "#ffffff" : "var(--text-muted)",
                    }}
                  >
                    Tablet
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewDevice("mobile")}
                    title="Mobile Preview"
                    style={{
                      padding: "3px 8px",
                      borderRadius: "4px",
                      border: "none",
                      fontSize: "0.72rem",
                      fontWeight: "600",
                      cursor: "pointer",
                      backgroundColor: previewDevice === "mobile" ? "var(--brand-primary)" : "transparent",
                      color: previewDevice === "mobile" ? "#ffffff" : "var(--text-muted)",
                    }}
                  >
                    Mobile
                  </button>
                </div>

                <span
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    padding: "2px 8px",
                    borderRadius: "4px",
                    backgroundColor: "var(--brand-subtle)",
                    color: "var(--brand-secondary)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {template}
                </span>
              </div>
            </div>

            {/* Scrollable Preview Canvas Container */}
            <div
              style={{
                padding: "24px 20px",
                maxHeight: "calc(100vh - 220px)",
                overflowY: "auto",
                backgroundColor: "var(--bg-app)",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "100%",
                  maxWidth: previewMaxWidth,
                  transition: "max-width var(--transition-normal)",
                }}
              >
                <PortfolioPreview />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Confirmation Modal for Reset */}
      <ConfirmationModal
        isOpen={isResetModalOpen}
        title="Reset Portfolio Data?"
        message="This will clear all custom personal information, skills, and projects, restoring the original initial demo state. This action cannot be undone."
        confirmLabel="Reset Everything"
        onConfirm={handleConfirmReset}
        onCancel={() => setIsResetModalOpen(false)}
      />

      {/* Toast Notification */}
      <Toast
        isVisible={isToastOpen}
        message={toastMessage}
        onClose={() => setIsToastOpen(false)}
      />

      {/* Responsive Stylesheet */}
      <style>{`
        @media (max-width: 960px) {
          .builder-workspace-container {
            flex-direction: column !important;
          }
          .editor-pane, .preview-pane {
            max-width: 100% !important;
            flex: 1 1 100% !important;
          }
          .preview-pane {
            position: static !important;
          }
          .mobile-view-toggle {
            display: inline-flex !important;
          }
          .mobile-hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
