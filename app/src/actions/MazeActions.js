export default {

    /**
     * Action object to initialze maze reducer by map tiles details object
     * @param    {Object} mapTileDetails
     * @property {number} height       number of rows of the grid
     * @property {number} width        number of columns of the grid
     * @property {Array}  tilesDetails list of tiles details
     * @return   {Object} action Object
     */
    initialzeMapTiles(mapTileDetails) {
        return {
            type: 'INITIALIZE_MAP_TILES',
            payload: {
                mapTileDetails,
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
