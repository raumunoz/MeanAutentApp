const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

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

// Authenticate
router.post('/autenticacion', (req, res, next) => {
  res.send('AUTHENTICATE');
});

// Profile
router.get('/perfil', (req, res, next) => {
  res.send('PROFILE');
});

module.exports = router;
