export default {
    /**
     * Action creator to initialze maze reducer by character data object
     * @param  {Object} character
     * @return {Object} action object
     */
    initializeCharacter(character) {
        return {
            type: 'INITIALIZE_CHARACTER',
            payload: {
                character
            },
        }
    },

    /**
     * Action creator to initialze maze reducer by map details object
     * @param    {Object} mapDetails
     * @property {number} gridHeight      number of rows of the grid
     * @property {number} gridWidth       number of columns of the grid
     * @property {Object} doorsDetails    list of doors details paired with ID
     * @property {Object} monstersDetails list of monster details paired with ID
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

    /**
     * Action creator to move the character by specific differenceRow
     * @param  {number} differenceRow
     * @param  {number} differenceColumn
     * @param  {string} direction        one of up, left, right or down
     * @return {Object} action object
     */
    moveCharacter(differenceRow, differenceColumn, direction) {
        return {
            type: 'MOVE_CHARACTER',
            payload: {
                differenceRow,
                differenceColumn,
                direction,
            },
        };
    }
}
