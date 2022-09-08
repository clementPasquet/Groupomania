import React,{useState} from "react";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

   const submitLogin = (e) => {
    e.preventDefault();
    const emailError =document.querySelector("#emailError")
    const passwordError=document.querySelector("#passwordError")

    axios({
      method :"post",
      url:"http://localhost:5000/api/user/login",
      withCredentials:true,
      data: {
        email,
        password
      }
    })
    .then ((res)=>{
      if(res.data.errors){
        emailError.innerHTML=res.data.errors.email;
        passwordError.innerhTML=res.data.errors.password;
      }
      else{
        window.location="/feed"
      }
    })
    .catch((err)=>{
        console.log(err);
      });
   };

  return (
    <div>
      <form action="" onSubmit={submitLogin}>
        <label htmlFor="email">Email </label>
        <input
          type="text"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <div id="emailError"></div>

        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <div id="passwordError"></div>

        <input type="submit" value="Se connecter" />
      </form>
    </div>
  );
};

export default LoginForm;