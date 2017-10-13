export default {

    /**
     * Action object to initialze maze reducer by map details object
     * @param    {Object} mapDetails
     * @property {number} height          number of rows of the grid
     * @property {number} width           number of columns of the grid
     * @property {Array}  doorsDetails    list of doors details
     * @property {Array}  monstersDetails list of monster details
     * @property {Array}  tilesDetails    list of tiles details
     * @return   {Object} action Object
     */
    initialzeMap(mapDetails) {
        return {
            type: 'INITIALIZE_MAP',
            payload: {
                mapDetails,
            },
        }
    },

    moveCharacter(differenceRow, differenceColumn) {
        return {
            type: 'MOVE_CHARACTER',
            payload: {
                differenceRow,
                differenceColumn,
            },
        };
    }
}
