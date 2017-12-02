class KeyBoarder {
  constructor() {
    var keyState = {};
    
    window.onkeydown = function(e) {
      keyState[e.keyCode] = true;
      console.log('key press');
    };

    window.onkeyup = function(e) {
      keyState[e.keyCode] = false;
      console.log('key up')
    };

    this.isDown = function(keyCode) {
      return keyState[keyCode] === true;
    };
  }
}

module.exports = KeyBoarder;