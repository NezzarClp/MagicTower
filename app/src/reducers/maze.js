import _ from 'lodash';

import AppConstants from '../constants/AppConstants';

const { ActionTypes, BattlePhases } = AppConstants;

const initialState = {
    gridHeight: 0,
    gridWidth: 0,
    doorsDetails: [],
    monstersDetails: [],
    stairsDetails: [],
    itemsDetails: [],
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
        return BattlePhases.MONSTER_PHASE;
    }

    if (monsterDamagePerRound <= 0) {
        return BattlePhases.CHARACTER_PHASE;
    }

    const numCharacterTurnToKillMonster = Math.ceil(monster.hitPoint / characterDamagePerRound);
    const numMonsterTurnToKillCharacter = Math.ceil(character.hitPoint / monsterDamagePerRound);

    if (numCharacterTurnToKillMonster <= numMonsterTurnToKillCharacter) {
        return BattlePhases.CHARACTER_PHASE;
    } else {
        return BattlePhases.MONSTER_PHASE;
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
        (fastForwardSimulateFight(character, monstersDetails[level][monsterID]) === BattlePhases.CHARACTER_PHASE));

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
            turn: BattlePhases.CHARACTER_PHASE,
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

/**
 * Compute the new state when the character moves
 * @param  {Object} state            old state
 * @param  {number} differenceRow    newRow - oldRow
 * @param  {number} differenceColumn newColumn - oldColumn
 * @return {Object} new state
 */
function moveCharacter(state, differenceRow, differenceColumn) {
    if (isFrozen(state)) {
        return state;
    }

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

/**
 * Compute the new state when the battle ends
 * @param  {Object} state old state
 * @return {Object} new state
 */
function endBattle(state) {
    let newState = _.cloneDeep(state);

    const level = newState.character.level;
    const monsterID = newState.battle.monsterID;

    removeMonster(newState, level, monsterID);
    newState.battle = null;

    return newState;
}

/**
 * Compute the new state when the character attacks
 * @param  {Object} state old state
 * @return {Object} new state
 */
function characterAttacks(state) {
    let newState = _.cloneDeep(state);

    const {
        character,
        battle: monster
    } = newState;

    const damage = character.attack - monster.defend;
    const monsterHitPoint = Math.max(0, monster.hitPoint - damage);

    newState.battle.hitPoint = monsterHitPoint;
    newState.battle.turn = BattlePhases.MONSTER_PHASE;

    return newState;
}

/**
 * Compute the new state when the monster attacks
 * @param  {Object} state old state
 * @return {Object} new state
 */
function monsterAttacks(state) {
    let newState = _.cloneDeep(state);

    const {
        character,
        battle: monster,
    } = newState;

    const damage = monster.attack - character.defend;
    const characterHitPoint = character.hitPoint - damage;

    newState.character.hitPoint = characterHitPoint;
    newState.battle.turn = BattlePhases.CHARACTER_PHASE;

    return newState;
}

/**
 * Compute the new state when the current door is removed
 * @param  {Object} state old state
 * @return {Object} new state
 */
function removeCurrentDoor(state) {
    let newState = _.cloneDeep(state);

    const level = newState.character.level;
    const doorID = newState.openingDoorID;

    removeDoor(newState, level, doorID);
    newState.openingDoorID = null;

    return newState;
}

const maze = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.INITIALIZE_CHARACTER: {
            const { character } = action.payload;
            return {
                ...state,
                character,
            };
        }
        case ActionTypes.INITIALIZE_MAP: {
            const { mapDetails } = action.payload;

            return {
                ...state,
                ...mapDetails,
            };
        }
        case ActionTypes.MOVE_CHARACTER: {
            const { differenceRow, differenceColumn } = action.payload;

            return moveCharacter(state, differenceRow, differenceColumn);
        }
        case ActionTypes.END_BATTLE: {
            return endBattle(state);
        }
        case ActionTypes.CHARACTER_ATTACKS: {
            return characterAttacks(state);
        }
        case ActionTypes.MONSTER_ATTACKS: {
            return monsterAttacks(state);
        }
        case ActionTypes.REMOVE_CURRENT_DOOR: {
            return removeCurrentDoor(state);
        }

        default:
            return state;
    }
}

export default maze;
