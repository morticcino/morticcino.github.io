var circles = {
  circles_in_scene: 0,
  circles_data: [],
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
	circle.name = "circle_"+this.circles_in_scene;
	scene.add( circle );
	circles.push(circle);
	this.circles_data[this.circles_in_scene] = {'position':scene.children.length, 'x':cx, 'y':cy, 'r':r};
	this.circles_in_scene++;
	if(this.circles_in_scene > 1){
		for(var i = 0; i<this.circles_in_scene-1;i++){
			var cx1 = this.circles_data[i].x;
			var cy1 = this.circles_data[i].y;
			var r1 = this.circles_data[i].r;
			var cx2 = this.circles_data[i+1].x;
			var cy2 = this.circles_data[i+1].y;
			var r2 = this.circles_data[i+1].r;
			tangent(cx1,cy1,r1,cx2,cy2,r2);
		}
	}
  },
  update: function(){
  }
}
