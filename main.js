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
    [1, 1, 1, 1],
    [0, 0, 0, 0]
  ];
  var pJ = [
    [1, 1, 1, 0],
    [0, 0, 1, 0]
  ];
  var pL = [
    [1, 1, 1, 0],
    [1, 0, 0, 0]
  ];
  var pO = [
    [1, 1, 0, 0],
    [1, 1, 0, 0]
  ];
  var pS = [
    [0, 1, 1, 0],
    [1, 1, 0, 0]
  ];
  var pT = [
    [1, 1, 1, 0],
    [0, 1, 0, 0]
  ];
  var pZ = [
    [1, 1, 0, 0],
    [0, 1, 1, 0]
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
    switch (e.keyCode) {
    case 37:
      console.log('left');
      if (currPiece) currPiece.x--;
      break;
    case 38:
      console.log('up');
      if (currPiece) currPiece.y--;
      break;
    case 39:
      console.log('right');
      if (currPiece) currPiece.x++;
      break;
    case 40:
      console.log('down');
      if (currPiece) currPiece.y++;
      break;
    case 32:
      console.log('space');
      break;
    default:
      //console.log(e.keyCode);
    }
    // clearTimeout(timeOut);
    // gameLoop();
    boardView.update();
  });

  // DEFINE GAME LOOP
  function gameLoop() {
    currentTime++;
    var didLoose = false;
    if (currPiece === undefined) {
      var pieceTpl = pieces[Math.floor(Math.random() * pieces.length)];
      currPiece = new PieceM(pieceTpl);
      currPiece.x = 5 - Math.floor(currPiece.width() / 2);
      boardView.currPiece = currPiece;
    } else {
      if (currPiece.y === 20 - currPiece.height()) {
        didLoose = freezeCurrPiece();
      } else {
        currPiece.y++;

        //check Collision
        var hasCollision = false;
        for (var y = 0; y < 2; y++) {
          console.log('WHY?',y)
          for (var x = 0; x < 4; x++) {
            if(boardModel[y + currPiece.y][x + currPiece.x] === 1 && currPiece.matrix[y][x] === 1){
              boardView.update();
              hasCollision = true;
            }
          }
        }

        if (hasCollision) {
          currPiece.y--;
          didLoose = freezeCurrPiece();
        }
      }
    }

    //
    boardView.update();
    if (!didLoose) timeOut = setTimeout(gameLoop, 100);
  }

  function freezeCurrPiece() {
    var didLoose = false;
    for (var y = 0; y < 2; y++) {
      for (var x = 0; x < 4; x++) {
        if (currPiece.matrix[y][x] === 1) {
          boardModel[y + currPiece.y][x + currPiece.x] = 1;
        };
      }
    }

    //did loose?
    if (currPiece.y === 0) {
      console.log('GAME OVER, YOU LOOSE!!!!!!');
      didLoose = true;
    }

    currPiece = undefined;
    boardView.currPiece = undefined;
    return didLoose;
  }

  // START GAME LOOP
  gameLoop();

});
