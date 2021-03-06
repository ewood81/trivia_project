const EventEmitter = require('events');

/**
 * Class used to model a Player
 */
const getNewUserID = (() => {
  let curID = 0;
  return () => {
    curID += 1;
    return curID;
  };
})();

class Player {

  // Constructor to set the values of the object
  constructor() {
    this.id = getNewUserID();
    this.username = 'Player' + this.id;
    this.answers = [];
    this.emitter = new EventEmitter();
    this.score = 0;
  }

  // Function to add the answer to the array
  addAnswer(answer) {
    this.answers.push(answer);
    // Emit a message saying the answer is graded
    this.emitter.emit('answerGraded', answer);
    // Emit a message to update the score of the user
    if (answer.correct) {
      this.score += 1;
      this.getRoom().setScore(this);
    }
  }

  // Function to get the player's ID
  getID() {
    return this.id;
  }

  // Function to get the current room
  getRoom() {
    return this.room;
  }

  // Function to set the player's current room
  setRoom(room) {
    if (this.room) {
      this.room.removePlayer(this);
    }
    this.room = room;
    this.score = 0;
    this.answers = [];
    this.emitter.emit('roomJoined', room);
  }

  setUsername(username) {
    this.username = username;
  }

  // Function to return the player ID as a JSON
  toJSON() {
    return {
      id: this.id,
      score: this.score,
      username: this.username,
    };
  }
}

module.exports = Player;
