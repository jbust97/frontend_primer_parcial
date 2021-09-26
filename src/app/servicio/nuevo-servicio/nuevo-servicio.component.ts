import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nuevo-servicio',
  templateUrl: './nuevo-servicio.component.html',
  styleUrls: ['./nuevo-servicio.component.css']
})
export class NuevoServicioComponent implements OnInit {

  ficha: Ficha = new Ficha();
  empleado: Persona = new Persona();
  cliente: Persona = new Persona();
  categorias: Categoria[] = []
  tipoProductos: Subcategoria[]= [];
  tipoProducto: Subcategoria = new Subcategoria();
  categoria: Categoria = new Categoria()
  constructor(private serviceCategoria: ServicecategoriaService, private serviceTipoProducto: ServicetipoproductoService, private serviceFicha: ServicefichaService) { }

  ngOnInit(): void {
    this.getCategorias()
  }

  seleccionarEmpleado(empleado: Persona){
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
    this.serviceTipoProducto.getTipoProductos(this.categoria.idCategoria).subscribe((data:any)=>{
      this.tipoProductos = data.lista
    })
  }

  guardarServicio(){
    this.ficha.idCliente = new Persona;
    this.ficha.idEmpleado = new Persona;
    this.ficha.idTipoProducto = new Subcategoria;
    this.ficha.idTipoProducto.idTipoProducto = this.tipoProducto.idTipoProducto
    this.ficha.idCliente.idPersona = this.cliente.idPersona
    this.ficha.idEmpleado.idPersona = this.empleado.idPersona
    this.serviceFicha.postficha(this.ficha).subscribe()
    console.log(this.ficha)
  }

}
