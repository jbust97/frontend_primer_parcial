import { Persona } from "./persona"
import { Subcategoria } from "./subcategoria";

export class Ficha{
    fechaHora!: string;
    motivoConsulta!: string;
    observaciones!: string;
    diagnostico!:string;
    idEmpleado!: Persona;
    idCliente!: Persona;
    idTipoProducto!: Subcategoria;
}