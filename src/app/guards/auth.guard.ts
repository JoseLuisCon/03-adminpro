import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor( private usuarioServicio: UsuarioService,
                private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){

      return this.usuarioServicio.validarToken()
        .pipe(
          tap( AutenticadoOk => {
            if (!AutenticadoOk){
              this.router.navigateByUrl('/login')
            }
          } )
        );

    return false;
  }

}
