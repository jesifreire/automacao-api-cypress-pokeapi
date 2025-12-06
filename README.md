# 🧪 Cypress API + K6 Performance Tests - PokeAPI

Testes automatizados de API utilizando **Cypress** para testes funcionais e **K6** para testes de performance com a [PokeAPI](https://pokeapi.co/).

---

## 📚 Tecnologias

- [Node.js](https://nodejs.org/)
- [Cypress](https://www.cypress.io/) - Testes funcionais
- [K6](https://k6.io/) - Testes de performance
- JavaScript

---

## 🚀 Como Executar

### Instalação

```bash
git clone https://github.com/jesifreire/cypress-api-pokeapi.git
cd cypress-api-pokeapi
npm install
```

### K6 (macOS/Linux/Windows)

```bash
# macOS
brew install k6

# Linux
sudo apt-get install k6

# Windows
choco install k6
```

### Cypress

```bash
# Interface gráfica
npx cypress open

# Modo headless
npx cypress run
```

### K6 Performance Tests

```bash
# Execução padrão
k6 run test/k6/pokeapi.test.js

# Com variáveis de ambiente
k6 run test/k6/pokeapi.test.js --env POKEMON_NAME=charmander

# Com relatório detalhado
k6 run test/k6/pokeapi.test.js -v
```

---

## 📋 Estrutura do Projeto

```
automacao-api-cypress-pokeapi/
├── cypress/
│   ├── e2e/
│   │   ├── pokeapi.spec.cy.js
│   │   └── listpoke.spec.cy.js
│   ├── fixtures/
│   └── support/
├── test/k6/
│   ├── pokeapi.test.js          # Testes de performance
│   ├── helpers/pokemonHelper.js # Funções reutilizáveis
│   ├── data/pokemons.csv        # Dados para testes
│   └── results/                 # Relatórios gerados
├── package.json
├── cypress.config.js
└── README.md
```

---

## ✅ Conceitos Implementados (K6)

1. **Thresholds** - Critérios de sucesso/falha
2. **Checks** - Validações estruturadas
3. **Helpers** - Funções reutilizáveis
4. **Trends** - Métricas de tendência
5. **Faker** - Dados aleatórios
6. **Variáveis de Ambiente** - Configurações dinâmicas
7. **Stages** - Fases de carga (ramp-up, soak, ramp-down)
8. **Reaproveitamento de Resposta** - Extração de dados
9. **Token de Autenticação** - Suporte preparado
10. **Data-Driven Testing** - Múltiplos conjuntos de dados
11. **Groups** - Agrupamento de operações

---

## 💡 Futuras Melhorias

- 🔄 CI/CD (GitHub Actions)
- 📊 Dashboard em tempo real (Grafana)
- 🔐 Testes com autenticação real
- 📄 Relatórios HTML automáticos

---

## 👤 Autor

👩‍💻 Jesiane Freire | [LinkedIn](https://www.linkedin.com/in/jesiane-freire/)

## 📄 Licença

Livre para fins de estudo e contribuição.