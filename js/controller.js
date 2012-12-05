window.requestAnimationFrame = window.webkitRequestAnimationFrame ||
                               window.mozRequestAnimationFrame;

wget( 'vertex.glsl', function( vertexSrc ) {
    wget( 'fragment.glsl', function( fragmentSrc ) {
        init( vertexSrc, fragmentSrc );
        render();
    } );
} );

document.onkeydown = function( e ) {
    switch ( e.keyCode ) {
        case 39: //right
            viewAngle = .10;
            break;
        case 37: //left
            viewAngle = -.10;
            break;
        case 40: //down
            viewZ = -.10;
            break;
        case 38: //up
            viewZ = .10;
            break;
    }
};

document.onkeyup = function( e ) {
    switch ( e.keyCode ) {
        case 37: //left
        case 39: //right
            viewAngle = 0;
            break;
        case 40: //down
        case 38: //up
            viewZ = 0;
            break;
    }
};

function onresize() {
    canvas.width = W = $( window ).width();
    canvas.height = H = $( window ).height();
    matrix.perspective( W / H );
    gl.viewport( 0, 0, W, H );
}

$( window ).resize( onresize );
onresize();
