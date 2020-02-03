
var gPacman;
// const gPacmanIcon = '&#9786;';
const PACMAN_UP = 'ᗢ';
const PACMAN_DOWN = 'ᗣ';
const PACMAN_RIGHT = 'ᗧ';
const PACMAN_LEFT = 'ᗤ';
var gPacmanIcon = PACMAN_RIGHT;

function createPacman(board) {
  gPacman = {
    location: {
      i: 3,
      j: 5
    },
    isSuper: false
  };
  board[gPacman.location.i][gPacman.location.j] = gPacmanIcon;
}

function movePacman(eventKeyboard) {
  if (!gGame.isOn) return;
  // console.log('eventKeyboard:', eventKeyboard);

  var nextLocation = getNextLocation(eventKeyboard);
  // User pressed none-relevant key in the keyboard
  if (!nextLocation) return;

  var nextCell = gBoard[nextLocation.i][nextLocation.j];
  if (nextCell === SUPER_FOOD) {
    // setTimeout(, 5000);
    pacmanSuperFood()
    gPacman.isSuper = true;
    // gIntervalGhosts = setInterval(moveGhosts, 3000);
    
  }

  // Hitting a WALL, not moving anywhere
  if (nextCell === WALL) return;
  if (nextCell===CHERRY)updateScore(10);
  // Hitting FOOD? update score
  if (nextCell === FOOD) updateScore(1);
  else if (nextCell === GHOST) {
    if (gPacman.isSuper) {
      removeGhost(nextLocation);
      renderCell(gPacman.location, EMPTY);
      gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
    } else {

      renderCell(gPacman.location, EMPTY);
      return gameOver();
    }
  }
  if (gGame.score >= 80) {
    gameOver()
    console.log('You win!!!');
    var ElLineP = document.querySelector('p');
    ElLineP.hidden = false;

  }

  // Update the model to reflect movement
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // Update the DOM
  renderCell(gPacman.location, EMPTY);

  // Update the pacman MODEL to new location  
  gPacman.location = nextLocation;

  gBoard[gPacman.location.i][gPacman.location.j] = gPacmanIcon;
  // Render updated model to the DOM
  renderCell(gPacman.location, gPacmanIcon);

}

function getNextLocation(keyboardEvent) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j
  };

  switch (keyboardEvent.code) {
    case 'ArrowUp':
        gPacmanIcon = PACMAN_UP
        nextLocation.i--;
        break;
    case 'ArrowDown':
        gPacmanIcon = PACMAN_DOWN
        nextLocation.i++;
        break;
    case 'ArrowLeft':
        gPacmanIcon = PACMAN_LEFT
        nextLocation.j--;
        break;
    case 'ArrowRight':
        gPacmanIcon = PACMAN_RIGHT
        nextLocation.j++;
        break;
    default:
        return null;
}
return nextLocation;
}






function pacmanSuperFood() {
  // createGhost(gBoard);
  // gPacman.isSuper = true
  // setTimeout(function(){
  //   gPacman.isSuper = false
  // }, 5000)
  clearInterval(gIntervalGhosts);
  var allGhosts = document.querySelectorAll('span');
  for (var i = 0; i < allGhosts.length; i++) {
    allGhosts[i].style.color = "blue";
  }
  gPacman.isSuper = false;
}
