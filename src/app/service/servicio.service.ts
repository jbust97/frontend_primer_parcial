import { Injectable } from '@angular/core';
import { listadatos } from '../models/datos';
import { Servicio } from '../models/servicio';
import { base_url } from '../base_url';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ServicioService { 
  private api = base_url + "stock-pwfe/servicio";
  constructor(private http: HttpClient) { 

  }
  getServicio(itemsPerPage:number,inicio:number):Observable<listadatos<Servicio>>{
    return this.http.get<listadatos<Servicio>>(this.api + `?cantidad=${itemsPerPage}&inicio=${inicio}`);
  }
  getServicios(filtros: any): Observable<listadatos<Servicio>>{
    let ejemplo:any = {}
    if(filtros.fechaDesde){
      ejemplo['fechaDesdeCadena'] = filtros.fechaDesde.split('-').join('')
    }
    if(filtros.fechaHasta){
      ejemplo['fechaHastaCadena'] = filtros.fechaHasta.split('-').join('')
    }
    if (filtros.idCliente){
      ejemplo['idFichaClinica'] = {"idCliente":{"idPersona": filtros.idCliente}}
    }
    if (filtros.idEmpleado){
      ejemplo['idEmpleado'] = {"idPersona": filtros.idEmpleado}
    }
    let params = new HttpParams()
    .set('ejemplo',JSON.stringify(ejemplo))

    return this.http.get<listadatos<Servicio>>(this.api, {params:params});
  }
}
