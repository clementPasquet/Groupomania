import React, { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector("#emailError");
    const passwordError = document.querySelector("#passwordError");

    axios({
      method: "post",
      url: ` ${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        if (res.data.errors) {
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          window.location = "/feed";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="connectionForm">
      <h1>Connectez vous !</h1>
      <form className="connectionForm__Form" action="" onSubmit={submitLogin}>
        <label htmlFor="email">Email </label>
        <input
          className="connectionForm__input"
          type="text"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <div className="errors" id="emailError"></div>

        <label htmlFor="password">Mot de passe</label>
        <input
          className="connectionForm__input"
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <div className="errors" id="passwordError"></div>

        <input
          className="connectionForm__btn"
          type="submit"
          value="Se connecter"
        />
      </form>
      <img
        className="accueil-logo"
        src="./stuff/iconLeftFont.png"
        alt="logo groupomania orange"
      />
    </div>
  );
};

export default LoginForm;
