import { Component, OnInit, OnDestroy } from '@angular/core';

import Swal from 'sweetalert2';

import { Usuario } from 'src/app/models/usuario.model';

import { SweetConfig } from 'src/app/utils/configSweet';

import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { UsuarioService } from '../../../services/usuario.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios:   number = 0;
  public usuarios:        Usuario[] = [];
  public usuariosTemp:        Usuario[] = [];

  public desde:           number = 0;
  public cargando:        boolean = true;

  public imgSubs: Subscription = new Subscription();

  private Sweet = SweetConfig();
  public coleccion: string ='';




  constructor(private usuarioService: UsuarioService,
              private busqueda: BusquedasService,
              public modalImagenService: ModalImagenService) {
   }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();

    this.imgSubs = this.modalImagenService.nuevaImagen.pipe(
      delay(500)
    )
        .subscribe( img => this.cargarUsuarios());

  }


cargarUsuarios()
{
  this.cargando = true;
  this.usuarioService.cargarUsuarios(this.desde)
  .subscribe(({usuarios, total})=> {
    this.totalUsuarios = total;
    this.usuarios = usuarios;
    this.usuariosTemp = usuarios;
    this.cargando = false;
  });
}


cambiarPagina(valor: number){

  this.desde += valor;

  if ( this.desde < 0 ) this.desde = 0;

  else if (this.desde > this.totalUsuarios) this.desde -= valor;

  this.cargarUsuarios();

}

buscarPorColeccion( cadenaBusqueda: string){

  if (cadenaBusqueda.length !== 0 ){
    this.busqueda.buscar(this.desde,'usuarios',cadenaBusqueda)?.subscribe( resp => this.usuarios = resp );
  }else{
    this.usuarios = this.usuariosTemp;
  }

}

eliminarUsuario ( usuario: Usuario ) {


  if (usuario.uid === this.usuarioService.uid){

    return this.Sweet.fire({ icon: 'info', title: `No puede eliminar su propia cuenta de usuario`});
  }

  Swal.fire({
    title: '¿Está seguro de su eliminación?',
    text: `Todos los datos del usuario ${usuario.nombre} serán borrados!`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Eliminar!'
  }).then((result) => {
    if (result.isConfirmed) {

       this.usuarioService.eliminarUsuario(usuario).subscribe(
          ({ok, msg}: any) =>{
            this.Sweet.fire({ icon: 'success', title: `${msg}`});
            this.cargarUsuarios();
          }
        );


    }
  })
  return;

}

cambiarRole(usuario: Usuario){

    this.usuarioService.guardarUsuario(usuario).subscribe(
      resp => {
        console.log(resp);

      }
    );

}

cambiarImagen(usuario: Usuario){

  this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.imagenUrl);


}

}
