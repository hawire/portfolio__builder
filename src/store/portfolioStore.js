import { create } from "zustand";

const STORAGE_KEY = "portfolioData";

// Helper to generate unique identifiers
const generateId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `id_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Initial default state
const initialData = {
  user: {
    name: "Alex Morgan",
    title: "Senior Full-Stack Engineer & Product Architect",
    bio: "Passionate software engineer building high-performance web applications, resilient backend architectures, and delightful digital user experiences.",
    location: "San Francisco, CA",
    email: "alex.morgan@example.com",
    profilePicture: "",
  },
  skills: [
    { id: "skill_1", name: "React / Next.js", category: "Frontend" },
    { id: "skill_2", name: "TypeScript", category: "Language" },
    { id: "skill_3", name: "Node.js & Express", category: "Backend" },
    { id: "skill_4", name: "Tailwind CSS", category: "UI/UX" },
    { id: "skill_5", name: "PostgreSQL & Prisma", category: "Database" },
    { id: "skill_6", name: "System Architecture", category: "Engineering" },
    { id: "skill_7", name: "Git & CI/CD Pipelines", category: "DevOps" },
  ],
  projects: [
    {
      id: "proj_1",
      title: "PulseFlow AI — Realtime Analytics Engine",
      description: "An intelligent event-streaming dashboard processing 50K events/sec with automated anomaly detection and visual forecasting.",
      technologies: "React 19, TypeScript, WebSockets, Tailwind, Node.js",
      link: "https://example.com/pulseflow",
      githubLink: "https://github.com/example/pulseflow",
    },
    {
      id: "proj_2",
      title: "CloudVault — Zero-Knowledge Asset Storage",
      description: "Client-encrypted cloud storage engine with seamless multi-device synchronization and selective granular permissions.",
      technologies: "Next.js, Web Crypto API, PostgreSQL, Docker",
      link: "https://example.com/cloudvault",
      githubLink: "https://github.com/example/cloudvault",
    },
  ],
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    website: "https://myportfolio.dev",
  },
  template: "default", // "default" | "minimal" | "modern" | "creative" | "executive"
  theme: "dark",       // "dark" | "light"
  accentColor: "#E54683",
};

// Defensive LocalStorage Loader with normalization
const loadState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;

    // Normalize skills (migrate string[] to { id, name }[])
    let normalizedSkills = [];
    if (Array.isArray(parsed.skills)) {
      normalizedSkills = parsed.skills.map((s) => {
        if (typeof s === "string") return { id: generateId(), name: s };
        if (s && typeof s === "object" && s.name) return { id: s.id || generateId(), ...s };
        return { id: generateId(), name: String(s || "") };
      }).filter((s) => s.name.trim().length > 0);
    }

    // Normalize projects (ensure IDs exist)
    let normalizedProjects = [];
    if (Array.isArray(parsed.projects)) {
      normalizedProjects = parsed.projects.map((p) => ({
        id: p.id || generateId(),
        title: p.title || "",
        description: p.description || "",
        technologies: p.technologies || "",
        link: p.link || "",
        githubLink: p.githubLink || "",
      }));
    }

    return {
      user: { ...initialData.user, ...(parsed.user || {}) },
      skills: normalizedSkills.length > 0 ? normalizedSkills : initialData.skills,
      projects: normalizedProjects.length > 0 ? normalizedProjects : initialData.projects,
      socials: { ...initialData.socials, ...(parsed.socials || {}) },
      template: parsed.template || initialData.template,
      theme: parsed.theme || initialData.theme,
      accentColor: parsed.accentColor || initialData.accentColor,
    };
  } catch (err) {
    console.error("Failed to parse stored portfolio data:", err);
    return null;
  }
};

// Debounced Storage Writer
let saveTimeout = null;
const saveState = (state) => {
  if (saveTimeout) clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    try {
      // Only serialize data fields, never action functions
      const payload = {
        user: state.user,
        skills: state.skills,
        projects: state.projects,
        socials: state.socials,
        template: state.template,
        theme: state.theme,
        accentColor: state.accentColor,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (err) {
      console.error("Failed to save portfolio data to LocalStorage:", err);
    }
  }, 200);
};

const persisted = loadState();

// Initialize document data-theme immediately
if (typeof document !== "undefined") {
  const initialTheme = persisted?.theme || initialData.theme;
  document.documentElement.setAttribute("data-theme", initialTheme);
}

export const usePortfolioStore = create((set, get) => ({
  user: persisted?.user || initialData.user,
  skills: persisted?.skills || initialData.skills,
  projects: persisted?.projects || initialData.projects,
  socials: persisted?.socials || initialData.socials,
  template: persisted?.template || initialData.template,
  theme: persisted?.theme || initialData.theme,
  accentColor: persisted?.accentColor || initialData.accentColor,

  // ------------------- ACTIONS -------------------

  // User Information
  updateUser: (field, value) => {
    set((state) => ({ user: { ...state.user, [field]: value } }));
    saveState(get());
  },

  updateProfilePicture: (url) => {
    set((state) => ({ user: { ...state.user, profilePicture: url } }));
    saveState(get());
  },

  removeProfilePicture: () => {
    set((state) => ({ user: { ...state.user, profilePicture: "" } }));
    saveState(get());
  },

  // Skills
  addSkill: (skillInput) => {
    const name = typeof skillInput === "string" ? skillInput.trim() : skillInput?.name?.trim();
    if (!name) return;
    const newSkill = {
      id: generateId(),
      name,
      category: skillInput?.category || "General",
    };
    set((state) => ({ skills: [...state.skills, newSkill] }));
    saveState(get());
  },

  updateSkill: (idOrIndex, newName) => {
    const trimmed = typeof newName === "string" ? newName.trim() : "";
    if (!trimmed) return;
    set((state) => ({
      skills: state.skills.map((s, idx) => {
        if (s.id === idOrIndex || idx === idOrIndex) {
          return { ...s, name: trimmed };
        }
        return s;
      }),
    }));
    saveState(get());
  },

  removeSkill: (idOrIndex) => {
    set((state) => ({
      skills: state.skills.filter((s, idx) => s.id !== idOrIndex && idx !== idOrIndex),
    }));
    saveState(get());
  },

  // Projects
  addProject: (projectData) => {
    const newProject = {
      id: generateId(),
      title: projectData.title ? projectData.title.trim() : "Untitled Project",
      description: projectData.description ? projectData.description.trim() : "",
      technologies: projectData.technologies ? projectData.technologies.trim() : "",
      link: projectData.link ? projectData.link.trim() : "",
      githubLink: projectData.githubLink ? projectData.githubLink.trim() : "",
    };
    set((state) => ({ projects: [...state.projects, newProject] }));
    saveState(get());
  },

  updateProject: (idOrIndex, updatedData) => {
    set((state) => ({
      projects: state.projects.map((p, idx) => {
        if (p.id === idOrIndex || idx === idOrIndex) {
          return {
            ...p,
            ...updatedData,
            id: p.id || generateId(),
          };
        }
        return p;
      }),
    }));
    saveState(get());
  },

  removeProject: (idOrIndex) => {
    set((state) => ({
      projects: state.projects.filter((p, idx) => p.id !== idOrIndex && idx !== idOrIndex),
    }));
    saveState(get());
  },

  // Social Links
  updateSocial: (field, value) => {
    set((state) => ({ socials: { ...state.socials, [field]: value } }));
    saveState(get());
  },

  // Template Selection
  setTemplate: (templateName) => {
    set({ template: templateName });
    saveState(get());
  },

  // Theme Switching
  setTheme: (newTheme) => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", newTheme);
    }
    set({ theme: newTheme });
    saveState(get());
  },

  // Accent Color Customization
  setAccentColor: (color) => {
    set({ accentColor: color });
    saveState(get());
  },

  // Clean Application Reset (no hard reload required)
  resetStore: () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn("Could not clear localStorage:", e);
    }
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", initialData.theme);
    }
    set({ ...initialData });
  },
}));
