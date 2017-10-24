export default {
    /**
     * Action creator to initialize maze reducer by character data object
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
     * Action creator to initialize maze reducer by map details object
     * @param    {Object} mapDetails
     * @property {number} gridHeight      number of rows of the grid
     * @property {number} gridWidth       number of columns of the grid
     * @property {Object} doorsDetails    list of doors details paired with ID
     * @property {Object} monstersDetails list of monster details paired with ID
     * @property {Array}  tilesDetails    list of tiles details
     * @return   {Object} action Object
     */
    initializeMap(mapDetails) {
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
     * @return {Object} action object
     */
    moveCharacter(differenceRow, differenceColumn) {
        return {
            type: 'MOVE_CHARACTER',
            payload: {
                differenceRow,
                differenceColumn,
            },
        };
    },

    /**
     * Action creator to remove the door that the character is on
     * @return {Object} action object
     */
    removeCurrentDoor() {
        return {
            type: 'REMOVE_CURRENT_DOOR',
        };
    }
}
