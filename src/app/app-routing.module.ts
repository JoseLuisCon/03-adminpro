import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { PagesRoutingModule } from './pages/pages.routing';


import { AuthRoutingModule } from './auth/auth.routing';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PagesModule } from './pages/pages.module';

const routes : Routes = [

  { path:'', redirectTo: '/dashboard', pathMatch: 'full'} ,

  { path: '**', component: NopagefoundComponent},

];


@NgModule({
  imports: [
    RouterModule.forRoot( routes ),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
//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
