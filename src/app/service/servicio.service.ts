import { Injectable } from '@angular/core';
import { listadatos } from '../models/datos';
import { Servicio, ServicioPostBody } from '../models/servicio';
import { base_url } from '../base_url';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PresentacionProducto } from '../models/presentacionProducto';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private api = base_url + 'stock-pwfe/servicio';
  constructor(private http: HttpClient) { 

  }
  getServicio(itemsPerPage:number,inicio:number):Observable<listadatos<Servicio>>{
    return this.http.get<listadatos<Servicio>>(this.api + `?cantidad=${itemsPerPage}&inicio=${inicio}`);
  }
  
  getUnServicio(idServicio: number):Observable<Servicio>{
    return this.http.get<Servicio>(this.api + '/' + idServicio);
  }

  postServicio(servicio: ServicioPostBody): Observable<Servicio> {
    console.log('Agregando Servicio' + JSON.stringify(servicio));
    return this.http.post<Servicio>(this.api, servicio, {
      headers: {
        "usuario": localStorage.getItem('userSession') as string,
      }
    });
  }

  getPresentacionProducto():Observable<listadatos<PresentacionProducto>>{
    return this.http.get<listadatos<PresentacionProducto>>(this.api);
  } 


 getServicioFicha(idFichaClinica: number):Observable<listadatos<Servicio>>{
    let params = new HttpParams()
    .set('ejemplo',`{"idFichaClinica":{"idFichaClinica": ${idFichaClinica}}}`);
    return this.http.get<listadatos<Servicio>>(this.api, {params:params}); 
  }
}
