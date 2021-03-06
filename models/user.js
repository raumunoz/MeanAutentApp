const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema({
  nombre: {
    type: String
  },
  correo: {
    type: String,
    required: false
  },
  nombreUsario: {
    type: String,
    required: true
  },
  contrasena: {
    type: String,
    required: true
  }
});
//usuario es el nombre del la collecion y el eschema es cual escquema tendara la coleccionson
const User = module.exports = mongoose.model('usuario', UserSchema);

module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}

module.exports.getUserByUsername = function(nombre, callback){
 
  const query = {nombre: nombre}
  User.findOne(query, callback);
 
}

module.exports.addUser = function(newUser, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.contrasena, salt, (err, hash) => {
      if(err) throw err;
      newUser.contrasena = hash;
      newUser.save(callback);
    });
  });
}
module.exports.comparePassword = function (candidatePassword, hash, callback) {
  //contraseña de candidato  y hash
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    console.log("el match es  " + isMatch);
    if (err) throw err;
    callback(null, isMatch);
  });
  /*bcrypt.compare(candidatePassword, hash, function(err, res) {
    // res == true
    console.log("el resulado es",res)
});*/
}