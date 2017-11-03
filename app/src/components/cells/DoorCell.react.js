import React from 'react'
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import GridCell from './GridCell.react';

import MazeActions from '../../actions/MazeActions.js';

import door from '../../images/doors/yellow_door.png';

const doorOpening = require('../../images/openDoors/yellow_door.gif');

const OPEN_DOOR_TIMEOUT = 500;

function mapDispatchToProps(dispatch) {
    return {
        removeCurrentDoor: () => {
            dispatch(MazeActions.removeCurrentDoor());
        }
    }
}

export class DoorCell extends React.PureComponent {
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
         * If the door is being opened
         */
        isOpening: PropTypes.bool.isRequired,

        /**
         * Fired when the door has to be removed
         */
        removeCurrentDoor: PropTypes.func,
    };


    render() {
        const {
            row,
            column,
            isOpening,
            removeCurrentDoor
        } = this.props;

        const src = isOpening ? doorOpening : door;
        const classNames = ['grid__cell__door'];

        if (isOpening) {
            setTimeout(removeCurrentDoor, OPEN_DOOR_TIMEOUT);
        }

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

export default connect(null, mapDispatchToProps)(DoorCell);
