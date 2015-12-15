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

  //INIT PIECES
  var pI = [
    ['1', '1', '1', '1'],
    ['0', '0', '0', '0']
  ];
  var pJ = [
    ['1', '1', '1', '0'],
    ['0', '0', '1', '0']
  ];
  var pL = [
    ['1', '1', '1', '0'],
    ['1', '0', '0', '0']
  ];
  var pO = [
    ['1', '1', '0', '0'],
    ['1', '1', '0', '0']
  ];
  var pS = [
    ['0', '1', '1', '0'],
    ['1', '1', '0', '0']
  ];
  var pT = [
    ['1', '1', '1', '0'],
    ['0', '1', '0', '0']
  ];
  var pZ = [
    ['1', '1', '0', '0'],
    ['0', '1', '1', '0']
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
  console.table(boardModel);

  // Bind Keys //
  $("body").keydown(function(e) {
    switch (e.keyCode) {
    case 37:
      console.log('left');
      break;
    case 38:
      console.log('up');
      break;
    case 39:
      console.log('right');
      break;
    case 40:
      console.log('down');
      break;
    case 32:
      console.log('space');
      break;
    default:
      console.log(e.keyCode);
    }
  });

  // DEFINE GAME LOOP
  function gameLoop() {
    currentTime++;
    console.log(currentTime);
    //
    if(currPiece === undefined){
      currPiece = new PieceM(pieces[Math.floor(Math.random() * pieces.length)]);
    }
    //
    boardView.update();
  }

  // START GAME LOOP
  gameLoop();

});
