const { expect } = require('chai');
const NewspaperSerializer = require('src/interfaces/http/newspaper/NewspaperSerializer');
const PokemonFightResult = require('src/domain/pokemonfightresult/PokemonFightResult');
const Pokemon = require('src/domain/pokemon/Pokemon');

describe('Interfaces :: HTTP :: Newspaper :: NewspaperSerializer', () => {

    it('is able to serialize a pokemon fight result value object instances', () => {

        const pokemonFightResult = new PokemonFightResult();
        pokemonFightResult.setPokemonList([
            new Pokemon({
                id: 1,
                name: "pokemon 1"
            }),
            new Pokemon({
                id: 2,
                name: "pokemon 2"
            })
        ]);

        const serializedPokemonFightResult = NewspaperSerializer.serializeLastPokemonFightResult(pokemonFightResult);

        expect(serializedPokemonFightResult).to.eql({
            "Pokefight_result": [
                {
                    id: 1,
                    name: "pokemon 1"
                },
                {
                    id: 2,
                    name: "pokemon 2"
                }
            ]
        });
    });
});
