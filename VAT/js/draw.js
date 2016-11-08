function sketch(){
				var geometry = new THREE.Geometry();
				for(var i = 0;i<draw.length-1;i++){
					geometry.vertices.push(new THREE.Vector3(draw[i].x, 1, draw[i].z));
					geometry.vertices.push(new THREE.Vector3(draw[i+1].x, 1, draw[i+1].z));
					var line = new THREE.Line(geometry, material);
					scene.add(line);
				}
			}
			
			function drawTube(){
				var result = simplify(draw, 1, false);
				console.log('draw length '+draw.length);
				console.log('result length '+result.length);
			}
			
			function drawPolyline(){
				var corners=[draw[0]]
				var n=0
				var t=0
				var lastCorner=draw[0]
				for (var i=1; i<draw.length-2; i++){
				  
				  var pt=draw[i+1]
				  var d=delta(lastCorner, draw[i-1])
				  
				  if (len(d)>20 && n>2){
					ac=delta(draw[i-1], pt)
					if (Math.abs(angle_between(ac, d)) > Math.PI/4){
					  pt.index=i
					  corners.push(pt)
					  lastCorner=pt
					  n=0
					  t=0
					}
				  }
				  n++
				}
				
				if (len(delta(draw[draw.length-1], draw[0]))<25){
				  corners.push(draw[0])
				  
				  //c.fillStyle='rgba(0, 0, 255, 0.3)'
				  
				  //if (corners.length==5){
					//check for square
					var p1=corners[0]
					var p2=corners[1]
					var p3=corners[2]
					var p4=corners[3]
					var p1p2=delta(p1, p2)
					var p2p3=delta(p2, p3)
					var p3p4=delta(p3, p4)
					var p4p1=delta(p4, p1)
					if ((Math.abs(angle_between(p1p2, p2p3)-Math.PI/2))<Math.PI/6
					&& (Math.abs(angle_between(p2p3, p3p4)-Math.PI/2))<Math.PI/6
					&& (Math.abs(angle_between(p3p4, p4p1)-Math.PI/2))<Math.PI/6
					&& (Math.abs(angle_between(p4p1, p1p2)-Math.PI/2))<Math.PI/6){
					  //c.fillStyle='rgba(0, 255, 255, 0.3)'
					  var p1p3=delta(p1, p3)
					  var p2p4=delta(p2, p4)
					  
					  var diag=(len(p1p3)+len(p2p4))/4.0
					  
					  var tocenter1=scale(unit(p1p3), -diag)
					  var tocenter2=scale(unit(p2p4), -diag)
					  
					  var center=average([p1, p2, p3, p4])	
					  
					  var angle=angle_between(p1p3, p2p4)
					  
					  corners=[add(center, tocenter1),
						  add(center, tocenter2),
						  add(center, scale(tocenter1, -1)),
						  add(center, scale(tocenter2, -1)),
						  add(center, tocenter1)]	
					}
					
					
				  }
				  
				  
				  var geometry = new THREE.Geometry();
				  geometry.vertices.push(new THREE.Vector3(corners[0].x, 1, corners[0].z));
				  for (var i=1; i<corners.length; i++){
					geometry.vertices.push(new THREE.Vector3(corners[i].x, 1, corners[i].z));
				  }
				  geometry.vertices.push(new THREE.Vector3(draw[draw.length-1].x, 1, draw[draw.length-1].z));
				  var line = new THREE.Line(geometry, material);
				  scene.add(line);
			}

function draw_circle_link(){
				
				if (circle_in_scene % 3 === 0){
					
					var geometry = new THREE.Geometry(),
					colors = [];
	
					n_sub = 6;
	
					var position, index;
	
					var spline = new THREE.Spline( points );
	
					for ( i = 0; i < points.length * n_sub; i ++ ) {
	
						index = i / ( points.length * n_sub );
						position = spline.getPoint( index );
	
						geometry.vertices[ i ] = new THREE.Vector3( position.x, position.y, position.z );
	
						colors[ i ] = new THREE.Color( 0xffffff );
						colors[ i ].setHSL( 0.6, 1.0, Math.max( 0, - position.x / 200 ) + 0.5 );
		
					}

					geometry.colors = colors;
		
					// lines
	
					material = new THREE.LineBasicMaterial( { color: 0x000000, opacity: 1, linewidth: 3, vertexColors: THREE.VertexColors } );
	
					var line, p, scale = 0.3, d = 225;
					var parameters =  [
						[ material, scale*1.5, [-d,0,0],  geometry ],
					];
	
					for ( i = 0; i < parameters.length; ++ i ) {
	
						p = parameters[ i ];
						line = new THREE.Line( p[ 3 ],  p[ 0 ] );
						//line.scale.x = line.scale.y = line.scale.z =  p[ 1 ];
						//line.position.x = p[ 2 ][ 0 ];
						//line.position.y = p[ 2 ][ 1 ];
						//line.position.z = p[ 2 ][ 2 ];
						scene.add( line );
	
					}
					points = [];
				}
				
			}
