import { Injectable } from '@angular/core';

// export interface OptionMenuSidebar  {
//   titulo: string,
//   icono: string,
//   submenu: object[]
// }


@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu: [
        {titulo: 'Dashboard', url: '/'},
        {titulo: 'ProgressBar', url: 'progress'},
        {titulo: 'Gráficas', url: 'grafica1'},
        {titulo: 'Promesas', url: 'promesas'},
        {titulo: 'Rxjs', url: 'rxjs'}
      ]
    },
    {
      titulo: 'Mantenimiento',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        {titulo: 'Usuarios', url: 'usuarios'},
        {titulo: 'Hospitales', url: 'hospitales'},
        {titulo: 'Médicos', url: 'medicos'},

      ]
    }
  ]

  constructor() { }
}
