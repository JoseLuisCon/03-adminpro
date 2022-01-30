import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Router} from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Usuario } from '../models/usuario.model';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';



const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public auth2: any;
  public usuario? : Usuario ;



  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }

  //Mantenimientos

  cargarUsuarios(desde: number = 0) {

    return this.http.get<{total:number, usuarios: Usuario[]}>(`${base_url}/usuarios?desde=${desde}`, this.headersWhitToken )
          .pipe(
            map(
              resp => {
                const usuarios = resp.usuarios.map(
                     user => new Usuario (user.nombre,user.email,'',user.img,user.google,user.role,user.uid)

                )
              return {
                    usuarios,
                    total: resp.total
                  };
             } )
          );

  }

  googleInit() {

    return new Promise<void> (resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '1087637155709-3aqk7cu8mjecrq1887li04fumtu57na2.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    })
  }

  logout() {
    localStorage.removeItem('token');

    this.auth2 = gapi.auth2.getAuthInstance();
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  get uid(): string {
    return this.usuario?.uid || '';

  }
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headersWhitToken() : Object {
    return {
      headers: {'x-token': this.token}
    }
  }


  validarToken():Observable<boolean> {


    return this.http
      .get(`${base_url}/login/renew`, this.headersWhitToken)
      .pipe(
        map((resp: any) => {
          const {nombre, email, img, role, google, uid} = resp.usuario;

          this.usuario = new Usuario (nombre, email, '', img, google, role , uid);

          localStorage.setItem('token', resp.token);
          return true;
        }),

        catchError(err => of(false))
      )

  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  loginUsuario(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  loginGoogle(token: any) {
    console.log(token);

    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.tokenJWT);
      })
    );
  }

  eliminarUsuario( usuario: Usuario)
  {

    const url = `${base_url}/usuarios/${usuario.uid}`
    return this.http.delete(url, this.headersWhitToken)


  }

  actualizarPerfil(data: {email: string, nombre: string, role?: string})
  {
    data = {
      ...data,
      role: this.usuario?.role
    }
    return this.http.put(`${base_url}/usuarios/${this.uid}`,data, this.headersWhitToken )
  }


  guardarUsuario( usuario: Usuario)
  {
    return this.http.put(`${base_url}/usuarios/${usuario.uid}`,usuario, this.headersWhitToken )
  }
}
