import { Component, OnInit } from '@angular/core';
import { ServicefichaService } from 'src/app/service/serviceficha.service';
import {Ficha} from '../../models/fichas'
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-modificarficha',
  templateUrl: './modificarficha.component.html',
  styleUrls: ['./modificarficha.component.css']
})
export class ModificarfichaComponent implements OnInit {
  ficha: Ficha = new Ficha()
  constructor(private route: ActivatedRoute, private servicioFicha: ServicefichaService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.ficha.idFichaClinica = parseInt(paramMap.get('id') ?? '');
      this.servicioFicha.getFicha(this.ficha.idFichaClinica)
      .subscribe((data:any)=>{
        this.ficha = data;
        this.ficha.idCliente.fullName =this.ficha.idCliente.nombre + ' ' + this.ficha.idCliente.apellido;
        this.ficha.idEmpleado.fullName =this.ficha.idEmpleado.nombre + ' ' +   this.ficha.idEmpleado.apellido;

      })
    })
    
  }

  guardar(): void{
    this.servicioFicha.putFicha(this.ficha).subscribe();
  }
}
