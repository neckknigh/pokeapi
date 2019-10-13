const PokemonSerializer = {
  serialize({ name, id }) {
    return {
      name,
      id
    };
  }
};

module.exports = PokemonSerializer;
