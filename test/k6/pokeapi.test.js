import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { Trend, Counter, Gauge } from 'k6/metrics';
import { getPokemon, validatePokemonResponse, extractPokemonData } from './helpers/pokemonHelper.js';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import { randomString } from 'https://jslib.k6.io/k6-utils/1.1.0/index.js';

// ========================================
// VARIÁVEIS DE AMBIENTE
// Demonstra o conceito de Variável de Ambiente
// ========================================
const BASE_URL = __ENV.BASE_URL || 'https://pokeapi.co/api/v2';
const POKEMON_NAME = __ENV.POKEMON_NAME || 'pikachu';

// ========================================
// TRENDS - Métricas de tendência
// Demonstra o conceito de Trends - coleta de valores para análise
// ========================================
const requestDuration = new Trend('request_duration');
const pokemonHeightTrend = new Trend('pokemon_height');
const pokemonWeightTrend = new Trend('pokemon_weight');

// ========================================
// COUNTERS - Métricas de contagem
// ========================================
const successfulRequests = new Counter('successful_requests');
const failedRequests = new Counter('failed_requests');
const totalPokemonsProcessed = new Counter('total_pokemons_processed');

// ========================================
// GAUGE - Métrica de valor instantâneo
// ========================================
const currentVirtualUsers = new Gauge('current_virtual_users');

// ========================================
// THRESHOLDS - Limites de desempenho
// Demonstra o conceito de Thresholds - define critérios de sucesso
// ========================================
export const options = {
  stages: [
    // ========================================
    // STAGES - Definição de fases de carga
    // Demonstra o conceito de Stages - escalona a carga de usuários
    // ========================================
    { duration: '10s', target: 5 },    // Ramp-up: até 5 usuários em 10s
    { duration: '20s', target: 10 },   // Aumento: até 10 usuários em 20s
    { duration: '30s', target: 10 },   // Soak: mantém 10 usuários por 30s
    { duration: '10s', target: 0 },    // Ramp-down: reduz para 0 usuários em 10s
  ],
  thresholds: {
    // Thresholds para duração das requisições
    'http_req_duration': ['p(95)<500', 'p(99)<1000'],
    'request_duration': ['p(95)<500', 'p(99)<1000'],
    
    // Thresholds para taxa de erro
    'http_req_failed': ['rate<0.1'],
    
    // Thresholds para requisições bem-sucedidas (usando count ao invés de value)
    'successful_requests': ['count>0'],
    
    // Thresholds para status HTTP
    'http_reqs': ['count>0'],
  },
};

// ========================================
// SETUP - Executado uma vez antes dos testes
// ========================================
export function setup() {
  console.log('🚀 Iniciando testes de performance da PokeAPI');
  console.log(`📍 BASE_URL: ${BASE_URL}`);
  return { baseURL: BASE_URL };
}

// ========================================
// MAIN TEST FUNCTION - Função principal de testes
// ========================================
export default function (data) {
  const baseURL = data.baseURL;
  
  // Atualiza gauge com usuários virtuais
  currentVirtualUsers.add(__VU);

  // ========================================
  // GROUP 1 - Teste Básico de Pokémon
  // Demonstra o conceito de Groups - agrupamento de operações
  // ========================================
  group('Buscar Pokémon por Nome', function () {
    const response = getPokemon(POKEMON_NAME, baseURL);
    const startTime = new Date();
    
    // Registra duração da requisição na Trend
    requestDuration.add(response.timings.duration);
    
    // ========================================
    // CHECKS - Validações estruturadas
    // Demonstra o conceito de Checks - validações com relatório
    // ========================================
    const checkResult = validatePokemonResponse(response, POKEMON_NAME);
    
    if (checkResult) {
      successfulRequests.add(1);
    } else {
      failedRequests.add(1);
    }

    // ========================================
    // REAPROVEITAMENTO DE RESPOSTA
    // Demonstra o conceito de Reaproveitamento de Resposta
    // Extrai dados para usar em próximas requisições
    // ========================================
    if (response.status === 200) {
      const pokemonData = extractPokemonData(response);
      pokemonHeightTrend.add(pokemonData.height);
      pokemonWeightTrend.add(pokemonData.weight);
      
      console.log(`✅ ${pokemonData.name} encontrado - Altura: ${pokemonData.height}, Peso: ${pokemonData.weight}`);
    }
  });

  sleep(1);

  // ========================================
  // GROUP 2 - Data-Driven Testing
  // Demonstra o conceito de Data-Driven Testing - múltiplos dados
  // ========================================
  group('Data-Driven Testing com Múltiplos Pokémons', function () {
    const pokemons = ['pikachu', 'charmander', 'bulbasaur', 'squirtle', 'ditto'];
    
    pokemons.forEach((pokemon) => {
      const response = getPokemon(pokemon, baseURL);
      
      // Registra na Trend
      requestDuration.add(response.timings.duration);
      totalPokemonsProcessed.add(1);
      
      check(response, {
        [`${pokemon} status é 200`]: (r) => r.status === 200,
        [`${pokemon} possui id`]: (r) => r.json('id') !== null,
      });
    });
  });

  sleep(1);

  // ========================================
  // GROUP 3 - Teste de Erro
  // Valida comportamento em caso de Pokémon inexistente
  // ========================================
  group('Teste de Pokémon Inexistente', function () {
    const invalidPokemon = `pokemon_inexistente_${randomString(8)}`;
    const response = http.get(`${baseURL}/pokemon/${invalidPokemon}`);
    
    check(response, {
      'Pokémon inexistente retorna 404': (r) => r.status === 404,
    });
  });

  sleep(1);

  // ========================================
  // GROUP 4 - Teste com Faker
  // Demonstra o conceito de Faker - gerar dados aleatórios
  // ========================================
  group('Teste com Dados Aleatórios (Faker)', function () {
    // randomString já foi importado acima
    const randomPokemonId = Math.floor(Math.random() * 1025) + 1; // IDs válidos: 1-1025
    const response = http.get(`${baseURL}/pokemon/${randomPokemonId}`);
    
    requestDuration.add(response.timings.duration);
    
    check(response, {
      'Pokémon por ID aleatório retorna 200': (r) => r.status === 200,
      'Possui propriedades obrigatórias': (r) => 
        r.json('id') !== null && 
        r.json('name') !== null &&
        r.json('types') !== null,
    });
  });

  sleep(1);

  // ========================================
  // GROUP 5 - Teste de Tipos
  // Reutiliza resposta anterior (conceito de Reaproveitamento)
  // ========================================
  group('Validar Tipos de Pokémons', function () {
    const pokemons = ['pikachu', 'charmander', 'bulbasaur'];
    
    pokemons.forEach((pokemon) => {
      const response = getPokemon(pokemon, baseURL);
      
      if (response.status === 200) {
        const types = response.json('types');
        
        check(response, {
          [`${pokemon} possui tipos definidos`]: (r) => types.length > 0,
          [`${pokemon} tem pelo menos 1 tipo`]: (r) => types.length >= 1,
        });
      }
    });
  });

  sleep(1);
}

// ========================================
// TEARDOWN - Executado uma vez ao final dos testes
// ========================================
export function teardown(data) {
  console.log('✨ Testes de performance concluídos!');
  console.log(`📊 Total de requisições bem-sucedidas: ${successfulRequests.value}`);
  console.log(`❌ Total de requisições falhadas: ${failedRequests.value}`);
  console.log(`🎯 Total de Pokémons processados: ${totalPokemonsProcessed.value}`);
}
