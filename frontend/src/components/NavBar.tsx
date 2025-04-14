import "./Navbar.css";
import OctaButton from "./OctaButton";

function NavBar() {
  return (
    <nav>
      <ul className="nav-ul">
        <li className="nav-li">
          <OctaButton text="Home" linkPath="/" />
        </li>
        <li className="nav-li">
          <OctaButton text="Registry" linkPath="/registry" />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
