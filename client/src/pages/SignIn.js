import React from 'react';
import SignInForm from '../components/SignInForm/SignInForm';
import Header from '../components/Routes';

const SignIn = () => {
   return (
    <div >
   <Header />
    <h1>Inscrivez vous !</h1>
    <SignInForm />
    </div>
    
   );
};

export default SignIn;