const fastSort = require('fast-sort');

class PokemonService {

    /**
     * Pure Function.
    * Cyclomatic Complexity: O(n) where n is the number of pokemons.
    * Allows to map pokemons by their name.
    * @param {Array<Pokemon>} pokemonList pokemon list to map
    */
    mapPokemonsByName(pokemonList) {
        const pokemonsMap = {};
        pokemonList.forEach(pokemon => {
            pokemonsMap[`${pokemon.name}`] = pokemon;
        });

        return pokemonsMap;
    }

    /**
     * Pure Function.
     * Allows to sort a list of pokemons by id,
     * using the Stable Sort.
     * @param {Array<Pokemon>} pokemonList pokemon list to be sorted
     */
    sortPokemonsById(pokemonList) {
        return fastSort(this.clonePokemons(pokemonList)).asc(pokemon => pokemon.id);
    }

    clonePokemons(pokemons) {
        return pokemons.map((pokemon) => {
            return {
                id: pokemon.id,
                name: pokemon.name,
                fights: pokemon.fights,
                setId: pokemon.setId,
                setFights: pokemon.setFights,
                getFights: pokemon.getFights
            }
        });
    }

}

module.exports = PokemonService;