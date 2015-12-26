var Board = function(w, h, cw, ch, model) {
  console.log('NEW BOARD');

  var s = Snap("#svg");
  var bg = s.rect(0, 0, w, h);
  var rects = [];
  var tRects = [];
  var nRects = [];

  this.currPiece = undefined;
  this.nextPiece = undefined;

  this.drawRect = function(x, y, color, r) {
    var rect = s.rect(x * cw, y * ch, cw, ch, 1).attr({
      fill: color,
      stroke: "#000000",
      strokeWidth: 1
    });
    r.push(rect);
  };

  this.update = function() {
    for (var i = 0; i < tRects.length; i++) {
      tRects[i].remove();
    };
    if (this.currPiece !== undefined) {
      for (var y = 0; y < this.currPiece.matrix.length; y++) {
        for (var x = 0; x < this.currPiece.matrix[0].length; x++) {
          if (this.currPiece.matrix[y][x] === 1) {
            this.drawRect(this.currPiece.x + x, this.currPiece.y + y, '#ffffff', tRects);
          }
        }
      }
    }
  };

  this.updateBoard = function() {
    for (var i = 0; i < rects.length; i++) {
      rects[i].remove();
    };
    for (var y = 0; y < 20; y++) {
      for (var x = 0; x < 10; x++) {
        if (model[y][x] === 1) {
          this.drawRect(x, y, "#bada55", rects);
        }
      }
    }
  };

  this.updateNextPiece = function() {
    for (var i = 0; i < nRects.length; i++) {
      nRects[i].remove();
    };
    for (var y = 0; y < this.nextPiece.matrix.length; y++) {
      for (var x = 0; x < this.nextPiece.matrix[0].length; x++) {
        if(this.nextPiece.matrix[y][x] === 1){
          this.drawRect(11 + x, y, "#ff0000", nRects); 
        }
      }
    }
  };

};
