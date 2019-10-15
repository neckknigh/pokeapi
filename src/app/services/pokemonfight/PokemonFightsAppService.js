class PokemonFightsAppService {

    constructor({
        pokemonFightService,
        pokemonFightResultsRepository,
        pokemonsRepository
    }) {
        this.pokemonFightService = pokemonFightService;
        this.pokemonFightResultsRepository = pokemonFightResultsRepository;
        this.pokemonsRepository = pokemonsRepository;
    }

    async calculateMinimumFights() {

        // Get the inital pokemon list
        const initialPokemonList = await this.pokemonsRepository.getAll();

        // Get the last pokemon fight result
        const lastPokemonFightResult = await this.pokemonFightResultsRepository.getLast();

        /**
         * Calcule the minimum fights
         * By calling the domain service
         */
        const minimunPokemonFights = await this.pokemonFightService.calculateMinimumFights(initialPokemonList, lastPokemonFightResult);

        return minimunPokemonFights;
    }
}

module.exports = PokemonFightsAppService;