const Operation = require('src/app/Operation');

class GetAllPokemons extends Operation {

    constructor({ pokemonsRepository }) {
        super();
        this.pokemonsRepository = pokemonsRepository;
    }

    async execute() {
        const { SUCCESS, ERROR } = this.outputs;

        try {
            const pokemons = await this.pokemonsRepository.getAll();
            this.emit(SUCCESS, pokemons);
        } catch (error) {
            this.emit(ERROR, error);
        }
    }
}

GetAllPokemons.setOutputs(['SUCCESS', 'ERROR']);

module.exports = GetAllPokemons;
