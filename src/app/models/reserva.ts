import { Persona } from "./persona";

export class Reserva {
    fecha!: string;
    horaInicio!: string;
    horaFin!: string;
    idEmpleado!: Persona;
    idCliente!: Persona;
}

export class ReservaPostBody {
    fechaCadena!: string;
    horaInicioCadena!: string; 
    horaFinCadena!: string;
    idEmpleado!: Partial<Persona>;
    idCliente!: Partial<Persona>; 
}
