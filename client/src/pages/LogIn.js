import React from 'react';
import LoginForm from '../components/LoginForm/LoginForm';
import Header from '../components/Header';

const LogIn = () => {
    return (
        <div>
            <Header />
        <h1>Connectez vous !</h1>
    <LoginForm />
        </div>
    );
};

export default LogIn;