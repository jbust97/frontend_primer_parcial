import { Persona } from "./persona"
import { Subcategoria } from "./subcategoria";

export class Ficha{
    fechaHora!: string;
    idEmpleado!: Persona;
    idCliente!: Persona;
    idTipoProducto!: Subcategoria;
}