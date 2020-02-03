'use strict';
var WALL = '#';
var FOOD = '.';
var EMPTY = ' ';
var SUPER_FOOD = '&#128165';
var CHERRY = '🍒';

var gCountcherry = 0;
var gBoard;
var gGame = {
  score: 0,
  isOn: false
};


var gElModal = document.querySelector('.modal');

function init() {
  gElModal.hidden = true;
  gGame = {
    score: 0,
    isOn: false
  };
  gBoard = buildBoard();
  createPacman(gBoard);
  createGhosts(gBoard);
  setInterval(createCherry, 5000);
  printMat(gBoard, '.board-container');
  gGame.isOn = true;
  createCherry();
}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;

      if (i === 0 || i === SIZE - 1 ||
        j === 0 || j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)) {

        board[i][j] = WALL;
      }
      if (i === 1 && j === 1 || i === 8 && j === 8 || i === 8 && j === 1 || i === 1 && j === 8) {
        board[i][j] = SUPER_FOOD;
      }
    }
  }
  return board;
}

function updateScore(value) {
  // Update both the model and the dom for the score
  gGame.score += value;
  document.querySelector('header h3 span').innerText = gGame.score;
}


function createCherry() {
  if (gCountcherry >= 5) return;
  var i = getRandomIntInclusive(1, 8);
  var j = getRandomIntInclusive(1, 8);
  var ob = { i: i, j: j };
  if (gBoard[i][j] === FOOD || gBoard[i][j] === EMPTY) {
    gBoard[i][j] = CHERRY;
    renderCell(ob, CHERRY);
    gCountcherry++;
    return;
  } else return createCherry();
}


function gameOver() {
  console.log('Game Over');
  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  gIntervalGhosts = null;
  gElModal.hidden = false;

}




