import _ from 'lodash';

const initialState = {
    gridHeight: 0,
    gridWidth: 0,
    doorsDetails: [],
    monstersDetails: [],
    stairsDetails: [],
    tilesDetails: [],

    character: {
        level: 0,
        row: 0,
        column: 0,
    },

    battle: null,
    openingDoorID: null
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
 * @param  {number} level
 * @param  {Object} cell
 * @return {boolean}
 */
function canCharacterEnterCell(newState, level, cell) {
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
        (fastForwardSimulateFight(character, monstersDetails[level][monsterID]) === "CHARACTER"));

    const canOpenDoor = ((doorID === null) ? true :
        (checkHasKeyToOpenDoor(character, doorsDetails[level][doorID])));

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
        level,
        row,
        column,
    } = newPosition;
    const isPositionInsideMaze = (
        ((row >= 0) && (row < height)) &&
        ((column >= 0) && (column < width))
    );

    return (isPositionInsideMaze && canCharacterEnterCell(newState, level, maze[level][row][column]));
}

/**
 * Remove a monster on monstersDetails
 * @param {Object} newState
 * @param {number} level
 * @param {number} monsterID
 */
function removeMonster(newState, level, monsterID) {
    const { row, column } = newState.monstersDetails[level][monsterID];

    newState.tilesDetails[level][row][column].monsterID = null;
    delete newState.monstersDetails[level][monsterID];
}

/**
 * Remove a door on doorsDetails
 * @param {Object} newState
 * @param {number} level
 * @param {number} doorID
 */
function removeDoor(newState, level, doorID) {
    const { row, column } = newState.doorsDetails[level][doorID];

    newState.tilesDetails[level][row][column].doorID = null;
    delete newState.doorsDetails[level][doorID];
}

/**
 * Update positions of character as it walks to a cell
 * @param {Object} newState
 * @param {number} level
 * @param {number} stairID
 */
function updateCharacterPositionByStair(newState, level, stairID) {
    const stair = newState.stairsDetails[level][stairID];
    const targetPosition = stair.target;

    newState.character = {
        ...newState.character,
        ...targetPosition
    };
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
        tilesDetails: maze,
        monstersDetails,
    } = newState;
    const {
        level,
        row,
        column,
    } = newPosition;
    const cellDetails = maze[level][row][column];
    const {
        doorID,
        monsterID,
        stairID,
    } = cellDetails;

    if (monsterID !== null) {
        const monster = monstersDetails[level][monsterID];
        const {
            attack,
            defend,
            hitPoint,
        } = monster;

        newState.battle = {
            attack,
            defend,
            hitPoint,
            monsterID,
            turn: "CHARACTER",
        };
    }

    if (doorID !== null) {
        newState.openingDoorID = doorID;
        newState.character.yellowKey = newState.character.yellowKey - 1;
    }

    if (stairID !== null) {
        updateCharacterPositionByStair(newState, level, stairID);
    }
}

/**
 * Whether we should disable keyboard input
 * @param {Object} state
 * @return {boolean}
 */
function isFrozen(state) {
    if (state.battle != null || state.openingDoorID != null) {
        return true;
    }

    return false;
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
            if (isFrozen(state)){
                return state;
            }

            const { differenceRow, differenceColumn } = action.payload;
            const { character } = state;
            let { level, row, column } = character;

            let newState = _.cloneDeep(state);
            row += differenceRow;
            column += differenceColumn;

            if (checkValidPosition(newState, { level, row, column })) {
                newState.character.row = row;
                newState.character.column = column;
                checkAndUpdateMazeState(newState, { level, row, column });
            }

            return newState;
        }
        case 'END_BATTLE': {
            let newState = _.cloneDeep(state);

            const level = newState.character.level;
            const monsterID = newState.battle.monsterID;

            removeMonster(newState, level, monsterID);
            newState.battle = null;

            return newState;
        }
        case 'CHARACTER_ATTACKS': {
            let newState = _.cloneDeep(state);

            const {
                character,
                battle: monster
            } = newState;

            const damage = character.attack - monster.defend;
            const monsterHitPoint = Math.max(0, monster.hitPoint - damage);

            newState.battle.hitPoint = monsterHitPoint;
            newState.battle.turn = 'MONSTER';

            return newState;
        }
        case 'MONSTER_ATTACKS': {
            let newState = _.cloneDeep(state);

            const {
                character,
                battle: monster,
            } = newState;

            const damage = monster.attack - character.defend;
            const characterHitPoint = character.hitPoint - damage;

            newState.character.hitPoint = characterHitPoint;
            newState.battle.turn = 'CHARACTER';

            return newState;
        }
        case 'REMOVE_CURRENT_DOOR': {
            let newState = _.cloneDeep(state);

            const level = newState.character.level;
            const doorID = newState.openingDoorID;

            removeDoor(newState, level, doorID);
            newState.openingDoorID = null;

            return newState;
        }

        default:
            return state;
    }
}

export default maze;
