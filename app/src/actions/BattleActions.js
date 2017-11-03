import AppConstants from '../constants/AppConstants';

const { ActionTypes } = AppConstants;

export default {
    /**
     * Ends a battle
     * @return {Object} action object
     */
    endBattle() {
        return {
            type: ActionTypes.END_BATTLE,
        };
    },

    /**
     * The character attacks the monster
     * @return {Object} action object
     */
    characterAttacks() {
        return {
            type: ActionTypes.CHARACTER_ATTACKS,
        };
    },

    /**
     * The character attacks the monster
     * @return {Object} action object
     */
    monsterAttacks() {
        return {
            type: ActionTypes.MONSTER_ATTACKS,
        };
    }
}
