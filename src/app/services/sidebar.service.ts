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
        {titulo: 'Gráficas', url: 'grafica1'}
      ]
    }
  ]

  constructor() { }
}
