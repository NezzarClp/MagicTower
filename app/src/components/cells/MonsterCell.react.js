import React from 'react'
import PropTypes from 'prop-types';

// TODO use dynamic src prop to render monster 
import test from '../../images/monsters/green_slime.gif';

export default class MonsterCell extends React.Component {

    static propTypes = {
        /**
         * The 0-based x-coordinate of the cell, from left to right
         */
        column: PropTypes.number.isRequired,

        /**
         * The 0-based y-coordinate of the cell, from top to bottom
         */
        row: PropTypes.number.isRequired,
    };

    _getPositionStyle() {
        const { row, column } = this.props;
        const cellWidth = 60;

        return {
            position: 'absolute',
            top: `${row*cellWidth}px`,
            left: `${column*cellWidth}px`,
        };
    }

    _getMonsterStyle() {
        return {
            top: 0,
            left: 0,
            // TODO use constants for z-Index
            'zIndex': 2,
        };
    }

    _getMonsterSrc() {
        return test;
    }

    render() {
        const positionStyle = this._getPositionStyle();
        const monsterStyle = this._getMonsterStyle();

        return (
            <div className='grid__cell' style={positionStyle}>
                <img
                    alt=''
                    className='grid__cell__img'
                    style={monsterStyle}
                    src={this._getMonsterSrc()}
                />
            </div>
        );
    }
}
