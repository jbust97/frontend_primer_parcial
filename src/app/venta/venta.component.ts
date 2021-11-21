import { Component, OnInit } from '@angular/core';
import { CabeceraVenta } from '../models/cabeceraVenta';
import { DetalleVenta } from '../models/detalleVenta';
import { Producto } from '../models/producto';
import { ProductoService } from '../service/producto.service';
import {v4 as uuiv4} from 'uuid';
@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {
  venta: CabeceraVenta = new CabeceraVenta();
  productos: Producto[] = [];
  constructor(private productoService: ProductoService) { }
  ngOnInit(): void {
    this.venta.total = 0;
    this.productoService.getAll().then(data => {
      console.log(data);
      data.map(producto => this.productos.push({
        id: producto.id,
        nombre: producto.nombre,
        codigo: producto.codigo,
        precioVenta: producto.precioVenta,
        existencia: producto.existencia
      }));
    })
  }

  agregarDetalle(){
    if (!this.venta.detalles){
      this.venta.detalles = []
    }
      
      let detalle = new DetalleVenta()
      detalle.totalDetalle = 0
      this.venta.detalles.push(detalle)
  
    
    console.log(this.venta)
  }

  actualizarTotalDetalle(detalle: DetalleVenta){
    if (detalle.producto && detalle.cantidad){
      detalle.totalDetalle = detalle.producto.precioVenta * detalle.cantidad
      this.actualizarTotal()
    }
  }
  actualizarTotal(){
    let total = 0
    for (let detalle of this.venta.detalles){
      total += detalle.totalDetalle
    }
    this.venta.total = total;
  }

  eliminarDetalle(index: number){
    this.venta.detalles.splice(index,1);
    this.actualizarTotal()
  }
}
