var circles = {
  circles_in_scene: 0,
  circles_data: [],
	circles_to_pick: [],
  create: function(cx,cy,r){
        var circleGeometry = new THREE.SphereGeometry( r, 32, 32 );
	circleGeometry.translate(cx, 0, cy);
	//THREE.EventDispatcher.call( circleGeometry );
	//circleGeometry.addEventListener('click', function(event) {alert("GOT THE EVENT");});
	//circleGeometry.dispatchEvent({type:'click'});
	points.push(
		new THREE.Vector3(cx, 0, cy)
	);
	var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
	var circle = new THREE.Mesh( circleGeometry, material );
	circle.name = "circle_"+circles.circles_in_scene;
	  //TMP!!! da rimuovere
	scene.add( circle );
	var ray = r;
	  circles.circles_to_pick(circle);
	circles.circles_data.push( {x: cx, y:cy, r: ray} );
	circles.circles_in_scene++;
	if(this.circles_in_scene > 1){
		for(var i = 0; i<circles.circles_in_scene-1;i++){
			var cx1 = circles.circles_data[i].x;
			var cy1 = circles.circles_data[i].y;
			var r1 = circles.circles_data[i].r;
			var cx2 = circles.circles_data[i+1].x;
			var cy2 = circles.circles_data[i+1].y;
			var r2 = circles.circles_data[i+1].r;
			tangent(cx1,cy1,r1,cx2,cy2,r2);
		}
	}
  },
  update: function(){
  }
}
