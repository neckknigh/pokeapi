const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');

const PokemonFightController = {
    get router() {
        const router = Router();

        router.use(inject('pokemonFightSerializer'));

        router.get('/minimumfights?:pokemonresultlist', inject('getMinimumFights'), this.index);

        return router;
    },

    index(req, res, next) {
        const { getMinimumFights, pokemonFightSerializer, query } = req;
        const { SUCCESS, ERROR } = getMinimumFights.outputs;
        const { pokemonresultlist } = query;

        getMinimumFights
            .on(SUCCESS, (minimunPokemonFights) => {
                res
                    .status(Status.OK)
                    .json(pokemonFightSerializer.serializeMinimumFights(minimunPokemonFights));
            })
            .on(ERROR, next);

        getMinimumFights.execute(pokemonresultlist);
    }
};

module.exports = PokemonFightController;
