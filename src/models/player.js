 const { PlayerLostEvent } = require('../models/events/player-lost-event');
 const { PlayerWonEvent } = require('../models/events/player-won-event');
 const { PlayerJoinedToGameEvent } = require('../models/events/player-joined-to-game-event');
 const { PlayerActivatedEvent } = require('../models/events/player-activated-event');
 const { PlayerCreatedEvent } = require('../models/events/player-created-event');
 const { PlayerDeactivatedEvent } = require('../models/events/player-deactivated-event');
 const { PlayerDepositCreditEvent } = require('../models/events/player-deposit-credit-event');
 const { PlayerWithdrawCreditEvent } = require('../models/events/player-withdraw-credit-event');

 class Player {
     constructor() {
         this.playerId = null;
         this.active = false;
         this.credit = 0;
     }

     hasEnoughCredit(betAmount) {
         return this.credit >= betAmount;
     }

     apply(events) {
         if (!Array.isArray(events) || events.length === 0) {
             throw new Error('Player Events should be array and be greater 0');
         }
         for (const event of events) {
             switch (event.constructor) {
                 case PlayerActivatedEvent:
                     this.applyPlayerActivatedEvent(event);
                     break;
                 case PlayerCreatedEvent:
                     this.applyPlayerCreatedEvent(event);
                     break;
                 case PlayerDeactivatedEvent:
                     this.applyPlayerDeactivatedEvent(event);
                     break;
                 case PlayerDepositCreditEvent:
                     this.applyPlayerDepositCreditEvent(event);
                     break;
                 case PlayerJoinedToGameEvent:
                     this.applyPlayerJoinedToGameEvent(event);
                     break;
                 case PlayerLostEvent:
                     this.applyGameFinishedEvent(event);
                     break;
                 case PlayerWithdrawCreditEvent:
                     this.applyPlayerWithdrawCreditEvent(event);
                     break;
                 case PlayerWonEvent:
                     this.applyDiceRolledEvent(event);
                     break;
                 default:
                     throw new Error('Unknown Event!');
             }
         }
     }

     applyPlayerActivatedEvent() {
         this.active = true;
     }
     applyPlayerCreatedEvent(playerCreatedEvent) {
         const { credit } = playerCreatedEvent.getData();
         this.active = true;
         this.credit += credit;
     }
     applyPlayerDeactivatedEvent() {
         this.active = false;
     }
     applyPlayerDepositCreditEvent(playerDepositCreditEvent) {
         const { credit } = playerDepositCreditEvent.getData();
         this.credit += credit;
     }
     applyPlayerJoinedToGameEvent(playerJoinedToGameEvent) {
         const { credit } = playerJoinedToGameEvent.getData();
         this.credit += credit;
     }
     applyPlayerLostEvent() {

     }
     applyPlayerWithdrawCreditEvent(playerWithdrawCreditEvent) {
         const { credit } = playerWithdrawCreditEvent.getData();
         this.credit += credit;
     }
     applyPlayerWonEvent(playerWonEvent) {
         const { credit } = playerWonEvent.getData();
         this.credit += credit;
     }
 }

 module.exports = Player;
