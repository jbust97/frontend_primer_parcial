import { Injectable } from '@angular/core';
import { listadatos } from '../models/datos';
import { Servicio, ServicioPostBody, DetallePostBody, Detalle } from '../models/servicio';
import { base_url } from '../base_url';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PresentacionProducto } from '../models/presentacionProducto';
import { Detalle } from '../models/detalle';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private api = base_url + 'stock-pwfe/servicio';
  constructor(private http: HttpClient) { 

  }
  getServicio(filtros: any, itemsPerPage:number,inicio:number):Observable<listadatos<Servicio>>{
    let ejemplo:any = {}
    if(filtros.fechaDesde){
      ejemplo['fechaDesdeCadena'] = filtros.fechaDesde.split('-').join('')
    }
    if(filtros.fechaHasta){
      ejemplo['fechaHastaCadena'] = filtros.fechaHasta.split('-').join('')
    }
    if (filtros.idCliente){
      ejemplo['idCliente'] = {"idPersona": filtros.idCliente}
    }
    if (filtros.idEmpleado){
      ejemplo['idEmpleado'] = {"idPersona": filtros.idEmpleado}
    }
    
    let params = new HttpParams()
    .set('cantidad',itemsPerPage)
    .set('inicio',inicio)
    .set('ejemplo',JSON.stringify(ejemplo))

    return this.http.get<listadatos<Servicio>>(this.api, {params:params});
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

  postDetalle(detalle: DetallePostBody, idServicio: number): Observable<Servicio> {
    console.log('Agregando detalle' + JSON.stringify(detalle));
    return this.http.post<Servicio>(this.api + '/' + idServicio, detalle, {
      headers: {
        "usuario": localStorage.getItem('userSession') as string,
      }
    });
  }

  cancelarDetalle(idServicio: number, idServicioDetalle: number): Observable<void> {
    console.log(`${this.api}stock-pwfe/servicio/${idServicio}/detalle/${idServicioDetalle}`)
    return this.http.delete<void>(`${this.api}stock-pwfe/servicio/${idServicio}/detalle/${idServicioDetalle}`, {
      headers: {
        "usuario": localStorage.getItem('userSession') as string,
      }
    });
  }

  getDetalles(idServicio: number):Observable<listadatos<Detalle>> {
    console.log(`${this.api}stock-pwfe/servicio/${idServicio}/detalle`)
    return this.http.get<listadatos<Detalle>>(`${this.api}stock-pwfe/servicio/${idServicio}/detalle`);
  }

  getPresentacionProducto():Observable<listadatos<PresentacionProducto>>{
    return this.http.get<listadatos<PresentacionProducto>>(this.api);
  } 


 getServicioFicha(idFichaClinica: number):Observable<listadatos<Servicio>>{
    let params = new HttpParams()
    .set('ejemplo',`{"idFichaClinica":{"idFichaClinica": ${idFichaClinica}}}`);
    return this.http.get<listadatos<Servicio>>(this.api, {params:params}); 
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

  getServiciosDetallado(filtros: any): Observable<listadatos<Detalle>>{
    let ejemplo:any = {'idServicio':{}}
    if(filtros.fechaDesde){
      ejemplo['idServicio']['fechaDesdeCadena'] = filtros.fechaDesde.split('-').join('')
    }
    if(filtros.fechaHasta){
      ejemplo['idServicio']['fechaHastaCadena'] = filtros.fechaHasta.split('-').join('')
    }
    if (filtros.idCliente){
      ejemplo['idServicio']['idFichaClinica'] = {"idCliente":{"idPersona": filtros.idCliente}}
    }
    if (filtros.idEmpleado){
      ejemplo['idServicio']['idEmpleado'] = {"idPersona": filtros.idEmpleado}
    }
    //falta 1 filtro del orto
    let params = new HttpParams()
    .set('ejemplo',JSON.stringify(ejemplo))
    .set('detalle',"S")

    return this.http.get<listadatos<Detalle>>(this.api, {params:params});
  }

}
