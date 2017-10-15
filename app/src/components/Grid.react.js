import React from 'react'
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import UIConstants from '../constants/UIConstants';

import CharacterCell from './cells/CharacterCell.react';
import DoorCell from './cells/DoorCell.react';
import GridCell from './cells/GridCell.react';
import MonsterCell from './cells/MonsterCell.react';

function mapStateToProps(state) {
    return {
        numRows: state.maze.gridHeight,
        numColumns: state.maze.gridWidth,
        character: state.maze.character,
        monstersDetails: state.maze.monstersDetails,
        doorsDetails: state.maze.doorsDetails,
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
         * Character object in the grid
         */
        characters: PropTypes.object,

        /**
         * Coordinates of doors in the grid
         */
        doorsDetails: PropTypes.object,

        /**
         * Coordinates of monsters in the grid
         */
        monstersDetails: PropTypes.object,
    };

    _getGridCells() {
        const {
            numRows,
            numColumns,
        } = this.props;

        const gridCells = [];

        for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numColumns; j++) {
                const gridCell = (
                    <GridCell
                        key={`gridCell${i}_${j}`}
                        row={i}
                        column={j}
                    />
                );

                gridCells.push(gridCell);
            }
        }

        return gridCells;
    }

    _getCharacterCells() {
        const { character } = this.props;
        const { row, column } = character;

        return (
            <CharacterCell
                row={row}
                column={column}
            />
        )
    }

    _getDoorCells() {
        const { doorsDetails } = this.props;
        const doorCells = [];

        for (let doorID in doorsDetails) {
            const { row, column } = doorsDetails[doorID];
            const doorCell = (
                <DoorCell
                    key={`doorCell${row}_${column}`}
                    row={row}
                    column={column}
                />
            );

            doorCells.push(doorCell);
        }

        return doorCells;
    }

    _getMonsterCells() {
        const { monstersDetails } = this.props;
        const monsterCells = [];

        for (let monsterID in monstersDetails) {
            const { row, column, imgSrc } = monstersDetails[monsterID];
            const monsterCell = (
                <MonsterCell
                    key={`monsterCell${row}_${column}`}
                    row={row}
                    column={column}
                    src={imgSrc}
                />
            );

            monsterCells.push(monsterCell);
        }

        return monsterCells;
    }

    _getGridStyle() {
        const { numRows, numColumns } = this.props;
        const { cellWidth } = UIConstants;

        return {
            height: `${numRows * cellWidth}px`,
            width: `${numColumns * cellWidth}px`,
            position: 'relative',
            display: 'flex',
        };
    }

    render() {
        const gridCells = this._getGridCells();
        const characterCells = this._getCharacterCells();
        const doorCells = this._getDoorCells();
        const monsterCells = this._getMonsterCells();
        const gridStyle = this._getGridStyle();

        return (
            <div style={gridStyle}>
                {gridCells}
                {characterCells}
                {doorCells}
                {monsterCells}
            </div>
        );
    }
}

export default connect(mapStateToProps)(Grid);
