import { Injectable } from '@angular/core';
import { listadatos } from '../models/datos';
import { Reserva } from '../models/reserva';
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
    return this.http.get<listadatos<Reserva>>(`${this.api}stock-pwfe/reserva?cantidad=${itemsPerPage}&inicio=${inicio}`)
  }
}
