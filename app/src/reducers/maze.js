const initialState = {
    gridHeght: 0,
    gridWidth: 0,
    tilesDetails: [],

    character: {
        row: 3,
        column: 1,
    },
    
    monsters: [
        { row: 2, column: 3 }
    ],
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

const maze = (state = initialState, action) => {
    switch (action.type) {
        case 'INITIALIZE_MAP_TILES': {
            const { mapTileDetails } = action.payload;
            const {
                height,
                width,
                tilesDetails
            } = mapTileDetails;

            return {
                ...state,
                gridHeight: height,
                gridWidth: width,
                tilesDetails,
            };
        }
        case 'MOVE_CHARACTER': {
            const { differenceRow, differenceColumn } = action.payload;
            const { gridHeight, gridWidth, character } = state;
            const { row, column } = character;

            let newRow = row + differenceRow;
            let newColumn = column + differenceColumn;

            if (!checkValidPosition(state.tilesDetails, gridHeight, gridWidth, { newRow, newColumn })) {
                newRow = row;
                newColumn = column;
            }

            return {
                ...state,
                character: {
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
