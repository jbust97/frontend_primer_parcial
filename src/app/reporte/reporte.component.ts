import { HttpClient } from '@angular/common/http';
import { Categoria } from '../models/categoria';
import { Persona } from '../models/persona';
import { Subcategoria } from '../models/subcategoria';
import { ServicecategoriaService } from '../service/servicecategoria.service';
import { ServicetipoproductoService } from '../service/servicetipoproducto.service';
import { Component, OnInit } from '@angular/core';
import { Servicio } from '../models/servicio';
import { ServicioService } from '../service/servicio.service';

type Filtro = {
  fechaDesde ?: string,
  fechaHasta?: string,
  idEmpleado?: number,
  idCliente?: number,
  idCategoria?: number,
  idTipoProducto?: number,
};

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {
  public data: Servicio[] = [];
  public columns = ["Fecha","Ficha", "Fecha Ficha", "Profesional","Cliente","Categoria","Subcategoria"];

  categorias: Categoria [] = []
  tipoProductos: Subcategoria[] = []

  empleado : Persona = new Persona()
  cliente : Persona = new Persona()
  categoria: Categoria = new Categoria()
  tipoProducto: Subcategoria = new Subcategoria()
  filtros: Filtro = {};
  constructor(private http: HttpClient, private servicioServicio: ServicioService,private serviceCategoria: ServicecategoriaService,private serviceTipoProducto: ServicetipoproductoService) { }

  ngOnInit(){
  }
  getServicios(){
    this.servicioServicio.getServicios(this.filtros)
    .subscribe((data:any)=>{
     console.log(data);
     this.data = data.lista;
    });
  }


  buscar(): void{
    this.filtros.idCliente = this.cliente.idPersona
    this.filtros.idEmpleado = this.empleado.idPersona
    if (this.filtros.fechaDesde && this.filtros.fechaHasta){
      this.getServicios()  
    }else{
      console.log("xd")
    }
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
