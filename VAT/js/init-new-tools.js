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
var objectsToIntersect = {},
    INTERSECTED,SELECTED,intersection = new THREE.Vector3();
var plane = new THREE.Plane();

var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
camera.position.set(0, 1000, 0 );
camera.lookAt( new THREE.Vector3() );

var controls = new THREE.TrackballControls( camera );
controls.rotateSpeed = 1.0;
controls.zoomSpeed = 1.2;
controls.panSpeed = 0.8;
controls.noZoom = false;
controls.noPan = false;
controls.staticMoving = true;
controls.dynamicDampingFactor = 0.3;


init();
render();


