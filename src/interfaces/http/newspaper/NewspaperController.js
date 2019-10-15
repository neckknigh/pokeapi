const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');

const NewspaperController = {
    get router() {
        const router = Router();

        router.use(inject('newspaperSerializer'));

        // endpoint /newspaper/pokemonfights/lastresult
        router.get(
            '/pokemonfights/lastresult',
            inject('getLastPokemonFightResult'),
            this.showLastPokemonFightResult
        );

        return router;
    },

    showLastPokemonFightResult(req, res, next) {
        const { getLastPokemonFightResult, newspaperSerializer } = req;
        const { SUCCESS, ERROR } = getLastPokemonFightResult.outputs;

        getLastPokemonFightResult
            .on(SUCCESS, (pokemonFightResult) => {
                res
                    .status(Status.OK)
                    .json(newspaperSerializer.serializeLastPokemonFightResult(pokemonFightResult));
            })
            .on(ERROR, next);

        getLastPokemonFightResult.execute();
    }
};

module.exports = NewspaperController;
