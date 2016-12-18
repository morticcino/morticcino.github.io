function load(value){
      	//if(value.length > 1){
      		//svg.selectAll("*").remove();
		var to_load = value;
		var parser = new DOMParser();
		var doc = parser.parseFromString(to_load, "image/svg+xml");
		if(document.getElementById('svgpaper')){
			document.getElementById("svgpaper").remove();
			document.getElementById("right_column").appendChild(doc.documentElement);
			F3D_Scene.sketch_group = document.getElementById('sketch_group');
			F3D_Scene.hand_draw_objects.length = undo_redo[undo_redo_history].hd;
			F3D_Scene.extrude_objects.length = undo_redo[undo_redo_history].ex; 
			F3D_Scene.tentacle_objects.length = undo_redo[undo_redo_history].tn;
			update_data_structure();
			svgpaper = document.getElementById("svgpaper");
			tools(F3D_Polygon.selected_tool);	
		}
		
	//}
      }

function p_and_z(){
        	//document.getElementById('svgpaper').setAttribute('viewBox',px+" "+py+" "+sw+" "+sh);
	        document.getElementById('svgpaper').viewBox.baseVal.x = px;
		document.getElementById('svgpaper').viewBox.baseVal.y = py;
		document.getElementById('svgpaper').viewBox.baseVal.width = sw;
 		document.getElementById('svgpaper').viewBox.baseVal.height = sh;
        }

function save(obj){
		//return JSON.parse(JSON.stringify(obj));
		return JSON.stringify(obj);
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
      
