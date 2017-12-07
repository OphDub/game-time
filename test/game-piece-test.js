const chai = require('chai');
const expect = chai.expect;

let GamePiece = require('../lib/game-piece.js');

describe('Game Piece', function() {
  it('expects to have x,y coordinates', function() {
    let gamePiece = new GamePiece(360, 700);
    expect(gamePiece.x).to.equal(360);
    expect(gamePiece.y).to.equal(700);
  })
});