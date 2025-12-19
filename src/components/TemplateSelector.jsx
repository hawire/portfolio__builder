import { usePortfolioStore } from "../store/portfolioStore";

export default function TemplateSelector() {
  const template = usePortfolioStore((state) => state.template);
  const setTemplate = usePortfolioStore((state) => state.setTemplate);

  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>Select Template</h3>
      <select
        value={template}
        onChange={(e) => setTemplate(e.target.value)}
        style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
      >
        <option value="default">Default</option>
        <option value="minimal">Minimal</option>
        <option value="modern">Modern</option>
      </select>
    </div>
  );
}
