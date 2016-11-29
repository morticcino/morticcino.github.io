F2DDraw.prototype.registerEvents();

document.addEventListener('keydown',function onDocumentKeyDown( event ) {
	switch( event.key ) {
		case 's': 
			F2DSelect.prototype.registerEvents();
			break;
		case 'd': 
			F2DDraw.prototype.registerEvents();
			break;
		default:
			console.log(event.key);
	}
},false);
