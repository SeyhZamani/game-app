const playerCreatedConsumerGroup = require('./consumer-groups/player-created-consumer-group');

exports.initiate = () => {
    playerCreatedConsumerGroup.create();
};
