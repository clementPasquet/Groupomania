const express =require('express');
const bodyParser=require('body-parser');
const userRoutes=require('./routes/utilisateur');
require('dotenv').config({path:'./config/.env'});
require('./config/db');
const app=express();

app.use(bodyParser.json());


//routes
app.use('/api/user', userRoutes)


//server
app.listen(process.env.PORT, () =>{
    console.log( ` Listening on port ${process.env.PORT} ` );
})