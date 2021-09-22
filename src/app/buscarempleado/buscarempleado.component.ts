import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Persona } from '../models/persona';
import { ServicepersonaService } from '../service/servicepersona.service';

@Component({
  selector: 'app-buscarempleado',
  templateUrl: './buscarempleado.component.html',
  styleUrls: ['./buscarempleado.component.css']
})
export class BuscarempleadoComponent implements OnInit {
  public data: Persona[] = [];
  nombre: string = "";
  apellido: string = "";
  filtros = {
    nombre : "",
    apellido: ""
  }
  public columns = ["Nombres","Apellidos","Email","Telefono","Ruc","Cedula","Fecha de Nacimiento","Acciones"];
  config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: 1
  }
  next = "Siguiente"
  back = "Atras"
  constructor(private servicePersona: ServicepersonaService) { }

  ngOnInit(): void {
  }

  getEmpleados(){
    let currentPage = this.config.currentPage;
    let itemsPerPage = this.config.itemsPerPage;
    let inicio = currentPage-1;
    inicio = inicio*itemsPerPage; 
    this.servicePersona.getEmpleados(this.filtros)
    .subscribe((data:any)=>{
     console.log(data);
     this.data = data.lista;
     this.config.totalItems=  data.totalDatos;
    });
  }

  buscar(){
    this.filtros.nombre = this.nombre
    this.filtros.apellido = this.apellido
    this.getEmpleados()
  }
  pageChanged(event: number){
    this.config.currentPage = event;
    this.getEmpleados()
  }
}


