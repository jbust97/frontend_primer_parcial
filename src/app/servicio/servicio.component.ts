import { Component, OnInit } from '@angular/core';
import { Servicio } from '../models/servicio';
import { ServicioService } from '../service/servicio.service';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})

export class ServicioComponent implements OnInit {
  public data: Servicio[] = [];
  public columns = ["Fecha","Ficha", "Fecha Ficha", "Profesional","Cliente","Categoria","Subcategoria","Acciones"];
  config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: 1
  }
  next = "Siguiente"
  back = "Atras"
  
  constructor(private servicioService: ServicioService) { }

  ngOnInit(){
    this.getServicio();
  }
  getServicio(){
    let currentPage = this.config.currentPage;
    let itemsPerPage = this.config.itemsPerPage;
    let inicio = currentPage-1;
    inicio = inicio*itemsPerPage; 
    this.servicioService.getServicio(itemsPerPage,inicio)
    .subscribe((data:any)=>{
     console.log(data);
     this.data = data.lista;
     this.config.totalItems=  data.totalDatos;
    });
  }

  cancelarServicio(servicio: Servicio) {
    this.servicioService.cancelarServicio(servicio.idServicio)
    .subscribe((data:any) => console.log(`Servicio ${servicio.idServicio} cancelada!`));
    this.getServicios();
  }

  pageChanged(event: number){
    this.config.currentPage = event;
    this.getServicio()
  }
}
