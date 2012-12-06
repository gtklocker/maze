var model = {
    vertices: [
      // Front face
      -0.5, -0.5,  0.5,
       0.5, -0.5,  0.5,
       0.5,  0.5,  0.5,
      -0.5,  0.5,  0.5,

      // Back face
      -0.5, -0.5, -0.5,
      -0.5,  0.5, -0.5,
       0.5,  0.5, -0.5,
       0.5, -0.5, -0.5,

      // Top face
      -0.5,  0.5, -0.5,
      -0.5,  0.5,  0.5,
       0.5,  0.5,  0.5,
       0.5,  0.5, -0.5,

      // Bottom face
      -0.5, -0.5, -0.5,
       0.5, -0.5, -0.5,
       0.5, -0.5,  0.5,
      -0.5, -0.5,  0.5,

      // Right face
       0.5, -0.5, -0.5,
       0.5,  0.5, -0.5,
       0.5,  0.5,  0.5,
       0.5, -0.5,  0.5,

      // Left face
      -0.5, -0.5, -0.5,
      -0.5, -0.5,  0.5,
      -0.5,  0.5,  0.5,
      -0.5,  0.5, -0.5
    ],
    indices: [
      0,  1,  2,  0,  2,  3,  // Front face
      4,  5,  6,  4,  6,  7,  // Back face
      8,  9,  10, 8,  10, 11, // Top face
      12, 13, 14, 12, 14, 15, // Bottom face
      16, 17, 18, 16, 18, 19, // Right face
      20, 21, 22, 20, 22, 23  // Left face
    ],
    uvHorizontal: function( lambda ) {
        return [
          // Front
          lambda * 0.0,  1 * 0.0,
          lambda * 1.0,  1 * 0.0,
          lambda * 1.0,  1 * 1.0,
          lambda * 0.0,  1 * 1.0,
          // Back
          lambda * 1.0,  1 * 1.0,
          lambda * 1.0,  1 * 0.0,
          lambda * 0.0,  1 * 0.0,
          lambda * 0.0,  1 * 1.0,
          // Top
          lambda * 0.0,  1 * 0.0,
          lambda * 1.0,  1 * 0.0,
          lambda * 1.0,  1 * 1.0,
          lambda * 0.0,  1 * 1.0,
          // Bottom
          lambda * 0.0,  1 * 0.0,
          lambda * 1.0,  1 * 0.0,
          lambda * 1.0,  1 * 1.0,
          lambda * 0.0,  1 * 1.0,
          // Right
          1 * 0.0,  1 * 0.0,
          1 * 0.0,  1 * 1.0,
          1 * 1.0,  1 * 1.0,
          1 * 1.0,  1 * 0.0,
          // Left
          1 * 0.0,  1 * 0.0,
          1 * 1.0,  1 * 0.0,
          1 * 1.0,  1 * 1.0,
          1 * 0.0,  1 * 1.0,
        ];
    },
    uvVertical: function( lambda ) {
        return [
          // Front
          1 * 0.0,  1 * 0.0,
          1 * 1.0,  1 * 0.0,
          1 * 1.0,  1 * 1.0,
          1 * 0.0,  1 * 1.0,
          // Back
          1 * 1.0,  1 * 1.0,
          1 * 1.0,  1 * 0.0,
          1 * 0.0,  1 * 0.0,
          1 * 0.0,  1 * 1.0,
          // Top
          1 * 0.0,  lambda * 0.0,
          1 * 1.0,  lambda * 0.0,
          1 * 1.0,  lambda * 1.0,
          1 * 0.0,  lambda * 1.0,
          // Bottom
          1 * 0.0,  lambda * 0.0,
          1 * 1.0,  lambda * 0.0,
          1 * 1.0,  lambda * 1.0,
          1 * 0.0,  lambda * 1.0,
          // Right
          lambda * 0.0,  1 * 0.0,
          lambda * 0.0,  1 * 1.0,
          lambda * 1.0,  1 * 1.0,
          lambda * 1.0,  1 * 0.0,
          // Left
          lambda * 0.0,  1 * 0.0,
          lambda * 1.0,  1 * 0.0,
          lambda * 1.0,  1 * 1.0,
          lambda * 0.0,  1 * 1.0,
        ];
    },
    uvFlat: function( lambda ) {
        return [
          // Front
          lambda * 0.0,  lambda * 0.0,
          lambda * 1.0,  lambda * 0.0,
          lambda * 1.0,  lambda * 1.0,
          lambda * 0.0,  lambda * 1.0,
          // Back
          lambda * 1.0,  lambda * 1.0,
          lambda * 1.0,  lambda * 0.0,
          lambda * 0.0,  lambda * 0.0,
          lambda * 0.0,  lambda * 1.0,
          // Top
          lambda * 1.0,  lambda * 1.0,
          lambda * 1.0,  lambda * 0.0,
          lambda * 0.0,  lambda * 0.0,
          lambda * 0.0,  lambda * 1.0,
          // Bottom
          lambda * 1.0,  lambda * 1.0,
          lambda * 1.0,  lambda * 0.0,
          lambda * 0.0,  lambda * 0.0,
          lambda * 0.0,  lambda * 1.0,
          // Right
          lambda * 0.0,  lambda * 0.0,
          lambda * 0.0,  lambda * 1.0,
          lambda * 1.0,  lambda * 1.0,
          lambda * 1.0,  lambda * 0.0,
          // Left
          lambda * 0.0,  lambda * 0.0,
          lambda * 1.0,  lambda * 0.0,
          lambda * 1.0,  lambda * 1.0,
          lambda * 0.0,  lambda * 1.0,
        ];
    },
    uv: [
      // Front
      0.0,  0.0,
      1.0,  0.0,
      1.0,  1.0,
      0.0,  1.0,
      // Back
      1.0,  1.0,
      1.0,  0.0,
      0.0,  0.0,
      0.0,  1.0,
      // Top
      0.0,  0.0,
      1.0,  0.0,
      1.0,  1.0,
      0.0,  1.0,
      // Bottom
      0.0,  0.0,
      1.0,  0.0,
      1.0,  1.0,
      0.0,  1.0,
      // Right
      1.0,  1.0,
      1.0,  0.0,
      0.0,  0.0,
      0.0,  1.0,
      // Left
      0.0,  0.0,
      1.0,  0.0,
      1.0,  1.0,
      0.0,  1.0
    ],
    colors: []
};
( function() {
    var colors = [
        [ 1, 0,   0,   1 ], // Front face
        [ 1, 1,   0,   1 ], // Back face
        [ 0, 1,   0,   1 ], // Top face
        [ 1, 0.5, 0.5, 1 ], // Bottom face
        [ 1, 0,   1,   1 ], // Right face
        [ 0, 0,   1,   1 ]  // Left face
    ];
    for ( var i in colors ) {
        var color = colors[ i ];
        for ( var j = 0; j < 4; ++j ) {
            model.colors = model.colors.concat( color );
        }
    }
} )();
