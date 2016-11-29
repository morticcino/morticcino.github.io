function F2DTool(){};

F2DTool.prototype.mouseDown = function(){};
F2DTool.prototype.mouseMove = function(){};
F2DTool.prototype.mouseUp = function(){};
F2DTool.prototype.registerEvents = function(){
  var canvas = document.getElementById('f3d-canvas');
  canvas.addEventListener('mousedown',this.mouseDown, false);
  canvas.addEventListener('mousemove',this.mouseMove, false);
  canvas.addEventListener('mouseup',this.mouseUp, false);
}

var F2DDraw = Object.create (F2DTool); 

F2DDraw.prototype.mouseDown = function(e){
  console.log('F2DDraw mouseDown');
};
F2DDraw.prototype.mouseMove = function(){
  console.log('F2DDraw mouseMove');
};
F2DDraw.prototype.mouseUp = function(){
  console.log('F2DDraw mouseUp');
};

var F2DSelect = Object.create (F2DTool); 

F2DSelect.prototype.mouseDown = function(e){
  console.log('F2DSelect mouseDown');
};
F2DSelect.prototype.mouseMove = function(){
  console.log('F2DSelect mouseMove');
};
F2DSelect.prototype.mouseUp = function(){
  console.log('F2DSelect mouseUp');
};

