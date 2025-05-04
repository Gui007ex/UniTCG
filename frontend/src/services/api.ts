import { Carta } from '../types/Card';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://3.148.180.16:8080/api/carta';

export async function fetchCartas(): Promise<Carta[]> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`Erro ao buscar cartas: ${response.statusText}`);
  }
  const cartas: Carta[] = await response.json();
  return cartas;
}
