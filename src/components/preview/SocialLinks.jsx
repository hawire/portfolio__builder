import { usePortfolioStore } from "../../store/portfolioStore";

export default function SocialLinks() {
  const socials = usePortfolioStore((state) => state.socials);

  if (!socials.github && !socials.linkedin) return null;

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Social Links</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {socials.github && (
          <li>
            <a href={socials.github} target="_blank" rel="noreferrer" style={{ color: "#0070f3" }}>
              GitHub
            </a>
          </li>
        )}
        {socials.linkedin && (
          <li>
            <a href={socials.linkedin} target="_blank" rel="noreferrer" style={{ color: "#0070f3" }}>
              LinkedIn
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}
