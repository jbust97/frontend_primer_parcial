import { Injectable } from '@angular/core';
import { listadatos } from '../models/datos';
import { Ficha } from '../models/fichas';
import { base_url } from '../base_url';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ServicefichaService {
  private api = base_url;
  constructor(private http: HttpClient) { 

  }
  getfichas(itemsPerPage:number,inicio:number):Observable<listadatos<Ficha>>{
    return this.http.get<listadatos<Ficha>>(this.api + `stock-pwfe/fichaClinica?cantidad=${itemsPerPage}&inicio=${inicio}`);
  } 
}
