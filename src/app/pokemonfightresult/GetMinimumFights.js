const Operation = require('src/app/Operation');

class GetMinimumFights extends Operation {

    constructor({ pokemonFightsAppService }) {
        super();
        this.pokemonFightsAppService = pokemonFightsAppService;
    }

    async execute() {
        const { SUCCESS, ERROR } = this.outputs;

        try {

            /**
             * Get the minimun pokemon fights from the last result
             * by calling the app service.
             */
            const minimunPokemonFights = await this.pokemonFightsAppService.calculateMinimumFights();

            this.emit(SUCCESS, minimunPokemonFights);

        } catch (error) {
            this.emit(ERROR, error);
        }
    }
}

GetMinimumFights.setOutputs(['SUCCESS', 'ERROR']);

module.exports = GetMinimumFights;
