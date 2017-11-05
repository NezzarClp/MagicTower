import AppConstants from '../constants/AppConstants';

const { ActionTypes } = AppConstants;

export default {
    /**
     * Action creator to initialize maze reducer by character data object
     * @param  {Object} character
     * @return {Object} action object
     */
    initializeCharacter(character) {
        return {
            type: ActionTypes.INITIALIZE_CHARACTER,
            payload: {
                character,
            },
        };
    },

    /**
     * Action creator to initialize maze reducer by map details object
     * @param    {Object} mapDetails
     * @property {number} gridHeight      number of rows of the grid
     * @property {number} gridWidth       number of columns of the grid
     * @property {Object} doorsDetails    list of doors details paired with ID
     * @property {Object} monstersDetails list of monster details paired with ID
     * @property {Object} itemsDetails    list of items details paired with ID
     * @property {Array}  tilesDetails    list of tiles details
     * @return   {Object} action Object
     */
    initializeMap(mapDetails) {
        return {
            type: ActionTypes.INITIALIZE_MAP,
            payload: {
                mapDetails,
            },
        };
    },

    /**
     * Action creator for the character to walk by a specific displacement
     * @param  {number} differenceRow
     * @param  {number} differenceColumn
     * @return {Object} action object
     */
    characterWalks(differenceRow, differenceColumn) {
        return {
            type: ActionTypes.CHARACTER_WALKS,
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
            type: ActionTypes.REMOVE_CURRENT_DOOR,
        };
    }
}
