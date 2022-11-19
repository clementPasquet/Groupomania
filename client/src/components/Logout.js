import React from "react";
import axios from "axios";
//on utilisera la bibliotheque js-cookie afin nde manipuler les cookies
import cookie from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const Logout = () => {
  // cette fonction recoit en parametre la clé du cookie et la supprime en front a l'aide de la methode remove()
  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };

  // cette fonction supprime le cookie sur la partie back end
  const logout = async () => {
    await axios({
      method: "get",
      url: ` ${process.env.REACT_APP_API_URL}api/user/logout`,
      withCredentials: true,
    })
      .then(() => removeCookie("jwt"))
      .catch((err) => console.log(err));

    window.location = "/login";
  };

  return (
    <li className="logout">
      <FontAwesomeIcon icon={faRightFromBracket} onClick={logout} />
    </li>
  );
};

export default Logout;
