import React from 'react';
import LoginForm from '../components/LoginForm/LoginForm';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LogIn = () => {
    return (
        <div className="login">
            <Header />
        
    <LoginForm />
    <div>
        <Footer />
    </div>
        </div>
    );
};

export default LogIn;