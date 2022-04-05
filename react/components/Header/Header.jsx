import "./Header.css";
import logo from "../../../public/uploads/logo.png";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <nav className="header">
      <img src={logo} alt="logo of the site" />
      <h1>e-Shop</h1>
      <div className="navLink">
        <Link to="/">Home</Link>
        <Link to="/userAccount">Compte utilisateur</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/promotions?color=aquamarine">Promotion</Link>
      </div>
    </nav>
  );
}
