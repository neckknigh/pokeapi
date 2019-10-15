const { createContainer, asClass, asFunction, asValue } = require('awilix');
const { scopePerRequest } = require('awilix-express');
const config = require('../config');
const Application = require('./app/Application');


const Server = require('./interfaces/http/Server');
const router = require('./interfaces/http/router');
const loggerMiddleware = require('./interfaces/http/logging/loggerMiddleware');
const errorHandler = require('./interfaces/http/errors/errorHandler');
const devErrorHandler = require('./interfaces/http/errors/devErrorHandler');
const swaggerMiddleware = require('./interfaces/http/swagger/swaggerMiddleware');
const PokemonSerializer = require('./interfaces/http/pokemon/PokemonSerializer');
const NewspaperSerializer = require('./interfaces/http/newspaper/NewspaperSerializer');
const PokemonFightSerializer = require('./interfaces/http/pokemonfight/PokemonFightSerializer');

const {
  GetAllPokemons
} = require('./app/pokemon');

const {
  GetLastPokemonFightResult
} = require('./app/newspaper');

const {
  GetMinimumFights
} = require('./app/pokemonfight');

const {
  PokemonFightsAppService
} = require('./app/services');

const {
  PokemonFightService,
  PokemonService,
  PokemonFightResultDomainService
} = require('./domain/services');


const logger = require('./infra/logging/logger');

const {
  PokemonAdapter,
  PokemonsRepository
} = require('./infra/pokemon');

const {
  PokemonFightResultAdapter,
  PokemonFightResultsRepository
} = require('./infra/newspaper');

const PokemonFightResultService = require('./infra/services/PokemonFightResultService');
const pokedex = require("./infra/support/pokedex");
const fastSort = require('./infra/support/fastSort');
const { database, User: UserModel } = require('./infra/database/models');

const container = createContainer();

// System
container
  .register({
    app: asClass(Application).singleton(),
    server: asClass(Server).singleton()
  })
  .register({
    router: asFunction(router).singleton(),
    logger: asFunction(logger).singleton()
  })
  .register({
    config: asValue(config)
  })
  .register({
    pokedex: asValue(pokedex)
  })
  .register({
    fastSort: asValue(fastSort)
  });

// Middlewares
container
  .register({
    loggerMiddleware: asFunction(loggerMiddleware).singleton()
  })
  .register({
    containerMiddleware: asValue(scopePerRequest(container)),
    errorHandler: asValue(config.production ? errorHandler : devErrorHandler),
    swaggerMiddleware: asValue([swaggerMiddleware])
  });

// Pokemons repository
container.register({
  pokemonsRepository: asClass(PokemonsRepository).singleton()
});

// Pokemon fight results repository
container.register({
  pokemonFightResultsRepository: asClass(PokemonFightResultsRepository).singleton()
});


// Database
container.register({
  database: asValue(database),
  UserModel: asValue(UserModel)
});


// Pokemons operations or use cases
container.register({
  getAllPokemons: asClass(GetAllPokemons),
  pokemonAdapter: asClass(PokemonAdapter),
  pokemonService: asClass(PokemonService).singleton()
});


// Pokemon serializers
container.register({
  pokemonSerializer: asValue(PokemonSerializer)
});


// Newspaper operations or use cases
container.register({
  getLastPokemonFightResult: asClass(GetLastPokemonFightResult)
});


// Newspaper serializers
container.register({
  newspaperSerializer: asValue(NewspaperSerializer)
});


// Newspaper services
container.register({
  pokemonFightResultService: asClass(PokemonFightResultService).singleton(),
  pokemonFightResultAdapter: asClass(PokemonFightResultAdapter)
});

// pokemon fight result serializer
container.register({
  pokemonFightSerializer: asValue(PokemonFightSerializer)
});

// pokemon fight result operation or use case
container.register({
  getMinimumFights: asClass(GetMinimumFights)
});

// pokemon fight result service
container.register({
  pokemonFightService: asClass(PokemonFightService).singleton(),
  pokemonFightsAppService: asClass(PokemonFightsAppService).singleton(),
  pokemonFightResultDomainService: asClass(PokemonFightResultDomainService).singleton()
});


module.exports = container;
