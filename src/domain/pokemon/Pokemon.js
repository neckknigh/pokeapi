const { attributes } = require('structure');

const Pokemon = attributes({
    id: Number,
    name: {
        type: String,
        required: true
    },
    fights: Number
})(class Pokemon {
});

Pokemon.MAX_ALLOWED_FIGHTS = 2;

module.exports = Pokemon;
