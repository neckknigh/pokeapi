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
const UserSerializer = require('./interfaces/http/user/UserSerializer');
const PokemonSerializer = require('./interfaces/http/pokemon/PokemonSerializer');
const NewspaperSerializer = require('./interfaces/http/newspaper/NewspaperSerializer');
const PokemonFightResultSerializer = require('./interfaces/http/pokemonfightresult/PokemonFightResultSerializer');


const {
  CreateUser,
  GetAllUsers,
  GetUser,
  UpdateUser,
  DeleteUser
} = require('./app/user');

const {
  GetAllPokemons
} = require('./app/pokemon');

const {
  GetLastPokemonFightResult
} = require('./app/newspaper');

const {
  GetMinimumFights
} = require('./app/pokemonfightresult');

const {
  PokemonFightsAppService
} = require('./app/services');

const {
  PokemonFightService,
  PokemonService
} = require('./domain/services');


const logger = require('./infra/logging/logger');
const SequelizeUsersRepository = require('./infra/user/SequelizeUsersRepository');

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

// Repositories
container.register({
  usersRepository: asClass(SequelizeUsersRepository).singleton()
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

// Operations
container.register({
  createUser: asClass(CreateUser),
  getAllUsers: asClass(GetAllUsers),
  getUser: asClass(GetUser),
  updateUser: asClass(UpdateUser),
  deleteUser: asClass(DeleteUser)
});

// Pokemons operations or use cases
container.register({
  getAllPokemons: asClass(GetAllPokemons),
  pokemonAdapter: asClass(PokemonAdapter),
  pokemonService: asClass(PokemonService).singleton()
});

// Serializers
container.register({
  userSerializer: asValue(UserSerializer)
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
  newspaperSerializer: asClass(NewspaperSerializer)
});


// Newspaper services
container.register({
  pokemonFightResultService: asClass(PokemonFightResultService).singleton(),
  pokemonFightResultAdapter: asClass(PokemonFightResultAdapter)
});

// pokemon fight result serializer
container.register({
  pokemonFighResultSerializer: asClass(PokemonFightResultSerializer)
});

// pokemon fight result operation or use case
container.register({
  getMinimumFights: asClass(GetMinimumFights)
});

// pokemon fight result service
container.register({
  pokemonFightService: asClass(PokemonFightService).singleton(),
  pokemonFightsAppService: asClass(PokemonFightsAppService).singleton()
});


module.exports = container;
