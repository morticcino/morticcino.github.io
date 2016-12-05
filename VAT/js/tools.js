var app = {};
app['mouse-events'] = {};
var objects = [];

function F2DTool(){};

F2DTool.prototype.mouseDown = function(){};
F2DTool.prototype.mouseMove = function(){};
F2DTool.prototype.mouseUp = function(){};
F2DTool.prototype.registerEvents = function(){
  var canvas = document.getElementsByTagName('canvas')[0];
  if(app['mouse-events'] != {}){
    canvas.removeEventListener('mousedown',app['mouse-events'].down);
    canvas.removeEventListener('mousemove',app['mouse-events'].move);
    canvas.removeEventListener('mouseup',app['mouse-events'].up);
  }
  
  app['mouse-events'].down = this.mouseDown;
  app['mouse-events'].move = this.mouseMove;
  app['mouse-events'].up = this.mouseUp;
  canvas.addEventListener('mousedown',this.mouseDown, false);
  canvas.addEventListener('mousemove',this.mouseMove, false);
  canvas.addEventListener('mouseup',this.mouseUp, false);
}

var F2DDraw = new F2DTool(); 

F2DDraw.mouseDown = function(e){
  console.log('F2DDraw mouseDown');
};
F2DDraw.mouseMove = function(){
  console.log('F2DDraw mouseMove');
};
F2DDraw.mouseUp = function(){
  console.log('F2DDraw mouseUp');
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
