import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FichaComponent } from './ficha/ficha.component';
import { NuevafichaComponent } from './ficha/nuevaficha/nuevaficha.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ModificarReservaComponent } from './reserva/modificar-reserva/modificar-reserva.component';
import { NuevaReservaComponent } from './reserva/nueva-reserva/nueva-reserva.component';
import { ReservaComponent } from './reserva/reserva.component';
import { ServicioComponent } from './servicio/servicio.component';

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
  },
  {
    path: "reserva",
    component: ReservaComponent
  },
  {
    path: "reserva/nuevo",
    component: NuevaReservaComponent
  },
  {
    path: "reserva/:id/editar",
    component: ModificarReservaComponent
  },
  {
    path: "servicio",
    component: ServicioComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
