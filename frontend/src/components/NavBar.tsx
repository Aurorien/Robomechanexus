import { Link } from "react-router-dom";
import "./Navbar.css";

function NavBar() {
  return (
    <nav>
      <ul className="nav-ul">
        <li className="nav-li">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-li">
          <Link to="/registry">Registry</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
