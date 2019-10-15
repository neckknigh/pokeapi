class PokemonFightsAppService {

    constructor({
        pokemonFightService,
        pokemonFightResultsRepository,
        pokemonsRepository,
        pokemonFightResultDomainService
    }) {
        this.pokemonFightService = pokemonFightService;
        this.pokemonFightResultsRepository = pokemonFightResultsRepository;
        this.pokemonsRepository = pokemonsRepository;
        this.pokemonFightResultDomainService = pokemonFightResultDomainService;
    }

    async calculateMinimumFights(pokemonResultList) {

        let lastPokemonFightResult = null;

        // Get the inital pokemon list
        const initialPokemonList = await this.pokemonsRepository.getAll();

        if (pokemonResultList) {
            lastPokemonFightResult = this.pokemonFightResultDomainService.buildPokemonFightResultFromPokemonList(pokemonResultList);
        }
        else {

            // Get the last pokemon fight result
            lastPokemonFightResult = await this.pokemonFightResultsRepository.getLast();
        }

        /**
         * Calcule the minimum fights
         * By calling the domain service
         */
        const minimunPokemonFights = await this.pokemonFightService.calculateMinimumFights(initialPokemonList, lastPokemonFightResult);

        return minimunPokemonFights;
    }
}

module.exports = PokemonFightsAppService;