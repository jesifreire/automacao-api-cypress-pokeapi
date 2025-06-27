describe('PokeAPI - Teste de GET em Pokémon', () => {
  it('Deve retornar os dados do Pokémon Ditto', () => {
    cy.request('https://pokeapi.co/api/v2/pokemon/ditto')
      .should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('name', 'ditto');
        expect(response.body).to.have.property('id');
        expect(response.body).to.have.property('types');
      });
  });
});
describe('PokeAPI - Testes negativos', () => {
  it('Deve retornar 404 ao buscar um Pokémon inexistente', () => {
    cy.request({
      url: 'https://pokeapi.co/api/v2/pokemon/pikachu999',
      failOnStatusCode: false 
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
});
