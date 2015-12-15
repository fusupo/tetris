var Board = function(w, h, cw, ch, model) {
  console.log('NEW BOARD');
  var s = Snap("#svg");
  var bg = s.rect(0, 0, w, h);
  this.update = function() {
    for (var y = 0; y < 20; y++) {
      for (var x = 0; x < 10; x++) {
        if (model[y][x] === 1) {
          s.rect(x * cw, y * ch, cw, ch, 1).attr({
            fill: "none",
            stroke: "#bada55",
            strokeWidth: 1
          });
        }
      }
    }
  };
};
