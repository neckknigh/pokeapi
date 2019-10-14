const PokemonFightResult = require('src/domain/pokemonfightresult/PokemonFightResult');

class PokemonFightResultAdapter {

    constructor({ pokemonAdapter }) {
        this.pokemonAdapter = pokemonAdapter;
        this.adaptToEntity = this.adaptToEntity.bind(this);
    }

    adaptToEntity(rawPokemonFightResult) {

        const { pokemonList, id } = rawPokemonFightResult;
        const pokemonFightResult = new PokemonFightResult({ id });

        pokemonFightResult.setPokemonList(
            pokemonList.map(
                (rawPokemon) => this.pokemonAdapter.adaptToEntity(rawPokemon)
            )
        );

        return pokemonFightResult;
    }
}

module.exports = PokemonFightResultAdapter;
