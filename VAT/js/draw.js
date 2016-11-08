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
