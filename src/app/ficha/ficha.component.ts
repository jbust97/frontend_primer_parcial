import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Ficha } from '../models/fichas';
import { ServicefichaService } from '../service/serviceficha.service';

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.css']
})
export class FichaComponent implements OnInit {
  public data: Ficha[] = [];
  public columns = ["Fecha","Profesional","Cliente","Categoria","Subcategoria"];
  config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: 1
  }
  next = "Siguiente"
  back = "Atras"
  
  constructor(private http: HttpClient, private servicioFicha: ServicefichaService) { }

  ngOnInit(){
    this.getFichas();
  }
  getFichas(){
    let currentPage = this.config.currentPage;
    let itemsPerPage = this.config.itemsPerPage;
    let inicio = currentPage-1;
    inicio = inicio*itemsPerPage; 
    this.servicioFicha.getfichas(itemsPerPage,inicio)
    .subscribe((data:any)=>{
     console.log(data);
     this.data = data.lista;
     this.config.totalItems=  data.totalDatos;
    });
  }

  pageChanged(event: number){
    this.config.currentPage = event;
    this.getFichas()
  }
}
  