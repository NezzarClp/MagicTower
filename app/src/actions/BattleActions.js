export default {
    /**
     * Ends a battle
     * @return {Object} action object
     */
    endBattle() {
        return {
            type: 'END_BATTLE'
        }
    },

    /**
     * The character attacks the monster
     * @return {Object} action object
     */
    characterAttacks() {
        return {
            type: 'CHARACTER_ATTACKS'
        }
    },

    /**
     * The character attacks the monster
     * @return {Object} action object
     */
    monsterAttacks() {
        return {
            type: 'MONSTER_ATTACKS'
        }
    }
}
