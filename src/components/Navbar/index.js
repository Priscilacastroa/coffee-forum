import { Link } from "react-router-dom";
export function Navbar() {
  return (
    <nav className="navbar navbar-light bg-light">
      <h1>
        <Link to="/" style={{ textDecoration: "none" }}>
          {" "}
          Coffee Forum{" "}
        </Link>
      </h1>
      <div>
        <Link to="/create-topic">Criar um topico</Link>
      </div>
    </nav>
  );
}
