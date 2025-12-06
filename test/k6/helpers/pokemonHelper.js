import http from 'k6/http';
import { check } from 'k6';

/**
 * Helper para fazer request GET de um Pokémon
 * Demonstra o conceito de Helpers - funções reutilizáveis
 */
export function getPokemon(pokemonName, baseURL) {
  const url = `${baseURL}/pokemon/${pokemonName}`;
  const response = http.get(url);
  return response;
}

/**
 * Helper para validar resposta de Pokémon
 * Demonstra o conceito de Checks - validações estruturadas
 */
export function validatePokemonResponse(response, pokemonName) {
  return check(response, {
    'Status é 200': (r) => r.status === 200,
    'Possui propriedade name': (r) => r.body.includes('name'),
    'Possui propriedade id': (r) => r.body.includes('id'),
    'Possui propriedade types': (r) => r.body.includes('types'),
    'Nome correto': (r) => r.json('name') === pokemonName,
  });
}

/**
 * Helper para reaproveitamento de resposta
 * Demonstra o conceito de Reaproveitamento de Resposta
 * Extrai dados da resposta para usar em próximas requisições
 */
export function extractPokemonData(response) {
  const pokemonData = {
    id: response.json('id'),
    name: response.json('name'),
    height: response.json('height'),
    weight: response.json('weight'),
    types: response.json('types'),
  };
  return pokemonData;
}

/**
 * Helper para fazer request com retry
 * Demonstra tratamento de erro e resiliência
 */
export function getPokemonWithRetry(pokemonName, baseURL, maxRetries = 3) {
  let response;
  let retries = 0;

  while (retries < maxRetries) {
    response = getPokemon(pokemonName, baseURL);
    if (response.status === 200) {
      return response;
    }
    retries++;
  }

  return response;
}

