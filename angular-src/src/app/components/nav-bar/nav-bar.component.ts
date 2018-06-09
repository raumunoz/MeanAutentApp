import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {


  constructor(
    private flashMessagesService:FlashMessagesService,
    private authService:AuthService,
    private router:Router,) { }

  ngOnInit() {
    
 
}
onLogoutClick(){
  this.authService.logout();
  this.flashMessagesService.show('logged out',
  {cssClass:'alert-succes',timeout:3000});
  this.router.navigate(['/login']);
  return false;
}
}
