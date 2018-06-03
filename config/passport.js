const JwtStrategy=require('passport-jwt').Strategy;
const ExtractJwt=require('passport-jwt').ExtractJwt;
const User =require ('../models/user.js');
const config = require('../config/database');
module.exports=function(passport){
    let opts={};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{

        User.getUserById(jwt_payload._id,(err,usuario)=>{
            if(err){
                return done(err,false);
            }
            if(usuario){
                
                return done(null,usuario);
            }else{
               return done(null,false);
            }
        })
    }))
}