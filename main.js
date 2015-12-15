$(document).ready(function() {
  console.log('READY!');

  var width = 100;
  var height = 200;
  var cw = width / 10;
  var ch = height / 20;
  var d = 1;
  var currentTime = 0;

  var board = new Board(width, height);

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

  function gameLoop() {
    currentTime++;
    console.log(currentTime);
    //
    board.update();
  }

  gameLoop();

});
