const { attributes } = require('structure');
const Pokemon = require('../pokemon/Pokemon');

const PokemonFightResult = attributes({
    pokemonList: {
        type: Array,
        itemType: Pokemon,
        required: false
    }
})(class Pokemon {
    setPokemonList(pokemonList) {
        this.pokemonList = pokemonList;
    }
});


module.exports = PokemonFightResult;
