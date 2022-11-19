import React from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import Logout from "./Logout";
import { useSelector } from "react-redux";

const Navbar = () => {
  const uid = useContext(UidContext);

  // on utilise le hook useSelector pour recupérer les informations de notre utilisateur connecté depuis notre store et les stockés dans userData.
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
              
                <Logout />
              
            </ul>
          </div>
        ) : (
          <div className="Bonjour">
            <NavLink className="Bonjour__text" to="/login">
              Cliquez ici pour vous connectez et interagir !
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
