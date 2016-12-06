var app = {};
app['mouse-events'] = {};
app['touch-events'] = {};
var objects = [];

/*
document.addEventListener( 'mousemove', onDocumentMouseMove, false );
document.addEventListener( 'touchmove', onDocumentMobileMouseMove, false );
document.addEventListener( 'mousedown', onDocumentMouseDown, false );
document.addEventListener( 'touchstart', onDocumentMobileMouseDown, false );
document.addEventListener( 'keydown', onDocumentKeyDown, false );
document.addEventListener( 'keyup', onDocumentKeyUp, false );
document.addEventListener( 'mouseup', onDocumentMouseUp, false );
document.addEventListener( 'touchend', onDocumentMobileMouseUp, false );

*/


function F2DTool(){};

F2DTool.prototype.mouseDown = function(){};
F2DTool.prototype.mouseMove = function(){};
F2DTool.prototype.mouseUp = function(){};
F2DTool.prototype.touchMove = function(){};
F2DTool.prototype.touchStart = function(){};
F2DTool.prototype.touchEnd = function(){};

function register(){
  var canvas = document.getElementsByTagName('canvas')[0];
  if(app['mouse-events'] != {}){
    canvas.removeEventListener('mousedown',app['mouse-events'].down);
    canvas.removeEventListener('mousemove',app['mouse-events'].move);
    canvas.removeEventListener('mouseup',app['mouse-events'].up);
    canvas.removeEventListener('touchstart',app['touch-events'].start);
    canvas.removeEventListener('touchmove',app['touch-events'].move);
    canvas.removeEventListener('touchend',app['touch-events'].end);
  }
  
  app['mouse-events'].down = this.mouseDown;
  app['mouse-events'].move = this.mouseMove;
  app['mouse-events'].up = this.mouseUp;
  add['touch-events'].start = this.touchStart;
  add['touch-events'].move = this.touchMove;
  add['touch-events'].end = this.touchEnd;
  
  canvas.addEventListener('mousedown',this.mouseDown, false);
  canvas.addEventListener('mousemove',this.mouseMove, false);
  canvas.addEventListener('mouseup',this.mouseUp, false);
  canvas.addEventListener('touchstart',app['touch-events'].start);
  canvas.addEventListener('touchmove',app['touch-events'].move);
  canvas.addEventListener('touchend',app['touch-events'].end);
}
F2DTool.prototype.registerEvents = register; 

var F2DDraw = new F2DTool(); 

F2DDraw.mouseDown = function(e){
  console.log('F2DDraw mouseDown');
  onDocumentMouseDown(e);
};
F2DDraw.mouseMove = function(){
  console.log('F2DDraw mouseMove');
  onDocumentMouseMove(e);
};
F2DDraw.mouseUp = function(){
  console.log('F2DDraw mouseUp');
  onDocumentMouseUp(e);
};

var F2DSelect = new F2DTool(); 

F2DSelect.mouseDown = function(e){
  console.log('F2DSelect mouseDown');
};
F2DSelect.mouseMove = function(){
  console.log('F2DSelect mouseMove');
};
F2DSelect.mouseUp = function(){
  console.log('F2DSelect mouseUp');
};


F2DDraw.registerEvents();
