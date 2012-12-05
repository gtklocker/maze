var MAP_HORIZONTAL = true;
var MAP_VERTICAL = false;

var map = [
    //// entrance
    //{ x: -7, z: 0, length: 7, direction: MAP_HORIZONTAL },
    //{ x:  1, z: 0, length: 7, direction: MAP_HORIZONTAL },

    //// left/right
    //{ x: -7, z: 0, length: 10, direction: MAP_VERTICAL },
    //{ x:  7, z: 0, length: 10, direction: MAP_VERTICAL },

    //// back
    //{ x: -7, z: -9, length: 14, direction: MAP_HORIZONTAL }

    //{ x: 0, z: -20, length: 70, direction: MAP_HORIZONTAL },
    //{ x: -1, z: -2, length: 2, direction: MAP_VERTICAL },
    //{ x: -1, z: -6, length: 2, direction: MAP_VERTICAL },
    //{ x: 1, z: -3, length: 4, direction: MAP_VERTICAL },
    //{ x: 1, z: -9, length: 2, direction: MAP_VERTICAL }
];

for ( var i = 0; i < 100; ++i ) {
    map.push(
        {
            x: Math.ceil( Math.random() * 80 ),
            z: -Math.ceil( Math.random() * 20 ),
            length: Math.ceil( Math.random() * 10 ),
            direction: Math.ceil( Math.random() - 0.80 ) ? MAP_HORIZONTAL : MAP_VERTICAL
        }
    );
}
