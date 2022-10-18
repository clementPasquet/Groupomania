import React from 'react';
import SignInForm from '../components/SignInForm/SignInForm';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SignIn = () => {
   return (
    <div className="login" >
   <Header />
    <SignInForm />
    <Footer />
    </div>
    
   );
};

export default SignIn;