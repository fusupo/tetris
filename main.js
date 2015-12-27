$(document).ready(function() {

  var width = 100;
  var height = 200;
  var cw = width / 10;
  var ch = height / 20;
  var d = 1;
  var currentTime = 0;
  var boardModel = [];
  var boardView = new Board(width, height, cw, ch, boardModel);
  var currTetrimino;
  var timeOut;

  var lastDropTime;
  var dropSpeed = 500;
   
  //INIT PIECES
  var pI = [
    [1, 1, 1, 1],
  ];
  var pJ = [
    [1, 1, 1],
    [0, 0, 1]
  ];
  var pL = [
    [1, 1, 1],
    [1, 0, 0]
  ];
  var pO = [
    [1, 1],
    [1, 1]
  ];
  var pS = [
    [0, 1, 1],
    [1, 1, 0]
  ];
  var pT = [
    [1, 1, 1],
    [0, 1, 0]
  ];
  var pZ = [
    [1, 1, 0],
    [0, 1, 1] 
  ];
  var tetriminos = [pI, pJ, pL, pO, pS, pT, pZ];
  //INIT BOARD MODEL
  for (var y = 0; y < 20; y++) {
    var tRow = [];
    for (var x = 0; x < 10; x++) {
      tRow.push(0);
    }
    boardModel.push(tRow);
  };
  // Bind Keys //
  $("body").keydown(function(e) {
    if (currTetrimino) {
      switch (e.keyCode) {
      case 37: // 'left'
      case 65: // 'a'
      case 74: // 'j'
        moveLateral('l');
        break;
      case 38: // 'up'
      case 87: // 'w'
      case 73: // 'i'
        rotateTetrimino();
        break;
      case 39: // 'right'
      case 68: // 'd'
      case 76: // 'l'
        moveLateral('r');
        break;
      case 40: // 'down'
      case 83: // 's'
      case 75: // 'k'
        moveDown();
        break;
      case 32: // 'space'
        moveAllTheWayDown();
        break;
      default:
        // console.log(e.keyCode);
        break;
      }
    }
    boardView.update();
  });

  function moveDown() {
    if (currTetrimino.y === 20 - currTetrimino.height()) {
      freezeCurrTetrimino();
    } else {
      currTetrimino.y++;
      var hasCollision = checkTetriminoCollision();
      if (hasCollision) {
        currTetrimino.y--;
        freezeCurrTetrimino();
      }
    }
  }

  function moveAllTheWayDown() {
    clearTimeout(timeOut);
    var resolved = false;
    do {
      if (currTetrimino.y === 20 - currTetrimino.height()) {
        freezeCurrTetrimino();
        resolved = true;
      } else {
        currTetrimino.y++;
        var hasCollision = checkTetriminoCollision();
        if (hasCollision) {
          currTetrimino.y--;
          freezeCurrTetrimino();
          resolved = true;
        }
      }
    } while (!resolved);
    gameLoop();
  }

  function moveLateral(dir) {
    var canMoveP = dir === 'l' ? currTetrimino.x !== 0 : currTetrimino.x < 10 - currTetrimino.width();
    var positiveMove = dir === 'l' ? -1 : 1;
    if (canMoveP) {
      currTetrimino.x += positiveMove;
      if (checkTetriminoCollision()) {
        currTetrimino.x -= positiveMove;
      }
    }
  }

  function rotateTetrimino() {
    currTetrimino.matrix = rotateMatrix(currTetrimino.matrix);
    while (checkWallCollision()) {
      currTetrimino.x--;
    };
  }

  function checkTetriminoCollision() {
    var hasCollision = false;
    for (var y = 0; y < currTetrimino.height(); y++) {
      for (var x = 0; x < currTetrimino.matrix[0].length; x++) {
        var a = boardModel[y + currTetrimino.y][x + currTetrimino.x];
        var b = currTetrimino.matrix[y][x];
        if (a === 1 && b === 1) {
          boardView.update(); // 'da fuk?
          hasCollision = true;
        }
      }
    }
    return hasCollision;
  }

  function checkWallCollision() {
    for (var y = 0; y < currTetrimino.height(); y++) {
      for (var x = 0; x < currTetrimino.matrix[0].length; x++) {
        if (x + currTetrimino.x >= 10) {
          return true;
        };
      }
    }
    return false;
  }

  function freezeCurrTetrimino() {
    for (var y = 0; y < currTetrimino.matrix.length; y++) {
      for (var x = 0; x < currTetrimino.matrix[0].length; x++) {
        if (currTetrimino.matrix[y][x] === 1) {
          boardModel[y + currTetrimino.y][x + currTetrimino.x] = 1;
        };
      }
    }
    var currRowIdx = 19;
    do {
      var filledColCount = 0;
      var row = boardModel[currRowIdx];
      for (var i = 0; i < row.length; i++) {
        if (row[i] === 1) {
          filledColCount++;
        }
      }
      if (filledColCount === row.length) {
        boardModel.splice(currRowIdx, 1);
        boardModel.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      } else {
        currRowIdx--;
      }
    } while (currRowIdx >= 0 && filledColCount > 0);
    boardView.updateBoard();
    currTetrimino = undefined;
    boardView.currTetrimino = undefined;
  }

  var rotateMatrix = function(matrix, direction) {
    direction = direction || 1;
    var m = matrix.length,
        n = (matrix[0] && matrix[0].length);
    var output = [];
    // We iterate with i,j in output order to transparently support rectangular arrays
    for (var i = 0; i < n; i++) {
      output[i] = [];
      for (var j = 0; j < m; j++) {
        if (direction > 0) { // rotate clockwise
          output[i][j] = matrix[m - j - 1][i];
        } else if (direction < 0) { // rotate counterclockwise
          output[i][j] = matrix[j][n - i - 1];
        }
      }
    }
    return output;
  };

  // DEFINE GAME LOOP
  function gameLoop(timestamp) {
    var didLoose = false;
    if (currTetrimino === undefined) {
      currTetrimino = boardView.nextTetrimino;
      boardView.currTetrimino = currTetrimino;
      var pieceTpl = tetriminos[Math.floor(Math.random() * tetriminos.length)];
      var nextTetrimino = new TetriminoM(pieceTpl);
      nextTetrimino.x = 5 - Math.floor(nextTetrimino.width() / 2);
      boardView.nextTetrimino = nextTetrimino;
      boardView.updateNextTetrimino();
      didLoose = checkTetriminoCollision();
      boardView.update();
    } else {
      if (!lastDropTime) lastDropTime = timestamp;
      var progress = timestamp - lastDropTime;
      if (progress >= dropSpeed) {
        lastDropTime = timestamp;
        moveDown();
        boardView.update();
      }
    }
    if (!didLoose) {
      window.requestAnimationFrame(gameLoop);
    } else {
      console.log('you loose fool!');
      currTetrimino = undefined;
    }
  }

  // START GAME LOOP
  var pieceTpl = tetriminos[Math.floor(Math.random() * tetriminos.length)];
  var nextTetrimino = new TetriminoM(pieceTpl);
  nextTetrimino.x = 5 - Math.floor(nextTetrimino.width() / 2);
  boardView.nextTetrimino = nextTetrimino;
  boardView.updateNextTetrimino();
  gameLoop();

});
