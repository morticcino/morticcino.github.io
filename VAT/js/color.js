function change_group_color(color_value){
      	if(F3D_Scene.elementToColor !== ''){
	      	F3D_Scene.elementToColor.setAttribute('style', 'fill:'+color_value+';font-family:bebas;');
	      	F3D_Scene.colorDict[F3D_Scene.elementToColor.getAttribute('id')]=color_value;	
	      	save_undo();
      	}
      	save_undo();
      	
      }
