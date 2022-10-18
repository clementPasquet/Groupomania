import React from 'react';
import axios from 'axios';
import cookie from "js-cookie";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faRightFromBracket } from '@fortawesome/free-solid-svg-icons'



const Logout = () => {
        const removeCookie=(key)=>{
            if(window !== "undefined"){
                cookie.remove(key,{expires:1});
            }
        };
        const logout =async ()=> {
            await axios({
             method :'get',
             url:` ${process.env.REACT_APP_API_URL}api/user/logout`,
             withCredentials:true
            })
            .then(() => removeCookie('jwt'))
            .catch((err) => console.log(err));

            window.location="/login"
        }

        return (
        <li >
        <FontAwesomeIcon icon={faRightFromBracket} onClick={logout} />
      
        </li>
    );
};

export default Logout;
