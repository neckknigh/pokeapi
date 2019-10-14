const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');

const PokemonsController = {
    get router() {
        const router = Router();

        router.use(inject('pokemonSerializer'));

        router.get('/', inject('getAllPokemons'), this.index);

        return router;
    },

    index(req, res, next) {
        const { getAllPokemons, pokemonSerializer } = req;
        const { SUCCESS, ERROR } = getAllPokemons.outputs;

        getAllPokemons
            .on(SUCCESS, (pokemons) => {
                res
                    .status(Status.OK)
                    .json(pokemonSerializer.serializePokemonList(pokemons));
            })
            .on(ERROR, next);

        getAllPokemons.execute();
    }
};

module.exports = PokemonsController;
