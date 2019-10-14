class PokemonFightResultsRepository {

    constructor({ pokemonFightResultService, pokemonFightResultAdapter }) {
        this.pokemonFightResultService = pokemonFightResultService;
        this.pokemonFightResultAdapter = pokemonFightResultAdapter;
    }

    async getLast() {
        const rawPokemonFightResultData = await this.pokemonFightResultService.getLastPokemonFightResult();

        return this.pokemonFightResultAdapter.adaptToEntity(rawPokemonFightResultData);
    }
}

module.exports = PokemonFightResultsRepository;