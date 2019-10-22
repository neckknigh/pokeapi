class PokemonFightService {

    constructor({ pokemonService }) {
        this.pokemonService = pokemonService;
    }

    calculateMinimumFights(initialPokemonList, pokemonFightResult) {
        const { pokemonService } = this;

        /**
         * Extract the pokemon result list.
         * No pokemon on this list has ID.
         */
        const { pokemonList } = pokemonFightResult;

        /**
         * Merge pokemon result list with the pokedex list
         * in order to find their id's
         */
        const mergedPokemonFightResultList = this._mergePokemons(initialPokemonList, pokemonList);

        /**
         *  Sort the pokemons by id in the last result fight
         *  by using the fast stable sort avaliable.
         */
        const sortedPokemonFightResultList = pokemonService.sortPokemonsById(mergedPokemonFightResultList);

        // this will be the pokedex position for the pokemon
        let initialPokemonPosition = 0;
        const size = sortedPokemonFightResultList.length;

        // iterate over the pokemon sorted list
        while (initialPokemonPosition < size) {
            const currentPokemon = sortedPokemonFightResultList[initialPokemonPosition];

            // get the final position
            const finalPokemonPosition = this._findPokemonFinalPosition(
                mergedPokemonFightResultList,
                currentPokemon
            );

            /**
             * calculate the pokemon diff position
             * example: pokedexPosition: 0
             *          finalResultPosition: 2
             * result will be -2
             */
            const positionsDiff = initialPokemonPosition - finalPokemonPosition;

            if (positionsDiff > 2) {
                throw new Error(`The pokemon ${currentPokemon.name} had more battles than allowed`);
            }

            // set the fights
            currentPokemon.setFights(positionsDiff);

            /**
             * If the pokemon position difference is greater than 0
             */
            if (positionsDiff > 0) {
                let j = initialPokemonPosition - 1;

                // update the upper pokemon fights
                for (let i = positionsDiff; i > 0; i--) {
                    const p = sortedPokemonFightResultList[j];
                    if (!!p && p.getFights() <= 0) {
                        p.setFights(p.getFights() + 1);
                    }
                    j--;
                }
            }

            initialPokemonPosition++;
        }

        return this._reducePokemonListFights(sortedPokemonFightResultList);
    }

    /**
     * Allows to reduce a pokemon list by adding their fights.
     * Only add fights if greater than 0.
     * @param {Array<Pokemon>} pokemonList the pokemon list
     */
    _reducePokemonListFights(pokemonList) {
        let minimunFights = 0;

        pokemonList.forEach((pokemon) => {
            const fights = pokemon.getFights();
            if (fights > 0) {
                minimunFights = minimunFights + fights;
            }
        });

        return minimunFights;
    }

    /**
     * Allows to find the index of a pokemon in a collection.
     * @param {Array<Pokemon>} pokemonFightResultList 
     * @param {Pokemon} pokemon 
     */
    _findPokemonFinalPosition(pokemonFightResultList, pokemon) {
        return pokemonFightResultList.findIndex((p) => {
            return p.id === pokemon.id;
        });
    }

    /*
     * Pure Function
     * Allows to merge the initial pokedex list
     * with the pokemon fight result list
     * in order to find their id's.
     * 
     * @param {Array<Pokemon>} initialPokemonList the initial pokedex list
     * @param {Array<Pokemon>} resultPokemonList the pokemon fight result list
     */
    _mergePokemons(initialPokemonList, resultPokemonList) {
        const { pokemonService } = this;

        // Map pokemons by name: O(n)
        const nameMapedPokemons = pokemonService.mapPokemonsByName(initialPokemonList);

        // Clone the pokemon list => O(m)
        const clonedResultPokemonList = pokemonService.clonePokemons(resultPokemonList);

        // iterate over the pokemons O(m)
        clonedResultPokemonList.forEach((clonedPokemon) => {
            const { name } = clonedPokemon;
            const currentMappedPokemon = nameMapedPokemons[name];

            if (!currentMappedPokemon) {
                throw new Error(`The pokemon ${name} doesn't exists on the pokedex!`)
            }

            // assing the pokemon id
            clonedPokemon.setId(currentMappedPokemon.id);
        });

        return clonedResultPokemonList;
    }

}

module.exports = PokemonFightService;