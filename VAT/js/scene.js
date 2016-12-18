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
