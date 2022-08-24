const express =require('express');
const bodyParser=require('body-parser');
const cookieParser =require('cookie-parser');
const userRoutes=require('./routes/utilisateur');
const postRoutes=require('./routes/post');
require('dotenv').config({path:'./config/.env'});
require('./config/db');
const {checkUser, requireAuth}=require("./middleware/authMiddleware")
const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());

//fais appel a l'authentification du token pour chaque routes

app.get('*',checkUser)
app.get('jwtid',requireAuth, (req,res)=>{
    res.status(200).send(res.locals.user.id)
});

//routes
app.use('/api/post', postRoutes)
app.use('/api/user', userRoutes)


//server
app.listen(process.env.PORT, () =>{
    console.log( ` Listening on port ${process.env.PORT} ` );
})