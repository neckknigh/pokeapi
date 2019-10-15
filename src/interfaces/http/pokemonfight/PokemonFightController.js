const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');

const PokemonFightController = {
    get router() {
        const router = Router();

        router.use(inject('pokemonFightSerializer'));

        router.get('/lastresult/minimumfights', inject('getMinimumFights'), this.index);

        return router;
    },

    index(req, res, next) {
        const { getMinimumFights, pokemonFightSerializer } = req;
        const { SUCCESS, ERROR } = getMinimumFights.outputs;

        getMinimumFights
            .on(SUCCESS, (minimunPokemonFights) => {
                res
                    .status(Status.OK)
                    .json(pokemonFightSerializer.serializeMinimumFights(minimunPokemonFights));
            })
            .on(ERROR, next);

        getMinimumFights.execute();
    }
};

module.exports = PokemonFightController;
