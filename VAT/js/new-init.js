var objects = [];

function init() {
	app = {};
	app['tool'] = 'draw';
	app['mouse_down']=false;
	app['intersection']={};
	app['container'] = document.createElement( 'div' );
	document.body.appendChild( app['container'] );

	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.set(0, 1000, 0 );
	camera.lookAt( new THREE.Vector3() );

	scene = new THREE.Scene();

	rollOverGeo = new THREE.BoxGeometry( 50, 50, 50 );
	rollOverMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } );
	rollOverMesh = new THREE.Mesh( rollOverGeo, rollOverMaterial );

	cubeGeo = new THREE.BoxGeometry( 2, 2, 2 );

	var size = 500, step = 10;

	var geometry = new THREE.Geometry();

	for ( var i = - size; i <= size; i += step ) {

		geometry.vertices.push( new THREE.Vector3( - size, 0, i ) );
		geometry.vertices.push( new THREE.Vector3(   size, 0, i ) );

		geometry.vertices.push( new THREE.Vector3( i, 0, - size ) );
		geometry.vertices.push( new THREE.Vector3( i, 0,   size ) );

	}

	var material = new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2, transparent: true } );

	var line = new THREE.LineSegments( geometry, material );
	scene.add( line );
	
	raycaster = new THREE.Raycaster();
	mouse = new THREE.Vector2();

	var geometry = new THREE.PlaneBufferGeometry( 1000, 1000 );
	geometry.rotateX( - Math.PI / 2 );

	plane = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { visible: false } ) );
	scene.add( plane );

	objects.push( plane );

	var ambientLight = new THREE.AmbientLight( 0x606060 );
	scene.add( ambientLight );

	var directionalLight = new THREE.DirectionalLight( 0xffffff );
	directionalLight.position.set( 1, 0.75, 0.5 ).normalize();
	scene.add( directionalLight );

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setClearColor( 0xf0f0f0 );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	app['container'].appendChild( renderer.domElement );


	window.addEventListener( 'resize', onWindowResize, false );

}

function render() {
	renderer.render( scene, camera );
}
