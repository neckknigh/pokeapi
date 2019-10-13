const Pokemon = require('src/domain/pokemon/Pokemon');

class PokemonAdapter {

    constructor() {
        this.adaptToEntity = this.adaptToEntity.bind(this);
    }

    adaptToEntity(rawPokemon) {
        const { name, url } = rawPokemon;

        return new Pokemon({ name, id: this.buildPokemonID(url) });
    }

    buildPokemonID(pokemonUrl) {
        const urlParts = pokemonUrl.split("/");
        return urlParts[urlParts.length - 2];
    }

    adaptToEntities(rawData) {
        const { results } = rawData;

        return results.map(this.adaptToEntity);
    }
}

const pokemonAdapter = new PokemonAdapter();
console.log("adapter", pokemonAdapter.buildPokemonID("1"));

module.exports = pokemonAdapter;
