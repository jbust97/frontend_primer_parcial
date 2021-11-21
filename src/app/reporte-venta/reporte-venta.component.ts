import { Component, OnInit } from '@angular/core';
import { CabeceraVenta } from '../models/cabeceraVenta';
import { ClienteService } from '../service/cliente.service';
import { VentasService } from '../service/ventas.service';

@Component({
  selector: 'app-reporte-venta',
  templateUrl: './reporte-venta.component.html',
  styleUrls: ['./reporte-venta.component.css'],
})
export class ReporteVentaComponent implements OnInit {
  public numeroDocumento: string = '';
  public nombreCliente: string = '';
  public fechaDesde: any = null;
  public fechaHasta: any = null;
  public listaVentas: CabeceraVenta[] = [];
  constructor(
    private ventasService: VentasService,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {}

  async getVentas(): Promise<void> {
    const fechaDesde = this.fechaDesde && new Date(this.fechaDesde);
    const fechaHasta = this.fechaHasta && new Date(this.fechaHasta);

    this.listaVentas = await this.ventasService.getVentas({
      rucCliente: this.numeroDocumento,
      fechaDesde,
      fechaHasta,
    });
    const cliente = await this.clienteService.getByNroDocumento(
      this.numeroDocumento
    );
    if (this.numeroDocumento || this.numeroDocumento === '0') {
      this.nombreCliente = cliente
        ? cliente.nombreCompleto
        : 'No existe un Cliente con este RUC/Cedula';
    }
  }
}
