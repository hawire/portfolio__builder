import { usePortfolioStore } from "../store/portfolioStore";

export default function ThemeSwitcher() {
  const theme = usePortfolioStore((state) => state.theme);
  const setTheme = usePortfolioStore((state) => state.setTheme);

  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>Theme</h3>
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
}
