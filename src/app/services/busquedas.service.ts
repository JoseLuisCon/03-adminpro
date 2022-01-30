import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';


const base_url = environment.base_url;


@Injectable({
  providedIn: 'root',
})
export class BusquedasService {

  constructor(private http: HttpClient) {}

  get headersWhitToken(): Object {
    return {
      headers: { 'x-token': this.token },
    };
  }
  get token(): string {
    return localStorage.getItem('token') || '';
  }



  private generarUsuarios( resultado: any[] ): Usuario[]{

    return resultado.map(
      (user: Usuario) => new Usuario (user.nombre,user.email, '', user.img, user.google, user.role, user.uid)
    );

  }



  buscar(
    desde: number = 0,
    coleccion: 'usuarios' | 'medicos' | 'hospitales',
    cadenaBusqueda: string = ''
  ) {

    const url = `${base_url}/todo/coleccion/${coleccion}/${cadenaBusqueda}`;



        return this.http.get<any[]>( url, this.headersWhitToken )
              .pipe(
                map ( (resp : any) => {

                  switch ( coleccion ) {

                    case 'usuarios':
                      {
                        return this.generarUsuarios(resp.data)
                      }
                      case 'medicos':
                        {
                          return[];

                        }
                      case 'hospitales':
                        {

                          return[];
                        }
                      default:
                        return [];

                      }

                  }
                 )
              );
  }


}
