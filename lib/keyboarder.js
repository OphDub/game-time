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

    this.KEYS = {
      LEFT: 37,
      RIGHT: 39,
      UP: 38,
      DOWN: 40,
      SPACE: 32,
    };
  }
};