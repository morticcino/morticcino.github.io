function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMobileMouseMove( event ){
	var x = event.targetTouches[0].pageX;
	var y = event.targetTouches[0].pageY;
	mousemove(x,y);
}

function onDocumentMouseMove( event ) {
	var x = event.clientX;
	var y =  event.clientY;
	mousemove(x,y);
}
function raycastIntersects(){
      intersections = raycaster.intersectObjects( objectsToIntersect );
      return intersections;
}

function mousemove( x, y ) {
			if( app['mouse_down'] ){
				raycaster.setFromCamera( mouse, camera );

				app['intersects'] = raycastIntersects();

				if ( app['intersects'].length > 0 ) {

				var intersect = app['intersects'][ 0 ];

				mouse.set( ( x / window.innerWidth ) * 2 - 1, - ( y / window.innerHeight ) * 2 + 1 );

				switch(app['tool']){
					case 'select':
						app['x']=x;
						app['y']=y;
						console.log((app['x']-app['old_x'])+', '+(app['y']-app['old_y']));
						app['old_x']=x;
						app['old_y']=y;
						break;
					case 'draw':
						var voxel = new THREE.Mesh( cubeGeo, cubeMaterial );
						voxel.name = "toRemove_voxel";
						voxel.position.copy( intersect.point ).add( intersect.face.normal );
						sketch_container.add( voxel );
						mystroke[1] = voxel;
						gest[gest.length] = new Point(x,y);
						if( voxel.position.x > _3dmaxX ){
							_3dmaxX = voxel.position.x;
						}
						if( voxel.position.x < _3dminX ){
							_3dminX = voxel.position.x;
						}
						if( voxel.position.z > _3dmaxZ ){
							_3dmaxZ = voxel.position.z;
						}
						if( voxel.position.z < _3dminZ ){
							_3dminZ = voxel.position.z;
						}
						draw[draw.length] = {x: voxel.position.x, z:voxel.position.z};
						break;
				}


				render();	
			}else{
				//event.preventDefault();

				mouse.set( ( x / window.innerWidth ) * 2 - 1, - ( y / window.innerHeight ) * 2 + 1 );

				raycaster.setFromCamera( mouse, camera );

				var intersects = raycaster.intersectObjects( objects );

				if ( intersects.length > 0 ) {

					var intersect = intersects[ 0 ];

					//document.getElementById('coordinates').innerText = 'x= '+intersect.point.x+', y= '+intersect.point.y+', z= '+intersect.point.z;

				}
			}
			/*
			event.preventDefault();
			mouse.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );
			raycaster.setFromCamera( mouse, camera );
			var intersects = raycaster.intersectObjects( objects );
			if ( intersects.length > 0 ) {
				var intersect = intersects[ 0 ];
				rollOverMesh.position.copy( intersect.point ).add( intersect.face.normal );
				rollOverMesh.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
			}
			render();
			*/
		}
}
		function onDocumentMobileMouseDown( event ){
			var x = event.targetTouches[0].pageX;
			var y = event.targetTouches[0].pageY;
			mousedown(x,y);
		}

		function onDocumentMouseDown( event ) {
			var x = event.clientX;
			var y =  event.clientY;
			mousedown(x,y);
		}

		function mousedown( x, y ) {
			app['mouse_down']= true;
			//event.preventDefault();
			app['x']=app['old_x']=x;
			app['y']=app['old_x']=y;
			maxX = minX = x;
			maxY = minY = y;
			mouse.set( ( x / window.innerWidth ) * 2 - 1, - ( y / window.innerHeight ) * 2 + 1 );
			raycaster.setFromCamera( mouse, camera );
			app['intersects'] = raycastIntersects();
			if ( app['intersects'].length > 0 ) {
				var intersect = app['intersects'][ 0 ];
				console.log(intersect.object.name);
				/*
				intersect.object.dispatchEvent({
					type: 'pick',
					info: e
				});
				*/
				var voxel = new THREE.Mesh( cubeGeo, cubeMaterial );
				intersection_normal = intersect.face.normal;
				voxel.position.copy( intersect.point ).add( intersect.face.normal );
				//voxel.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
				//voxel.name = "toRemove_voxel";
				sketch_container = new THREE.Object3D();
				//sketch_container.name = 'sketch_container';
				sketch_container.add(voxel);
				scene.add( sketch_container );
				mystroke[0] = voxel;
				gest[0] = new Point(x,y);
				_3dmaxX = voxel.position.x;
				_3dminX = voxel.position.x;
				_3dmaxZ = voxel.position.z;
				_3dminZ = voxel.position.z;

				draw[0] = {x: voxel.position.x, z:voxel.position.z}; 


			}
			render();	
		}

		function onDocumentMobileMouseUp( event ){
			mouseup();
		}

		function onDocumentMouseUp( event ){

			mouseup();
		}

function mouseup(  ){

			app['mouse_down'] = false;
			//event.preventDefault();

			var matched = r.Recognize(gest);
			console.log(matched);
			/*
			var geometry = new THREE.Geometry();
			geometry.vertices.push( new THREE.Vector3( _3dminX, 1, _3dminZ ) );
			geometry.vertices.push( new THREE.Vector3( _3dminX, 1, _3dmaxZ ) );

			geometry.vertices.push( new THREE.Vector3( _3dminX, 1, _3dminZ ) );
			geometry.vertices.push( new THREE.Vector3( _3dmaxX, 1, _3dminZ ) );

			geometry.vertices.push( new THREE.Vector3(   _3dmaxX, 1, _3dmaxZ ) );
			geometry.vertices.push( new THREE.Vector3( _3dmaxX, 1,  _3dminZ) );

			geometry.vertices.push( new THREE.Vector3(   _3dmaxX, 1, _3dmaxZ ) );
			geometry.vertices.push( new THREE.Vector3( _3dminX, 1,  _3dmaxZ) );


			var material = new THREE.LineBasicMaterial( { color: 0xff0000, opacity: 1, transparent: false } );
			var line = new THREE.LineSegments( geometry, material );
			scene.add( line );
			*/
			var width = _3dmaxX -_3dminX;
			var height = _3dmaxZ -_3dminZ;
			switch(matched.Name){
				case "rectangle":

					//console.log('width '+width+', height '+height);
					var geometry = new THREE.BoxGeometry( width, 1 , height );
					geometry.translate(_3dminX+width/2, 1, _3dminZ+height/2);
					var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
					var cube = new THREE.Mesh( geometry, material );
					scene.remove( sketch_container );
					scene.add( cube );
					break;
				case "circle":
					if(width<height){
						var radius = width/2;
					}else{
						var radius = height/2;
					}
					circles.create(_3dminX+width/2,_3dminZ+width/2,radius);
					/*
					var circleGeometry = new THREE.SphereGeometry( radius, 32, 32 );
					circleGeometry.name = "circle_"+circle_in_scene;
					circleGeometry.translate(_3dminX+width/2, 3, _3dminZ+height/2);
					points.push(
						new THREE.Vector3(_3dminX+width/2, 3, _3dminZ+height/2)
					);
					var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
					var circle = new THREE.Mesh( circleGeometry, material );
					scene.add( circle );
					circle_in_scene++;
					*/
					scene.remove( sketch_container );
					draw_circle_link();
					break;
				case "triangle":
				case "x":
				case "arrow":
				case "delete":
				case "star":
				case "pigtail":
					console.log('unsupported sign');
					break;
				case "v":
				case "left square bracket":
				case "right square bracket":
				case "left curly brace":
				case "right curly brace":
				case "check":
				case "caret":
				case "zig-zag":
					//drawPolyline();
					//sketch();
					drawTube();



				//}
				break;


				default:
					console.log(mystroke);
					var geometry = new THREE.Geometry();
					geometry.vertices.push(new THREE.Vector3(mystroke[0].position.x, 1, mystroke[0].position.z));
					geometry.vertices.push(new THREE.Vector3(mystroke[1].position.x, 1, mystroke[1].position.z));
					var line = new THREE.Line(geometry, material);
					scene.add(line);


			}
	//document.getElementById('coordinates').innerText =  '_3dmaxX '+_3dmaxX+' _3dminX '+_3dminX+' _3dmaxZ '+_3dmaxZ+' _3dminZ '+_3dminZ;	               
			gest = new Array();
			mystroke = new Array();
			draw = new Array();

			render();	
		}

