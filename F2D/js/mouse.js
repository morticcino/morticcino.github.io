function onWindowResize() {}

function onDocumentMobileMouseMove(event) {
    var x = event.targetTouches[0].pageX;
    var y = event.targetTouches[0].pageY;
    mousemove(x, y);
}

function onDocumentMouseMove(event) {
    var x = event.clientX;
    var y = event.clientY;
    mousemove(x, y);
}

function mousemove(x, y) {}

function onDocumentMobileMouseDown(event) {
    var x = event.targetTouches[0].pageX;
    var y = event.targetTouches[0].pageY;
    mousedown(x, y);
}

function onDocumentMouseDown(event) {
    var x = event.clientX;
    var y = event.clientY;
    mousedown(x, y);
}

function mousedown(x, y) {}

function onDocumentMobileMouseUp(event) {
    mouseup();
}

function onDocumentMouseUp(event) {
    mouseup();
}

function mouseup() {}




function onSelectMobileMouseMove(event) {
    if (app['mouse_down'] === true) {
        app['x'] = event.targetTouches[0].pageX;
        app['y'] = event.targetTouches[0].pageY;
        selectmove(app['x'], app['y']);
    }
}

function onSelectMouseMove(event) {
    if (app['mouse_down'] === true) {
        app['x'] = event.clientX;
        app['y'] = event.clientY;
        selectmove(app['x'], app['y']);
    }

}

function selectmove(x, y) {}


function onSelectMobileMouseDown(event) {
    var x = event.targetTouches[0].pageX;
    var y = event.targetTouches[0].pageY;
    selectdown(x, y);
}

function onSelectMouseDown(event) {
    var x = event.clientX;
    var y = event.clientY;
    selectdown(x, y);
}

function selectdown(x, y) {}


function onSelectMobileMouseUp(event) {
    selectup();
}

function onSelectMouseUp(event) {

    selectup();
}

function selectup() {}

onDocumentCircleDown(e){};

onDocumentCircleMove(e){};
onDocumentCircleUp(e){};
