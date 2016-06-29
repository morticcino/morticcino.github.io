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
      
      
      //var mousebuttondown = false;
      /*
      var gest = [];
      var draw_gest = [];
      var minX, maxX, minY, maxY = 0;
      */
      var r = new DollarRecognizer();
      
      function move_next(){
      	if(F3D_Scene.elementToColor !== ''){
      		var next = F3D_Scene.elementToColor.nextSibling;
      		var parent = F3D_Scene.elementToColor.parentElement;
      		parent.insertBefore(next,F3D_Scene.elementToColor);
      	}else{
      		alert('no item to move selected!');
      	}
      }
      
      function move_prev(){
      	if(F3D_Scene.elementToColor !== ''){
      		var prev = F3D_Scene.elementToColor.previousSibling;
      		var parent = F3D_Scene.elementToColor.parentElement;
      		parent.insertBefore(F3D_Scene.elementToColor,prev);
      	}else{
      		alert('no item to move selected!');
      	}
      }
      
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
        
      function find_index(str){
      		var res = [];
      		var re = new RegExp(str+"(\\d+)","g")
      		var match_results = document.getElementById('svgpaper').outerHTML.match(re)
      		if(match_results){
      			match_results.forEach(function(str){
	      			res.push(str.match(/(\d+)/g)[1]);
	      		});	
      		}else{
      			return '';
      		}
      		
      		return res;
      		
      	}
        
      function undo(){
      	//var primitive = ['f3dtext_group_','f3dhanddraw_group_','f3dhanddraw_circles_group_','line_group_','f3dextrude_group_', 'f3dextrude_circles_group','f3dtentacle_group_','f3dtentacle_circles_group_'];
      	
      	
      	
      	if(undo_redo_history > 0){
      		undo_redo_history -= 1;
      	}
      	
      	load(undo_redo[undo_redo_history].html);
      	
      	update_data_structure();
      	
      }
      
      function redo(){
      	if(undo_redo_history < (undo_redo.length-1)){
      		undo_redo_history += 1;
      	}
      	load(undo_redo[undo_redo_history].html);
      	
      	update_data_structure();
      }
      
      function add_fhd(){
      	if(F3D_Scene.hand_draw_objects[F3D_Scene.hand_draw_object].circles.lenght !== 0)
      		F3D_Scene.hand_draw_object++;
      }
      
      function add_text2scene(){
      	var color = document.getElementById('color_picker').value;
      	var tgl = F3D_Scene.text_group.length;
      	function addText2Scene(){
      		var text  = document.createElementNS(NS,"text");
  	  	text.setAttribute('transform',"matrix(1 0 0 1 0 0)");
		text.setAttribute('id', 'f3dtext_'+tgl);
  	  	var text2Add = document.createTextNode(document.getElementById('textarea').value);
  	  	text.appendChild(text2Add);
  	  	return text
      	}
      	if(F3D_Scene.text_group === ''){
		F3D_Scene.text_group[0]= {'group': '', text: ''};
		F3D_Scene.text_group[0].group = document.createElementNS(NS,"g");
		F3D_Scene.text_group[0].group.setAttribute('id', 'f3dtext_group_'+tgl);//????
		F3D_Scene.text_group[0].group.setAttribute('style', 'fill:'+color+';font-family:bebas;');
  	  	F3D_Scene.text_group[0].group.setAttribute('transform',"matrix(1 0 0 1 100 100)");
		F3D_Scene.text_group[0].group.appendChild(addText2Scene());
                svgpaper.appendChild(F3D_Scene.text_group[0].group);
	                         
	}else{
		F3D_Scene.text_group[F3D_Scene.text_group.length].group.appendChild(addText2Scene());	
	}
      	//alert(document.getElementById('textarea').value);
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
		svgpaper.setAttribute('onmousedown', "onDocumentMouseDown");
	    	svgpaper.setAttribute( 'touchstart', "onDocumentMobileMouseDown" );
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
      
      function change_group_color(color_value){
      	if(F3D_Scene.elementToColor !== ''){
	      	F3D_Scene.elementToColor.setAttribute('style', 'fill:'+color_value+';font-family:bebas;');
	      	F3D_Scene.colorDict[F3D_Scene.elementToColor.getAttribute('id')]=color_value;	
	      	save_undo();
      	}
      	
      }
      
      function load(value){
      	//if(value.length > 1){
      		//svg.selectAll("*").remove();
		var to_load = value;
		var parser = new DOMParser();
		var doc = parser.parseFromString(to_load, "image/svg+xml");
		document.getElementById("svgpaper").remove();
		document.getElementById("right_column").appendChild(doc.documentElement);
		F3D_Scene.sketch_group = document.getElementById('sketch_group');
		F3D_Scene.hand_draw_objects.length = undo_redo[undo_redo_history].hd;
		F3D_Scene.extrude_objects.length = undo_redo[undo_redo_history].ex; 
		F3D_Scene.tentacle_objects.length = undo_redo[undo_redo_history].tn;
		update_data_structure();
		svgpaper = document.getElementById("svgpaper");
		tools(F3D_Polygon.selected_tool);
	//}
      }
      
      function tools(toolstr){
        tool = toolstr;
        switch(tool){
        	
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
			load(document.getElementById('svgfile').value);
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
        		if(F3D_Scene.text_group.group){
        			var text_length = F3D_Scene.text_group.group.childElementCount;
	        		if (text_length > 0){
	        			for(var t = 0; t < text_length; t++){
	        				F3D_Scene.text_group.group.children[t].setAttribute('class', 'draggable');
			        		F3D_Scene.text_group.group.children[t].setAttribute('onmousedown', "F3D_Polyline.selectElement(evt)");
			        		F3D_Scene.text_group.group.children[t].setAttribute('ontouchstart', "F3D_Polyline.mobileSelectElement(evt)");
			        		F3D_Scene.text_group.group.children[t].setAttribute('onmouseover', "F3D_Sphere.overElement(evt)");
		        			F3D_Scene.text_group.group.children[t].setAttribute('onmouseout', "F3D_Sphere.outElement(evt)");
		        			F3D_Scene.text_group.group.children[t].setAttribute('onwheel', "F3D_Sphere.wheelScaleElement(evt)");
	  	  	
			        			
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
      
      function init(){
        //F3D_Sphere.init();
        //F3D_sketch.init();
        //F3D_Polyline.init();
		tools('draw');
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
		
		mousedown(event,x,y);
	}
	
	function onDocumentMouseDown( event ) {
		if(event.target.nodeName === 'ellipse'){
      			F3D_Polyline.clickedTargetId = event.target.id;
      		}else{
      			F3D_Polyline.clickedTargetId = '';
      		}
		var x = event.clientX;
		var y =  event.clientY;
		//if(tool === 'draw'){
		mousedown(event,x,y);
		/*
		
	}else{
			Fast3d.selectElement(event);
		}
		*/
		  
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
		mousemove(x,y);
	}
	
	function onDocumentMouseMove( event ) {
		event.preventDefault();
		var x = event.clientX;
		var y =  event.clientY;
		//if(tool === 'draw'){
			mousemove(x,y);
		
		/*
	}else{
			Fast3d.selectElement(event);
		}
		*/
		
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


/*
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
      
      
      //var mousebuttondown = false;
      var r = new DollarRecognizer();
      
      function move_next(){
      	if(F3D_Scene.elementToColor !== ''){
      		var next = F3D_Scene.elementToColor.nextSibling;
      		var parent = F3D_Scene.elementToColor.parentElement;
      		parent.insertBefore(next,F3D_Scene.elementToColor);
      	}else{
      		alert('no item to move selected!');
      	}
      }
      
      function move_prev(){
      	if(F3D_Scene.elementToColor !== ''){
      		var prev = F3D_Scene.elementToColor.previousSibling;
      		var parent = F3D_Scene.elementToColor.parentElement;
      		parent.insertBefore(F3D_Scene.elementToColor,prev);
      	}else{
      		alert('no item to move selected!');
      	}
      }
      
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
        
      function find_index(str){
      		var res = [];
      		var re = new RegExp(str+"(\\d+)","g")
      		var match_results = document.getElementById('paper').outerHTML.match(re)
      		if(match_results){
      			match_results.forEach(function(str){
	      			res.push(str.match(/(\d+)/g)[1]);
	      		});	
      		}else{
      			return '';
      		}
      		
      		return res;
      		
      	}
        
      function undo(){
      	//var primitive = ['f3dtext_group_','f3dhanddraw_group_','f3dhanddraw_circles_group_','line_group_','f3dextrude_group_', 'f3dextrude_circles_group','f3dtentacle_group_','f3dtentacle_circles_group_'];
      	
      	
      	
      	if(undo_redo_history > 0){
      		undo_redo_history -= 1;
      	}
      	
      	load(undo_redo[undo_redo_history].html);
      	
      	update_data_structure();
      	
      }
      
      function redo(){
      	if(undo_redo_history < (undo_redo.length-1)){
      		undo_redo_history += 1;
      	}
      	load(undo_redo[undo_redo_history].html);
      	
      	update_data_structure();
      }
      
      function add_fhd(){
      	if(F3D_Scene.hand_draw_objects[F3D_Scene.hand_draw_object].circles.lenght !== 0)
      		F3D_Scene.hand_draw_object++;
      }
      
      function add_text2scene(){
      	var color = document.getElementById('color_picker').value;
      	var tgl = F3D_Scene.text_group.length;
      	function addText2Scene(){
      		var text  = document.createElementNS(NS,"text");
  	  	text.setAttribute('transform',"matrix(1 0 0 1 0 0)");
		text.setAttribute('id', 'f3dtext_'+tgl);
  	  	var text2Add = document.createTextNode(document.getElementById('textarea').value);
  	  	text.appendChild(text2Add);
  	  	return text
      	}
      	if(F3D_Scene.text_group.length === 0){
		F3D_Scene.text_group[0]= {'group': '', text: ''};
		F3D_Scene.text_group[0].group = document.createElementNS(NS,"g");
		F3D_Scene.text_group[0].group.setAttribute('id', 'f3dtext_group_'+tgl);//????
		F3D_Scene.text_group[0].group.setAttribute('style', 'fill:'+color+';font-family:bebas;');
  	  	F3D_Scene.text_group[0].group.setAttribute('transform',"matrix(1 0 0 1 100 100)");
		F3D_Scene.text_group[0].group.appendChild(addText2Scene());
                svgpaper.appendChild(F3D_Scene.text_group[0].group);
	                         
	}else{
		F3D_Scene.text_group[F3D_Scene.text_group.length].group.appendChild(addText2Scene());	
	}
      	//alert(document.getElementById('textarea').value);
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
      
      function change_group_color(color_value){
      	if(F3D_Scene.elementToColor !== ''){
	      	F3D_Scene.elementToColor.setAttribute('style', 'fill:'+color_value+';font-family:bebas;');
	      	F3D_Scene.colorDict[F3D_Scene.elementToColor.getAttribute('id')]=color_value;	
	      	save_undo();
      	}
      	
      }
      
      function load(value){
      	//if(value.length > 1){
      		//svg.selectAll("*").remove();
		var to_load = value;
		var parser = new DOMParser();
		var doc = parser.parseFromString(to_load, "image/svg+xml");
		document.getElementById("svgpaper").remove();
		document.getElementById("right_column").appendChild(doc.documentElement);
		F3D_Scene.sketch_group = document.getElementById('sketch_group');
		F3D_Scene.hand_draw_objects.length = undo_redo[undo_redo_history].hd;
		F3D_Scene.extrude_objects.length = undo_redo[undo_redo_history].ex; 
		F3D_Scene.tentacle_objects.length = undo_redo[undo_redo_history].tn;
		update_data_structure();
		svgpaper = document.getElementById("svgpaper");
		tools(F3D_Polygon.selected_tool);
	//}
      }
      
      function tools(toolstr){
        tool = toolstr;
        switch(tool){
        	
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
			load(document.getElementById('svgfile').value);
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
        		var f3d_tg_l = F3D_Scene.text_group.length;
        		if(f3d_tg_l > 0){
        			for (var i = 0; i < f3d_tg_l;i++){
        						F3D_Scene.text_group[i].group.setAttribute('class', 'draggable');
				        		F3D_Scene.text_group[i].group.setAttribute('onmousedown', "F3D_Polyline.selectElement(evt)");
				        		F3D_Scene.text_group[i].group.setAttribute('ontouchstart', "F3D_Polyline.mobileSelectElement(evt)");
				        		F3D_Scene.text_group[i].group.setAttribute('onmouseover', "F3D_Sphere.overElement(evt)");
			        			F3D_Scene.text_group[i].group.setAttribute('onmouseout', "F3D_Sphere.outElement(evt)");
			        			F3D_Scene.text_group[i].group.setAttribute('onwheel', "F3D_Sphere.wheelScaleElement(evt)");	
        			}
        			
	  	  	
			        			
	        			
	        		
        		}
        		
        		svgpaper.removeEventListener( 'mousedown', onDocumentMouseDown, false );
    			svgpaper.removeEventListener( 'touchstart', onDocumentMobileMouseDown, false );
	
	        	
	        	break;
	        case 'draw':
				F3D_Polygon.selected_tool = 'draw';
	        	setDrawInteraction();
	        	break;
	        case 'pan_and_zoom':
	        	svgpaper.removeEventListener( 'mousemove', onDocumentMouseMove, false );
	    		svgpaper.removeEventListener( 'mouseup', onDocumentMouseUp, false );
	        	svgpaper.removeEventListener( 'mousedown', onDocumentMouseDown, false );
	        	
	        	
        }
      }
      
      function init(){
        //F3D_Sphere.init();
        //F3D_sketch.init();
        //F3D_Polyline.init();
	tools('draw');
	
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
		
		mousedown(event,x,y);
	}
	
	function onDocumentMouseDown( event ) {
		if(event.target.nodeName === 'ellipse'){
      			F3D_Polyline.clickedTargetId = event.target.id;
      		}else{
      			F3D_Polyline.clickedTargetId = '';
      		}
		var x = event.clientX;
		var y =  event.clientY;
		//if(tool === 'draw'){
		mousedown(event,x,y);

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
		//	break;
			//case 'select':
				
			//	break;
		
	}
	
	
	function onDocumentMobileMouseMove( event ){
		event.preventDefault();
		var x = event.targetTouches[0].pageX;
		var y = event.targetTouches[0].pageY;
		mousemove(x,y);
	}
	
	function onDocumentMouseMove( event ) {
		event.preventDefault();
		var x = event.clientX;
		var y =  event.clientY;
		//if(tool === 'draw'){
			mousemove(x,y);
		

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
      
*/
