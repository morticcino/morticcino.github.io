var F3D_Scene = {
	hand_draw_object: 0,
	hand_draw_objects: [],
	tentacle_objects: [],
	extrude_objects: [],
	sketch_group: ''
}

var F3D_sketch = {
    gest: [],
    draw_gest: [],
    maxX: 0,
    minX: 0,
    maxY: 0,
    minY: 0,
    sketch_group: '',
        
    addPoint: function(x,y){
    	F3D_sketch.gest[F3D_sketch.gest.length] = new Point(x,y);
        F3D_sketch.draw_gest[F3D_sketch.draw_gest.length] = {'x':x, 'y':y};
	if( x > F3D_sketch.maxX ){
		F3D_sketch.maxX = x;
	}
	if( x < F3D_sketch.minX ){
		F3D_sketch.minX = x;
	}
			
	if( y > F3D_sketch.maxY ){
		F3D_sketch.maxY = y;
	}
			
	if( y < F3D_sketch.minY ){
		F3D_sketch.minY = y;
	}
	F3D_sketch.fast3d_add(F3D_sketch.fast3d_addCircle('sketch', x, y, 5));
    },
    init: function(x,y){
        F3D_sketch.maxX = F3D_sketch.minX = x;
	F3D_sketch.maxY = F3D_sketch.minY = y;
	F3D_sketch.gest[0] = new Point(x,y);
        F3D_sketch.draw_gest[0] = {'x':x, 'y':y};
        if(!document.getElementById('sketch_group')){
    		F3D_Scene.sketch_group = document.createElementNS(NS,"g");
    		F3D_Scene.sketch_group.setAttribute('id', 'sketch_group');
    		F3D_Scene.sketch_group.setAttribute('fill', 'red');
    		document.getElementById('svgpaper').appendChild(F3D_Scene.sketch_group);
    	}else{
    		F3D_Scene.sketch_group.setAttribute('id', 'sketch_group');
    		F3D_Scene.sketch_group.setAttribute('fill', 'red');
    	}
    	
    },
    fast3d_addCircle: function(name, x, y, r){
	var circle = document.createElementNS(NS,"ellipse");
	circle.setAttribute('cx', x);
	circle.setAttribute('cy', y);
	circle.setAttribute('rx', r);
	circle.setAttribute('ry', r);
	circle.setAttribute('class', 'draggable');
	return circle;
    },
          
    fast3d_add: function(elem){
        F3D_Scene.sketch_group.appendChild(elem);
    },
          
    clean_data: function(){
      	F3D_sketch.gest = [];
	F3D_sketch.draw_gest = [];
	F3D_sketch.maxX = 0;
	F3D_sketch.minX = 0;
	F3D_sketch.maxY = 0;
	F3D_sketch.minY = 0;
   }
}

var F3D_Sphere = {
    circle_in_scene: 0,
    f3dsphere_group: '',
    sphere: '',
    polygon: '',
    //f3dsphere_polyline_group: '',
    selectedElement: 0,
    currentX: 0,
    currentY: 0,
    init: function(){
    	F3D_Scene.hand_draw_objects = document.createElementNS(NS,"g");
      	F3D_Scene.hand_draw_objects.setAttribute('id', 'f3dsphere_group');
      	F3D_Scene.hand_draw_objects.setAttribute('fill', 'blue');
      	svgpaper.appendChild(F3D_Scene.hand_draw_objects);
    },
    fast3d_addCircle: function(name, x, y, r){
      	var circle = document.createElementNS(NS,"ellipse");
 	circle.setAttribute('id', 'ellipse_'+F3D_Sphere.circle_in_scene);
 	circle.setAttribute('cx', x);
        circle.setAttribute('cy', y);
        circle.setAttribute('rx', r);
        circle.setAttribute('ry', r);
        circle.setAttribute('class', 'draggable');
        circle.setAttribute('onmouseover', "F3D_Sphere.overElement(evt)");
        circle.setAttribute('onmouseout', "F3D_Sphere.outElement(evt)");
        circle.setAttribute('onwheel', "F3D_Sphere.wheelElement(evt)");
        F3D_Sphere.circle_in_scene++;
        return circle;
        
    },
    add: function(){
        var radius = 0;
	var width = (maxX-minX);
	var height = (maxY-minY);
	if(width<height){
		radius = width/2;
	}else{
		radius = height/2;
	}
	
	F3D_Scene.hand_draw_objects.circle.appendChild(F3D_Sphere.fast3d_addCircle('f3dsphere', minX+(maxX-minX)/2, minY+(maxY-minY)/2, radius));
	F3D_Sphere.circle_in_scene++;
	F3D_Polygon.getTangents();    
    },
    selectElement: function(evt) {
	F3D_Sphere.selectedElement = evt.target;
	F3D_Sphere.currentX = evt.clientX;
	F3D_Sphere.currentY = evt.clientY;
	F3D_Sphere.selectedElement.setAttribute("onmousemove", "F3D_Sphere.moveElement(evt)");
	F3D_Sphere.selectedElement.setAttribute("onmouseup", "F3D_Sphere.deselectElement(evt)");
	tool = 'select';
    },
    mobileSelectElement: function(evt) {
	F3D_Sphere.selectedElement = evt.target;
	F3D_Sphere.currentX = evt.targetTouches[0].pageX;
	F3D_Sphere.currentY  = event.targetTouches[0].pageY;
	F3D_Sphere.selectedElement.setAttribute("ontouchmove", "F3D_Sphere.mobileMoveElement(evt)");
	F3D_Sphere.selectedElement.setAttribute("ontouchend", "F3D_Sphere.deselectElement(evt)");
	tool = 'select';
    },
    moveElement: function(evt) {
	var dx = evt.clientX;// - Fast3d.currentX;
	var dy = evt.clientY;// - Fast3d.currentY;
	F3D_Sphere.selectedElement.setAttributeNS(null, "cx", dx);
	F3D_Sphere.selectedElement.setAttributeNS(null, "cy", dy);
    },
    mobileMoveElement: function(evt) {
	var dx = evt.targetTouches[0].pageX;// - Fast3d.currentX;
	var dy = evt.targetTouches[0].pageY;// - Fast3d.currentY;
	F3D_Sphere.selectedElement.setAttributeNS(null, "cx", dx);
	F3D_Sphere.selectedElement.setAttributeNS(null, "cy", dy);
    },
    overElement: function(evt) {
        evt.target.setAttributeNS(null, "fill", 'green');
    },
    outElement: function(evt) {
	evt.target.setAttributeNS(null, "fill", document.getElementById('color_picker').value);
    },
    wheelElement: function(evt) {
  	var tmpElem = evt.target;
	var radius = tmpElem.getAttribute('rx');
	if(evt.wheelDelta > 0){
		tmpElem.setAttribute('rx', ++radius);
		tmpElem.setAttribute('ry', ++radius);
	}else{
		tmpElem.setAttribute('rx', --radius);
		tmpElem.setAttribute('ry', --radius);
	}
	F3D_Polygon.drawTangent();
    },
    deselectElement: function(evt) {
  	if(F3D_Sphere.selectedElement != 0){
		F3D_Sphere.selectedElement.removeAttributeNS(null, "onmousemove");
		F3D_Sphere.selectedElement.removeAttributeNS(null, "onmouseup");
		F3D_Sphere.selectedElement.removeAttributeNS(null, "ontouchmove");
		F3D_Sphere.selectedElement.removeAttributeNS(null, "ontouchend");
		F3D_Sphere.selectedElement = 0;
	}
	F3D_Polygon.drawTangent();
    }
}

var F3D_Polygon = {
    line_group: '',
    selected_tool: '',
    addPolygon: function(name, x1, y1, x2, y2, x3, y3, x4, y4 ){
	polygon = document.createElementNS(NS,"polygon");
	polygon.setAttribute('name', name);
	polygon.setAttribute('points', x1+','+y1+' '+x2+','+y2+' '+x3+','+y3+' '+x4+','+y4);
	polygon.setAttribute('fill', document.getElementById('color_picker').value);
	return polygon;
    },
    getTangents: function(group){
    	var l = group.circles.childElementCount;
    	if(l > 1){
    		for(var i = 0;i<l;i++){
    			var el = group.circles.childNodes[i];
    			var	cen1x = cen1y = cen2x = cen2y = 0;
    			if(!group.polygons){
				  	group.polygons = document.createElementNS(NS,"g");
				  	group.polygons.setAttribute('id', 'line_group_'+i);
				  	group.polygons.setAttribute('fill', '#'+document.getElementById('color_picker').value);
				  	//Fast3d.f3dsphere_group.setAttribute('stroke', 'green');
				  	svgpaper.appendChild(group.polygons);
				}else if(group.polygons.childElementCount >= 1){
					while (group.polygons.firstChild) {
					    group.polygons.removeChild(group.polygons.firstChild);
					}
    		                }
				
				var nodes_array = group.circles.getElementsByTagName('ellipse');
				var nodes_array_length = nodes_array.length;
				for(var i = 0; i < nodes_array_length-1; i++){
					var x1 = parseInt(nodes_array[i].getAttribute('cx'));
					var y1 = parseInt(nodes_array[i].getAttribute('cy'));
					var r1 = parseInt(nodes_array[i].getAttribute('rx'));
					var x2 = parseInt(nodes_array[i+1].getAttribute('cx'));
					var y2 = parseInt(nodes_array[i+1].getAttribute('cy'));
					var r2 = parseInt(nodes_array[i+1].getAttribute('rx'));
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
					 */
					group.polygons.appendChild(F3D_Polygon.addPolygon('polygon',poc2x,poc2y,poc1x,poc1y,poc4x,poc4y,poc3x,poc3y));
					
    				}
    			
					//to put spheres on top
					var f3dspheres = group.circles.innerHTML;
					//var spheregroup = svgpaper.getElementById('f3dsphere_group');
					svgpaper.removeChild(group.circles);
			
			  		group.circles = document.createElementNS(NS,"g");
				  	group.circles.setAttribute('id', 'f3dsphere_group');
				  	group.circles.setAttribute('fill', '#'+document.getElementById('color_picker').value);
				if(F3D_Polygon.selected_tool === 'select'){
					  group.circles.setAttribute('onmousedown', "F3D_Sphere.selectElement(evt)");
					  group.circles.setAttribute('ontouchstart', "F3D_Sphere.mobileSelectElement(evt)");
				}
					  
			
				group.circles.innerHTML = f3dspheres;
				svgpaper.appendChild(group.circles);	
				
    			}
    		}else{
    		}
    	
    	},
    drawTangent: function(){
    	var length = F3D_Scene.hand_draw_objects.length;
    	for(var i = 0;i<length;i++){
    		F3D_Polygon.getTangents(F3D_Scene.hand_draw_objects[i]);
    	}
    	length = F3D_Polyline.number_of_tentacle;
    	for(var i = 0;i<length;i++){
    		F3D_Polygon.getTangents(F3D_Scene.tentacle_objects[i]);
    	}
    	
    }
}

var F3D_Polyline = {
	f3dtentacle_group: [],
	number_of_tentacle: 0,
	number_of_extrude: 0,
	clickedTargetId: '',
	selectedElement: '',
	currentX: 0,
	currentY: 0,
	oldX: 0,
	oldY: 0,
	group_to_move: '',
    init: function(){
        
    },
    drawPolyline: function(){
	var simplyline = simplify(F3D_sketch.draw_gest, 5);
	polyline = document.createElementNS(NS,"polyline");
      	polyline.setAttribute('name', 'line');
      	var point_string = '';
      	for (var i =0;i<simplyline.length;i++){
      		point_string += simplyline[i].x+','+simplyline[i].y+' ';
      	}
     	polyline.setAttribute('points', point_string);
     	polyline.setAttribute('fill', 'none');
	polyline.setAttribute('stroke', 'orange');
	polyline.setAttribute('stroke-width', '3');
	
	F3D_sketch.sketch_group.appendChild(polyline);
			  
	},
   drawExtrude: function(){
		F3D_Scene.extrude_objects[F3D_Polyline.number_of_extrude] = {'circles': '', 'polygons':''};
		F3D_Scene.extrude_objects[F3D_Polyline.number_of_extrude].circles = document.createElementNS(NS,"g");
      	F3D_Scene.extrude_objects[F3D_Polyline.number_of_extrude].circles.setAttribute('id', 'f3dextrude_group'+F3D_Polyline.number_of_extrude);
      	F3D_Scene.extrude_objects[F3D_Polyline.number_of_extrude].circles.setAttribute('fill', document.getElementById('color_picker').value);
      	svgpaper.appendChild(F3D_Scene.extrude_objects[F3D_Polyline.number_of_extrude].circles);
		var simplyline = simplify(F3D_sketch.draw_gest, 5);
		var radius = document.getElementById(F3D_Polyline.clickedTargetId).getAttribute('rx');
		//var step = radius/simplyline.length;
      	for (var i =0;i<simplyline.length;i++){
      		F3D_Scene.extrude_objects[F3D_Polyline.number_of_extrude].circles.appendChild(F3D_Sphere.fast3d_addCircle('extrude'+F3D_Polyline.number_of_extrude,simplyline[i].x,simplyline[i].y,radius,'pink'));
      		F3D_Sphere.circle_in_scene++;
      	}
      	F3D_Polygon.getTangents(F3D_Scene.extrude_objects[F3D_Polyline.number_of_extrude]);
      	F3D_Polyline.number_of_extrude++;
     		  
	},
    drawTentacle: function(){
		F3D_Scene.tentacle_objects[F3D_Polyline.number_of_tentacle] = {'circles': '', 'polygons':''};
		F3D_Scene.tentacle_objects[F3D_Polyline.number_of_tentacle].circles = document.createElementNS(NS,"g");
      	F3D_Scene.tentacle_objects[F3D_Polyline.number_of_tentacle].circles.setAttribute('id', 'f3dtentacle_group'+F3D_Polyline.number_of_tentacle);
      	F3D_Scene.tentacle_objects[F3D_Polyline.number_of_tentacle].circles.setAttribute('fill', document.getElementById('color_picker').value);
      	svgpaper.appendChild(F3D_Scene.tentacle_objects[F3D_Polyline.number_of_tentacle].circles);
		var simplyline = simplify(F3D_sketch.draw_gest, 5);
		var radius = 20;
		var step = radius/simplyline.length;
      	for (var i =0;i<simplyline.length;i++){
      		F3D_Scene.tentacle_objects[F3D_Polyline.number_of_tentacle].circles.appendChild(F3D_Sphere.fast3d_addCircle('tentacle'+F3D_Polyline.number_of_tentacle,simplyline[i].x,simplyline[i].y,step*(simplyline.length-i),'pink'));
      		F3D_Sphere.circle_in_scene++;
      	}
      	F3D_Polygon.getTangents(F3D_Scene.tentacle_objects[F3D_Polyline.number_of_tentacle]);
      	F3D_Polyline.number_of_tentacle++;
     		  
	},
    selectElement: function(evt) {
    	function getGroup(t){
	    	if(t.nodeName === 'g'){
			F3D_Polyline.group_to_move = t;
			F3D_Polyline.currentX = evt.clientX;
			F3D_Polyline.currentY = evt.clientY;
			F3D_Polyline.oldX = evt.clientX;
			F3D_Polyline.oldY = evt.clientY;
			F3D_Polyline.group_to_move.setAttribute("onmousemove", "F3D_Polyline.moveElement(evt)");
			F3D_Polyline.group_to_move.setAttribute("onmouseup", "F3D_Polyline.deselectElement(evt)");
			tool = 'select';
		}else{
		   getGroup(t.parentElement);
		}
    	}
    	getGroup(evt.target);
	
    },
    mobileSelectElement: function(evt) {
	F3D_Polyline.selectedElement = evt.target;
	F3D_Polyline.currentX = evt.targetTouches[0].pageX;
	F3D_Polyline.currentY  = event.targetTouches[0].pageY;
	F3D_Polyline.selectedElement.setAttribute("ontouchmove", "F3D_Polyline.mobileMoveElement(evt)");
	F3D_Polyline.selectedElement.setAttribute("ontouchend", "F3D_Polyline.deselectElement(evt)");
	tool = 'select';
    },
    moveElement: function(evt) {
	F3D_Polyline.currentX = evt.clientX;
	F3D_Polyline.currentY = evt.clientY;
	console.log((F3D_Polyline.currentX-F3D_Polyline.oldX)+' '+(F3D_Polyline.currentY-F3D_Polyline.oldY));
	if(F3D_Polyline.group_to_move !== ''){
		F3D_Polyline.group_to_move.setAttributeNS(null, "transform", "translate(F3D_Polyline.currentX-F3D_Polyline.oldX, F3D_Polyline.currentY-F3D_Polyline.oldY)");
			
	}
	F3D_Polyline.oldX = evt.clientX;
	F3D_Polyline.oldY = evt.clientY;
    },
    mobileMoveElement: function(evt) {
	var dx = evt.targetTouches[0].pageX;// - Fast3d.currentX;
	var dy = evt.targetTouches[0].pageY;// - Fast3d.currentY;
	F3D_Polyline.group_to_move.setAttributeNS(null, "cx", dx);
	F3D_Polyline.group_to_move.setAttributeNS(null, "cy", dy);
    },
    overElement: function(evt) {
        evt.target.setAttributeNS(null, "fill", 'green');
    },
    outElement: function(evt) {
	evt.target.setAttributeNS(null, "fill", document.getElementById('color_picker').value);
    },
    deselectElement: function(evt) {
  	if(F3D_Polyline.group_to_move != 0){
		F3D_Polyline.group_to_move.removeAttributeNS(null, "onmousemove");
		F3D_Polyline.group_to_move.removeAttributeNS(null, "onmouseup");
		F3D_Polyline.group_to_move.removeAttributeNS(null, "ontouchmove");
		F3D_Polyline.group_to_move.removeAttributeNS(null, "ontouchend");
		F3D_Polyline.group_to_move = '';
	}
	//F3D_Polygon.drawTangent();
    }
    
}
