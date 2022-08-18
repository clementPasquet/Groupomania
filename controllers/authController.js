const UserModel =require ('../models/userModel')
const jwt =require('jsonwebtoken')

const maxAge=3*24*60*60*1000;
const createToken =(id)=>{
    return jwt.sign({id},process.env.TOKEN_SECRET,{
        expiresIn:maxAge
    })
};

module.exports.signUp= async (req,res)=>{
const {email,password}=req.body
console.log( email, password);

try {
    const user =await UserModel.create({email, password});
    res.statut(201).json({user: user._id});
}
catch(err){
    res.status(200).send({err})
}

}
module.exports.login= async (req,res)=>{
    const {email,password}=req.body
    
    try{
        const user =await UserModel.login(email,password);
        const token =createToken(user._id)
        res.cookie('jwt',token,{httpOnly: true, maxAge})
        res.status(200).json({user:user._id})
    }catch(err){
        res.status(500).json(err);
    }

}
module.exports.logout=(req,res)=>{}