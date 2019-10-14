const pokemonFightResultMockData = require('./PokemonFightResultMockData');

/**
 * We are using mocks for the last pokemon fight result
 * In real scenario, this data will be fetched from db.
 */

class PokemonFightResultService {

    async getLastPokemonFightResult() {
        return new Promise((resolve) => {
            resolve(pokemonFightResultMockData);
        });
    }
}

module.exports = PokemonFightResultService;
