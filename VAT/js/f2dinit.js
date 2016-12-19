NS="http://www.w3.org/2000/svg";
var tool = 'draw';
var undo_redo = [];
var undo_redo_history = -1;

save_undo();

var brush_size = 20;
var simplify_value = 5;
var px = 0;
var py = 0;
var sh = 0;
var sw = 0;
var r = new DollarRecognizer();

function init(){
        px = 0;
        py = 0;
        sw = Math.round(document.getElementById('svgpaper').width.baseVal.value);
        sh = Math.round(document.getElementById('svgpaper').height.baseVal.value);
        function set_svgpaper_dimentions(){
        	document.getElementById('svgpaper').viewBox.baseVal.x = px;
		document.getElementById('svgpaper').viewBox.baseVal.y = py;
		document.getElementById('svgpaper').viewBox.baseVal.width = sw;
		document.getElementById('svgpaper').viewBox.baseVal.height = sh;
        }
	tools('draw');
	document.getElementById('svgpaper').setAttribute("load", set_svgpaper_dimentions());
}
      
window.onload = init;
svgpaper = document.getElementById('svgpaper');
svgpaper.addEventListener( 'mousedown', onDocumentMouseDown, false );
svgpaper.addEventListener( 'touchstart', onDocumentMobileMouseDown, false );
