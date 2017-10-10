import React from 'react'
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import CharacterCell from './cells/CharacterCell.react';
import GridCell from './cells/GridCell.react';
import MonsterCell from './cells/MonsterCell.react';

function mapStateToProps(state) {
    return {
        numRows: state.maze.gridHeight,
        numColumns: state.maze.gridWidth,
        character: state.maze.character,
        monstersCoordinates: state.maze.monsters,
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
         * Coordinates of monsters in the grid
         */
        monstersCoordinates: PropTypes.arrayOf(PropTypes.object),
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

    _getMonsterCells() {
        const { monstersCoordinates } = this.props;
        const monsterCells = [];
        const numMonstersCoordinates = monstersCoordinates.length;
        
        for (let i = 0; i < numMonstersCoordinates; i++) {
            const { row, column } = monstersCoordinates[i];
            const monsterCell = (
                <MonsterCell 
                    key={`monsterCell${row}_${column}`}
                    row={row}
                    column={column}
                />
            );
            
            monsterCells.push(monsterCell);
        }
        
        return monsterCells;
    }

    _getGridStyle() {
        const { numRows, numColumns } = this.props;
        const cellWidth = 60;

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
        const monsterCells = this._getMonsterCells();
        const gridStyle = this._getGridStyle();

        return (
            <div style={gridStyle}>
                {gridCells}
                {characterCells}
                {monsterCells}
            </div>
        );
    }
}

export default connect(mapStateToProps)(Grid);
