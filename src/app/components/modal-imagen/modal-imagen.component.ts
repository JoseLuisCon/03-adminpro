import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { SweetConfig } from 'src/app/utils/configSweet';
import { FileUploadService } from '../../services/file-upload.service';



@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {
  public usuario?: Usuario;
  public imagenSubir!: File;
  public imgTemp: any = null;
  private Sweet = SweetConfig();

  constructor(public modalImagenService: ModalImagenService,
              private fileUploadService: FileUploadService) {

   }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
;  }

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

    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;


    this.fileUploadService.actualizarFoto(this.imagenSubir, tipo , id ).then(

      img =>  {

        this.Sweet.fire({ icon: 'success', title: 'La nueva imagen del perfil ha sido modificada'});
        this.modalImagenService.nuevaImagen.emit(img);
        this.cerrarModal();
      }).catch(err => {
        console.log(err);
        this.Sweet.fire({ icon: 'error', title: 'No se ha podido subir la imagen al servidor'})
      })


  }
}
