var PieceM = function(matrix, pivot) {
  this.matrix = matrix;
  this.x = 0;
  this.y = 0;
  //console.table(matrix);
  this.width = function(){
    var maxw = 0;
    for(var y = 0; y < this.matrix.length; y++){
      var row = this.matrix[y];
      for(var x = 0; x < row.length; x++){
        if(row[x] === 1) maxw = Math.max(x + 1, maxw);
      }
    }

    return maxw;
  };

  this.height = function(){
    var maxh=0;
    for(var y = 0; y < this.matrix.length; y++){
      var row = this.matrix[y];
      for(var x = 0; x < row.length; x++){
        if(row[x] === 1) maxh = y+1;
      }
    }
    
    return maxh;
  };
};
