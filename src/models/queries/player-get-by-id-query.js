const validator = require('validator');
const BaseQuery = require('./base-query');

class PlayerGetByIdQuery extends BaseQuery {
    constructor(playerId) {
        super();
        // Verify types
        if (!validator.isUUID(playerId)) {
            throw TypeError('PlayerGetByIdQuery requires valid playerId!');
        }
        this.playerId = playerId;
    }
}

module.exports = PlayerGetByIdQuery;
