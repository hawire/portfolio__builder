import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ padding: "40px" }}>
      <h1>Portfolio Builder</h1>
      <p>Create your own portfolio without coding.</p>

      <Link to="/builder">
        <button>Start Building</button>
      </Link>
    </div>
  );
}
