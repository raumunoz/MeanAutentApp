import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
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
    return this.http.post('http://localhost:5000/users/registro',user,{headers:headers})
    .map(res=>res.json());
  }

}
