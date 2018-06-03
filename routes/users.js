const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config=require('../config/database');
//al parecer esta linea agrega config/passport al pasport si 
//es que ya tiene mas
require('../config/passport')(passport);
// Register post que se hace desde el cliente 
//para registrarse
router.post('/registro', (req, res, next) => {
  let newUser = new User({
    nombre: req.body.nombre,
    correo: req.body.correo,
    nombreUsario: req.body.nombreUsario,
    contrasena: req.body.contrasena
  });

  User.addUser(newUser, (err, user) => {
    if(err){
      console.log(err);
      res.json({success: false, msg:'Failed to register user'});
    } else {
      res.json({success: true, msg:'User registered'});
    }
  });
});
//router.post('/autenticacion', (req, res, next) => {
// Authenticate
router.post('/autenticacion', (req, res, next) => {
  const nombre= req.body.nombre;
  const contrasena= req.body.contrasena;
  
  User.getUserByUsername(nombre,function(err,user){
    
    if(err){
      throw err;
    }
    if(!user){
      return res.json({success:false,msg:"usuario no encontrado" });
    }
    
    User.comparePassword(contrasena,user.contrasena,(err,isMatch)=>{
      console.log("la contraseña del usuario es "+contrasena);
      console.log(isMatch);
      if(err)throw err;
      if(isMatch){
        const token=jwt.sign(user.toJSON(),config.secret,{
          expiresIn:604800
        });
        res.json({
          success:true,
          token:'JWT  '+token,
          usuario:{
            id:user._id,
            name:user.nombre,
            nombreUsario:user.nombreUsario,
            correo:user.correo

          }
        });
      }else{
        return res.json({success:false,msg:'contraseña incorrecta'});
      }
    })
  })
  
});

// Profile
router.get('/perfil',  passport.authenticate('jwt', { session: false }),(req, res, next) => {

  console.log("---------USUARIO----------"+req.user);
  //req.user lo manda el usuario y en esta linea se vuelve a regresar
  res.json({usuario: req.user});
});

module.exports = router;