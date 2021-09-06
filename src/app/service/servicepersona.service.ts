import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Persona} from '../models/persona';
import {listadatos} from '../models/datos'
import { Observable } from 'rxjs';
import { base_url } from '../base_url';

@Injectable({
  providedIn: 'root'
})
export class ServicepersonaService {
  private api: string = base_url  + "stock-pwfe/persona";
  constructor(private http: HttpClient) { 

  }
  getPersonas():Observable<listadatos<Persona>>{
    return this.http.get<listadatos<Persona>>(this.api);
  } 
}
