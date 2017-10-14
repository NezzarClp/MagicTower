import _ from 'lodash';

const initialState = {
    gridHeight: 0,
    gridWidth: 0,
    doorsDetails: [],
    monstersDetails: [],
    tilesDetails: [],

    character: {
        row: 3,
        column: 1,
        attack: 25,
        defend: 5,
        hitPoint: 300,
    },
}

/**
 * Check if the character can enter a cell
 * @param  {Object} cell
 * @return {boolean}
 */
function canCharacterEnterCell(cell) {
    return (cell.type === "floor");
}

/**
 * Simulate fight of character and monster
 * @param    {Object} character
 * @param    {Object} monster
 * @return   {Object}
 * @property {String} winner        winner of the fight
 * @property {Object} characterStat remaining statistics of the character
 * @property {Object} monsterStat   remaining statistics of the monster
 */
function simulateFight(character, monster) {
    console.log('%cSimulating fight...\n',
        'color: white; background: black; ',
        character, '\n', monster
    );
}

/**
 * Check if the character can enter a cell defined by x and y
 * @param  {Object}   newState new State of the maze
 * @param  {Object}   newPosition
 * @property {number} row
 * @property {number} column
 * @return {boolean}  True if the character can enter the new Position
 */
function checkValidPosition(newState, newPosition) {
    const {
        gridHeight: height,
        gridWidth: width,
        tilesDetails: maze,
    } = newState;
    const {
        row,
        column,
    } = newPosition;
    const isPositionInsideMaze = (
        ((row >= 0) && (row < height)) &&
        ((column >= 0) && (column < width))
    );

    return (isPositionInsideMaze && canCharacterEnterCell(maze[row][column]));
}

/**
 * Remove a monster on gridWidth
 * Return new objects representing updated objects as result
 * @param    {Object} newState
 * @param    {Object} newPosition
 * @property {number} row
 * @property {number} column
 */
function removeMonsters(newState, newPosition) {
    const {
        row,
        column,
    } = newPosition;

    newState.monstersDetails = newState.monstersDetails.filter((monster) => (
        (monster.row !== row) || (monster.column !== column)
    ));
}

function checkAndUpdateMazeState(newState, newPosition) {
    const {
        character,
        tilesDetails: maze,
        monstersDetails,
    } = newState;
    const {
        row,
        column,
    } = newPosition;
    const cellDetails = maze[row][column];

    if (cellDetails.monsterID !== null) {
        const monster = monstersDetails[cellDetails.monsterID];
        simulateFight(character, monster);
        cellDetails.monsterID = null;
        removeMonsters(newState, newPosition);
    }


    return monstersDetails;
}

const maze = (state = initialState, action) => {
    switch (action.type) {
        case 'INITIALIZE_MAP': {
            const { mapDetails } = action.payload;
            const {
                height,
                width,
                doorsDetails,
                monstersDetails,
                tilesDetails
            } = mapDetails;

            return {
                ...state,
                gridHeight: height,
                gridWidth: width,
                doorsDetails,
                monstersDetails,
                tilesDetails,
            };
        }
        case 'MOVE_CHARACTER': {
            const { differenceRow, differenceColumn } = action.payload;
            const { character } = state;
            let { row, column } = character;

            let newState = _.cloneDeep(state);
            row += differenceRow;
            column += differenceColumn;

            if (checkValidPosition(newState, { row, column })) {
                newState.character.row = row;
                newState.character.column = column;
                checkAndUpdateMazeState(newState, { row, column });
            }

            return newState;
        }

        default:
            return state;
    }
}

export default maze;
