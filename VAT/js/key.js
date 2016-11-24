function onDocumentKeyDown( event ) {
/*
				switch( event.keyCode ) {

					case 16: isShiftDown = true; break;

				}
*/
	switch( event.key ) {
		case s: 
			draw = false;
			select = true;
			break;
		case d: 
			draw = true;
			select = false;
			break;
		default:
			console.log(event.key);
	}
}

			function onDocumentKeyUp( event ) {
/*
				switch ( event.keyCode ) {

					case 16: isShiftDown = false; break;

				}
*/
			}
