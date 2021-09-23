import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Categoria } from '../models/categoria';
import { Ficha } from '../models/fichas';
import { Persona } from '../models/persona';
import { Subcategoria } from '../models/subcategoria';
import { ServicefichaService } from '../service/serviceficha.service';

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.css']
})
export class FichaComponent implements OnInit {
  public data: Ficha[] = [];
  public columns = ["Fecha","Profesional","Cliente","Categoria","Subcategoria","Acciones"];
  config = {
      id: "paginationFicha",
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: 1
  }
  next = "Siguiente"
  back = "Atras"
  empleado : Persona = new Persona()
  cliente : Persona = new Persona()
  categoria: Categoria = new Categoria()
  tipoProducto: Subcategoria = new Subcategoria()
  filtros = {
    fechaDesde: "",
    fechaHasta: "",
    empleado: "",
    cliente: "",
    categoria: "",
    subcategoria: ""
  }
  constructor(private http: HttpClient, private servicioFicha: ServicefichaService) { }

  ngOnInit(){
    this.getFichas();
  }
  getFichas(){
    let currentPage = this.config.currentPage;
    let itemsPerPage = this.config.itemsPerPage;
    let inicio = currentPage-1;
    inicio = inicio*itemsPerPage; 
    this.servicioFicha.getfichas(itemsPerPage,inicio)
    .subscribe((data:any)=>{
     
     this.data = data.lista;
     this.config.totalItems=data.totalDatos;
    });
  }

  pageChanged(event: number){
    this.config.currentPage = event;
    this.getFichas()
  }

  buscar(): void{
    let a = 2;
  }
  seleccionarEmpleado(empleado: Persona){
    this.empleado = empleado
    this.empleado.fullName = empleado.nombre + " " + empleado.apellido;
  }

  seleccionarCliente(cliente: Persona){
    this.cliente = cliente
    this.cliente.fullName = cliente.nombre + " " + cliente.apellido;
  }
}
  