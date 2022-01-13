import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-acount-settings',
  templateUrl: './acount-settings.component.html',
  styles: [
  ]
})
export class AcountSettingsComponent implements OnInit {



  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {

    const themeStore = localStorage.getItem('theme');
    const theme = themeStore?.substring(themeStore?.lastIndexOf('/')+1,themeStore?.lastIndexOf('.'))

    if (theme){
      this.settingsService.checkCurrentTheme(theme);
    }else
    {
      this.settingsService.checkCurrentTheme('default-dark');
    }

  }

  changeTheme(theme: string){
    this.settingsService.changeTheme(theme);
  }


}
