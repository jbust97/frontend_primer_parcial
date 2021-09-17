import { Persona } from "./persona";

export class Reserva {
    fecha!: string;
    horaInicio!: string;
    horaFin!: string;
    idEmpleado!: Persona;
    idCliente!: Persona;
}