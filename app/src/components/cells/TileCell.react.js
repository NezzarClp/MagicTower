import React from 'react'
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import GridCell from './GridCell.react';

import gridImage from '../../images';

function mapStateToProps(state, ownProps) {
    const { row, column } = ownProps;
    const { level } = state.maze.character;
    
    return {
        cellType: state.maze.tilesDetails[level][row][column].type,
    }
}

export class TileCell extends React.Component {

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

    render() {
        const {
            row, 
            column,
            cellType,
        } = this.props;
        const src = gridImage[cellType];

        return (
            <GridCell
                row={row}
                column={column}
                src={src}
            />
        );
    }
}

export default connect(mapStateToProps)(TileCell);
