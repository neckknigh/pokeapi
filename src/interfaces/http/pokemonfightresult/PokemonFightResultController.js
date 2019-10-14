const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');

const PokemonFightResultController = {
    get router() {
        const router = Router();

        router.use(inject('pokemonFighResultSerializer'));

        router.get('/', inject('getMinimumFights'), this.index);

        return router;
    },

    index(req, res, next) {
        const { getMinimumFights, pokemonFighResultSerializer } = req;
        const { SUCCESS, ERROR } = getMinimumFights.outputs;

        getMinimumFights
            .on(SUCCESS, (minimunPokemonFights) => {
                res
                    .status(Status.OK)
                    .json({ minimunPokemonFights });
            })
            .on(ERROR, next);

        getMinimumFights.execute();
    }
};

module.exports = PokemonFightResultController;
