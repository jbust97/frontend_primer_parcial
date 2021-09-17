import { PresentacionProducto } from "./presentacionProducto";
import { Servicio } from "./servicio";

export class Detalle {
    cantidad!: number;
    idPresentacionProducto!: PresentacionProducto;
    idServicio!: Servicio;       
}