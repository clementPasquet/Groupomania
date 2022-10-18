import React ,{useEffect, useState} from 'react'
import {UidContext} from "./components/AppContext"
import axios from "axios"
import {useDispatch} from'react-redux';
import {getUser} from './reducers/userActions';
import Routes from './components/Routes';

function App() {
  const [uid, setUid]=useState(null);
  const dispatch =useDispatch();

  useEffect(()=>{

    const getID =async () =>{
      await axios ({
        method:"get",
        url:` ${process.env.REACT_APP_API_URL}jwtid` ,
        withCredentials:true, 
      })
      .then((res)=>{
        setUid(res.data);
        dispatch(getUser(res.data));
        
      })
      .catch((err)=>console.log("veuillez vous connecter ou crée un compte"))
    }
    getID();
    

  }, [uid,dispatch]);
  return (
    <UidContext.Provider value={uid }>
       <Routes />
    </UidContext.Provider>

  );
}

export default App;