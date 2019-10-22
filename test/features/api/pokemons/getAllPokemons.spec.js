const request = require('test/support/request');
const { expect } = require('chai');

describe('API :: GET /api/pokemons', () => {
  context('when reading from the api', () => {

    it('should show all the pokemon list', async () => {
      const { body } = await request()
        .get('/api/pokemons')
        .expect(200);

		expect(body.pokemons[0].name).to.equal('bulbasaur');
		expect(body.pokemons[0]).to.have.all.keys('id', 'name');

    });
  });
});
