const { expect } = require('chai');
const { GetLastPokemonFightResult } = require('src/app/newspaper');

describe('App :: Newspaper :: GetLastPokemonFightResult', () => {
    let getLastPokemonFightResult;

    context('when newspaper last pokemon fight result exists', () => {
        beforeEach(() => {
            const MockPokemonFightResultsRepository = {
                getLast: () => Promise.resolve('imagine the result...')
            };

            getLastPokemonFightResult = new GetLastPokemonFightResult({
                pokemonFightResultsRepository: MockPokemonFightResultsRepository
            });
        });

        it('emits SUCCESS with the pokemon fight result', (done) => {
            getLastPokemonFightResult.on(getLastPokemonFightResult.outputs.SUCCESS, (response) => {
                expect(response).to.equal('imagine the result...');
                done();
            });

            getLastPokemonFightResult.execute();
        });
    });
});
