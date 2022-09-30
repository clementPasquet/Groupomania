import React from 'react';
import {useContext} from'react'
import { NavLink } from 'react-router-dom';
import {UidContext } from "./AppContext";
import Logout from "./Logout";
import {useSelector} from'react-redux';

const Navbar = () => {

const uid =useContext(UidContext);
const userData =useSelector((state) => state.userReducer);
;
    return (
    <nav>
        <div className="Navbar" > 
        <div className="Navbar-logo">
            <NavLink exact to ="/feed">
              <div className="Navbar-logo">
                <img src="../../stuff/icon-left-font.png" alt="logo groupomania orange" />
              </div>
            </NavLink>
        </div>
        {uid ? (
            <ul>
                <li></li>
                <li className="Bonjour">
                    <NavLink exact to="/login">
                    </NavLink>
                </li>
              
            </ul>
        ): (
            <ul>
                <li></li>
                <li>
                 <NavLink exact to="/profil">
                 <h4>Bonjour {userData.email}</h4>

                    <img src="../../stuff/user" alt="logo de la page profil" />
                 </NavLink>
                </li>
                <li> <Logout /></li>
            </ul>
        )}
        </div>
    </nav>
       
    );
};

export default Navbar;