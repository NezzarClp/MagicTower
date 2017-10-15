import React from 'react'
import PropTypes from 'prop-types';

import UIConstants from '../../constants/UIConstants';

import monstersImage from '../../images/monsters';

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

        /**
         * Source of the monster cell
         */
        src: PropTypes.string,
    };

    _getPositionStyle() {
        const { row, column } = this.props;
        const { cellWidth } = UIConstants;

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

    render() {
        const positionStyle = this._getPositionStyle();
        const monsterStyle = this._getMonsterStyle();
        const src = monstersImage[this.props.src];

        return (
            <div className='grid__cell' style={positionStyle}>
                <img
                    alt=''
                    className='grid__cell__img'
                    style={monsterStyle}
                    src={src}
                />
            </div>
        );
    }
}
