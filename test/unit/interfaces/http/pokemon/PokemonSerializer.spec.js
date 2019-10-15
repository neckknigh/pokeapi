const { expect } = require('chai');
const PokemonSerializer = require('src/interfaces/http/pokemon/PokemonSerializer');
const Pokemon = require('src/domain/pokemon/Pokemon');

describe('Interfaces :: HTTP :: Pokemon :: PokemonSerializer', () => {
    it('returns id and name', () => {
        const serializedUser = PokemonSerializer.serialize({
            id: 123,
            name: 'The Pokemon'
        });

        expect(serializedUser).to.eql({
            id: 123,
            name: 'The Pokemon'
        });
    });

    it('ignores extra attributes', () => {
        const serializedUser = PokemonSerializer.serialize({
            id: 321,
            name: 'The Pokemon',
            unknown: 'Hello!'
        });

        expect(serializedUser).to.eql({
            id: 321,
            name: 'The Pokemon'
        });
    });

    it('is able to serialize pokemon entity instances', () => {
        const pokemon = new Pokemon({ id: 1, name: 'Pokemon :)' });
        const serializedPokemon = PokemonSerializer.serialize(pokemon);

        expect(serializedPokemon).to.eql({
            id: 1,
            name: 'Pokemon :)'
        });
    });

    it('is able to serialize a list of pokemon entity instances', () => {
        const pokemonList = [
            new Pokemon({ id: 1, name: 'Pokemon 1' }),
            new Pokemon({ id: 2, name: 'Pokemon 2' })
        ];

        const serializedPokemonList = PokemonSerializer.serializePokemonList(pokemonList);

        expect(serializedPokemonList).to.eql({
            pokemons: [
                { id: 1, name: 'Pokemon 1' },
                { id: 2, name: 'Pokemon 2' }
            ]
        });
    });
});
