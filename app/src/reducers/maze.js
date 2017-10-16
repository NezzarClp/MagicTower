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

    if (character.hitPoint > 0) {
        return "CHARACTER";
    } else {
        return "MONSTER";
    }
}

/**
 * Simulate fight of character and monster without step-to-step simulate
 * @param  {Object} character
 * @param  {Object} monster
 * @return {string} winner    winner of the fight
 */
function fastForwardSimulateFight(character, monster) {
    const characterDamagePerRound = character.attack - monster.defend;
    const monsterDamagePerRound = monster.attack - character.defend;

    if (characterDamagePerRound <= 0) {
        return "MONSTER";
    }

    if (monsterDamagePerRound <= 0) {
        return "CHARACTER";
    }

    const numCharacterTurnToKillMonster = Math.ceil(monster.hitPoint / characterDamagePerRound);
    const numMonsterTurnToKillCharacter = Math.ceil(character.hitPoint / monsterDamagePerRound);

    if (numCharacterTurnToKillMonster <= numMonsterTurnToKillCharacter) {
        return "CHARACTER";
    } else {
        return "MONSTER";
    }
}

/**
 * Check there is enough key to open the doorID
 * @param  {Object} character
 * @param  {Object} doorID
 * @return {boolean}
 */
function checkHasKeyToOpenDoor(character, door) {
    return (character.yellowKey >= 1);
}

/**
 * Check if the character can enter a cell
 * @param  {Object} newState
 * @param  {Object} cell
 * @return {boolean}
 */
function canCharacterEnterCell(newState, cell) {
    const {
        character,
        doorsDetails,
        monstersDetails,
    } = newState;
    const {
        doorID,
        monsterID
    } = cell;

    const isSafeToEnter = ((monsterID === null) ? true :
        (fastForwardSimulateFight(character, monstersDetails[monsterID]) === "CHARACTER"));

    const canOpenDoor = ((doorID === null) ? true :
        (checkHasKeyToOpenDoor(character, doorsDetails[doorID])));

    return ((cell.type === "floor") && isSafeToEnter && canOpenDoor);
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

    return (isPositionInsideMaze && canCharacterEnterCell(newState, maze[row][column]));
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
        newState.character.yellowKey = newState.character.yellowKey - 1;
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
