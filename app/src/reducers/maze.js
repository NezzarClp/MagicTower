const initialState = {
    gridHeght: 0,
    gridWidth: 0,
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
 * Check if the character can enter a cell defined by cell type
 * @param  {string} cellType type of the cell
 * @return {boolean}
 */
function canCharacterEnterCell(cellType) {
    return (cellType === "floor");
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
 * @param  {Object}   maze        The maze Object
 * @param  {number}   height      The number of rows of the maze
 * @param  {number}   width       The number of columns of the maze
 * @param  {Object}   newPosition Desired new position of the character
 * @property {number} row
 * @property {number} column
 * @return {boolean}  True if the character can enter the new Position
 */
function checkValidPosition(maze, height, width, newPosition) {
    const {
        newRow: row,
        newColumn: column,
    } = newPosition;
    const isPositionInsideMaze = (
        ((row >= 0) && (row < height)) &&
        ((column >= 0) && (column < width))
    );

    return (isPositionInsideMaze && canCharacterEnterCell(maze[row][column].type));
}

function checkCharacterEnterPosition(maze, character, monsterDetails, newPosition) {
    const {
        newRow: row,
        newColumn: column,
    } = newPosition;
    const cellDetails = maze[row][column];
    
    if (cellDetails.monsterID !== null) {
        const monster = monsterDetails[cellDetails.monsterID];
        simulateFight(character, monster);
    }
}

const maze = (state = initialState, action) => {
    switch (action.type) {
        case 'INITIALIZE_MAP': {
            const { mapDetails } = action.payload;
            const {
                height,
                width,
                monstersDetails,
                tilesDetails
            } = mapDetails;

            return {
                ...state,
                gridHeight: height,
                gridWidth: width,
                monstersDetails,
                tilesDetails,
            };
        }
        case 'MOVE_CHARACTER': {
            const { differenceRow, differenceColumn } = action.payload;
            const { gridHeight, gridWidth, character } = state;
            const { row, column } = character;

            let newRow = row + differenceRow;
            let newColumn = column + differenceColumn;

            if (checkValidPosition(state.tilesDetails, gridHeight, gridWidth, { newRow, newColumn })) {
                checkCharacterEnterPosition(state.tilesDetails, state.character, state.monstersDetails, { newRow, newColumn });
            } else {
                newRow = row;
                newColumn = column;
            }

            return {
                ...state,
                character: {
                    ...character,
                    row: newRow,
                    column: newColumn,
                },
            };
        }

        default:
            return state;
    }
}

export default maze;
