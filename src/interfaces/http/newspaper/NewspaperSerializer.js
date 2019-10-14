class NewspaperSerializer {
    serializeLastPokemonFightResult(pokemonFightResult) {
        return {
            "Pokefight_result": pokemonFightResult.pokemonList.map((pokemon) => {
                const { name, id } = pokemon;
                return {
                    name,
                    id
                }
            })
        }
    }
};

module.exports = NewspaperSerializer;
