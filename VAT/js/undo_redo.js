function undo(){
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
