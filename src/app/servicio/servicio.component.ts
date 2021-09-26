import { Component, OnInit } from '@angular/core';
import { PresentacionProducto } from '../models/presentacionProducto';
import { Servicio } from '../models/servicio';
import { ServicioService } from '../service/servicio.service';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})

export class ServicioComponent implements OnInit {
  public data: Servicio[] = [];
  public presentacionProducto: PresentacionProducto[] = []
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

  getPresentacionProducto(){
    this.servicioService.getPresentacionProducto().subscribe((data:any)=>{
      this.presentacionProducto = data.lista;
    })
  }

  pageChanged(event: number){
    this.config.currentPage = event;
    this.getServicio()
  }
}
