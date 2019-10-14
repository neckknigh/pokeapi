const chance = require('../support/dataFaker');

module.exports = {
    id: chance.integer({
        min: 0
    }),
    pokemonList: [
        "bulbasaur",
        "charmander",
        "squirtle",
        "caterpie",
        "weedle",
        "kakuna",
        "beedrill",
        "pidgey",
    ]
};