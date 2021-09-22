import { Persona } from "./persona"
import { Subcategoria } from "./subcategoria";

export class Ficha{
    idFichaClinica!: number;
    fechaHora!: string;
    idEmpleado!: Persona;
    idCliente!: Persona;
    idTipoProducto!: Subcategoria;
}