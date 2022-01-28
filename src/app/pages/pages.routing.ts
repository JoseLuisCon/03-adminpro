import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { AcountSettingsComponent } from './acount-settings/acount-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,

    canActivate: [AuthGuard],

    children: [
      { path: '', component: DashboardComponent, data:{titulo: 'Dashboard'} },
      { path: 'progress', component: ProgressComponent, data:{titulo: 'Progress'}  },
      { path: 'grafica1', component: Grafica1Component, data:{titulo: 'Gráfica #1'} },
      { path: 'account-settings', component: AcountSettingsComponent, data:{titulo: 'Acount Settings'} },
      { path: 'promesas', component: PromesasComponent, data:{titulo: 'Promesas'} },
      { path: 'rxjs', component: RxjsComponent, data:{titulo: 'Rxjs'} },
      { path: 'perfil', component: PerfilComponent, data:{titulo: 'Perfil del usuario'} },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
