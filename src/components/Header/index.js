import "./header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <Link className="logo" to="/">
        Cine<span className="logo-highlight">Media</span>
      </Link>
      <Link className="favorites-button" to="/favorites">
        Meus filmes
      </Link>
    </header>
  );
}
export default Header;
