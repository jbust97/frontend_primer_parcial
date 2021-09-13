import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FichaComponent } from './ficha/ficha.component';
import { NuevafichaComponent } from './ficha/nuevaficha/nuevaficha.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "login",
    component: LoginComponent
  },
  
  {
    path: "ficha/nuevo",
    component: NuevafichaComponent
  },
  {
    path: "ficha",
    component: FichaComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
