describe('Validando listagem de Pokémon', () => {
    const pokemons = ['pikachu', 'charmander', 'bulbasaur', 'squirtle'];

    pokemons.forEach((pokemon) => {
        it(`Deve retornar os dados do Pokémon ${pokemon}`, () => {
            cy.request(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
            .should((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('name', pokemon);
                expect(response.body).to.have.property('id');
                expect(response.body).to.have.property('types');
            });
        });
    });
    
})