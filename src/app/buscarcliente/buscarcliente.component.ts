import { HttpParams } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Persona } from '../models/persona';
import { ServicecategoriaService } from '../service/servicecategoria.service';
import { ServicepersonaService } from '../service/servicepersona.service';

@Component({
  selector: 'app-buscarcliente',
  templateUrl: './buscarcliente.component.html',
  styleUrls: ['./buscarcliente.component.css']
})
export class BuscarclienteComponent implements OnInit {

  @Output() seleccionarClienteEvent = new EventEmitter<Persona>()
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
    
  getClientes(){
    let currentPage = this.config.currentPage;
    let itemsPerPage = this.config.itemsPerPage;
    let inicio = currentPage-1;
    inicio = inicio*itemsPerPage; 
    this.servicePersona.getClientes(this.filtros)
    .subscribe((data:any)=>{
     console.log(data);
     this.data = data.lista;
     this.config.totalItems=data.totalDatos;
    });
  }

  buscar(){
    this.filtros.nombre = this.nombre
    this.filtros.apellido = this.apellido
    this.getClientes()
  }
  pageChanged(event: number){
    this.config.currentPage = event;
    this.getClientes()
  }

  seleccionarCliente(cliente: Persona){
    this.seleccionarClienteEvent.emit(cliente)
  }

 

}

