import React from 'react'
import PropTypes from 'prop-types';

import stairsImage from '../../images/stairs';

import GridCell from './GridCell.react';

export default class StairCell extends React.Component {

    static propTypes = {
        /**
         * The 0-based y-coordinate of the cell, from top to bottom
         */
        row: PropTypes.number.isRequired,
        
        /**
         * The 0-based x-coordinate of the cell, from left to right
         */
        column: PropTypes.number.isRequired,

        /**
         * Source of the monster cell
         */
        src: PropTypes.string,
    };

    render() {
        const {
            row, 
            column,
        } = this.props;
        const src = stairsImage[this.props.src];
        const classNames = ['grid__cell__stair'];

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
