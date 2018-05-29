const exppres=require('express');
const router =exppres.Router();

//Register
router.get('/registro',(req,res,next)=>{
    res.send('Registro');
});
router.post('/autentificacion',(req,res,next)=>{
    res.send('autentificación');
});
router.get('/perfil',(req,res,next)=>{
    res.send('perfil');
});
router.get('/validar',(req,res,next)=>{
    res.send('validar');
});
module.exports=router;