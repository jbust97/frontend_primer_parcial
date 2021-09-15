import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria';
import { Ficha } from 'src/app/models/fichas';
import { Persona } from 'src/app/models/persona';
import { Subcategoria } from 'src/app/models/subcategoria';
import { ServicecategoriaService } from 'src/app/service/servicecategoria.service';
import { ServicetipoproductoService } from 'src/app/service/servicetipoproducto.service';
@Component({
  selector: 'app-nuevaficha',
  templateUrl: './nuevaficha.component.html',
  styleUrls: ['./nuevaficha.component.css']
})
export class NuevafichaComponent implements OnInit {
  ficha: Ficha = new Ficha();
  empleado: Persona = new Persona();
  cliente: Persona = new Persona();
  categorias: Categoria[] = []
  tipoProductos: Subcategoria[]= [];
  tipoProducto: Subcategoria = new Subcategoria();
  categoria: Categoria = new Categoria()
  constructor(private serviceCategoria: ServicecategoriaService, private serviceTipoProducto: ServicetipoproductoService) { }

  ngOnInit(): void {
    this.getCategorias()
  }

  seleccionarEmpleado(empleado: Persona){
    console.log(empleado)
    this.empleado = empleado
    this.empleado.fullName = empleado.nombre + " " + empleado.apellido;
  }

  seleccionarCliente(cliente: Persona){
    this.cliente = cliente
    this.cliente.fullName = cliente.nombre + " " + cliente.apellido;
  }
  getCategorias(){
    this.serviceCategoria.getCategorias().subscribe((data:any)=>{
      this.categorias = data.lista;
    })
  }

  getTipoProductos(){
    console.log("hola")
    this.serviceTipoProducto.getTipoProductos(this.categoria.idCategoria).subscribe((data:any)=>{
      this.tipoProductos = data.lista
    })
  }

}
