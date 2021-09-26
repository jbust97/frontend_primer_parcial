import { Component, OnInit } from '@angular/core';
import { listadatos } from '../models/datos';
import { Reserva } from "../models/reserva";
import { ReservaService } from '../service/reserva.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {
  public data: Reserva[] = [];
  public columns = ["Fecha","Hora inicio","Hora fin","Profesional","Cliente","Acciones"];
  config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 1
  }
  next = "Siguiente"
  back = "Atras"
  constructor(private reservaService: ReservaService) { }

  ngOnInit(): void {
    this.getReservas();
  }

  getReservas() {
    let currentPage = this.config.currentPage;
    let itemsPerPage = this.config.itemsPerPage;

    let inicio = currentPage - 1;
    inicio = inicio * itemsPerPage; 

    this.reservaService.getReservas(itemsPerPage,inicio)
    .subscribe((data:listadatos<Reserva>) => {
     this.data = data.lista;
     this.config.totalItems = data.totalDatos;
    });
  }

  cancelarReserva(reserva: Reserva) {
    this.reservaService.cancelarReserva(reserva.idReserva)
    .subscribe((data:any) => console.log(`Reserva ${reserva.idReserva} cancelada!`));
    this.getReservas();
  }

  pageChanged(event: number){
    this.config.currentPage = event;
    this.getReservas()
  }

}
