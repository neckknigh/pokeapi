const { expect } = require('chai');
const { GetAllPokemons } = require('src/app/pokemon');

describe('App :: Pokemon :: GetAllPokemons', () => {
    var getAllPokemons;

    context('when query is successful', () => {
        before(() => {
            const MockPokemonsRepository = {
                getAll: () => Promise.resolve('Imagine all the pokemons...')
            };

            getAllPokemons = new GetAllPokemons({
                pokemonsRepository: MockPokemonsRepository
            });
        });

        it('emits SUCCESS with all the pokemons', (done) => {
            getAllPokemons.on(getAllPokemons.outputs.SUCCESS, (response) => {
                expect(response).to.equal('Imagine all the pokemons...');
                done();
            });

            getAllPokemons.execute();
        });
    });

    context('when there is an internal error', () => {
        before(() => {
            const MockPokemonsRepository = {
                getAll: () => Promise.reject(new Error('Failed'))
            };

            getAllPokemons = new GetAllPokemons({
                pokemonsRepository: MockPokemonsRepository
            });
        });

        it('emits ERROR with the error', (done) => {
            getAllPokemons.on(getAllPokemons.outputs.ERROR, (response) => {
                expect(response.message).to.equal('Failed');
                done();
            });

            getAllPokemons.execute();
        });
    });
});
