import { Usuario } from "./Usuario";

export interface Carta {
    id: string;
    name: string;
    code: string;
    description: string;
    imgUrl: string;
    price:string;
    dealer: Usuario;
    locked: boolean;
}