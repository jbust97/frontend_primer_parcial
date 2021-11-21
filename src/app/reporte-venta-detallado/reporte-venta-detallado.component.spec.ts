import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteVentaDetalladoComponent } from './reporte-venta-detallado.component';

describe('ReporteVentaDetalladoComponent', () => {
  let component: ReporteVentaDetalladoComponent;
  let fixture: ComponentFixture<ReporteVentaDetalladoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteVentaDetalladoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteVentaDetalladoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
