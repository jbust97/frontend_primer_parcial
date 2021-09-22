import { Injectable } from '@angular/core';
import { listadatos } from '../models/datos';
import { Ficha } from '../models/fichas';
import { base_url } from '../base_url';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'; 
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ServicefichaService {
  private api = base_url + 'stock-pwfe/fichaClinica';
  constructor(private http: HttpClient) { 

  }
  getfichas(itemsPerPage:number,inicio:number):Observable<listadatos<Ficha>>{
    return this.http.get<listadatos<Ficha>>(this.api + `?cantidad=${itemsPerPage}&inicio=${inicio}`);
  }
  postficha(ficha: Ficha):Observable<Ficha>{  
    console.log(this.api)
    console.log("headers: " + localStorage.getItem("userSession") ?? "" )
    return this.http.post<Ficha>(this.api,ficha,{
      headers:{usuario: localStorage.getItem("userSession") ?? ""}
    }).pipe(
      tap(
        data => console.log("Agregado: " + data),
        error => console.log("Error: " + error)
      )
    );
  } 
}
