import React from 'react'
import PropTypes from 'prop-types';

import GridCell from './GridCell.react';

import door2 from '../../images/doors/yellow_door.png';

const door = require('../../images/openDoors/yellow_door.gif');

export default class DoorCell extends React.PureComponent {
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
         * If the door is being destroyed or not
         */
        destroyed: PropTypes.bool,
    };
    
    static defaultProps = {
        destroyed: false,
    };
    
    _getDoorSrc(destroyed) {
        if (destroyed) {
            return door;
        }
        
        return door2;
    }

    render() {
        const {
            row, 
            column,
        } = this.props;
        const src = this._getDoorSrc(this.props.destroyed);
        const classNames = ['grid__cell__door'];

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
