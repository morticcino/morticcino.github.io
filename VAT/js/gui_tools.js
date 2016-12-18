function tools(toolstr){
        tool = toolstr;
        switch(tool){
	 	case 'pan_up':
	 		py += 5;
	 		p_and_z();
        		break;
        	case 'pan_down':
        		py -= 5;
        		p_and_z();
        		break;
        	case 'pan_right':
        		px -= 5;
        		p_and_z();
        		break;
        	case 'pan_left':
        		px += 5;
        		p_and_z();
        		break;
        	case 'zoom_out':
        		sh *= 1.1;
        		sw *= 1.1;
        		p_and_z();
        		break;
        	case 'zoom_in':
        		sh *= 0.9;
        		sw *= 0.9;
        		p_and_z();
        		break;
      		case 'curve':
      			document.getElementById('curve_group').setAttribute('style','display:""');
      			F3D_Polygon.selected_tool = 'curve';
      			break;
      			
      		case 'remove':
      			if(F3D_Scene.elementToColor !== ''){
      				document.getElementById('svgpaper').removeChild(F3D_Scene.elementToColor);
      			}
      			F3D_Polygon.selected_tool = 'remove';
      			break;
      		
      		case 'tentacle':
      			F3D_Polygon.selected_tool = 'tentacle';
      			setDrawInteraction();
      			break;
	    	case 'load':
			F3D_Polygon.selected_tool = 'load';
			var undo_redo = [];
			var undo_redo_history = -1;
			var svgcontent
			if(document.getElementById('svgfile').value){
				svgcontent = document.getElementById('svgfile').value;
			}else{
				svgcontent = "";
			}
			load(svgcontent);
			/*
        		if(document.getElementById('svgfile').value.length > 1){
        			var to_load = document.getElementById('svgfile').value;
        			var tmp = to_load.replace('<svg id="svgpaper" xmlns="http:\/\/www.w3.org\/2000\/svg">','');
        			var tmp2 = tmp.replace('<\/svg>','');
        			
        			document.getElementById('svgpaper').innerHTML = tmp2;
        		}
        		
        		F3D_Scene.sketch_group = document.getElementById('sketch_group');
	        	*/
	        	break;
			
        	case 'save':
				F3D_Polygon.selected_tool = 'save';
	        	document.getElementById('svgfile').value = document.getElementById('svgpaper').outerHTML;
	        	break;
	        case 'select':
				F3D_Polygon.selected_tool = 'select';
				var hdl = F3D_Scene.hand_draw_objects.length;
	        	for(var i = 0;i<hdl;i++){
	        		if(F3D_Scene.hand_draw_objects[i].circles){
		        		F3D_Scene.hand_draw_objects[i].circles.setAttribute('onmousedown', "F3D_Sphere.selectElement(evt)");
		        		F3D_Scene.hand_draw_objects[i].circles.setAttribute('ontouchstart', "F3D_Sphere.mobileSelectElement(evt)");
	        		}
	        		if(F3D_Scene.hand_draw_objects[i].polygons){
		        		F3D_Scene.hand_draw_objects[i].polygons.setAttribute('onmousedown', "F3D_Polyline.selectElement(evt)");
		        		F3D_Scene.hand_draw_objects[i].polygons.setAttribute('ontouchstart', "F3D_Polyline.mobileSelectElement(evt)");
	        		}
	        	}
	        	var tol = F3D_Scene.tentacle_objects.length;
        		for(var i = 0;i<tol;i++){
        			if(F3D_Scene.tentacle_objects[i].circles){
	        			F3D_Scene.tentacle_objects[i].circles.setAttribute('onmousedown', "F3D_Sphere.selectElement(evt)");
	        			F3D_Scene.tentacle_objects[i].circles.setAttribute('ontouchstart', "F3D_Sphere.mobileSelectElement(evt)");
        			}
        			if(F3D_Scene.tentacle_objects[i].polygons){
        				F3D_Scene.tentacle_objects[i].polygons.setAttribute('onmousedown', "F3D_Polyline.selectElement(evt)");
	        			F3D_Scene.tentacle_objects[i].polygons.setAttribute('ontouchstart', "F3D_Polyline.mobileSelectElement(evt)");	
        			}
        			
        		}
        		var eol = F3D_Scene.extrude_objects.length;
        		for(var i = 0;i<eol;i++){
        			if(F3D_Scene.extrude_objects[i].circles){
	        			F3D_Scene.extrude_objects[i].circles.setAttribute('onmousedown', "F3D_Sphere.selectElement(evt)");
	        			F3D_Scene.extrude_objects[i].circles.setAttribute('ontouchstart', "F3D_Sphere.mobileSelectElement(evt)");
        			}
        			if(F3D_Scene.extrude_objects[i].polygons){
	        			F3D_Scene.extrude_objects[i].polygons.setAttribute('onmousedown', "F3D_Polyline.selectElement(evt)");
		        		F3D_Scene.extrude_objects[i].polygons.setAttribute('ontouchstart', "F3D_Polyline.mobileSelectElement(evt)");	
        			}
        			
        		}
        		var tgl = F3D_Scene.text_group.length;
        		for(var i = 0;i<tgl;i++){
        			if(F3D_Scene.text_group[i].group){
	        			var text_length = F3D_Scene.text_group[i].group.childElementCount;
		        		if (text_length > 0){
		        			for(var t = 0; t < text_length; t++){
		        				F3D_Scene.text_group[i].group.children[t].setAttribute('class', 'draggable');
				        		F3D_Scene.text_group[i].group.children[t].setAttribute('onmousedown', "F3D_Polyline.selectElement(evt)");
				        		F3D_Scene.text_group[i].group.children[t].setAttribute('ontouchstart', "F3D_Polyline.mobileSelectElement(evt)");
				        		F3D_Scene.text_group[i].group.children[t].setAttribute('onmouseover', "F3D_Sphere.overElement(evt)");
			        			F3D_Scene.text_group[i].group.children[t].setAttribute('onmouseout', "F3D_Sphere.outElement(evt)");
			        			F3D_Scene.text_group[i].group.children[t].setAttribute('onwheel', "F3D_Sphere.wheelScaleElement(evt)");
		  	  	
				        			
		        			}
		        		}	
	        		}	
        		}
        		
        		
        		svgpaper.removeEventListener( 'mousedown', onDocumentMouseDown, false );
    			svgpaper.removeEventListener( 'touchstart', onDocumentMobileMouseDown, false );
	
	        	
	        	break;
	        case 'draw':
				F3D_Polygon.selected_tool = 'draw';
	        	setDrawInteraction();
	        	break;
	        	
	        	
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
      
