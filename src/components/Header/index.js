import "./header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <Link className="logo" to="/">
        CineMedia
      </Link>
      <Link className="favorites-button" to="/favorites">
        Meus filmes
      </Link>
    </header>
  );
}
export default Header;
