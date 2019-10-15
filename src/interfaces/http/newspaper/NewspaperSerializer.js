const NewspaperSerializer = {
    serializeLastPokemonFightResult(pokemonFightResult) {
        return {
            "Pokefight_result": pokemonFightResult.pokemonList.map((pokemon) => {
                const { name } = pokemon;
                return name;
            })
        };
    }
};

module.exports = NewspaperSerializer;
