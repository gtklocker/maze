var oldTime = Date.now();
var viewAngle, viewZ;
viewAngle = viewZ = 0;
var FIX = 1 / 16.666;
function integrate( dt ) {
    matrix.moveCamera( 0, viewZ * dt * FIX, viewAngle * dt * FIX );
}
function render() {
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
    for ( var i = 0; i < cubes.length; ++i ) {
        drawCube( i );
    }
    var newTime = Date.now();
    registerFps( newTime - oldTime );
    integrate( newTime - oldTime );
    oldTime = newTime;
    window.requestAnimationFrame( render, canvas );
}

var fps = 0, fpsTime = 0;
function registerFps( dt ) {
    fpsTime += dt;
    ++fps;

    if ( fpsTime >= 1000 ) {
        document.title = fps + ' fps';
        fps = fpsTime = 0;
    }
}
