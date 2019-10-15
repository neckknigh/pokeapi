const { expect } = require('chai');
const { PokemonFightsAppService } = require('src/app/services');

describe('App :: Services :: PokemonFights :: Pokemonfight', () => {
    var pokemonFightsAppService;

    context('when quering the minimum fights is successful', () => {
        before(() => {

            const MockPokemonFightService = {
                calculateMinimumFights: () => 0
            }

            const MockPokemonsRepository = {
                getAll: () => Promise.resolve('imagine all the pokemons...')
            };

            const MockPokemonFightResultsRepository = {
                getLast: () => Promise.resolve('imagine the last result..')
            }

            pokemonFightsAppService = new PokemonFightsAppService({
                pokemonFightService: MockPokemonFightService,
                pokemonFightResultsRepository: MockPokemonFightResultsRepository,
                pokemonsRepository: MockPokemonsRepository
            });
        });

        it('emits the minimum fights', async () => {
            const minimum = await pokemonFightsAppService.calculateMinimumFights();

            expect(minimum).to.equal(0);
        });
    });
});
