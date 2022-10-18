import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignIn from '../../pages/SignIn'
import LogIn from '../../pages/LogIn'
import Feed from '../../pages/Feed'
import Error from '../../components/Error'


const index = () => {
    return (
        <Router>

          
        <Routes>   

        <Route exact path="/" element ={<SignIn/>}/>
        <Route  path="/login" element ={<LogIn/>}/>
        <Route  path="/feed" element ={<Feed />}/>
        <Route  element ={<Error/>}/>
        
        </Routes> 

</Router>
    );
};

export default index;