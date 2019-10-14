const Operation = require('src/app/Operation');

class GetLastPokemonFightResult extends Operation {

    constructor({ pokemonFightResultsRepository }) {
        super();
        this.pokemonFightResultsRepository = pokemonFightResultsRepository;
    }

    async execute() {
        const { SUCCESS, ERROR } = this.outputs;

        try {
            const pokemonFightsResult = await this.pokemonFightResultsRepository.getLast();
            this.emit(SUCCESS, pokemonFightsResult);
        } catch (error) {
            this.emit(ERROR, error);
        }
    }
}

GetLastPokemonFightResult.setOutputs(['SUCCESS', 'ERROR']);

module.exports = GetLastPokemonFightResult;
