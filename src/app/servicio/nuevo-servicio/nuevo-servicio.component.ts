import { Component, OnInit } from '@angular/core';
import { Ficha } from 'src/app/models/fichas';
import { Servicio } from 'src/app/models/servicio';
import { ServicefichaService } from 'src/app/service/serviceficha.service';
import { ServicioService } from 'src/app/service/servicio.service';

@Component({
  selector: 'app-nuevo-servicio',
  templateUrl: './nuevo-servicio.component.html',
  styleUrls: ['./nuevo-servicio.component.css']
})
export class NuevoServicioComponent implements OnInit {

  ficha: Ficha = new Ficha();
  fichas: Ficha[] = []
  constructor(private servicioService: ServicioService, private serviceFicha: ServicefichaService) { }

  ngOnInit(): void {
  }

  getFichas(){
    this.serviceFicha.getfichas(5,0).subscribe((data:any)=>{
      this.fichas = data.lista;
    })
  }

  guardarServicio(){
    /*this.ficha.idCliente = new Persona;
    this.ficha.idEmpleado = new Persona;
    this.ficha.idTipoProducto = new Subcategoria;
    this.ficha.idTipoProducto.idTipoProducto = this.tipoProducto.idTipoProducto
    this.ficha.idCliente.idPersona = this.cliente.idPersona
    this.ficha.idEmpleado.idPersona = this.empleado.idPersona
    this.serviceFicha.postficha(this.ficha).subscribe()
    console.log(this.ficha)*/
  }

}
