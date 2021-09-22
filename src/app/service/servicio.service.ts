import { Injectable } from '@angular/core';
import { listadatos } from '../models/datos';
import { Servicio } from '../models/servicio';
import { base_url } from '../base_url';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private api = base_url;
  constructor(private http: HttpClient) { 

  }
  getServicio(itemsPerPage:number,inicio:number):Observable<listadatos<Servicio>>{
    return this.http.get<listadatos<Servicio>>(this.api + `stock-pwfe/servicio?cantidad=${itemsPerPage}&inicio=${inicio}`);
  } 
}
