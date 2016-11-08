function onDocumentKeyDown( event ) {

				switch( event.keyCode ) {

					case 16: isShiftDown = true; break;

				}

			}

			function onDocumentKeyUp( event ) {

				switch ( event.keyCode ) {

					case 16: isShiftDown = false; break;

				}

			}
