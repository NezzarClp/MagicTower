export default {
    initialzeMapTiles(mapTiles) {
        return {
            type: 'INITIALIZE_MAP_TILES',
            payload: {
                mapTiles,
            },
        }
    },

    movetoLeft() {
        return {
            type: 'MOVE_CHARACTER',
            payload: {
                differenceX: -1,
                differenceY: 0,
            },
        };
    }
}
