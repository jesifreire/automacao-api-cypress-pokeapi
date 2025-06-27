# 🧪 Cypress API - Testes Automatizados com a PokeAPI

Este projeto tem como objetivo demonstrar testes automatizados de API utilizando o [Cypress](https://www.cypress.io/) com JavaScript. Os testes foram realizados sobre a [PokeAPI](https://pokeapi.co/), uma API pública com informações sobre Pokémons.

---

## 📚 Tecnologias utilizadas

- [Node.js](https://nodejs.org/)
- [Cypress](https://www.cypress.io/)
- JavaScript

---

## 📁 Estrutura do projeto

cypress-api-pokemon/
├── cypress/
│ ├── e2e/ # Arquivos de teste
│ │ ├── pokeapi.spec.cy.js
│ │ └── listpoke.spec.cy.js
│ ├── fixtures/ # Dados simulados (futuramente)
│ │ └── example.json
│ └── support/ # Comandos reutilizáveis
│ ├── commands.js
│ └── e2e.js
├── cypress.config.js # Configurações do Cypress
├── package.json
├── .gitignore
└── README.md


---

## 🚀 Como executar os testes

### 1. Clone o repositório

```bash
git clone https://github.com/jesifreire/cypress-api-pokeapi.git
cd cypress-api-pokemon

2. Instale as dependências
npm install
3. Execute os testes
Abrir o Cypress com interface gráfica
npx cypress open
Rodar todos os testes via terminal
npx cypress run

✅ Testes implementados
🔹 pokeapi.spec.cy.js
✅ Consulta do Pokémon Ditto

✅ Teste negativo com Pokémon inexistente (pikachu999)

🔹 listpoke.spec.cy.js
✅ Validação em lote para múltiplos Pokémons (pikachu, charmander, bulbasaur, squirtle)

✅ Verificação de status, nome, ID e tipo no corpo da resposta

💡 Futuras melhorias
🔄 Uso de arquivos de fixture para popular os testes dinamicamente

📄 Geração de relatórios de testes

🔗 Testes em outros endpoints da API, como /type e /ability

📦 Integração com CI (GitHub Actions)

👩‍💻 Desenvolvido por
Jesiane Freire
📫 LinkedIn • 💼 GitHub

📄 Licença
Este projeto é livre para fins de estudo, aprimoramento e contribuição.