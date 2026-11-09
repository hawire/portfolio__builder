import { Link, useLocation } from "react-router-dom";
import { usePortfolioStore } from "../../store/portfolioStore";
import { IconSparkles, IconSun, IconMoon, IconArrowRight } from "./Icons";

export default function Navbar() {
  const location = useLocation();
  const theme = usePortfolioStore((state) => state.theme);
  const setTheme = usePortfolioStore((state) => state.setTheme);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const isBuilder = location.pathname === "/builder";

  return (
    <header
      className="glass-panel no-print"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        width: "100%",
        borderBottom: "1px solid var(--border-subtle)",
        transition: "all var(--transition-normal)",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        {/* Brand Logo */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-dark) 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              boxShadow: "0 4px 12px rgba(229, 70, 131, 0.35)",
            }}
          >
            <IconSparkles size={20} />
          </div>
          <div>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "700",
                fontSize: "1.15rem",
                letterSpacing: "-0.02em",
                color: "var(--text-primary)",
              }}
            >
              Portfolio<span style={{ color: "var(--brand-primary)" }}>Craft</span>
            </span>
          </div>
        </Link>

        {/* Center Nav Links (Hidden on builder page or mobile) */}
        {!isBuilder && (
          <nav
            style={{
              display: "none",
              alignItems: "center",
              gap: "28px",
              fontSize: "0.92rem",
              fontWeight: "500",
              color: "var(--text-secondary)",
            }}
            className="desktop-nav"
          >
            <a href="#templates" style={{ transition: "color var(--transition-fast)" }} onMouseEnter={(e) => e.target.style.color = "var(--brand-primary)"} onMouseLeave={(e) => e.target.style.color = "var(--text-secondary)"}>Templates</a>
            <a href="#features" style={{ transition: "color var(--transition-fast)" }} onMouseEnter={(e) => e.target.style.color = "var(--brand-primary)"} onMouseLeave={(e) => e.target.style.color = "var(--text-secondary)"}>Features</a>
            <a href="#how-it-works" style={{ transition: "color var(--transition-fast)" }} onMouseEnter={(e) => e.target.style.color = "var(--brand-primary)"} onMouseLeave={(e) => e.target.style.color = "var(--text-secondary)"}>How It Works</a>
          </nav>
        )}

        {/* Right Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="btn-ghost"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            aria-label="Toggle color theme"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-subtle)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {theme === "dark" ? (
              <IconSun size={19} style={{ color: "#fbbf24" }} />
            ) : (
              <IconMoon size={19} style={{ color: "var(--brand-primary)" }} />
            )}
          </button>

          {/* Builder Link or Back Link */}
          {!isBuilder ? (
            <Link to="/builder" className="btn-primary" style={{ padding: "8px 18px", fontSize: "0.88rem" }}>
              <span>Launch Builder</span>
              <IconArrowRight size={15} />
            </Link>
          ) : (
            <Link to="/" className="btn-secondary" style={{ padding: "8px 16px", fontSize: "0.88rem" }}>
              <span>← Back to Home</span>
            </Link>
          )}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
}
