import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';
import { SweetConfig } from '../../utils/configSweet';



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [],
})
export class PerfilComponent implements OnInit {
  public usuario?: Usuario;
  public perfilUser!: FormGroup;
  public imagenSubir!: File;
  public imgTemp: string = '';
  private Sweet = SweetConfig();


  constructor(private usuarioService: UsuarioService,
              private fb: FormBuilder,
              private fileUploadService: FileUploadService) {

    this.usuario = this.usuarioService.usuario;

  }

  ngOnInit(): void {
    this.perfilUser = this.fb.group({
      nombre: [this.usuario?.nombre, Validators.required],
      email: [this.usuario?.email, [Validators.required, Validators.email]],
    });
  }

  actualizarPerfil() {


    this.usuarioService
    .actualizarPerfil(this.perfilUser.value)
    .subscribe( () => {
      const {nombre, email} = this.perfilUser.value;
      this.usuario!.nombre = nombre;
      this.usuario!.email = email;

      this.Sweet.fire({ icon: 'success', title: 'Datos del perfil actualizados:'})

    }, (err)=> {
      this.Sweet.fire({ icon: 'error', title: err.error.msg})
      });


  }

  cambiarImagen(event: any | null){

    this.imagenSubir = event.target.files[0];

    if (!event.target.files[0]){
      this.Sweet.fire({ icon: 'error', title: 'No ha seleccionado ninguna imagen nueva'})
      return this.imgTemp = '';
    }

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onloadend = ()=> {
      this.imgTemp = String(reader.result);
    }
    return this.imgTemp;
  }

  subirImagen (){


    this.fileUploadService.actualizarFoto(this.imagenSubir,'usuarios', this.usuario?.uid ).then(

      img =>  {

        this.usuario!.img = img;

        this.Sweet.fire({ icon: 'success', title: 'La nueva imagen del perfil ha sido modificada'})
      })


  }
}
