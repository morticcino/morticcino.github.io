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
