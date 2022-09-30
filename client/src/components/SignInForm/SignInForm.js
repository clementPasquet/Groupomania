import React,{useState} from "react";
import axios from "axios";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

   const submitSignIn = async (e) => {
    e.preventDefault();
    const emailError =document.querySelector(".emailError")
    const passwordError=document.querySelector(".passwordError")

     await axios({
      method :"post",
      url:` ${process.env.REACT_APP_API_URL}api/user/register` ,
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
        console.log(res)
      }
    })
    .catch((err)=>{
        console.log(err);
      });
   };

  return (
    <div>
      <form action="submit" onSubmit={submitSignIn}>
        <label htmlFor="email">Email </label>
        <input
          type="text"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <div className="emailError"></div>

        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <div className="passwordError"></div>

        <input type="submit" value="S'inscrire" />
      </form>
    </div>
  );
};

export default SignInForm;
