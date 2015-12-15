$(document).ready(function() {
  console.log('READY!');

  var width = 100;
  var height = 200;
  var cw = width / 10;
  var ch = height / 20;
  var d = 1;
  var currentTime = 0;

  //Bind Keys
  $( "body" ).keydown(function(e) {
    console.log( "Handler for .keydown() called.", e );
  });

  function gameLoop(){
    currentTime++;
    console.log(currentTime);
    //

  }

});
