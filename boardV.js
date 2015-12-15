var Board = function(w, h, cw, ch, model) {
  console.log('NEW BOARD');
  var s = Snap("#svg");
  var bg = s.rect(0, 0, w, h);
  var rects = [];
  this.currPiece = undefined;
  this.drawRect = function(x, y){
    var rect = s.rect(x * cw, y * ch, cw, ch, 1).attr({
      fill: "none",
      stroke: "#bada55",
      strokeWidth: 1
    });
    rects.push(rect);
  };
  this.update = function() {
    for(var i = 0; i < rects.length; i++){
      rects[i].remove();
    };
    if(this.currPiece !== undefined){
      for (var y = 0; y < 2; y++) {
        for (var x = 0; x < 4; x++) {
          //boardModel[y][x] = pieceTpl[y][x];
          this.drawRect(this.currPiece.x + x, this.currPiece.y + y);
        }
      }
    }
    for (var y = 0; y < 20; y++) {
      for (var x = 0; x < 10; x++) {
        if (model[y][x] === 1) {
          this.drawRect(x, y);
        }
      }
    }
  };
};
