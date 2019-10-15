const request = require('test/support/request');
const { expect } = require('chai');

describe('API :: GET /api/pokemonfights/minimumfights', () => {
  context('when reading from the newspaper api', () => {

    it('should calculate the minimum fights', async () => {
      const { body } = await request()
        .get('/api/pokemonfights/minimumfights')
        .expect(200);

      expect(body.minimunPokemonFights).to.equal(5);
    });
  });

  context('when reading result from the url params', () => {

    it('should calculate the minimum fights', async () => {
      const { body } = await request()
        .get('/api/pokemonfights/minimumfights?pokemonresultlist=bulbasaur,caterpie,charmander,squirtle,weedle,kakuna,pidgey,beedrill')
        .expect(200);

      expect(body.minimunPokemonFights).to.equal(3);
    });
  });
});
