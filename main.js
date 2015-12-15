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
      if(currPiece)currPiece.x --;
      break;
    case 38:
      console.log('up');
      if(currPiece)currPiece.y --;
      break;
    case 39:
      console.log('right');
      if(currPiece)currPiece.x ++;
      break;
    case 40:
      console.log('down');
      if(currPiece)currPiece.y ++;
      break;
    case 32:
      console.log('space');
      break;
    default:
      console.log(e.keyCode);
    }
    clearTimeout(timeOut);
    gameLoop();
  });

  // DEFINE GAME LOOP
  function gameLoop() {
    currentTime++;
    console.log(currentTime);
    //
    if (currPiece === undefined) {
      var pieceTpl = pieces[Math.floor(Math.random() * pieces.length)];
      currPiece = new PieceM(pieceTpl);
      boardView.currPiece = currPiece;
    } else {

    }
    //
    boardView.update();
    timeOut = setTimeout(gameLoop, 1000);
  }

  // START GAME LOOP
  gameLoop();

});
