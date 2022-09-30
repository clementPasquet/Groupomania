import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignIn from './pages/SignIn'
import LogIn from './pages/LogIn'
import Feed from './pages/Feed'
import {Provider } from 'react-redux'
import Error from './components/Error'
import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from'./reducers';

const store=createStore(
  rootReducer, composeWithDevTools(applyMiddleware(thunk))
)
 
ReactDOM.render(
  <Provider store={store}>

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
  </Provider>,
document.getElementById('root')
)
