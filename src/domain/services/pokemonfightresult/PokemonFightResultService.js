class PokemonFightResultService {

    constructor({ pokemonAdapter }) {
        this.pokemonAdapter = pokemonAdapter;
    }

    buildPokemonFightResultFromPokemonList(pokemonList) {
        return {
            pokemonList: pokemonList.split(",").map((pokemon) => this.pokemonAdapter.adaptToEntity(pokemon))
        };
    }
}

module.exports = PokemonFightResultService;