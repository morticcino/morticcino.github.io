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
      	if(F3D_Scene.text_group.length <= 0){
		F3D_Scene.text_group.push({'group': '', 'text': ''});
		F3D_Scene.text_group[0].group = document.createElementNS(NS,"g");
		F3D_Scene.text_group[0].group.setAttribute('id', 'f3dtext_group_'+tgl);//????
		F3D_Scene.text_group[0].group.setAttribute('style', 'fill:'+color+';font-family:bebas;');
  	  	F3D_Scene.text_group[0].group.setAttribute('transform',"matrix(1 0 0 1 100 100)");
		F3D_Scene.text_group[0].group.appendChild(addText2Scene());
                svgpaper.appendChild(F3D_Scene.text_group[0].group);
	                         
	}else{
		F3D_Scene.text_group[F3D_Scene.text_group.length].group.appendChild(addText2Scene());	
	}
	save_undo();
      	//alert(document.getElementById('textarea').value);
      }
      
