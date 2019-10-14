class PokemonsRepository {

    constructor({ pokedex, pokemonAdapter }) {
        this.pokedex = pokedex;
        this.pokemonAdapter = pokemonAdapter;
    }

    async getAll() {
        const rawPokemonsData = await this.pokedex.getPokemonsList();

        return this.pokemonAdapter.adaptToEntities(rawPokemonsData);
    }
}

module.exports = PokemonsRepository;