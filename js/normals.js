function normal( A, B, C ) {
    var AB = vec3.subtract( B, A ),
        AC = vec3.subtract( C, A );
    return vec3.normalize( vec3.cross( AC, AB ) );
}

function normals() {
    // Put all normals in a bucket.
    var normalBucket = [];
    for ( var i = 0; i < model.indices.length / 3; ++i ) {
        var triangleVertex = model.indices.slice( i * 3, i * 3 + 3 );

        var trianglePoint = triangleVertex.map( function( vertex ) {
            return vec3.create( model.vertices.slice( vertex * 3, vertex * 3 + 3 ) );
        } );
        var triangleNormal = normal( trianglePoint[ 0 ], trianglePoint[ 1 ], trianglePoint[ 2 ] );
        for ( var j = 0; j < triangleVertex.length; ++j ) {
            var vertex = triangleVertex[ j ];
            if ( typeof normalBucket[ vertex ] === 'undefined' ) {
                normalBucket[ vertex ] = [];
            }

            normalBucket[ vertex ].push( triangleNormal );
        }
    }

    // Linearly interpolate the normals.
    var finalNormals = [];
    for ( var i = 0; i < normalBucket.length; ++i ) {
        var current = vec3.create( [ 0, 0, 0 ] );
        var currentBucket = normalBucket[ i ];

        for ( var j = 0; j < currentBucket.length; ++j ) {
            vec3.add( current, currentBucket[ j ] );
        }
        vec3.scale( current, 1 / currentBucket.length );
        finalNormals.push.apply( finalNormals, current );
    }
    return finalNormals;
}
