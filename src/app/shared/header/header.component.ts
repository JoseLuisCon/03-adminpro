import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  constructor(private ususarioService: UsuarioService,
              private router: Router) { }



  logout(){
    this.ususarioService.logout();
    this.router.navigateByUrl('/login');
  }
}
