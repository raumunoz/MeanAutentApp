const express=require('express');
const path = require ('path');
const bodyParser =require('body-parser');
const cors =require('cors');
const passport =require('passport');
const mongoose =require('mongoose');
const config =require('./config/database');
const port =5000;//puerto
//Conectado a base de datos
mongoose.connect(config.database);
//al conectarse
mongoose.connection.on('connected',()=>{
    console.log('connected a base de datos'+ config.database);
});

mongoose.connection.on('error',()=>{
    console.log('Error a base de datos'+ config.database);
});
mongoose.connection.on('error',()=>{
    console.log("codigiyo")
});
const app=express();//se usara express en esta aplicacione

const users =require('./routes/users')
app.use(cors());//habilata cors
//body parser midleware
app.use(bodyParser.json());
//manda a el archivo publico que es estatico
app.use(express.static(path.join(__dirname,'public')));
app.use('/users',users);
//para el idexe
app.get('/',(req,res)=>{
    res.send('ruta invalida');
});
app.listen(port,()=>{
    console.log('el servidor empezo en '+3000);
    
})
