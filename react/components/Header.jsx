import logo from "../../public/uploads/logo.png";
import { Link } from "react-router-dom";
import { ThemeChooser } from "./ThemeChooser";
import styled from "styled-components";

export function Header() {
  return (
    <CustomNav>
      <img src={logo} alt="logo of the site" />
      <h1>e-Shop</h1>
      <div>
        <CustomLink to="/">Home</CustomLink>
        <CustomLink to="/userAccount">Compte utilisateur</CustomLink>
        <CustomLink to="/contact">Contact</CustomLink>
      </div>
      <ThemeChooser />
    </CustomNav>
  );
}

const CustomNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  border-bottom: 1px solid #a3a3a3;

  & h1 {
    font-size: 3.1rem;
    text-decoration: underline;
  }
`;

const CustomLink = styled(Link)`
  font-size: 1.8rem;
  text-decoration: none;
  margin: 0 2rem;
  color: #5f65ff;
`;
