const PokemonSerializer = {
  serialize({ name, id }) {
    return {
      name,
      id
    };
  },

  serializePokemonList(pokemonList) {
    return {
      pokemons: pokemonList.map(this.serialize)
    }
  }

};

module.exports = PokemonSerializer;
