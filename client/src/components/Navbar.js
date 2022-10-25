import React from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import Logout from "./Logout";
import { useSelector } from "react-redux";

const Navbar = () => {
  const uid = useContext(UidContext);

  const userData = useSelector((state) => {
    return state.userReducer;
  });

  return (
    <nav className="Navbar__header">
      <div className="Navbar">
        <div className="imgLogo">
          <img
            className="imgLogo__pic"
            src="./stuff/iconLeftFont.png"
            alt="logo groupomania orange"
          />
        </div>
        {uid ? (
          <div className="Navbar__header--right">
            <ul className="navbar-items">
              <li>
                <h4>Bonjour {userData.email}</h4>
              </li>
              <li className="logout">
                <Logout />
              </li>
            </ul>
          </div>
        ) : (
          <ul>
            <li className="Bonjour">
              <NavLink className="Bonjour__text" exact to="/login">
                Cliquez ici pour vous connectez et interagir !
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
