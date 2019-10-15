const { expect } = require('chai');
const PokemonFightSerializer = require('src/interfaces/http/pokemonfight/PokemonFightSerializer');

describe('Interfaces :: HTTP :: PokemonFight :: PokemonFightSerializer', () => {

    it('is able to serialize the minimum pokemon fights', () => {

        const serializedMinimumPokemonFitghts = PokemonFightSerializer.serializeMinimumFights(4);

        expect(serializedMinimumPokemonFitghts).to.eql({
            minimunPokemonFights: 4
        });
    });
});
