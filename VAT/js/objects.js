var circles = {
  circle_in_scene: 0,
  circle_data: [],
  create: function(cx,cy,r){
            var circleGeometry = new THREE.SphereGeometry( r, 32, 32 );
						circleGeometry.name = "circle_"+circle_in_scene;
						circleGeometry.translate(cx, 3, cy);
						points.push(
							new THREE.Vector3(cx, 3, cy)
						);
						var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
						var circle = new THREE.Mesh( circleGeometry, material );
						scene.add( circle );
            					this.circle_data[circle_in_scene] = {'position':scene.length, 'x':cx, 'y':cy, 'r':r};
	                                        this.circle_in_scene++;
  },
  update: function(){
  }
}
