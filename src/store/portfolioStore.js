import { create } from "zustand";

// Helpers for localStorage
const loadState = () => {
  try {
    const stored = localStorage.getItem("portfolioData");
    if (stored) return JSON.parse(stored);
  } catch (err) {
    console.error("Failed to load portfolio data:", err);
  }
  return null;
};

const saveState = (state) => {
  try {
    localStorage.setItem("portfolioData", JSON.stringify(state));
  } catch (err) {
    console.error("Failed to save portfolio data:", err);
  }
};

const persistedState = loadState();

export const usePortfolioStore = create((set, get) => ({
  // User info including profile picture
  user: persistedState?.user || { name: "", title: "", bio: "", profilePicture: "" },

  // Skills
  skills: persistedState?.skills || [],

  // Projects
  projects: persistedState?.projects || [],

  // Social links
  socials: persistedState?.socials || { github: "", linkedin: "" },

  // Template selection
  template: persistedState?.template || "default",

  // Theme (light/dark)
  theme: persistedState?.theme || "light",

  // ------------------- ACTIONS -------------------

  // User
  updateUser: (field, value) => {
    set((state) => ({ user: { ...state.user, [field]: value } }));
    saveState(get());
  },

  updateProfilePicture: (url) => {
    set((state) => ({ user: { ...state.user, profilePicture: url } }));
    saveState(get());
  },

  // Skills
  addSkill: (skill) => {
    set((state) => ({ skills: [...state.skills, skill] }));
    saveState(get());
  },
  removeSkill: (index) => {
    set((state) => ({ skills: state.skills.filter((_, i) => i !== index) }));
    saveState(get());
  },

  // Projects
  addProject: (project) => {
    set((state) => ({ projects: [...state.projects, project] }));
    saveState(get());
  },
  removeProject: (index) => {
    set((state) => ({ projects: state.projects.filter((_, i) => i !== index) }));
    saveState(get());
  },

  // Social links
  updateSocial: (field, value) => {
    set((state) => ({ socials: { ...state.socials, [field]: value } }));
    saveState(get());
  },

  // Template
  setTemplate: (templateName) => {
    set({ template: templateName });
    saveState(get());
  },

  // Theme
  setTheme: (theme) => {
    set({ theme });
    saveState(get());
  },
}));
