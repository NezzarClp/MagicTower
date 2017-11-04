import React from 'react'
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import UIConstants from '../constants/UIConstants';

import CharacterCell from './cells/CharacterCell.react';
import DoorCell from './cells/DoorCell.react';
import MonsterCell from './cells/MonsterCell.react';
import StairCell from './cells/StairCell.react';
import ItemCell from './cells/ItemCell.react';
import TileCell from './cells/TileCell.react';

function mapStateToProps(state) {
    const currentLevel = state.maze.character.level;

    return {
        numRows: state.maze.gridHeight,
        numColumns: state.maze.gridWidth,
        character: state.maze.character,
        doorsDetails: state.maze.doorsDetails[currentLevel],
        monstersDetails: state.maze.monstersDetails[currentLevel],
        stairsDetails: state.maze.stairsDetails[currentLevel],
        itemsDetails: state.maze.itemsDetails[currentLevel],
        openingDoorID: state.maze.openingDoorID,
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

        /**
         * Coordinates of stairs in the grid
         */
        stairsDetails: PropTypes.object,
    };

    _getTileCells() {
        const {
            numRows,
            numColumns,
        } = this.props;

        const tileCells = [];

        for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numColumns; j++) {
                const tileCell = (
                    <TileCell
                        key={`gridCell${i}_${j}`}
                        row={i}
                        column={j}
                    />
                );

                tileCells.push(tileCell);
            }
        }

        return tileCells;
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
        const { doorsDetails, openingDoorID } = this.props;
        const doorCells = [];

        for (let doorID in doorsDetails) {
            const { row, column } = doorsDetails[doorID];
            const isOpening = (parseInt(doorID, 10) === openingDoorID);
            const doorCell = (
                <DoorCell
                    key={`doorCell${row}_${column}`}
                    row={row}
                    column={column}
                    isOpening={isOpening}
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

    _getStairCells() {
        const { stairsDetails } = this.props;
        const stairCells = [];

        for (let stairID in stairsDetails) {
            const { row, column, imgSrc } = stairsDetails[stairID];
            const stairCell = (
                <StairCell
                    key={`stairCell${row}_${column}`}
                    row={row}
                    column={column}
                    src={imgSrc}
                />
            );

            stairCells.push(stairCell);
        }

        return stairCells;
    }

    _getItemCells() {
        const { itemsDetails } = this.props;
        const itemCells = [];

        for (let itemID in itemsDetails) {
            const { row, column, imgSrc } = itemsDetails[itemID];
            const itemCell = (
                <ItemCell
                    key={`itemCell${row}_${column}`}
                    row={row}
                    column={column}
                    src={imgSrc}
                />
            );

            itemCells.push(itemCell);
        }

        return itemCells;
    }

    _getGridStyle() {
        const { numRows, numColumns } = this.props;
        const { cellWidth } = UIConstants;

        return {
            height: `${numRows * cellWidth}px`,
            width: `${numColumns * cellWidth}px`,
        };
    }

    render() {
        const characterCells = this._getCharacterCells();
        const doorCells = this._getDoorCells();
        const monsterCells = this._getMonsterCells();
        const stairCells = this._getStairCells();
        const itemCells = this._getItemCells();
        const tileCells = this._getTileCells();
        const gridStyle = this._getGridStyle();

        return (
            <div className='grid' style={gridStyle}>
                {characterCells}
                {doorCells}
                {stairCells}
                {tileCells}
                {itemCells}
                {monsterCells}
            </div>
        );
    }
}

export default connect(mapStateToProps)(Grid);
