import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  nombreUsario: String;
  contrasena: string;
  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessagesService:FlashMessagesService
  ) { }

  ngOnInit() {
  }
  onLoginSubmit() {
    const usuario = {
      nombreUsario: this.nombreUsario,
      contrasena: this.contrasena
    }
   // console.log("el usaurio es",usuario);
    this.authService.authenticateUser(usuario).subscribe(data=>{
      if(data.success){
     //console.log("data usuario es",JSON.stringify(data.usuario) );
        this.authService.storeUserData(data.token, JSON.stringify(data.usuario));
        this.flashMessagesService.show('estas logeado',{
          cssClass:'alert-succes',
          timeout:5000
        });
      }else{
        //dato mandando desde del servidor
        this.flashMessagesService.show(data.msg,{
          cssClass:'alert-danger',
          timeout:5000
        });
        this.router.navigate(['login'])
      }
    });
  }
}
