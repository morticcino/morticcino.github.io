//equation line = y-y1 = m(m-m1) -> m=(y-y1)/(m-m1)
// q=-my+x
function m_value(x1,y1,x2,y2){
	return (y2-y1)/(x2-x1);
}
function y_value(m,x,q){
	return m*x+q;
}
function q_value(x1,y1,x2,y2){
	return -x1*((y2-y1)/(x2-x1))+y1;
}
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

function tangent(){
	var x1 = parseInt(nodes_array[i].getAttribute('cx'));
	var y1 = parseInt(nodes_array[i].getAttribute('cy'));
	var r1 = parseInt(nodes_array[i].getAttribute('rx'));
	var x2 = parseInt(nodes_array[i+1].getAttribute('cx'));
	var y2 = parseInt(nodes_array[i+1].getAttribute('cy'));
	var r2 = parseInt(nodes_array[i+1].getAttribute('rx'));
	//Default is r1 > r2
	if (r1 < r2){
		var temp = r1;
		r1 = r2;
		r2 = temp;
		cen1x = x2; 
		cen1y = y2;
		cen2x = x1; 
		cen2y = y1;
	} else {
		cen1x = x1; 
		cen1y = y1;
		cen2x = x2; 
		cen2y = y2;
	}
	//Distance between two centres
	var cendistance = Math.sqrt((cen1x-cen2x)*(cen1x-cen2x) + (cen1y-cen2y)*(cen1y-cen2y));
	var a = cendistance*r2/Math.max(r1-r2,0.0000001);
	//Coordinates at the vertex
	var vx = cen2x + (cen2x - cen1x)/cendistance*a;
	var vy = cen2y + (cen2y - cen1y)/cendistance*a;
	//Angle between line joining two centres and the x-axis
	var pheta = Math.atan2(cen1y-cen2y,cen1x-cen2x);
	//Angle between line joining two centres and the common tangent
	var phi = Math.asin(r2/a);
	//One tangent is at the angle (pheta-phi) with x-axis; the other is (pheta+phi)
	var tan1angle = pheta - phi;
	var tan2angle = pheta + phi;
	//Find the length of tangents (to C1 and C2)
	var criterion = a*a-r2*r2;
	if (criterion < 0){
		console.log('criterion < 0');
	}
	t1 = Math.sqrt(criterion);
	t2 = Math.sqrt((cendistance+a)*(cendistance+a)-r1*r1);
	//Find the points of contact; this sequence is used to form a polygon
	var poc1x = vx + Math.cos(tan1angle)*t1; var poc1y = vy + Math.sin(tan1angle)*t1;
	var poc2x = vx + Math.cos(tan1angle)*t2; var poc2y = vy + Math.sin(tan1angle)*t2;
	var poc3x = vx + Math.cos(tan2angle)*t2; var poc3y = vy + Math.sin(tan2angle)*t2;
	var poc4x = vx + Math.cos(tan2angle)*t1; var poc4y = vy + Math.sin(tan2angle)*t1;
}

function tangent(x1,y1,r1,x2,y2,r2){
				 	if (r1 < r2){
						var temp = r1;
						r1 = r2;
						r2 = temp;
						cen1x = x2; 
						cen1y = y2;
						cen2x = x1; 
						cen2y = y1;
					} else {
						cen1x = x1; 
						cen1y = y1;
						cen2x = x2; 
						cen2y = y2;
					}
					//Distance between two centres
					var cendistance = Math.sqrt((cen1x-cen2x)*(cen1x-cen2x) + (cen1y-cen2y)*(cen1y-cen2y));
					var a = cendistance*r2/Math.max(r1-r2,0.0000001);
					//Coordinates at the vertex
					var vx = cen2x + (cen2x - cen1x)/cendistance*a;
					var vy = cen2y + (cen2y - cen1y)/cendistance*a;
					//Angle between line joining two centres and the x-axis
					var pheta = Math.atan2(cen1y-cen2y,cen1x-cen2x);
					//Angle between line joining two centres and the common tangent
					var phi = Math.asin(r2/a);
					//One tangent is at the angle (pheta-phi) with x-axis; the other is (pheta+phi)
					var tan1angle = pheta - phi;
					var tan2angle = pheta + phi;
					//Find the length of tangents (to C1 and C2)
					var criterion = a*a-r2*r2;
					if (criterion < 0){
						console.log('criterion < 0');
					}
					t1 = Math.sqrt(criterion);
					t2 = Math.sqrt((cendistance+a)*(cendistance+a)-r1*r1);
					//Find the points of contact; this sequence is used to form a polygon
					var poc1x = vx + Math.cos(tan1angle)*t1; var poc1y = vy + Math.sin(tan1angle)*t1;
					var poc2x = vx + Math.cos(tan1angle)*t2; var poc2y = vy + Math.sin(tan1angle)*t2;
					var poc3x = vx + Math.cos(tan2angle)*t2; var poc3y = vy + Math.sin(tan2angle)*t2;
					var poc4x = vx + Math.cos(tan2angle)*t1; var poc4y = vy + Math.sin(tan2angle)*t1;
					/*
					if(!group.polygons){
					  	group.polygons = document.createElementNS(NS,"g");
					  	group.polygons.setAttribute('id', 'line_group');
					  	group.polygons.setAttribute('fill', 'blue');
					  	//Fast3d.f3dsphere_group.setAttribute('stroke', 'green');
					  	//svgpaper.appendChild(F3D_Polygon.line_group);
					  }
					 
					var shape = new THREE.Shape();
					shape.moveTo( poc4x,poc4y );
					shape.lineTo( poc3x,poc3y );
					shape.lineTo( poc2x,poc2y );
					shape.lineTo( poc1x,poc1y );
					shape.lineTo( poc4x,poc4y );

					var geometry = new THREE.ShapeGeometry( shape );
					var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
					var mesh = new THREE.Mesh( geometry, material ) ;
					mesh.name = 'tangent';
					scene.add( mesh );
					*/
					var material_dx = new THREE.LineBasicMaterial({
						color: 0x0000ff
					});
					var material_sx = new THREE.LineBasicMaterial({
						color: 0xff0000
					});

					var geometry = new THREE.Geometry();
					var m = m_value(poc3x,poc3y,poc4x,poc4y);
					var q = q_value(poc3x,poc3y,poc4x,poc4y);
					var new_x = poc4x+100;
					var new_y = y_value(m,new_x,q);
					geometry.vertices.push(
						new THREE.Vector3( new_x, 0, new_y ),
						/*new THREE.Vector3( poc4x, 0, poc4y ),*/
						new THREE.Vector3( poc3x, 0, poc3y )
						//new THREE.Vector3( poc2x, 0, poc2y ),
						//new THREE.Vector3( poc1x, 0, poc1y )
					);

					var line = new THREE.Line( geometry, material_sx );
					scene.add( line );
					var geometry = new THREE.Geometry();
					geometry.vertices.push(
						//new THREE.Vector3( poc4x, 0, poc4y ),
						//new THREE.Vector3( poc3x, 0, poc3y ),
						new THREE.Vector3( poc2x, 0, poc2y ),
						new THREE.Vector3( poc1x, 0, poc1y )
					);

					var line = new THREE.Line( geometry, material_dx );
					scene.add( line );
					//group.polygons.appendChild(F3D_Polygon.addPolygon('polygon',poc2x,poc2y,poc1x,poc1y,poc4x,poc4y,poc3x,poc3y));
					
}
