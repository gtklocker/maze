//console.log( 'Map length', map.length );
for ( var i = 0; i < map.length; ++i ) {
    //console.log( 'Loading wall', i );
    var wall = map[ i ];
    switch ( wall.direction ) {
        case MAP_HORIZONTAL:
            //for ( var j = 0; j < wall.length; ++j ) {
            //    placeCube( wall.x + j, 0, wall.z );
            //}
            placeCubeX( wall.x, 0, wall.z, wall.length );
            break;
        case MAP_VERTICAL:
            //for ( var j = 0; j < wall.length; ++j ) {
            //    placeCube( wall.x, 0, wall.z - j );
            //}
            placeCubeZ( wall.x, 0, wall.z, wall.length );
            break;
    }
}
