import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentaComponent } from './venta/venta.component';
import { ReporteVentaComponent } from './reporte-venta/reporte-venta.component';
import { ReporteVentaDetalladoComponent } from './reporte-venta-detallado/reporte-venta-detallado.component';

const routes: Routes = [
  {
    path: 'ventas',
    component: VentaComponent,
  },
  {
    path: 'reporte-ventas',
    component: ReporteVentaComponent,
  },
  {
    path: 'reporte-ventas-detallado',
    component: ReporteVentaDetalladoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
