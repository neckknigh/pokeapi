const { expect } = require('chai');
const { GetMinimumFights } = require('src/app/pokemonfight');

describe('App :: Pokemon :: GetMinimumFights', () => {
    var getMinimumFights;

    context('when query is successful', () => {
        before(() => {
            const MockPokemonFightsAppService = {
                calculateMinimumFights: () => Promise.resolve(0)
            };

            getMinimumFights = new GetMinimumFights({
                pokemonFightsAppService: MockPokemonFightsAppService
            });
        });

        it('emits SUCCESS with the minimum pokemon fights', (done) => {
            getMinimumFights.on(getMinimumFights.outputs.SUCCESS, (response) => {
                expect(response).to.equal(0);
                done();
            });

            getMinimumFights.execute();
        });
    });

    context('when there is an internal error', () => {
        before(() => {
            const MockPokemonFightsAppService = {
                calculateMinimumFights: () => Promise.reject(new Error('Failed'))
            };

            getMinimumFights = new GetMinimumFights({
                pokemonFightsAppService: MockPokemonFightsAppService
            });
        });

        it('emits ERROR with the error', (done) => {
            getMinimumFights.on(getMinimumFights.outputs.ERROR, (response) => {
                expect(response.message).to.equal('Failed');
                done();
            });

            getMinimumFights.execute();
        });
    });
});
