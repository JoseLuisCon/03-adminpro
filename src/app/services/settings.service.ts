import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {


  public linkTheme = document.querySelector('#theme');

  constructor() {

    const themeStore = localStorage.getItem('theme') || "./assets/css/colors/default-dark.css" ;

    this.linkTheme?.setAttribute('href', themeStore);

   }

   changeTheme(theme: string){

    const url = `./assets/css/colors/${theme}.css`

    this.linkTheme?.setAttribute('href', url);

    localStorage.setItem('theme', url)

    this.checkCurrentTheme(theme);

  }


  checkCurrentTheme(theme : string){

    const links = document.querySelectorAll('.selector');


    links.forEach(ele=>{
      ele.classList.remove('working');

      if (ele.getAttribute('data-theme') === theme){

        ele.classList.add('working');
      }

    })
  }
}
