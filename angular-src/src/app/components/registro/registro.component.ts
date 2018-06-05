import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  nombre: string;
  nombreUsario: String;
  correo: string;
  contrasena: string;
  //los servicios se tiene que inyectar en el componente que los usa
  constructor(private validateService: ValidateService,
    private _flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }
  //validacion
  submitRegistrar() {
    const user = {
      nombre: this.nombre,
      nombreUsario: this.nombreUsario,
      correo: this.correo,
      contrasena: this.contrasena
    }
    if (!this.validateService.validateRegistro(user)) {
      this._flashMessagesService.show('se registro correctamente', { cssClass: 'alert-danger', timeout: 1000 });
      return false;
    }
    if (!this.validateService.validateEmail(user.correo)) {
      this._flashMessagesService.show('porfavor usa un correo valido', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    //registrar usuario
    this.authService.registerUser(user).subscribe(
      data => {
        if (data.success) {
          this._flashMessagesService.show('te has registrado', { cssClass: 'alert-succes', timeout: 3000 });
          this.router.navigate(['/login']);
        } else {
          this._flashMessagesService.show('algo salio mal', { cssClass: 'alert-succes', timeout: 3000 });
          this.router.navigate(['/registro']);
        }
      }
    );
  }
}
