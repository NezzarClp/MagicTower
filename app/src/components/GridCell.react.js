import React from 'react'
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import wall from '../images/wall.png';
// TODO replace floor.png with real floor
import floor from '../images/floor.png';

function mapStateToProps(state, ownProps) {
    const { x, y } = ownProps;

    return {
        cellType: state.maze.tilesDetails[x][y].type,
    }
}

export class GridCell extends React.Component {

    static propTypes = {
        /**
         * The 0-based x-coordinate of the cell, from left to right
         */
        x: PropTypes.number.isRequired,

        /**
         * The 0-based y-coordinate of the cell, from top to bottom
         */
        y: PropTypes.number.isRequired,

        /**
         * The type of the tile of the cell
         */
        cellType: PropTypes.string,
    };

    _getPositionStyle() {
        const { x, y } = this.props;
        const width = 60;

        return {
            position: 'absolute',
            top: `${y*width}px`,
            left: `${x*width}px`,
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
