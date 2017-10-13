import React from 'react'
import PropTypes from 'prop-types';

import UIConstants from '../../constants/UIConstants';
// TODO use dynamic src prop to render door
import door from '../../images/doors/yellow_door.png';

export default class DoorCell extends React.Component {

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
        const { cellWidth } = UIConstants;

        return {
            position: 'absolute',
            top: `${row*cellWidth}px`,
            left: `${column*cellWidth}px`,
        };
    }

    _getDoorStyle() {
        return {
            top: 0,
            left: 0,
            // TODO use constants for z-Index
            'zIndex': 2,
        };
    }

    _getDoorSrc() {
        return door;
    }

    render() {
        const positionStyle = this._getPositionStyle();
        const doorStyle = this._getDoorStyle();

        return (
            <div className='grid__cell' style={positionStyle}>
                <img
                    alt=''
                    className='grid__cell__img'
                    style={doorStyle}
                    src={this._getDoorSrc()}
                />
            </div>
        );
    }
}
