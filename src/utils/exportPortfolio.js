/**
 * Contextual HTML Entity Escaper to prevent Stored XSS.
 */
function escapeHTML(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Validates URLs to prevent javascript: and data: protocol execution.
 */
function sanitizeUrl(url) {
  if (!url) return "";
  const trimmed = String(url).trim();
  if (/^(https?:\/\/|mailto:)/i.test(trimmed)) {
    return escapeHTML(trimmed);
  }
  if (/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(trimmed) && !trimmed.includes(":")) {
    return `https://${escapeHTML(trimmed)}`;
  }
  return "";
}

/**
 * Generates and downloads a standalone, responsive, XSS-safe HTML file.
 */
export function exportPortfolioHTML(portfolioData) {
  const {
    user = {},
    skills = [],
    projects = [],
    socials = {},
    template = "default",
    theme = "dark",
    accentColor = "#E54683",
  } = portfolioData;

  const isDark = theme === "dark";
  const isMinimal = template === "minimal";
  const isModern = template === "modern";

  const name = escapeHTML(user.name || "My Portfolio");
  const title = escapeHTML(user.title || "Professional Portfolio");
  const bio = escapeHTML(user.bio || "");
  const location = escapeHTML(user.location || "");
  const email = escapeHTML(user.email || "");
  const profilePic = user.profilePicture ? user.profilePicture : "";

  // Theme palettes
  const bg = isDark ? "#090d16" : "#f8fafc";
  const cardBg = isDark ? "#111827" : "#ffffff";
  const textPrimary = isDark ? "#f3f4f6" : "#0f172a";
  const textMuted = isDark ? "#9ca3af" : "#64748b";
  const border = isDark ? "#1f293d" : "#e2e8f0";
  const accent = accentColor;
  const accentLight = isDark ? "rgba(229, 70, 131, 0.15)" : "rgba(229, 70, 131, 0.1)";

  const fontStack = isMinimal
    ? "'JetBrains Mono', monospace, -apple-system, sans-serif"
    : "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif";

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} — ${title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: ${fontStack};
      background-color: ${bg};
      color: ${textPrimary};
      line-height: 1.6;
      padding: 40px 20px;
      min-height: 100vh;
    }
    .container {
      max-width: 900px;
      margin: 0 auto;
    }
    .header-card {
      background: ${isMinimal ? "transparent" : cardBg};
      border: ${isMinimal ? "none" : `1px solid ${border}`};
      border-bottom: ${isMinimal ? `1px solid ${border}` : `1px solid ${border}`};
      border-radius: ${isMinimal ? "0" : "20px"};
      padding: ${isMinimal ? "20px 0 30px 0" : "40px"};
      margin-bottom: 30px;
      display: flex;
      gap: 30px;
      align-items: center;
      box-shadow: ${isMinimal ? "none" : "0 10px 30px -10px rgba(0, 0, 0, 0.1)"};
    }
    .avatar {
      width: ${isMinimal ? "100px" : "130px"};
      height: ${isMinimal ? "100px" : "130px"};
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid ${accent};
      box-shadow: ${isModern ? `0 0 20px ${accent}` : "none"};
      flex-shrink: 0;
    }
    .header-info h1 {
      font-size: 2.2rem;
      font-weight: 800;
      letter-spacing: -0.03em;
      margin-bottom: 6px;
    }
    .header-info h2 {
      font-size: 1.15rem;
      color: ${accent};
      font-weight: 600;
      margin-bottom: 12px;
    }
    .header-info p {
      color: ${textMuted};
      font-size: 0.95rem;
      line-height: 1.7;
    }
    .meta-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 14px;
      font-size: 0.85rem;
      color: ${textMuted};
    }
    .section-title {
      font-size: 1.35rem;
      font-weight: 700;
      margin-bottom: 18px;
      display: flex;
      align-items: center;
      gap: 10px;
      letter-spacing: -0.02em;
    }
    .section-title::before {
      content: "";
      width: 4px;
      height: 18px;
      background: ${accent};
      border-radius: 4px;
      display: inline-block;
    }
    .card {
      background: ${isMinimal ? "transparent" : cardBg};
      border: ${isMinimal ? "none" : `1px solid ${border}`};
      border-bottom: ${isMinimal ? `1px solid ${border}` : undefined};
      border-radius: ${isMinimal ? "0" : "16px"};
      padding: ${isMinimal ? "20px 0" : "26px"};
      margin-bottom: 28px;
    }
    .skills-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    .skill-chip {
      background: ${isMinimal ? "transparent" : accentLight};
      color: ${isDark ? "#ffa7c5" : "#b23466"};
      border: 1px solid ${isMinimal ? border : "rgba(229, 70, 131, 0.25)"};
      padding: 6px 14px;
      border-radius: 999px;
      font-size: 0.88rem;
      font-weight: 600;
    }
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 20px;
    }
    .project-card {
      background: ${isMinimal ? "transparent" : isDark ? "#0d131f" : "#f1f5f9"};
      border: 1px solid ${border};
      border-radius: ${isMinimal ? "8px" : "14px"};
      padding: 22px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .project-card h3 {
      font-size: 1.15rem;
      font-weight: 700;
      margin-bottom: 8px;
    }
    .project-card p {
      color: ${textMuted};
      font-size: 0.9rem;
      line-height: 1.6;
      margin-bottom: 16px;
      flex-grow: 1;
    }
    .project-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 14px;
    }
    .project-tag {
      font-size: 0.75rem;
      background: ${isDark ? "#1e293b" : "#e2e8f0"};
      color: ${textMuted};
      padding: 3px 8px;
      border-radius: 6px;
      font-weight: 500;
    }
    .project-links {
      display: flex;
      gap: 12px;
      margin-top: auto;
    }
    .btn-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: ${accent};
      text-decoration: none;
      font-size: 0.88rem;
      font-weight: 600;
    }
    .btn-link:hover { text-decoration: underline; }
    .social-links {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }
    .social-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: ${isMinimal ? "transparent" : isDark ? "#161f30" : "#f1f5f9"};
      border: 1px solid ${border};
      color: ${textPrimary};
      padding: 10px 18px;
      border-radius: 10px;
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 600;
    }
    .social-badge:hover {
      border-color: ${accent};
      color: ${accent};
    }
    footer {
      text-align: center;
      margin-top: 50px;
      color: ${textMuted};
      font-size: 0.85rem;
    }
    @media (max-width: 640px) {
      .header-card { flex-direction: column; text-align: center; padding: 24px; }
      .avatar { width: 110px; height: 110px; }
      .meta-tags { justify-content: center; }
      .projects-grid { grid-template-columns: 1fr; }
    }
    @media print {
      body { background: #fff !important; color: #000 !important; padding: 0 !important; }
      .card, .header-card, .project-card { border-color: #ddd !important; box-shadow: none !important; }
      .social-badge, .btn-link { color: #000 !important; }
    }
  </style>
</head>
<body>
  <div class="container">
    <header class="header-card">
      ${profilePic ? `<img src="${profilePic}" alt="${name}" class="avatar" />` : ""}
      <div class="header-info">
        <h1>${name}</h1>
        <h2>${title}</h2>
        ${bio ? `<p>${bio}</p>` : ""}
        <div class="meta-tags">
          ${location ? `<span>📍 ${location}</span>` : ""}
          ${email ? `<span>✉️ <a href="mailto:${email}" style="color:inherit;">${email}</a></span>` : ""}
        </div>
      </div>
    </header>

    ${skills && skills.length > 0 ? `
    <section class="card">
      <h2 class="section-title">Technical Skills & Expertise</h2>
      <div class="skills-grid">
        ${skills.map((s) => {
          const val = typeof s === "object" ? s.name : s;
          return `<span class="skill-chip">${escapeHTML(val)}</span>`;
        }).join("")}
      </div>
    </section>` : ""}

    ${projects && projects.length > 0 ? `
    <section class="card">
      <h2 class="section-title">Featured Projects</h2>
      <div class="projects-grid">
        ${projects.map((p) => {
          const demoLink = sanitizeUrl(p.link);
          const ghLink = sanitizeUrl(p.githubLink);
          const techs = p.technologies ? p.technologies.split(",").map(t => t.trim()).filter(Boolean) : [];
          return `
          <div class="project-card">
            <div>
              <h3>${escapeHTML(p.title)}</h3>
              <p>${escapeHTML(p.description)}</p>
              ${techs.length > 0 ? `
              <div class="project-tags">
                ${techs.map(t => `<span class="project-tag">${escapeHTML(t)}</span>`).join("")}
              </div>` : ""}
            </div>
            <div class="project-links">
              ${demoLink ? `<a href="${demoLink}" target="_blank" rel="noopener noreferrer" class="btn-link">Live Demo ↗</a>` : ""}
              ${ghLink ? `<a href="${ghLink}" target="_blank" rel="noopener noreferrer" class="btn-link">GitHub ↗</a>` : ""}
            </div>
          </div>`;
        }).join("")}
      </div>
    </section>` : ""}

    ${(socials.github || socials.linkedin || socials.twitter || socials.website) ? `
    <section class="card">
      <h2 class="section-title">Connect & Socials</h2>
      <div class="social-links">
        ${socials.github ? `<a href="${sanitizeUrl(socials.github)}" target="_blank" rel="noopener noreferrer" class="social-badge">GitHub</a>` : ""}
        ${socials.linkedin ? `<a href="${sanitizeUrl(socials.linkedin)}" target="_blank" rel="noopener noreferrer" class="social-badge">LinkedIn</a>` : ""}
        ${socials.twitter ? `<a href="${sanitizeUrl(socials.twitter)}" target="_blank" rel="noopener noreferrer" class="social-badge">Twitter / X</a>` : ""}
        ${socials.website ? `<a href="${sanitizeUrl(socials.website)}" target="_blank" rel="noopener noreferrer" class="social-badge">Website</a>` : ""}
      </div>
    </section>` : ""}

    <footer>
      <p>Built with PortfolioCraft • Template: ${escapeHTML(template)}</p>
    </footer>
  </div>
</body>
</html>`;

  // Trigger client-side download
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${(user.name || "portfolio").toLowerCase().replace(/[^a-z0-9]/g, "_")}_portfolio.html`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
