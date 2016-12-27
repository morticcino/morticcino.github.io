

function F2DTool(){};

F2DTool.prototype.mouseDown = function(){};
F2DTool.prototype.mouseMove = function(){};
F2DTool.prototype.mouseUp = function(){};
F2DTool.prototype.touchMove = function(){};
F2DTool.prototype.touchStart = function(){};
F2DTool.prototype.touchEnd = function(){};

function register(tool){
  var svg = document.getElementsByTagName('svg')[0];
  if(app['mouse-events'].down != undefined){
    svg.removeEventListener('mousedown',app['mouse-events'].down);
    svg.removeEventListener('mousemove',app['mouse-events'].move);
    svg.removeEventListener('mouseup',app['mouse-events'].up);
    svg.removeEventListener('touchstart',app['touch-events'].start);
    svg.removeEventListener('touchmove',app['touch-events'].move);
    svg.removeEventListener('touchend',app['touch-events'].end);
  }
  
  app['mouse-events'].down = tool.mouseDown;
  app['mouse-events'].move = tool.mouseMove;
  app['mouse-events'].up = tool.mouseUp;
  app['touch-events'].start = tool.touchStart;
  app['touch-events'].move = tool.touchMove;
  app['touch-events'].end = tool.touchEnd;
  
  svg.addEventListener('mousedown',app['mouse-events'].down, false);
  svg.addEventListener('mousemove',app['mouse-events'].move, false);
  svg.addEventListener('mouseup',app['mouse-events'].up, false);
  svg.addEventListener('touchstart',app['touch-events'].start, false);
  svg.addEventListener('touchmove',app['touch-events'].move, false);
  svg.addEventListener('touchend',app['touch-events'].end, false);
  
}

function drawRegister(o){
  register(o);
}

function selectRegister(o){
  register(o);
}

F2DTool.prototype.registerEvents = function(){}; 

var F2DDraw = new F2DTool(); 

F2DDraw.mouseDown = function(e){
  console.log('F2DDraw mouseDown');
  onDocumentMouseDown(e);
};
F2DDraw.mouseMove = function(e){
  console.log('F2DDraw mouseMove');
  onDocumentMouseMove(e);
};
F2DDraw.mouseUp = function(e){
  console.log('F2DDraw mouseUp');
  onDocumentMouseUp(e);
};
F2DDraw.registerEvents = function(t){
  console.log('F2DDraw register');
  drawRegister(t);
};

var F2DSelect = new F2DTool(); 

F2DSelect.mouseDown = function(e){
  console.log('F2DSelect mouseDown');
  onSelectMouseDown(e);
};
F2DSelect.mouseMove = function(e){
  console.log('F2DSelect mouseMove');
  onSelectMouseMove(e);
};
F2DSelect.mouseUp = function(e){
  console.log('F2DSelect mouseUp');
  onSelectMouseUp(e);
};
F2DSelect.registerEvents = function(t){
  console.log('F2DSelect register');
  selectRegister(t);
};

document.addEventListener('keydown',function onDocumentKeyDown( event ) {
	switch( event.key ) {
		case 's': 
			F2DSelect.registerEvents(F2DSelect);
			break;
		case 'd': 
			F2DDraw.registerEvents(F2DDraw);
			break;
		default:
			console.log(event.key);
	}
},false);
