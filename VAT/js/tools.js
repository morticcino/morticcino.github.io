function F2DTool(){};

F2DTool.prototype.registerEvents = function(){};
F2DTool.prototype.mouseDown = function(){};
F2DTool.prototype.mouseMove = function(){};
F2DTool.prototype.mouseUp = function(){};

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
f2DDraw.prototype.registerEvents = function(){
  document.addEventListener('mousedown',this.mouseDown, false);
  document.addEventListener('mousemove',this.mouseMove, false);
  document.addEventListener('mouseup',this.mouseUp, false);
}
