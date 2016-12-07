document.addEventListener('keydown',function onDocumentKeyDown( event ) {
	switch( event.key ) {
		case 's': 
			F2DSelect.registerEvents();
			break;
		case 'd': 
			F2DDraw.registerEvents();
			break;
		default:
			console.log(event.key);
	}
},false);
if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
var container;
var camera, scene, renderer;
var plane, cube;
var mouse, raycaster, isShiftDown = false;
var rollOverMesh, rollOverMaterial;
var cubeGeo, cubeMaterial;

var gest = new Array();
var draw_mode = false;
var r = new DollarRecognizer();
var maxX, minX, maxY, minY, _3dmaxX, _3dminX, _3dmaxZ, _3dminZ = 0;
var objects = [];
var mystroke = new Array();
var draw = [];
var circle_in_scene = 0;

var points = [];
var sketch_container = {};
var sketching = true;
var objectsToIntersect = {};
init();
render();


