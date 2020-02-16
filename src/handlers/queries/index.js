const GameGetByIdQuery = require('../../models/queries/game-get-by-id-query');
const PlayerGetByIdQuery = require('../../models/queries/player-get-by-id-query');
const gameGetByIdQueryHandler = require('./game-get-by-id-query-handler');
const playerGetByIdQueryHandler = require('./player-get-by-id-query-handler');

const handle = (query) => {
    switch (query.constructor) {
        case GameGetByIdQuery:
            return gameGetByIdQueryHandler(query);
        case PlayerGetByIdQuery:
            return playerGetByIdQueryHandler(query);
        default:
            throw new Error('Unknown query!');
    }
};

module.exports = {
    handle,
};
