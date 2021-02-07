import "../styles/Nav.css";
import { Link } from "react-router-dom";
import loginContext from "../contexts/loginContext";
import { useContext, useEffect, useState } from "react";
import ListItem from "./ListItem";
const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { loggedUser } = useContext(loginContext);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="Nav">
      <div className="container">
        <div className="nav_outer_container">
          <div className="nav_main_container">
            <h1 className="logo">
              <Link to="/">Omar Market</Link>
            </h1>
            <i className="ico fas fa-bars" onClick={toggleMenu}></i>
          </div>
          <ul className={isOpen ? "list open" : "list"}>
            <ListItem to="/" name="Home" />
            <ListItem to="/products" name="products" />
            <ListItem to="/about" name="about" />

            {loggedUser.isadmin ? (
              <ListItem to="/dashboard" name="dashboard" />
            ) : null}

            <ListItem to="/sign-up" name="Sign Up" />
            <ListItem
              to="/sign-in"
              name={
                loggedUser.email ? `${loggedUser.firstname} account` : "Sign In"
              }
            />
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Nav;
