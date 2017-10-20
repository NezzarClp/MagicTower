import React from 'react'
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import UIConstants from '../../constants/UIConstants';

import gridImage from '../../images';

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

    render() {
        const { cellType } = this.props;
        const positionStyle = this._getPositionStyle();
        const src = gridImage[cellType];

        return (
            <div className='grid__cell' style={positionStyle}>
                <img className='grid__cell__img' alt='' src={src} />
            </div>
        );
    }
}

export default connect(mapStateToProps)(GridCell);
