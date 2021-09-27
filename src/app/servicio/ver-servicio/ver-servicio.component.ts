import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { listadatos } from 'src/app/models/datos';
import { Servicio, Detalle } from 'src/app/models/servicio';
import { ServicioService } from 'src/app/service/servicio.service';

@Component({
  selector: 'app-ver-servicio',
  templateUrl: './ver-servicio.component.html',
  styleUrls: ['./ver-servicio.component.css']
})
export class VerServicioComponent implements OnInit {
  public columns = ["Fecha","Ficha", "Fecha Ficha", "Profesional","Cliente","Categoria","Subcategoria","Acciones"];
  servicio: Servicio = new Servicio();
  detalle: Detalle = new Detalle();
  data: Detalle[] = [];
  constructor(private route: ActivatedRoute, private servicioService: ServicioService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.servicio.idServicio = parseInt(paramMap.get('id') ?? '');
      this.servicioService.getUnServicio(this.servicio.idServicio)
      .subscribe((data:any)=>{
        this.servicio = data;
        /*this.ficha.idCliente.fullName =this.ficha.idCliente.nombre + ' ' + this.ficha.idCliente.apellido;
        this.ficha.idEmpleado.fullName =this.ficha.idEmpleado.nombre + ' ' +   this.ficha.idEmpleado.apellido;*/

      });
      /*this.servicioServicio.getServicioFicha(this.ficha.idFichaClinica).subscribe((data:any)=>{
        this.servicios = data.lista;
      });*/
    });
  }

  getDetalles() { 

    this.servicioService.getDetalles(this.servicio.idServicio)
    .subscribe((data:listadatos<Detalle>) => {
     this.data = data.lista;
    });
  }

  deleteDetalle(detalle: Detalle) {
    this.servicioService.cancelarDetalle(this.servicio.idServicio, detalle.idServicioDetalle)
    .subscribe((data:any) => console.log(`Detalle ${detalle.idServicioDetalle} eliminado!`));
    this.getDetalles();
  }

}
