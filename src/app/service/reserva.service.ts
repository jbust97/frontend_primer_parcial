import { Injectable } from '@angular/core';
import { listadatos } from '../models/datos';
import { Reserva, ReservaPostBody } from '../models/reserva';
import { base_url } from '../base_url';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  api = base_url;

  constructor(private http: HttpClient) { }

  getReservas(itemsPerPage:number,inicio:number): Observable<listadatos<Reserva>> {
    return this.http.get<listadatos<Reserva>>(`${this.api}stock-pwfe/reserva`)
  }

  postReserva(reserva: ReservaPostBody): Observable<Reserva> {
    console.log('Agregando reserva' + JSON.stringify(reserva));
    return this.http.post<Reserva>(`${this.api}stock-pwfe/reserva`, reserva, {
      headers: {
        "usuario": localStorage.getItem('userSession') as string,
      }
    });
  }

  cancelarReserva(idReserva: number): Observable<void> {
    console.log(`${this.api}stock-pwfe/reserva/${idReserva}`)
    return this.http.delete<void>(`${this.api}stock-pwfe/reserva/${idReserva}`, {
      headers: {
        "usuario": localStorage.getItem('userSession') as string,
      }
    });
  }

  getAgenda(idPersona: number, fecha: string): Observable<Reserva[]> {
    console.log('Obteniendo agenda');
    return this.http.get<Reserva[]>(`${this.api}stock-pwfe/persona/${idPersona}/agenda?fecha=${fecha}&disponible=S`);
  }
}
