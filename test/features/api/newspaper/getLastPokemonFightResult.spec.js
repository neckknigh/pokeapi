const request = require('test/support/request');
const { expect } = require('chai');

describe('API :: GET /api/newspaper/pokemonfights/lastresult', () => {
  context('when reading from the newspaper api', () => {

    it('should show the last pokemon fight result', async () => {
      const { body } = await request()
        .get('/api/newspaper/pokemonfights/lastresult')
		.expect(200);
		
		expect(body).to.have.key('Pokefight_result');

    });
  });
});
