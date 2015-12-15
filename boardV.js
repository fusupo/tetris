var Board = function(w, h) {
  console.log('NEW BOARD');
  var s = Snap("#svg");
  var bg = s.rect(0, 0, w, h);
  this.update = function() {
    console.log(s);
  };
};
