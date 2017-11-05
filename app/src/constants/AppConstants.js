export default {
    emptyFunction: () => {},

    ActionTypes: {
        INITIALIZE_CHARACTER: 'INITIALIZE_CHARACTER',
        INITIALIZE_MAP: 'INITIALIZE_MAP',
        REMOVE_CURRENT_DOOR: 'REMOVE_CURRENT_DOOR',

        CHARACTER_WALKS: 'CHARACTER_WALKS',
        MOVE_CHARACTER: 'MOVE_CHARACTER',

        END_BATTLE: 'END_BATTLE',
        CHARACTER_ATTACKS: 'CHARACTER_ATTACKS',
        MONSTER_ATTACKS: 'MONSTER_ATTACKS',
    },

    BattlePhases: {
        CHARACTER_PHASE: 'CHARACTER_PHASE',
        MONSTER_PHASE: 'MONSTER_PHASE',
    },

    CellTypes: {
        FLOOR: 'floor',
        WALL: 'wall',
    }
};
