const API_URL = 'https://api.pokemontcg.io/v2/cards';
const API_KEY = import.meta.env.VITE_POKEMONTCG_API_KEY;

export async function fetchCards(page: number = 1, pageSize: number = 20) {
  const response = await fetch(`${API_URL}?page=${page}&pageSize=${pageSize}`, {
    headers: {
      'X-Api-Key': API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error(`Erro ao buscar cartas: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data; // o array de cartas está em data.data
}
