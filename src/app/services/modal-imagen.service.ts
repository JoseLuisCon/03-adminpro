import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment.prod';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal: boolean = true;
  public tipo!: 'usuarios' | 'medicos' | 'hospitales';
  public id: string = '';
  public img: string = 'no-image';

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  get ocultarModal(){
    return this._ocultarModal;
  }

  abrirModal(
    tipo: 'usuarios'| 'medicos' | 'hospitales',
    id:any,
    img: string
  ){
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id= id;
    if ( img.includes('https') ){
      this.img = img;
    }else {
      this.img = `${base_url}/upload/${ tipo }/${ id} `
    }



    this.img = img;



  }
  cerrarModal(){
    this._ocultarModal = true;
  }


  constructor() { }
}
