import React from 'react'
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import GridCell from './GridCell.react';

function mapStateToProps(state, dispatch) {
    return {
        cells: state.maze.grid,
    };
}

export class Grid extends React.Component {
    static propTypes = {
        /**
         * Cells in the grid
         */
        cells: PropTypes.arrayOf(PropTypes.object),
    };
    
    _getCells() {
        const { cells } = this.props;
        const gridCells = [];
        const numCells = cells.length;
        
        for (let i = 0; i < numCells; i++) {
            const cell = cells[i];
            const {
                x, 
                y,
                type,
                character,
            } = cell;
            
            const gridCell = (
                <GridCell
                    x={x}
                    y={y}
                    cellType={type}
                    character={character}
                />
            );
            
            gridCells.push(gridCell);
        }
        
        return gridCells;
    }
    
    render() {
        const gridCells = this._getCells();
        
        console.log(gridCells);
        return (
            <div>
                {gridCells}
            </div>
        );
    }
}

export default connect(mapStateToProps)(Grid);
