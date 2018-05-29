const express=require('express');
const path = require ('path');
const bodyParser =require('body-parser');
const cors =require('cors');
const passport =require('passport');
const mongoose =require('mongoose');
const config =require('./config/database');//archivo para conectar ala base de datos

const app=express();//se usara express en esta aplicacione
const port =5000;//puerto
const users =require('./routes/users');//variable users cuando es llamada va a ese archivo
//Conectado a base de datos
mongoose.connect(config.database);
//al conectarse
mongoose.connection.on('connected',()=>{
    console.log('conectado a '+ config.database);
});
console.log("uri para conexcion "+process.env.MONGOURI);
mongoose.connection.on('error',(err)=>{
    console.log('Error a base de datos'+ err);
});


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
    console.log('el servidor empezo en '+ port);
    
})
