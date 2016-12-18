NS="http://www.w3.org/2000/svg";
      var tool = 'draw';
      var undo_redo = [];
      var undo_redo_history = -1;
      function save_undo(){
		undo_redo_history += 1;
		undo_redo[undo_redo_history] = {html: document.getElementById('svgpaper').outerHTML, hd: F3D_Scene.hand_draw_objects.length, ex: F3D_Scene.extrude_objects.length,tn: F3D_Scene.tentacle_objects.length};
		undo_redo.length = (undo_redo_history+1);
      }
      //undo_redo[undo_redo_history] = document.getElementById('svgpaper').outerHTML;
      save_undo();
      var brush_size = 20;
      var simplify_value = 5;
      var px = 0;
      var py = 0;
      var sh = 0;
      var sw = 0;
      
      
      //var mousebuttondown = false;
      /*
      var gest = [];
      var draw_gest = [];
      var minX, maxX, minY, maxY = 0;
      */
      var r = new DollarRecognizer();
      
      
      
      function json_parse(str){
      	return JSON.parse(str);
      }
      
      function update_data_structure(){
      	var find_results = find_index('f3dtext_group_');
      	if(find_results !== ''){
      		for(var i = 0; i < find_results.length;i++){
	      		F3D_Scene.text_group[i].group = document.getElementById('f3dtext_group_'+i);
	      	}	
      	}
      	
      	var find_results = find_index('f3dhanddraw_group_');
      	if(find_results !== ''){
	      	for(var i = 0; i < find_results.length;i++){
	      		F3D_Scene.hand_draw_objects[i]= {'group': '', 'circles': '', 'polygons':'', color: ''};
	      		F3D_Scene.hand_draw_objects[i].group = document.getElementById('f3dhanddraw_group_'+i);
	      		F3D_Scene.hand_draw_objects[i].circles = document.getElementById('f3dhanddraw_circles_group_'+i);
	      		F3D_Scene.hand_draw_objects[i].polygons = document.getElementById('f3dhanddraw_polygons_group_'+i);
	      	}
      	}
      	var find_results = find_index('f3dextrude_group_');
      	if(find_results !== ''){
	      	for(var i = 0; i < find_results.length;i++){
	      		F3D_Scene.extrude_objects[i] = {'group': '','circles': '', 'polygons':'', color: ''};
	      		F3D_Scene.extrude_objects[i].group = document.getElementById('f3dextrude_group_'+i);
	      		F3D_Scene.extrude_objects[i].circles = document.getElementById('f3dextrude_circles_group_'+i);
	      		F3D_Scene.extrude_objects[i].polygons = document.getElementById('f3dextrude_polygons_group_'+i);
	      	}
      	}
      	var find_results = find_index('f3dtentacle_group_');
      	if(find_results !== ''){
	      	for(var i = 0; i < find_results.length;i++){
	      		F3D_Scene.tentacle_objects[i] = {'group': '', 'circles': '', 'polygons':'', color: ''};
	      		F3D_Scene.tentacle_objects[i].group = document.getElementById('f3dtentacle_group_'+i);
	      		F3D_Scene.tentacle_objects[i].circles = document.getElementById('f3dtentacle_circles_group_'+i);
	      		F3D_Scene.tentacle_objects[i].polygons = document.getElementById('f3dtentacle_polygons_group_'+i);
	      	}
      	}
      }
        
      
        
      
      
      
      function setDrawInteraction(){
      		var f3d_hd_l = F3D_Scene.hand_draw_objects.length;
      		for(var i = 0;i<f3d_hd_l;i++){
      			if(F3D_Scene.hand_draw_objects[i].circles !== ''){
      				F3D_Scene.hand_draw_objects[i].circles.removeAttributeNS(null, 'onmousedown');
				F3D_Scene.hand_draw_objects[i].circles.removeAttributeNS(null, 'ontouchstart');
			}
			if(F3D_Scene.hand_draw_objects[i].polygons){
				F3D_Scene.hand_draw_objects[i].polygons.removeAttributeNS(null, 'onmousedown');
				F3D_Scene.hand_draw_objects[i].polygons.removeAttributeNS(null, 'ontouchstart');	
			}
			
		}
		svgpaper.addEventListener( 'mousedown', onDocumentMouseDown, false );
	    	svgpaper.addEventListener( 'touchstart', onDocumentMobileMouseDown, false );
	    	//for(var i = 0;i<F3D_Scene.tentacle_objects.length;i++){
		//	F3D_Scene.tentacle_objects[i].circles.removeAttributeNS(null, 'onmousedown');
		//}
		var f3d_to_l = F3D_Scene.tentacle_objects.length;
		for(var i = 0;i<f3d_to_l;i++){
			if(F3D_Scene.tentacle_objects[i].circles !== ''){
				F3D_Scene.tentacle_objects[i].circles.removeAttributeNS(null, 'onmousedown');
				F3D_Scene.tentacle_objects[i].circles.removeAttributeNS(null, 'ontouchstart');
			}
			if(F3D_Scene.tentacle_objects[i].polygons){
				F3D_Scene.tentacle_objects[i].polygons.removeAttributeNS(null, 'ontouchstart');
				F3D_Scene.tentacle_objects[i].polygons.removeAttributeNS(null, 'ontouchstart');
			}
			
		}
		var f3d_eo_l = F3D_Scene.extrude_objects.length;
		for(var i = 0;i<f3d_to_l;i++){
			if(F3D_Scene.extrude_objects[i].circles !== ''){
				F3D_Scene.extrude_objects[i].circles.removeAttributeNS(null, 'onmousedown');
				F3D_Scene.extrude_objects[i].circles.removeAttributeNS(null, 'ontouchstart');
			}
			if(F3D_Scene.extrude_objects[i].polygons){
				F3D_Scene.extrude_objects[i].polygons.removeAttributeNS(null, 'onmousedown');
				F3D_Scene.extrude_objects[i].polygons.removeAttributeNS(null, 'ontouchstart');	
			}
			
		}
	    	
	        	
      }
      
      
      
      
      
      
      function p_and_z(){
        	//document.getElementById('svgpaper').setAttribute('viewBox',px+" "+py+" "+sw+" "+sh);
	        document.getElementById('svgpaper').viewBox.baseVal.x = px;
		document.getElementById('svgpaper').viewBox.baseVal.y = py;
		document.getElementById('svgpaper').viewBox.baseVal.width = sw;
 		document.getElementById('svgpaper').viewBox.baseVal.height = sh;
        }
      
      function init(){
        //F3D_Sphere.init();
        //F3D_sketch.init();
        //F3D_Polyline.init();
        px = 0;
        py = 0;
        sw = Math.round(document.getElementById('svgpaper').width.baseVal.value);
        sh = Math.round(document.getElementById('svgpaper').height.baseVal.value);
        function set_svgpaper_dimentions(){
        	//document.getElementById('svgpaper').setAttribute('viewBox',px+" "+py+" "+sw+" "+sh);
        	document.getElementById('svgpaper').viewBox.baseVal.x = px;
		document.getElementById('svgpaper').viewBox.baseVal.y = py;
		document.getElementById('svgpaper').viewBox.baseVal.width = sw;
		document.getElementById('svgpaper').viewBox.baseVal.height = sh;
        }
		tools('draw');
		document.getElementById('svgpaper').setAttribute("load", set_svgpaper_dimentions());
		//document.getElementById('svgpaper').setAttribute("resize", set_svgpaper_dimentions());
      }
      
      window.onload = init;
      svgpaper = document.getElementById('svgpaper');
      svgpaper.addEventListener( 'mousedown', onDocumentMouseDown, false );
      svgpaper.addEventListener( 'touchstart', onDocumentMobileMouseDown, false );
      
      function onDocumentMobileMouseDown( event ){
      		if(event.targetTouches[0].nodeName === 'ellipse'){
      			F3D_Polyline.clickedTargetId = event.targetTouches[0].id;
      		}else{
      			F3D_Polyline.clickedTargetId = '';
      		}
		var x = event.targetTouches[0].pageX;
		var y = event.targetTouches[0].pageY;
		uupos = matrixTransform(event,x,y);
		mousedown(event,uupos.x,uupos.y);
		//mousedown(event,x,y);
	}
	
	function matrixTransform(event,x,y){
		var uupos = document.getElementById('svgpaper').createSVGPoint();
	        uupos.x = x;
	        uupos.y = y;
	        var ctm = event.target.getScreenCTM();
	        if (ctm = ctm.inverse())
	            uupos = uupos.matrixTransform(ctm);
		return uupos;
	}
	
	function onDocumentMouseDown( event ) {
		if(event.target.nodeName === 'ellipse'){
      			F3D_Polyline.clickedTargetId = event.target.id;
      		}else{
      			F3D_Polyline.clickedTargetId = '';
      		}
		uupos = matrixTransform(event,event.pageX,event.pageY);
		mousedown(event,uupos.x,uupos.y);
		  
	}
	
	function mousedown(evt, x, y ) {
		//switch(tool){
		//	case 'draw':
		evt.preventDefault();
		
		
		svgpaper.addEventListener( 'mousemove', onDocumentMouseMove, false );
	        svgpaper.addEventListener( 'touchmove', onDocumentMobileMouseMove, false );
	        svgpaper.addEventListener( 'mouseup', onDocumentMouseUp, false );
	        svgpaper.addEventListener( 'touchend', onDocumentMobileMouseUp, false );
		mousebuttondown = true;
		
		F3D_sketch.init(x,y);
		/*
		maxX = minX = x;
		maxY = minY = y;
		fast3d_add(fast3d_addCircle('sketch', x, y, 5));
		gest[0] = new Point(x,y);
		draw_gest[0] = {'x':x, 'y':y};
	
		maxX = x;
		minX = x;
		maxY = y;
		minY = y;
		*/
		//	break;
			//case 'select':
				
			//	break;
		
	}
	
	
	function onDocumentMobileMouseMove( event ){
		event.preventDefault();
		var x = event.targetTouches[0].pageX;
		var y = event.targetTouches[0].pageY;
		uupos = matrixTransform(event,x,y);
		mousemove(uupos.x,uupos.y);
	}
	
	function onDocumentMouseMove( event ) {
		event.preventDefault();
		uupos = matrixTransform(event,event.pageX,event.pageY);
		mousemove(uupos.x,uupos.y);
		
	}
	
	function mousemove( x, y ) {
	
			
			F3D_sketch.addPoint(x,y);
		
	}
	
	function onDocumentMobileMouseUp( event ){
		event.preventDefault();
		mouseup();
	}
	
	function onDocumentMouseUp( event ){
		event.preventDefault();
		mouseup();
	}
	
	function save(obj){
		//return JSON.parse(JSON.stringify(obj));
		return JSON.stringify(obj);
	}
	
	
	function mouseup(  ){
		svgpaper.removeEventListener( 'mousemove', onDocumentMouseMove, false );
	    svgpaper.removeEventListener( 'touchmove', onDocumentMobileMouseMove, false );
	    svgpaper.removeEventListener( 'mouseup', onDocumentMouseUp, false );
	    svgpaper.removeEventListener( 'touchend', onDocumentMobileMouseUp, false );
	    //mousebuttondown = false;
		while (F3D_Scene.sketch_group.firstChild) {
		    F3D_Scene.sketch_group.removeChild(F3D_Scene.sketch_group.firstChild);
		}
		//if(tool === 'draw'){
			if(F3D_Sphere.selectedElement != 0){
		    	F3D_Sphere.selectedElement = 0;
		    }
			var matched = r.Recognize(F3D_sketch.gest);
			console.log(matched);
	
			switch(matched.Name){
				case "rectangle":
	
					break;
				case "circle":
					var color = document.getElementById('color_picker').value;
					var radius = 0;
					var width = (F3D_sketch.maxX-F3D_sketch.minX);
					var height = (F3D_sketch.maxY-F3D_sketch.minY);
					if(width<height){
						radius = width/2;
					}else{
						radius = height/2;
					}
					var f3d_hdo = F3D_Scene.hand_draw_object;
					if(!F3D_Scene.hand_draw_objects[f3d_hdo]){
					  F3D_Scene.hand_draw_objects[f3d_hdo]= {'group': '', 'circles': '', 'polygons':'', color: ''};
					  F3D_Scene.hand_draw_objects[f3d_hdo].color = color;
					  F3D_Scene.hand_draw_objects[f3d_hdo].group = document.createElementNS(NS,"g");
				  	  F3D_Scene.hand_draw_objects[f3d_hdo].group.setAttribute('id', 'f3dhanddraw_group_'+f3d_hdo);
				  	  F3D_Scene.hand_draw_objects[f3d_hdo].group.setAttribute('style', 'fill:'+color);
				  	  F3D_Scene.hand_draw_objects[f3d_hdo].group.setAttribute('transform',"matrix(1 0 0 1 0 0)");
				  	  F3D_Scene.hand_draw_objects[f3d_hdo].circles = document.createElementNS(NS,"g");
				  	  F3D_Scene.hand_draw_objects[f3d_hdo].circles.setAttribute('id', 'f3dhanddraw_circles_group_'+f3d_hdo);
				  	  //F3D_Scene.hand_draw_objects[f3d_hdo].circles.setAttribute('style', 'fill:'+color);
				  	  //Fast3d.f3dsphere_group.setAttribute('stroke', 'green');
				  	  F3D_Scene.hand_draw_objects[f3d_hdo].group.appendChild(F3D_Scene.hand_draw_objects[f3d_hdo].circles);
	                                  svgpaper.appendChild(F3D_Scene.hand_draw_objects[f3d_hdo].group);
	                                  
				    }
				    F3D_Scene.hand_draw_objects[f3d_hdo].circles.appendChild(F3D_Sphere.fast3d_addCircle('f3dhanddraw_circles_', F3D_sketch.minX+(F3D_sketch.maxX-F3D_sketch.minX)/2, F3D_sketch.minY+(F3D_sketch.maxY-F3D_sketch.minY)/2, radius, 'blue'));
	        
					
					
					
					F3D_Polygon.getTangents(F3D_Scene.hand_draw_objects[f3d_hdo],'f3dhanddraw');
					break;
				case "triangle":
				case "x":
				case "arrow":
				case "delete":
				case "star":
				case "pigtail":
				case "v":
				case "left square bracket":
				case "right square bracket":
				case "left curly brace":
				case "right curly brace":
				case "check":
				case "caret":
				case "zig-zag":
					if(F3D_Polyline.clickedTargetId.indexOf('ellipse') !== -1){
						if(F3D_Polygon.selected_tool === 'draw'){
							F3D_Polyline.drawExtrude();	
						}else if(F3D_Polygon.selected_tool === 'tentacle'){
							F3D_Polyline.drawTentacle();	
						}
						
					}else{
						if(F3D_Polygon.selected_tool === 'draw'){
							F3D_Polyline.drawExtrude(brush_size);	
						}else if(F3D_Polygon.selected_tool === 'tentacle'){
							F3D_Polyline.drawTentacle(brush_size);	
						}
					}
					
					  
				break;
	
	
				default:
					console.log('default');
					
					
	
					
	
			}
			F3D_sketch.clean_data();
			save_undo();
		}  
      
