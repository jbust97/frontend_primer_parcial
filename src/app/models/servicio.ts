import { Ficha } from "./fichas";

export class Servicio {
    idServicio!: number;
    //flagEstado: R,
    fechaHora!: string;
    presupuesto!: number;
    idFichaClinica!: Ficha;
    observacion!: string;
    //listaDetalles!: T[];
}

export class ServicioPostBody {
    idFichaClinica!: Partial<Ficha>;
    observacion!: string;
}