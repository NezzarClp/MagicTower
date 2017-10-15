import _ from 'lodash';

const initialState = {
    gridHeight: 0,
    gridWidth: 0,
    doorsDetails: {},
    monstersDetails: {},
    tilesDetails: [],

    character: {
        row: 0,
        column: 0,
    }
}

/**
 * Return maximum of two values
 * @param  {number} a
 * @param  {number} b
 * @return {number}
 */
function max(a, b) {
    if (a > b) {
        return a;
    }

    return b;
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
 * @param  {Object} character
 * @param  {Object} monster
 * @return {string} winner    winner of the fight
 */
function simulateFight(character, monster) {
    console.log('%cSimulating fight...\n',
        'color: white; background: black; ',
        character, '\n', monster
    );

    let currentTurn = "CHARACTER";

    while (
        (character.hitPoint > 0) &&
        (monster.hitPoint > 0)
    ) {
        let attacker, defender;
        if (currentTurn === "CHARACTER") {
            attacker = character;
            defender = monster;
        } else {
            attacker = monster;
            defender = character;
        }

        const damageDone = max(0, attacker.attack - defender.defend);
        defender.hitPoint -= damageDone;

        if (currentTurn === "CHARACTER") {
            currentTurn = "MONSTER";
        } else {
            currentTurn = "CHARACTER";
        }
    }
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
 * Remove a monster on monstersDetails
 * @param {Object} newState
 * @param {number} monsterID
 */
function removeMonster(newState, monsterID) {
    const { row, column } = newState.monstersDetails[monsterID];

    newState.tilesDetails[row][column].monsterID = null;
    delete newState.monstersDetails[monsterID];
}

/**
 * Remove a door on doorsDetails
 * @param {Object} newState
 * @param {number} doorID
 */
function removeDoor(newState, doorID) {
    const { row, column } = newState.doorsDetails[doorID];

    newState.tilesDetails[row][column].doorID = null;
    delete newState.doorsDetails[doorID];
}

/**
 * Update the state according to the newPosition
 * @param    {Object} newState
 * @param    {Object} newPosition the expected new position of the character
 * @property {number} row
 * @property {number} column
 */
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
    const {
        doorID,
        monsterID
    } = cellDetails;

    if (monsterID !== null) {
        const monster = monstersDetails[monsterID];
        const newCharacter = _.cloneDeep(character);
        const newMonster = _.cloneDeep(monster);
        simulateFight(newCharacter, newMonster);
        newState.character = newCharacter;
        removeMonster(newState, monsterID);
    }

    if (doorID !== null) {
        removeDoor(newState, doorID);
        newState.character.yellowKey--;
    }
}

const maze = (state = initialState, action) => {
    switch (action.type) {
        case 'INITIALIZE_CHARACTER': {
            const { character } = action.payload;
            return {
                ...state,
                character,
            };
        }
        case 'INITIALIZE_MAP': {
            const { mapDetails } = action.payload;

            return {
                ...state,
                ...mapDetails,
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
