import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  public usuario: any;

  constructor(private usuarioService: UsuarioService,
              private router: Router) {

                // console.log(usuarioService.usuario?.imagenUrl);
                this.usuario = usuarioService.usuario;

               }





  logout(){
    this.usuarioService.logout();
    this.router.navigateByUrl('/login');
  }
}
