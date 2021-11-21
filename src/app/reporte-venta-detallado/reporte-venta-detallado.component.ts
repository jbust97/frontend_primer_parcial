import { Component, OnInit } from '@angular/core';
import { CabeceraVenta } from '../models/cabeceraVenta';
import { Producto } from '../models/producto';
import { ClienteService } from '../service/cliente.service';
import { ProductoService } from '../service/producto.service';
import { VentasService } from '../service/ventas.service';

@Component({
  selector: 'app-reporte-venta-detallado',
  templateUrl: './reporte-venta-detallado.component.html',
  styleUrls: ['./reporte-venta-detallado.component.css'],
})
export class ReporteVentaDetalladoComponent implements OnInit {
  public numeroDocumento: string = '';
  public producto: string = '';
  public productosOptions: Producto[] = [];
  public fechaDesde: any = null;
  public fechaHasta: any = null;
  public listaVentas: CabeceraVenta[] = [];
  public selectedVenta: any = undefined;
  constructor(
    private ventasService: VentasService,
    private productoService: ProductoService
  ) {}

  async ngOnInit(): Promise<void> {
    //@ts-ignore
    this.productosOptions = await this.productoService.getAll();
    console.log(this.productosOptions);
  }

  async getVentas(): Promise<void> {
    const fechaDesde = this.fechaDesde && new Date(this.fechaDesde);
    const fechaHasta = this.fechaHasta && new Date(this.fechaHasta);

    const v = await this.ventasService.getVentas({
      codigoProducto: this.producto,
      fechaDesde,
      fechaHasta,
    });
    this.listaVentas = v;
  }
  onCardPress(element: any) {
    if (this.selectedVenta === element) this.selectedVenta = undefined;
    else this.selectedVenta = element;
  }
}
