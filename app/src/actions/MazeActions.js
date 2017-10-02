export default {
    initialzeMapTiles(mapTiles) {
        return {
            type: 'INITIALIZE_MAP_TILES',
            payload: {
                mapTiles,
            },
        }
    },

    moveCharacter(differenceX, differenceY) {
        return {
            type: 'MOVE_CHARACTER',
            payload: {
                differenceX,
                differenceY,
            },
        };
    }
}
