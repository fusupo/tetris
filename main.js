$(document).ready(function() {
  console.log('READY!');

  var width = 100;
  var height = 200;
  var cw = width / 10;
  var ch = height / 20;
  var d = 1;
  var currentTime = 0;

  var boardModel = [];
  var boardView = new Board(width, height, cw, ch, boardModel);
  var currPiece;
  var timeOut;

  //INIT PIECES
  var pI = [
    [1, 1, 1, 1]//,
    // [0, 0, 0, 0]
  ];
  var pJ = [
    [1, 1, 1],//, 0],
    [0, 0, 1]//, 0]
  ];
  var pL = [
    [1, 1, 1],//, 0],
    [1, 0, 0]//, 0]
  ];
  var pO = [
    [1, 1],//, 0, 0],
    [1, 1]//, 0, 0]
  ];
  var pS = [
    [0, 1, 1],//, 0],
    [1, 1, 0]//, 0]
  ];
  var pT = [
    [1, 1, 1],//, 0],
    [0, 1, 0]//, 0]
  ];
  var pZ = [
    [1, 1, 0],//, 0],
    [0, 1, 1]//, 0]
  ];
  var pieces = [pI, pJ, pL, pO, pS, pT, pZ];

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
    if (currPiece) {
      switch (e.keyCode) {
      case 37:
        //console.log('left');
        if (currPiece.x !== 0) moveLeft();
        break;
      case 38:
        //console.log('up');
        rotatePiece();
        break;
      case 39:
        //console.log('right');
        if (currPiece.x < 10 - currPiece.width()) moveRight();
        break;
      case 40:
        //console.log('down');
        moveDown(); //currPiece.y++;
        break;
      case 32:
        //console.log('space');
        break;
      default:
        //console.log(e.keyCode);
        break;
      }
    }
    // clearTimeout(timeOut);
    // gameLoop();
    boardView.update();
  });

  // DEFINE GAME LOOP
  function gameLoop() {
    var didLoose = false;
    if (currPiece === undefined) {
      var pieceTpl = pieces[Math.floor(Math.random() * pieces.length)];
      currPiece = new PieceM(pieceTpl);
      currPiece.x = 5 - Math.floor(currPiece.width() / 2);
      boardView.currPiece = currPiece;
    } else {
      didLoose = moveDown();
    }
    //
    if (!didLoose) timeOut = setTimeout(gameLoop, 1000);
    boardView.update();
  }

  function moveDown() {
    var didLoose = false;
    if (currPiece.y === 20 - currPiece.height()) {
      didLoose = freezeCurrPiece();
    } else {
      currPiece.y++;
      var hasCollision = checkCollision();
      if (hasCollision) {
        currPiece.y--;
        didLoose = freezeCurrPiece();
      }
    }
    return didLoose;
  }

  function moveLeft() {
    var didLoose = false;
    currPiece.x--;
    var hasCollision = checkCollision();
    if (hasCollision) {
      currPiece.x++;
    }
    return didLoose;
  }

  function moveRight() {
    var didLoose = false;
    currPiece.x++;
    var hasCollision = checkCollision();
    if (hasCollision) {
      currPiece.x--;
    }
    return didLoose;
  }

  function rotatePiece() {
    currPiece.matrix = rotateMatrix(currPiece.matrix);
  }

  function checkCollision() {
    var hasCollision = false;
    // for (var y = 0; y < currPiece.matrix.length; y++) {
    for(var y=0; y < currPiece.height(); y++){
      for (var x = 0; x < currPiece.matrix[0].length; x++) {
        var a = boardModel[y + currPiece.y][x + currPiece.x];
        var b = currPiece.matrix[y][x];
        if (a === 1 && b === 1) {
          boardView.update();
          hasCollision = true;
        }
      }
    }
    return hasCollision;
  }

  function freezeCurrPiece() {

    var didLoose = false;

    for (var y = 0; y < currPiece.matrix.length; y++) {
      for (var x = 0; x < currPiece.matrix[0].length; x++) {
        if (currPiece.matrix[y][x] === 1) {
          boardModel[y + currPiece.y][x + currPiece.x] = 1;
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

    //did loose?
    if (currPiece.y === 0) {
      console.log('GAME OVER, YOU LOOSE!!!!!!');
      didLoose = true;
    }

    boardView.updateBoard();
    
    currPiece = undefined;
    boardView.currPiece = undefined;
    return didLoose;
  }
  
  var rotateMatrix = function(matrix, direction ) {
    // Your code here.

    direction = direction || 1;
    var m = matrix.length,
        n = (matrix[0] && matrix[0].length);
    var output = [];
    // We iterate with i,j in output order to transparently support rectangular arrays
    for (var i = 0; i < n; i++) {
      output[i] = [];
      for (var j = 0; j < m; j++) {
        if (direction > 0) { // rotate clockwise
          output[i][j] = matrix[m-j-1][i];
        } else if (direction < 0) { // rotate counterclockwise
          output[i][j] = matrix[j][n-i-1];
        }
      }
    }
    return output;
  };
  
  // START GAME LOOP
  gameLoop();

});
