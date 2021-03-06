const { attributes } = require('structure');

const Pokemon = attributes({
    id: Number,
    name: {
        type: String,
        required: true
    },
    fights: {
        type: Number,
        default: 0
    }
})(class Pokemon {
    setId(id) {
        this.id = id;
    }

    setFights(fights) {
        this.fights = fights;
    }

    getFights() {
        return this.fights;
    }
});

module.exports = Pokemon;
