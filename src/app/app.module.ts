import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ServicepersonaService } from './service/servicepersona.service';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { FichaComponent } from './ficha/ficha.component';
import { NuevafichaComponent } from './ficha/nuevaficha/nuevaficha.component';
import { BuscarempleadoComponent } from './buscarempleado/buscarempleado.component';
import { BuscarclienteComponent } from './buscarcliente/buscarcliente.component';
import { ReservaComponent } from './reserva/reserva.component';
import { ServicioComponent } from './servicio/servicio.component';
import { NuevoServicioComponent } from './servicio/nuevo-servicio/nuevo-servicio.component';
import { ModificarfichaComponent } from './ficha/modificarficha/modificarficha.component';
import { NuevaReservaComponent } from './reserva/nueva-reserva/nueva-reserva.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgregarDetalleComponent } from './servicio/agregar-detalle/agregar-detalle.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FichaComponent,
    NuevafichaComponent,
    BuscarempleadoComponent,
    BuscarclienteComponent,
    ReservaComponent,
    ServicioComponent,
    NuevoServicioComponent,
    NuevaReservaComponent,
    ModificarfichaComponent,
    AgregarDetalleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    NgbModule,
  ],
  providers: [ServicepersonaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
