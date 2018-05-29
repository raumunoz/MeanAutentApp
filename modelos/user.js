const mongoose=require('mongoose');
const bcrypt = requier('bcryptjs');
const bcrypt = requier('../modelos/database');

//escquema de base de datos

const UserSchema=mongoose.Schema({
    nombre:{
        type:String
    },
    correo:{
        type:String,
        required:true
    },
    nombreDeusuario:{
        type:String,
        required:true
    },
    contrasena:{
        type:String,
        required:true
    },
});
/*para poder usar el modelo fuera */
const User=module.exports=mongoose.model('User',UserSchema);
module.exports.getUserById=function(id,callback){
    User.findById(id,callback);
}

module.exports.getUserByUsername=function(nombreDeusuario,callback){
    const query ={nombreDeusuario:nombreDeusuario}
    User.findOne(query,callback);
}