module.exports.signUpErrors =(err)=>{
    let errors ={email:'',password:''}

    if(err.message.includes('email'))
    errors.email='email incorrect';
    if (err.message.includes('password'))
    errors.password='le mot de passe doit faire 6 caracteres minimum'

    if(err.code==11000 && Object.keys(err.keyValue)[0].includes('email'))
    errors.mail='email déja enregistré'

    return errors;
}

module.exports.loginErrors =(err)=>{
    let errors ={email:'',password:''}

    if(err.message.includes('email'))
    errors.email='email inconnu';
    if (err.message.includes('password'))
    errors.password='le mot de passe ne correspond pas'

    if(err.code==11000 && Object.keys(err.keyValue)[0].includes('email'))
    errors.mail='email déja enregistré'

    return errors;
}