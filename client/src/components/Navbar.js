import React from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import Logout from "./Logout";
import { useSelector } from "react-redux";
import UpdatePicture from "./UpdatePicture";

const Navbar = () => {
  const uid = useContext(UidContext);

  const userData = useSelector((state) => {
   
    return state.userReducer;
  });
  
  return (
    <nav>
      <div className="Navbar">
        <div className="Navbar-logo">
          <NavLink exact to="/feed">
            <div >
              <img
                src="../stuff/icon-left-font.png"
                alt="logo groupomania orange"
              />
            </div>
          </NavLink>
        </div>
        {uid ? (
          <div>
          <ul className="navbar-items">
            
            <li>
              <h4>Bonjour {userData.email}</h4>
            </li>
            <li className="logout">
              <Logout />
            </li>
         

          </ul>
          
            <div> <UpdatePicture /></div>
          </div>
        ) : (
          <ul>
            <li></li>
            <li className="Bonjour">
              <NavLink exact to="/login">Se connecter</NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
