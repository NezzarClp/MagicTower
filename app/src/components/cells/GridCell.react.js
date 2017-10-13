import React from 'react'
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import UIConstants from '../../constants/UIConstants';

import wall from '../../images/wall.png';
// TODO replace floor.png with real floor
import floor from '../../images/floor.png';

function mapStateToProps(state, ownProps) {
    const { row, column } = ownProps;

    return {
        cellType: state.maze.tilesDetails[row][column].type,
    }
}

export class GridCell extends React.Component {

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
         * The type of the tile of the cell
         */
        cellType: PropTypes.string,
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

    _getCharacterStyle() {
        return {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '30px',
            height: '30px',
            'z-index': 1,
        };
    }

    _getBackGroundTileSrc() {
        const { cellType } = this.props;
        switch (cellType) {
            case 'wall':
                return wall;
            case 'floor':
                return floor;
            default:
                return wall;
        }
    }

    render() {
        const positionStyle = this._getPositionStyle();

        return (
            <div className='grid__cell' style={positionStyle}>
                <img className='grid__cell__img' alt='' src={this._getBackGroundTileSrc()} />
            </div>
        );
    }
}

export default connect(mapStateToProps)(GridCell);
