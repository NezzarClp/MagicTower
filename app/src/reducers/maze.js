const initialState = {
    gridHeght: 0,
    gridWidth: 0,
    tilesDetails: [],

    character: {
        x: 3,
        y: 1,
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
 * Check if the character can enter a cell defined by x and y
 * @param  {Object}  maze        The maze Object
 * @param  {number}  height      The number of rows of the maze
 * @param  {number}  width       The number of columns of the maze
 * @param  {Object}  newPosition Desired new position of the character
 * @property {number} x
 * @property {number} y
 * @return {boolean} True if the character can enter the new Position
 */
function checkValidPosition(maze, height, width, newPosition) {
    const {
        newX: x,
        newY: y,
    } = newPosition;
    const isPositionInsideMaze = (
        ((x >= 0) && (x < width)) &&
        ((y >= 0) && (y < height))
    );

    return (isPositionInsideMaze && canCharacterEnterCell(maze[x][y].type));
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
            const { differenceX, differenceY } = action.payload;
            const { gridHeight, gridWidth, character } = state;
            const { x, y } = character;

            let newX = x + differenceX;
            let newY = y + differenceY;

            if (!checkValidPosition(state.tilesDetails, gridHeight, gridWidth, { newX, newY })) {
                newX = x;
                newY = y;
            }

            return {
                ...state,
                character: {
                    x: newX,
                    y: newY,
                },
            };
        }

        default:
            return state;
    }
}

export default maze;
