class KeyBoarder {
  constructor() {
    var keyState = {};
    
    window.onkeydown = function(e) {
      keyState[e.keyCode] = true;
    };

    window.onkeyup = function(e) {
      keyState[e.keyCode] = false;
    };

    this.isDown = function(keyCode) {
      return keyState[keyCode] === true;
    };
  }
}

module.exports = KeyBoarder;