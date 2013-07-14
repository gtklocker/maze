loadTexture( 'textures/wall.jpg' );
loadTexture( 'textures/floor.jpg' );
loadTexture( 'textures/ceil.jpg' );
var wallTexture,
    floorTexture,
    ceilTexture;
function loadTexture( src ) {
    var texture = gl.createTexture();
    var image = new Image();
    image.onload = function() {
        // push texture
        if ( image.src.search( 'wall' ) >= 0 ) {
            wallTexture = handleTexture( image, texture );
        }
        if ( image.src.search( 'floor' ) >= 0 ) {
            floorTexture = handleTexture( image, texture );
        }
        if ( image.src.search( 'ceil' ) >= 0 ) {
            ceilTexture = handleTexture( image, texture );
        }
        //var samplerPosition = gl.getUniformLocation( gl.program, 'uSampler' );
        //gl.activeTexture( gl.TEXTURE0 );
        //gl.bindTexture( gl.TEXTURE_2D, texture );
        //gl.uniform1i( samplerPosition, 0 );
    };
    //image.src = 'textures/wall.jpg';
    image.src = src;
}
function handleTexture( image, texture ) {
    gl.bindTexture( gl.TEXTURE_2D, texture );
    gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR );
    //gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT );
    //gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT );
    gl.generateMipmap( gl.TEXTURE_2D );
    return texture;
}
