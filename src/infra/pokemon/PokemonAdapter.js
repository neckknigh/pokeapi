const Pokemon = require('src/domain/pokemon/Pokemon');

class PokemonAdapter {

    constructor() {
        this.adaptToEntity = this.adaptToEntity.bind(this);
    }

    adaptToEntity(rawPokemon) {
        let { name, url } = rawPokemon;
        let id = null;

        if (!name) {
            name = rawPokemon;
        }

        if (!!url) {
            id = this.buildPokemonID(url);
        }

        return new Pokemon({ name, id });
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

module.exports = PokemonAdapter;
