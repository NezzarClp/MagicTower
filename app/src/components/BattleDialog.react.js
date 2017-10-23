import React from 'react'
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import BattleActions from '../actions/BattleActions.js';

function mapStateToProps(state) {
    return {
        character: state.maze.character,
        battle: state.maze.battle,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        characterAttacks: () => {
            dispatch(BattleActions.characterAttacks());
        },
        monsterAttacks: () => {
            dispatch(BattleActions.monsterAttacks());
        },
        endBattle: () => {
            dispatch(BattleActions.endBattle());
        }
    }
}

export class BattleDialog extends React.Component {
    static propTypes = {
        /**
         * The character
         */
        character: PropTypes.object,

        /**
         * The monster that the character is battling against if exists, otherwise null
         */
        battle: PropTypes.object,

        /**
         * The character
         */
        turn: PropTypes.string,

        /**
         * Fired when the battle ends,
         */
        endBattle: PropTypes.func,
    };

    render() {
        const {
            character,
            battle,
            characterAttacks,
            monsterAttacks,
            endBattle,
        } = this.props;

        if (battle) {
            const {
                hitPoint,
                turn,
            } = battle;

            console.log('%cSimulating fight...\n',
                'color: white; background: black; ',
                character, '\n', battle
            );

            if (hitPoint <= 0) {
                setTimeout(endBattle, 500);
            } else {
                if (turn === 'CHARACTER') {
                    setTimeout(characterAttacks, 500);
                } else {
                    setTimeout(monsterAttacks, 500);
                }
            }
        }

        return null;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BattleDialog);
