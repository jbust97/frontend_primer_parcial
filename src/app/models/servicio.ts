import { Ficha } from "./fichas";

export class Servicio {
    idServicio!: number;
    //flagEstado: R,
    fechaHora!: string;
    //presupuesto: 0.00,
    idFichaClinica!: Ficha;
    observacion!: string;
    //listaDetalles!: T[];
}

export class ServicioPostBody {
    idFichaClinica!: Partial<Ficha>;
    observacion!: string;
}