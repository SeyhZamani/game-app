 const { PlayerLostEvent } = require('../models/events/player-lost-event');
 const { PlayerWonEvent } = require('../models/events/player-won-event');
 const { PlayerJoinedToGameEvent } = require('../models/events/player-joined-to-game-event');



 class Player {
     apply(events) {
         if (!Array.isArray(events) || events.length === 0) {
             throw new Error('Player Events should be array and be greater 0');
         }
         for (const event of events) {
             switch (event.constructor) {
                 case PlayerJoinedToGameEvent:
                     this.applyGameCreatedEvent(event);
                     break;
                 case PlayerWonEvent:
                     this.applyDiceRolledEvent(event);
                     break;
                 case PlayerLostEvent:
                     this.applyGameFinishedEvent(event);
                     break;
                 default:
                     throw new Error('Unknown Event!');
             }
         }
     }

     process(command) {

     }

     hasEnoughCredit(betAmount) {
         return true;
     }
 }

 module.exports = Player;
