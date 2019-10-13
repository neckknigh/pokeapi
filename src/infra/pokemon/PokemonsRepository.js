const pokemonAdapter = require("./PokemonAdapter");

class PokemonsRepository {

    constructor({ pokedex }) {
        this.pokedex = pokedex;
    }

    async getAll() {
        const rawPokemonsData = await this.pokedex.getPokemonsList();

        return pokemonAdapter.adaptToEntities(rawPokemonsData);
    }
}

module.exports = PokemonsRepository;