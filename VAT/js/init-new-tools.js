document.addEventListener('keydown',function onDocumentKeyDown( event ) {
	switch( event.key ) {
		case 's': 
			F2DSelect.registerEvents();
			break;
		case 'd': 
			F2DDraw.registerEvents();
			break;
		default:
			console.log(event.key);
	}
},false);
//call new-init.js function
init();


