import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import {
  IconSparkles,
  IconArrowRight,
  IconEye,
  IconZap,
  IconShield,
  IconLayers,
  IconCode,
  IconBriefcase,
  IconDownload,
  IconCheck,
  IconPalette,
  IconGithub,
  IconExternalLink,
} from "../components/common/Icons";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-app)", display: "flex", flexDirection: "column" }}>
      <Navbar />

      {/* Hero Section */}
      <section
        style={{
          position: "relative",
          padding: "80px 20px 60px 20px",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        {/* Subtle Ambient Radial Glow */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "400px",
            background: "radial-gradient(circle, rgba(229, 70, 131, 0.18) 0%, rgba(229, 70, 131, 0) 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Badge */}
          <div style={{ display: "inline-flex", marginBottom: "20px" }}>
            <span className="badge-pink animate-fade-in">
              <IconSparkles size={14} />
              <span>Next-Gen Personal Portfolio Builder</span>
            </span>
          </div>

          {/* Main Headline */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.4rem, 5vw, 4.2rem)",
              fontWeight: "800",
              letterSpacing: "-0.04em",
              lineHeight: "1.15",
              marginBottom: "20px",
              color: "var(--text-primary)",
            }}
          >
            Build a professional portfolio that represents your{" "}
            <span className="text-gradient-pink">skills, projects,</span> and personality.
          </h1>

          {/* Supporting Subtitle */}
          <p
            style={{
              fontSize: "clamp(1.05rem, 2vw, 1.25rem)",
              color: "var(--text-secondary)",
              maxWidth: "680px",
              margin: "0 auto 36px auto",
              lineHeight: "1.65",
            }}
          >
            Craft stunning developer, designer, and student portfolios in real-time. Zero coding required, instant export to standalone HTML, and 100% private.
          </p>

          {/* CTA Buttons */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "14px",
              flexWrap: "wrap",
              marginBottom: "40px",
            }}
          >
            <Link
              to="/builder"
              className="btn-primary"
              style={{
                padding: "14px 32px",
                fontSize: "1.05rem",
                borderRadius: "var(--radius-md)",
              }}
            >
              <span>Start Building Free</span>
              <IconArrowRight size={18} />
            </Link>

            <a
              href="#templates"
              className="btn-secondary"
              style={{
                padding: "14px 28px",
                fontSize: "1.05rem",
                borderRadius: "var(--radius-md)",
              }}
            >
              <IconLayers size={18} />
              <span>Explore Templates</span>
            </a>
          </div>

          {/* Micro Value Proposition Badges */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "24px",
              flexWrap: "wrap",
              fontSize: "0.86rem",
              color: "var(--text-muted)",
            }}
          >
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <IconZap size={15} style={{ color: "var(--brand-primary)" }} /> Realtime Live Preview
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <IconShield size={15} style={{ color: "var(--brand-primary)" }} /> 100% Client-Side Private
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <IconPalette size={15} style={{ color: "var(--brand-primary)" }} /> 5 Designer Templates
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <IconDownload size={15} style={{ color: "var(--brand-primary)" }} /> Standalone HTML Export
            </span>
          </div>
        </div>

        {/* Hero Interactive Mockup Showcase */}
        <div
          style={{
            maxWidth: "1100px",
            margin: "50px auto 0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              borderRadius: "var(--radius-xl)",
              padding: "8px",
              background: "linear-gradient(180deg, rgba(229, 70, 131, 0.3) 0%, rgba(229, 70, 131, 0.05) 100%)",
              boxShadow: "0 25px 60px -15px rgba(229, 70, 131, 0.25)",
            }}
          >
            <div
              style={{
                borderRadius: "calc(var(--radius-xl) - 4px)",
                overflow: "hidden",
                border: "1px solid var(--border-medium)",
                backgroundColor: "var(--bg-surface)",
              }}
            >
              {/* Window Chrome */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 20px",
                  backgroundColor: "var(--bg-surface-elevated)",
                  borderBottom: "1px solid var(--border-subtle)",
                }}
              >
                <div style={{ display: "flex", gap: "8px" }}>
                  <span style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#ef4444" }} />
                  <span style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#f59e0b" }} />
                  <span style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#10b981" }} />
                </div>
                <div
                  style={{
                    backgroundColor: "var(--bg-app)",
                    padding: "4px 18px",
                    borderRadius: "6px",
                    fontSize: "0.78rem",
                    color: "var(--text-muted)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  portfolio-builder.dev/preview
                </div>
                <Link to="/builder" className="btn-primary" style={{ padding: "4px 12px", fontSize: "0.75rem" }}>
                  Edit in Studio
                </Link>
              </div>

              {/* Mockup Canvas */}
              <div
                style={{
                  padding: "40px",
                  textAlign: "left",
                  backgroundColor: "var(--bg-app)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "24px",
                    marginBottom: "28px",
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, var(--brand-primary), var(--brand-dark))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "2rem",
                      fontWeight: "800",
                      color: "#fff",
                      boxShadow: "0 0 20px rgba(229, 70, 131, 0.4)",
                    }}
                  >
                    B
                  </div>
                  <div>
                    <h2 style={{ fontSize: "1.75rem", fontWeight: "800", margin: 0, color: "var(--text-primary)" }}>
                      Bitania Finoteselam
                    </h2>
                    <h3 style={{ fontSize: "1rem", color: "var(--brand-primary)", fontWeight: "600", margin: "4px 0" }}>
                      Software Engineer & Product Designer
                    </h3>
                    <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", margin: 0 }}>
                      Passionate full-stack creator crafting modern web applications and developer tools.
                    </p>
                  </div>
                </div>

                {/* Skills tags preview */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "28px" }}>
                  {["React 19", "TypeScript", "Vite", "Zustand", "Tailwind CSS", "UI/UX Architecture", "REST APIs"].map((s) => (
                    <span
                      key={s}
                      style={{
                        padding: "5px 12px",
                        borderRadius: "var(--radius-full)",
                        backgroundColor: "var(--bg-surface)",
                        border: "1px solid var(--border-medium)",
                        fontSize: "0.82rem",
                        fontWeight: "600",
                        color: "var(--text-primary)",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Project card preview */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "16px",
                  }}
                >
                  <div
                    className="card-surface"
                    style={{
                      padding: "20px",
                      border: "1px solid var(--border-medium)",
                      backgroundColor: "var(--bg-surface)",
                    }}
                  >
                    <h4 style={{ margin: "0 0 6px 0", fontSize: "1.05rem", fontWeight: "700" }}>Portfolio Builder SaaS</h4>
                    <p style={{ margin: "0 0 12px 0", fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: "1.5" }}>
                      Interactive visual portfolio creator with live preview, multi-template switching, and client-side standalone HTML export.
                    </p>
                    <span style={{ fontSize: "0.75rem", color: "var(--brand-secondary)", fontWeight: "600" }}>
                      React 19 • Zustand • Vite
                    </span>
                  </div>

                  <div
                    className="card-surface"
                    style={{
                      padding: "20px",
                      border: "1px solid var(--border-medium)",
                      backgroundColor: "var(--bg-surface)",
                    }}
                  >
                    <h4 style={{ margin: "0 0 6px 0", fontSize: "1.05rem", fontWeight: "700" }}>CloudScale Monitoring</h4>
                    <p style={{ margin: "0 0 12px 0", fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: "1.5" }}>
                      Real-time distributed system telemetry dashboard with automatic metric anomaly detection.
                    </p>
                    <span style={{ fontSize: "0.75rem", color: "var(--brand-secondary)", fontWeight: "600" }}>
                      Next.js • WebSockets • PostgreSQL
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Bento Grid Section */}
      <section
        id="features"
        style={{
          padding: "80px 20px",
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <span className="badge-pink" style={{ marginBottom: "12px" }}>Engineered for Excellence</span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
              fontWeight: "800",
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
            }}
          >
            Everything you need to launch your personal brand
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", maxWidth: "600px", margin: "10px auto 0 auto" }}>
            Forget static resume templates. PortfolioCraft equips you with interactive tools built for modern developers and designers.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "20px",
          }}
        >
          {/* Feature 1 */}
          <div className="card-surface card-hover-glow" style={{ padding: "30px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                backgroundColor: "var(--brand-subtle)",
                color: "var(--brand-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "18px",
              }}
            >
              <IconEye size={22} />
            </div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "8px" }}>Realtime Dual-Pane Studio</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: "1.6" }}>
              Watch your changes update immediately in a responsive live preview as you type. Test across desktop, tablet, and mobile views.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="card-surface card-hover-glow" style={{ padding: "30px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                backgroundColor: "var(--brand-subtle)",
                color: "var(--brand-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "18px",
              }}
            >
              <IconLayers size={22} />
            </div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "8px" }}>5 Distinctive Templates</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: "1.6" }}>
              Switch seamlessly between Modern Classic, Minimal Editorial, Tech Vanguard, Creative Studio, and Executive Pro without re-entering data.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="card-surface card-hover-glow" style={{ padding: "30px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                backgroundColor: "var(--brand-subtle)",
                color: "var(--brand-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "18px",
              }}
            >
              <IconDownload size={22} />
            </div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "8px" }}>Zero-Lockin HTML Export</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: "1.6" }}>
              Download a clean, fully standalone, self-contained HTML file. Host it on GitHub Pages, Vercel, Netlify, or your personal server for free.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="card-surface card-hover-glow" style={{ padding: "30px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                backgroundColor: "var(--brand-subtle)",
                color: "var(--brand-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "18px",
              }}
            >
              <IconShield size={22} />
            </div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "8px" }}>100% Client-Side Privacy</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: "1.6" }}>
              No accounts, no tracking cookies, and no backend servers. All your portfolio data lives securely inside your own browser&apos;s LocalStorage.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="card-surface card-hover-glow" style={{ padding: "30px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                backgroundColor: "var(--brand-subtle)",
                color: "var(--brand-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "18px",
              }}
            >
              <IconPalette size={22} />
            </div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "8px" }}>Theme & Accent System</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: "1.6" }}>
              Switch between Light and Dark mode, and choose custom accent color palettes that represent your personal visual identity.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="card-surface card-hover-glow" style={{ padding: "30px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                backgroundColor: "var(--brand-subtle)",
                color: "var(--brand-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "18px",
              }}
            >
              <IconZap size={22} />
            </div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "8px" }}>Client Image Compression</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: "1.6" }}>
              Smart canvas resizing compresses profile pictures down to lightweight web assets, ensuring instantaneous loading and zero storage errors.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        style={{
          padding: "80px 20px",
          backgroundColor: "var(--bg-surface-elevated)",
          borderTop: "1px solid var(--border-subtle)",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
          <span className="badge-pink" style={{ marginBottom: "12px" }}>Simple 3-Step Workflow</span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
              fontWeight: "800",
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
              marginBottom: "40px",
            }}
          >
            From zero to published portfolio in 5 minutes
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
              textAlign: "left",
            }}
          >
            <div className="card-surface" style={{ padding: "28px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: "var(--brand-primary)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "700",
                  marginBottom: "16px",
                }}
              >
                1
              </div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: "700", marginBottom: "8px" }}>Enter Your Details</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: "1.6" }}>
                Add your name, headline, bio, and upload an avatar. List your technical skills and showcase your best projects with live links.
              </p>
            </div>

            <div className="card-surface" style={{ padding: "28px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: "var(--brand-primary)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "700",
                  marginBottom: "16px",
                }}
              >
                2
              </div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: "700", marginBottom: "8px" }}>Pick Template & Style</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: "1.6" }}>
                Choose from 5 signature visual layouts. Customize theme mode (Light or Dark) and set your custom brand accent colors.
              </p>
            </div>

            <div className="card-surface" style={{ padding: "28px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: "var(--brand-primary)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "700",
                  marginBottom: "16px",
                }}
              >
                3
              </div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: "700", marginBottom: "8px" }}>Export & Deploy</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: "1.6" }}>
                Download a clean, standalone HTML file or print directly to PDF. Upload it anywhere to start impressing recruiters immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Template Showcase Section */}
      <section
        id="templates"
        style={{
          padding: "80px 20px",
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <span className="badge-pink" style={{ marginBottom: "12px" }}>Curated Aesthetics</span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
              fontWeight: "800",
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
            }}
          >
            Explore Signature Templates
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", maxWidth: "600px", margin: "10px auto 0 auto" }}>
            Each template is crafted with distinct typography, spacing, and card layouts to fit your specific engineering or design role.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          {[
            { id: "default", name: "Modern Classic", role: "Full-Stack Developers", desc: "Balanced card grid with elegant borders and pink highlights." },
            { id: "minimal", name: "Minimalist Editorial", role: "Minimalists & Writers", desc: "Typography-focused layout with sleek hairline dividers." },
            { id: "modern", name: "Tech Vanguard", role: "Backend & DevOps", desc: "Dark glass aesthetic with vibrant pink glowing accents." },
            { id: "creative", name: "Creative Studio", role: "UI/UX & Product Designers", desc: "Expressive asymmetry and styled typography." },
          ].map((t) => (
            <div key={t.id} className="card-surface card-hover-glow" style={{ padding: "24px" }}>
              <div
                style={{
                  height: "90px",
                  borderRadius: "8px",
                  backgroundColor: "var(--bg-app)",
                  border: "1px solid var(--border-medium)",
                  marginBottom: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--brand-primary)",
                }}
              >
                <IconLayers size={28} />
              </div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "4px" }}>{t.name}</h3>
              <span style={{ fontSize: "0.75rem", color: "var(--brand-secondary)", fontWeight: "600", display: "block", marginBottom: "8px" }}>
                Best for: {t.role}
              </span>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: "1.5", marginBottom: "16px" }}>
                {t.desc}
              </p>
              <Link to="/builder" className="btn-secondary" style={{ width: "100%", padding: "8px 0", fontSize: "0.84rem" }}>
                Preview in Studio
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section
        style={{
          padding: "60px 20px 80px 20px",
          maxWidth: "1000px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <div
          style={{
            borderRadius: "var(--radius-xl)",
            padding: "50px 30px",
            textAlign: "center",
            background: "linear-gradient(135deg, rgba(229, 70, 131, 0.25) 0%, rgba(14, 19, 31, 0.95) 100%)",
            border: "1px solid rgba(229, 70, 131, 0.35)",
            boxShadow: "0 20px 50px -10px rgba(229, 70, 131, 0.3)",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
              fontWeight: "800",
              color: "#ffffff",
              marginBottom: "14px",
              letterSpacing: "-0.03em",
            }}
          >
            Ready to stand out in your next interview?
          </h2>
          <p
            style={{
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: "1.05rem",
              maxWidth: "560px",
              margin: "0 auto 30px auto",
              lineHeight: "1.6",
            }}
          >
            Join thousands of developers, designers, and students showcasing their best work with PortfolioCraft.
          </p>

          <Link
            to="/builder"
            className="btn-primary"
            style={{
              padding: "14px 36px",
              fontSize: "1.05rem",
              borderRadius: "var(--radius-md)",
            }}
          >
            <span>Launch Builder Now — It&apos;s Free</span>
            <IconArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          marginTop: "auto",
          borderTop: "1px solid var(--border-subtle)",
          padding: "36px 20px",
          backgroundColor: "var(--bg-surface)",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-dark) 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
              }}
            >
              <IconSparkles size={16} />
            </div>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: "700", fontSize: "1rem" }}>
              Portfolio<span style={{ color: "var(--brand-primary)" }}>Craft</span>
            </span>
          </div>

          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0 }}>
            Built with React 19, Vite, and Zustand. Created by{" "}
            <a
              href="https://github.com/hawire"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--brand-primary)", fontWeight: "600" }}
            >
              Bitania Finoteselam
            </a>
          </p>

          <div style={{ display: "flex", gap: "16px", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            <Link to="/builder" style={{ color: "inherit" }}>Studio</Link>
            <a href="https://github.com/hawire/portfolio__builder" target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
