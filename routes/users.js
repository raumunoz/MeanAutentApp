const exppres=require('express');
const router =exppres.Router();//ruter

//Register
/*automaticamente pondra la direcion del usuario */
router.get('/registro',(req,res,next)=>{
    res.send('página de registro');
});
//autentificacion 
router.post('/autenticate',(req,res,next)=>{
    res.send('autentificación');
});
//para perfil
router.get('/perfil',(req,res,next)=>{
    res.send('perfil');
});

/*se require exportar el router para que sea mostrado ene el servidor*/
module.exports=router;