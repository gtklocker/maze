var canvas = $( 'canvas' )[ 0 ],
    gl = canvas.getContext( 'experimental-webgl' ),
    WebGL = new WebGLHelper( gl );

function init( vSrc, fSrc ) {
    gl.enable( gl.DEPTH_TEST );
    gl.enable( gl.CULL_FACE );
    gl.viewport( 0, 0, canvas.width, canvas.height );

    gl.program = WebGL.createProgram(
        WebGL.createShader( gl.VERTEX_SHADER, vSrc ),
        WebGL.createShader( gl.FRAGMENT_SHADER, fSrc )
    );
    gl.useProgram( gl.program );
    push.vertices();
    matrix.init();
    push.matrices();
    push.normals();
    push.uv();
    push.indices();
}
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

matrix = {
    projection: mat4.create(),
    modelView: mat4.create(),
    zoom: mat4.create(),
    rotation: mat4.create(),

    perspective: function( aspect ) {
        mat4.identity( matrix.projection );
        mat4.perspective( 45, aspect, 0.1, 100.0, matrix.projection );
    },

    moveCamera: function( x, z, angle ) {
        var move = mat4.create();
        mat4.identity( move );
        mat4.rotateY( move, angle );
        mat4.translate( move, [ x, 0.0, z ] );

        mat4.multiply( move, matrix.zoom );
        mat4.set( move, matrix.zoom );
    },
    init: function() {
        this.perspective( W / H );
        mat4.identity( matrix.zoom );
        this.moveCamera( -10, -10, 0 );

        mat4.identity( matrix.rotation );
        this.rotate( 0, 0, 0 );
    },

    combine: function() {
        // this is the zoom matrix if rotation = 0
        // currently the object is using the zoom matrix so as to be visible
        // but if you set modelView directly in drawCube(), you'll lose the zoom level
        mat4.multiply( matrix.zoom, matrix.rotation, matrix.modelView );
    },

    rotate: function( roll, pitch, yaw ) {
        var rotationMatrix = mat4.create();
        mat4.identity( rotationMatrix );
        mat4.rotate( rotationMatrix, roll, [ 1.0, 0.0, 0.0 ] );
        mat4.rotate( rotationMatrix, pitch, [ 0.0, 1.0, 0.0 ] );
        mat4.rotate( rotationMatrix, yaw, [ 0.0, 0.0, 1.0 ] );

        mat4.multiply( rotationMatrix, matrix.rotation );
        mat4.set( rotationMatrix, matrix.rotation );

        push.matrices();
    }
};


push = {
    vertices: function() {
        var buffer = WebGL.createFloatBuffer( model.vertices );
        var vertexPosition = gl.getAttribLocation( gl.program, 'aPosition' );
        gl.enableVertexAttribArray( vertexPosition );
        gl.vertexAttribPointer( vertexPosition, 3, gl.FLOAT, false, 0, 0 );
    },

    matrices: function() {
        var mvMatrixPosition = gl.getUniformLocation( gl.program, 'uModelView' );
        var pMatrixPosition = gl.getUniformLocation( gl.program, 'uProjection' );
        matrix.combine();
        gl.uniformMatrix4fv( pMatrixPosition, false, matrix.projection );
        gl.uniformMatrix4fv( mvMatrixPosition, false, matrix.modelView );
    },

    //colors: function() {
    //    var buffer = WebGL.createFloatBuffer( model.colors );
    //    var colorPosition = gl.getAttribLocation( gl.program, 'aColor' );
    //    gl.enableVertexAttribArray( colorPosition );
    //    gl.vertexAttribPointer( colorPosition, 4, gl.FLOAT, false, 0, 0 );
    //},

    indices: function() {
        WebGL.createIndexBuffer( model.indices );
    },

    normals: function() {
        var buffer = WebGL.createFloatBuffer( normals() );
        var normalsPosition = gl.getAttribLocation( gl.program, 'aNormal' );
        gl.enableVertexAttribArray( normalsPosition );
        gl.vertexAttribPointer( normalsPosition, 3, gl.FLOAT, false, 0, 0 );
    },

    uv: function() {
        var buffer = WebGL.createFloatBuffer( model.uv );
        var uvPosition = gl.getAttribLocation( gl.program, 'aUV' );
        gl.enableVertexAttribArray( uvPosition );
        gl.vertexAttribPointer( uvPosition, 2, gl.FLOAT, false, 0, 0 );
    }
};

var cubes = [];
var minX = map[ 0 ].x,
    maxX = map[ 0 ].x,
    minZ = map[ 0 ].z,
    maxZ = map[ 0 ].z;
for ( var i = 0; i < map.length; ++i ) {
    var wall = map[ i ];
    minX = Math.min( wall.x, minX );
    maxX = Math.max( wall.x, maxX );

    minZ = Math.min( wall.z, minZ );
    maxZ = Math.max( wall.z, maxZ );
}
function placeFloor( x, z, lambda ) {
    placeCubeXZ( x, 1, z, lambda );
}
function placeCeil( x, z, lambda ) {
    placeCubeXZ( x, -1, z, lambda );
}
placeFloor( minX + ( minX + maxX ) / 2, minZ + ( minZ + maxZ ) / 2, 100 );
placeCeil( minX + ( minX + maxX ) / 2, minZ + ( minZ + maxZ ) / 2, 101 );

function placeCubeXZ( x, y, z, lambda ) {
    if ( typeof lambda == 'undefined' ) {
        lambda = 1;
    }
    //console.log( 'Placing cube at (' + x + ', ' + y + ', ' + z + ')' );
    var modelMatrix = mat4.create();
    mat4.identity( modelMatrix );
    mat4.translate( modelMatrix, [ x, y, z ] );
    mat4.scale( modelMatrix, [ lambda, 1, lambda ] );

    var uvMatrix = mat4.create();
    mat4.identity( uvMatrix );
    cubes.push( [ modelMatrix ] );
    cubes[ cubes.length - 1 ].push( WebGL.createFloatBuffer( model.uvFlat( lambda ) ) );
    if ( lambda === 100 ) {
        cubes[ cubes.length - 1 ].push( 1 );
    }
    if ( lambda === 101 ) {
        cubes[ cubes.length - 1 ].push( 2 );
    }
}
function placeCubeZ( x, y, z, lambda ) {
    if ( typeof lambda == 'undefined' ) {
        lambda = 1;
    }
    //console.log( 'Placing cube at (' + x + ', ' + y + ', ' + z + ')' );
    var modelMatrix = mat4.create();
    mat4.identity( modelMatrix );
    mat4.translate( modelMatrix, [ x, y, z ] );
    mat4.scale( modelMatrix, [ 1, 1, lambda ] );

    cubes.push( [ modelMatrix,
                WebGL.createFloatBuffer( model.uvVertical( lambda ) ) ] );
}
function placeCubeX( x, y, z, lambda ) {
    if ( typeof lambda == 'undefined' ) {
        lambda = 1;
    }
    //console.log( 'Placing cube at (' + x + ', ' + y + ', ' + z + ')' );
    var modelMatrix = mat4.create();

    mat4.identity( modelMatrix );
    mat4.translate( modelMatrix, [ x, y, z ] );
    mat4.scale( modelMatrix, [ lambda, 1, 1 ] );
    cubes.push( [ modelMatrix,
                WebGL.createFloatBuffer( model.uvHorizontal( lambda ) ) ] );
}
function drawCube( index ) {
    var cube = cubes[ index ];
    //var matrixLocation = gl.getUniformLocation( gl.program, 'uModelView' );
    var modelView = mat4.create();
    mat4.identity( modelView );
    mat4.multiply( modelView, matrix.zoom );
    mat4.multiply( modelView, cube[ 0 ] );

    var mvMatrixPosition = gl.getUniformLocation( gl.program, 'uModelView' );
    var uvPosition = gl.getAttribLocation( gl.program, 'aUV' );
    var samplerPosition = gl.getUniformLocation( gl.program, 'uSampler' );
    gl.bindBuffer( gl.ARRAY_BUFFER, cube[ 1 ] );
    gl.enableVertexAttribArray( uvPosition );
    gl.vertexAttribPointer( uvPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.uniformMatrix4fv( mvMatrixPosition, false, modelView );

    if ( cube[ 2 ] == 2 ) {
        // floor
        gl.activeTexture( gl.TEXTURE0 );
        gl.bindTexture( gl.TEXTURE_2D, floorTexture );
        gl.uniform1i( samplerPosition, 0 );
    }
    else if ( cube[ 2 ] == 1 ) {
        // ceil
        gl.activeTexture( gl.TEXTURE0 );
        gl.bindTexture( gl.TEXTURE_2D, ceilTexture );
        gl.uniform1i( samplerPosition, 0 );
    }
    else {
        gl.activeTexture( gl.TEXTURE0 );
        gl.bindTexture( gl.TEXTURE_2D, wallTexture );
        gl.uniform1i( samplerPosition, 0 );
    }
    gl.drawElements( gl.TRIANGLES, model.indices.length, gl.UNSIGNED_SHORT, 0 );
}
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
