import React from 'react'
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import CharacterCell from './CharacterCell.react';
import GridCell from './GridCell.react';

function mapStateToProps(state) {
    return {
        cells: state.maze.grid,
        character: state.maze.character,
    };
}

export class Grid extends React.Component {
    static propTypes = {

        /**
         * Number of rows in the grid
         */
        numRows: PropTypes.number,

        /**
         * Number of columns in the grid
         */
        numColumns: PropTypes.number,

        /**
         * Grid cells in the grid
         */
        cells: PropTypes.arrayOf(PropTypes.object),

        /**
         * Character object in the grid
         */
        characters: PropTypes.object,
    };

    _getGridCells() {
        const { cells } = this.props;
        const gridCells = [];
        const numCells = cells.length;

        for (let i = 0; i < numCells; i++) {
            const cell = cells[i];
            const {
                x,
                y,
                type,
            } = cell;

            const gridCell = (
                <GridCell
                    x={x}
                    y={y}
                    cellType={type}
                />
            );

            gridCells.push(gridCell);
        }

        return gridCells;
    }

    _getCharacterCells() {
        const { character } = this.props;
        const { x, y } = character;

        return (
            <CharacterCell
                x={x}
                y={y}
            />
        )
    }

    _getGridStyle() {
        const { numRows, numColumns } = this.props;
        const cellWidth = 60;

        return {
            height: `${numRows * cellWidth}px`,
            width: `${numColumns * cellWidth}px`,
        };
    }

    render() {
        const gridCells = this._getGridCells();
        const characterCells = this._getCharacterCells();
        const gridStyle = this._getGridStyle();

        return (
            <div style={gridStyle}>
                {gridCells}
                {characterCells}
            </div>
        );
    }
}

export default connect(mapStateToProps)(Grid);
