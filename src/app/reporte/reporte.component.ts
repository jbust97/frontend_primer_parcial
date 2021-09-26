import { HttpClient } from '@angular/common/http';
import { Categoria } from '../models/categoria';
import { Persona } from '../models/persona';
import { Subcategoria } from '../models/subcategoria';
import { ServicecategoriaService } from '../service/servicecategoria.service';
import { ServicetipoproductoService } from '../service/servicetipoproducto.service';
import { Component, OnInit } from '@angular/core';
import { Servicio } from '../models/servicio';
import { ServicioService } from '../service/servicio.service';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import {ExportToCSV} from "@molteni/export-csv";

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
  public columns = ["Fecha", "Profesional", "Cliente","Presupuesto","Subcategoria"];
  
  esconder = true;

  categorias: Categoria [] = []
  tipoProductos: Subcategoria[] = []

  empleado : Persona = new Persona()
  cliente : Persona = new Persona()
  categoria: Categoria = new Categoria()
  tipoProducto: Subcategoria = new Subcategoria()
  filtros: Filtro = {};
  tipoReporte: string = "";
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

  generarReporteDetallado(): void{
    this.tipoReporte = "detallado"
    this.esconder = false
    console.log("se toco el boton detallado")  
  }

  generarReporteBasico(): void{
    this.tipoReporte= "basico"
    this.esconder = false
    this.filtros.idCliente = this.cliente.idPersona
    this.filtros.idEmpleado = this.empleado.idPersona
    if (this.filtros.fechaDesde && this.filtros.fechaHasta){
      this.getServicios()  
    }else{
      console.log("Agregar funcion de deshabilitar boton")
    }
  }
  //DESCARGAR EXCEL
  descargarCSV():void{
    if (this.tipoReporte == "basico"){
      this.basicoCSV();
    }
    else if(this.tipoReporte == "detallado"){
      this.detalladoCSV();
    }
    else{
      console.log("llama a Hugo Fleitas")
    }
  }

  basicoCSV():void{
    let datos:any[]=[];
    this.data.forEach((fila)=>{
      let row:any = {} 
      row["Fecha"]=fila.fechaHora.split(" ")[0]
      row["Profesional"]=fila.idFichaClinica.idEmpleado.nombreCompleto
      row["Cliente"]=fila.idFichaClinica.idCliente.nombreCompleto
      row["Presupuesto"]=fila.presupuesto
      row["Subcategoria"]=fila.idFichaClinica.idTipoProducto.descripcion
      datos.push(row)
    });
    let exportadorCSV = new ExportToCSV(); 
    exportadorCSV.exportColumnsToCSV(datos, "Servicios_Basicos" + new Date().toISOString().slice(0, 10) + ".xlsx" ,this.columns);
  }

  detalladoCSV():void{
    console.log("agregar la planilla detallado")
  }

  //DESCARGAR PDF
  descargarPDF(): void{
    if (this.tipoReporte == "basico"){
      this.basicoPDF();
    }
    else if(this.tipoReporte == "detallado"){
      console.log("agregar la detallado detallado")
    }
    else{
      console.log("llama a Hugo Fleitas")
    }
  }

  basicoPDF():void{
    var doc = new jsPDF();
    let datos:any[]=[];
    console.log(this.data)
    this.data.forEach((fila)=>{
      let row:any[] = [] 
      row.push(fila.fechaHora.split(" ")[0])
      row.push(fila.idFichaClinica.idEmpleado.nombreCompleto)  
      row.push(fila.idFichaClinica.idCliente.nombreCompleto)
      row.push(fila.presupuesto)
      row.push(fila.idFichaClinica.idTipoProducto.descripcion)
      datos.push(row)
    });
    doc.setFontSize(13).setFont('helvetica', 'bold');
    doc.text('Reporte Básico de Servicios\n',doc.internal.pageSize.getWidth() / 2, 8, {align: 'center'}).setFontSize(11).setFont('Helvetica','normal');
    let contadorLineas = 1;
    let cabecera = ""
    if(this.filtros.idEmpleado){
      cabecera += "Profesional: " + this.empleado.nombreCompleto+"\n";
      contadorLineas+=1;
    }
    if(this.filtros.idCliente){
      cabecera += "Cliente: " + this.cliente.nombreCompleto+"\n";
      contadorLineas+=1;
    }
    if (this.filtros.fechaDesde){
      cabecera += "Fecha Inicio: " + this.filtros.fechaDesde +"\n";
      contadorLineas+=1;
    }
    if (this.filtros.fechaHasta){
      cabecera += "Fecha Fin: " + this.filtros.fechaHasta+"\n";
      contadorLineas+=1;
    }
    doc.text(cabecera, 11, 16); //agrega cabecera al pdf
    doc.setFontSize(11);
    doc.setTextColor(100);
    (doc as any).autoTable({
      margin: {top:contadorLineas*9},
      head: [this.columns],
      body: datos,
      theme: 'plain',
      didDrawCell: (data: { column: { index: any; }; }) => {
      }
    })
    doc.output('dataurlnewwindow');
    doc.save('myteamdetail.pdf');
  }
  
  detalladoPDF():void{
    console.log("agregar pdf detallado")
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
