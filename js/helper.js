function WebGLHelper( gl ) {
    this.gl = gl;
}

WebGLHelper.prototype = {
    constructor: 'WebGLHelper',

    createShader: function( type, src ) {
        var gl = this.gl;
        var shader = gl.createShader( type );
        gl.shaderSource( shader, src );
        gl.compileShader( shader );

        if ( !gl.getShaderParameter( shader, gl.COMPILE_STATUS ) ) {
            throw gl.getShaderInfoLog( shader );
        }
        return shader;
    },

    createProgram: function( vs, fs ) {
        var gl = this.gl;
        var program = gl.createProgram();
        gl.attachShader( program, vs );
        gl.attachShader( program, fs );

        gl.linkProgram( program );
        if ( !gl.getProgramParameter( program, gl.LINK_STATUS ) ) {
            throw gl.getProgramInfoLog( program );
        }
        return program;
    },
    
    createFloatBuffer: function( data ) {
        var gl = this.gl;
        var buffer = gl.createBuffer();
        gl.bindBuffer( gl.ARRAY_BUFFER, buffer );
        gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( data ), gl.STATIC_DRAW );

        return buffer;
    },

    createIndexBuffer: function( data ) {
        var gl = this.gl;
        var buffer = gl.createBuffer();
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, buffer );
        gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( data ), gl.STATIC_DRAW );

        return buffer;
    }
};
