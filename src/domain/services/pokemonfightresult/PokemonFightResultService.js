class PokemonFightResultService {

    constructor({ pokemonAdapter }) {
        this.pokemonAdapter = pokemonAdapter;
    }

    buildPokemonFightResultFromPokemonList(pokemonList) {
        return {
            pokemonList: pokemonList.split(",").filter((p) => !!p).map((pokemon) => this.pokemonAdapter.adaptToEntity(pokemon))
        };
    }
}

module.exports = PokemonFightResultService;