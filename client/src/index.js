import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignIn from './pages/SignIn'
import LogIn from './pages/LogIn'
import Feed from './pages/Feed'

import Error from './components/Error'
 
ReactDOM.render(
  <React.StrictMode>
      <Router>
          
              <Routes>            
              <Route exact path="/" element ={<SignIn/>}/>
              <Route  path="/login" element ={<LogIn/>}/>
              <Route  path="/feed" element ={<Feed />}/>
              <Route  element ={<Error/>}/>
              </Routes> 
      </Router>
  </React.StrictMode>,
document.getElementById('root')
)
