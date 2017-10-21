import React from 'react'
import PropTypes from 'prop-types';

import GridCell from './GridCell.react';

// TODO capture character image
import character from '../../images/character.png';

export default class CharacterCell extends React.Component {

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

    _getCharacterSrc() {
        return character;
    }

    render() {
        const {
            row, 
            column,
        } = this.props;
        const src = this._getCharacterSrc();
        const classNames = ['grid__cell__character'];
        
        return (
            <GridCell 
                row={row}
                column={column}
                src={src}
                classNames={classNames}
            />
        );
    }
}
