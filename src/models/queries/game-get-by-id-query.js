const validator = require('validator');
const BaseQuery = require('./base-query');

class GameGetByIdQuery extends BaseQuery {
    constructor(gameId) {
        super();
        // Verify types
        if (!validator.isUUID(gameId)) {
            throw TypeError('GameGetByIdQuery requires valid gameId!');
        }
        this.gameId = gameId;
    }
}

module.exports = GameGetByIdQuery;
