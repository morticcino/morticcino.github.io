function onDocumentKeyDown( event ) {
/*
				switch( event.keyCode ) {

					case 16: isShiftDown = true; break;

				}
*/
	switch( event.key ) {
		case 's': 
			app['tool'] = 'select';
			break;
		case 'd': 
			app['tool'] = 'draw';
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
