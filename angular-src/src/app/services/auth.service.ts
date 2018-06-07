import { Injectable } from '@angular/core';
import {Http, Headers, Jsonp} from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';

import 'rxjs/add/operator/map';
@Injectable()
export class AuthService {
  authToken:any;
  user:any;
  constructor(private http:Http) { 

  }
  
  registerUser(user){
    let headers = new Headers();

    /*esta funcion se ancarga de hacer un post dirigido para con el servidor mandara el usuario y el header el cual
    le dice al servidor que sera de tipo json*/
    headers.append('Content-Type','application/json');
    return this.http.post('/users/registro',user,{headers:headers})
    .map(res=>res.json());
  }
 
 
  authenticateUser(user){
    let headers = new Headers();
   // console.log("usuario a autenticar",user);
    /*esta funcion se ancarga de hacer un post dirigido para con el servidor mandara el usuario y el header el cual
    le dice al servidor que sera de tipo json*/
    headers.append('Content-Type','application/json');
    return this.http.post('/users/autenticacion',user,{headers:headers})
    .map(res=>res.json());
  }
  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('/users/perfil', {headers: headers})
      .map((res) =>{
        console.log("respuesta json",res.json());
       return res.json()} );
  }

  loadToken(){
    const token=localStorage.getItem('id_token');
   
    this.authToken=token;

  }
  storeUserData(token,user){
    //id_token es un pat que ya esta predefinodo en los 
    //valores locales
    localStorage.setItem('id_token',token);
    //se tiene que cambiar el json a cadenao porque 
    //los items locales no pueden ser guardados en 
    //forma json
  // console.log("json del usuario",user);
    localStorage.setItem('usuario',user);
    this.authToken=token;
    this.user=user;
  }
  logout(){
    this.authToken=null;
    this.user=null;
    localStorage.clear();
  }
  loggedIn() {
    return tokenNotExpired('id_token');
}
}
