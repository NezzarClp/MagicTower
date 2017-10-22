// TODO read from database instead of local data
// or add an option to use local or database

import Promise from 'bluebird';

import mazeConfig from '../data/mazeConfig.json';

export default {

    /**
     * Read the tiles of the maze from source
     * @return {Promise} Promise that returns when the tiles are read
     */
    readMazeTiles() {
        return new Promise((resolve, reject) => {
            const {
                doors,
                mazeTiles,
                mapMonsterTypeToDetails,
                mapStairTypeToDetails,
                mapTilesIDToString,
                monsters,
                stairs,
            } = mazeConfig;
            const doorsDetails = {};
            const monstersDetails = {};
            const stairsDetails = {};
            const tilesDetails = [];

            const numLevels = mazeTiles.length;
            let gridHeight = 0;
            let gridWidth = 0;

            for (let i = 0; i < numLevels; i++) {
                const mazeTilesInLevel = mazeTiles[i];
                const numRows = mazeTilesInLevel.length;
                const rowsDetails = [];
                
                if (numRows > gridHeight) {
                    gridHeight = numRows;
                }
                
                for (let j = 0; j < numRows; j++) {
                    const mazeTileRow = mazeTilesInLevel[j];
                    const numTiles = mazeTileRow.length;
                    const mazeTilesRowDetails = [];
    
                    if (numTiles > gridWidth) {
                        gridWidth = numTiles;
                    }
    
                    for (let k = 0; k < numTiles; k++) {
                        const mazeTileType = mazeTileRow[k];
                        mazeTilesRowDetails.push({
                            doorID: null,
                            monsterID: null,
                            stairID: null,
                            type: mapTilesIDToString[mazeTileType],
                        });
                    }
    
                    rowsDetails.push(mazeTilesRowDetails);
                }
                
                tilesDetails.push(rowsDetails);
            }

            const numMonsters = monsters.length;

            for (let i = 0; i < numMonsters; i++) {
                const monster = monsters[i];
                const { level, row, column, type } = monster;

                monstersDetails[i] = {
                    ...monster,
                    ...mapMonsterTypeToDetails[type],
                };

                try {
                    tilesDetails[level][row][column].monsterID = i;
                } catch (err) {
                    console.log('%cWarning', 'color: red', ': Failed to put monster at level', level, 'and coordinates (', row, ',', column, ')');   
                    console.log('(ID:', i,')');
                }
            }

            const numDoors = doors.length;

            for (let i = 0; i < numDoors; i++) {
                const door = doors[i];
                const { level, row, column } = door;

                doorsDetails[i] = {
                    ...door,
                    destroyed: false,
                };

                try {
                    tilesDetails[level][row][column].doorID = i;
                } catch (err) {
                    console.log('%cWarning', 'color: red', ': Failed to put door at level', level, 'and coordinates (', row, ',', column, ')');   
                    console.log('(ID:', i,')');
                }
            }

            const numStairs = stairs.length;

            for (let i = 0; i < numStairs; i++) {
                const stair = stairs[i];
                const { level, row, column, type } = stair;

                stairsDetails[i] = {
                    ...stair,
                    ...mapStairTypeToDetails[type],
                };

                try {
                    tilesDetails[level][row][column].stairID = i;
                } catch (err) {
                    console.log('%cWarning', 'color: red', ': Failed to put stair at level', level, 'and coordinates (', row, ',', column, ')');   
                    console.log('(ID:', i,')');
                }
            }

            resolve({
                gridLevel: numLevels,
                gridHeight,
                gridWidth,
                doorsDetails,
                monstersDetails,
                stairsDetails,
                tilesDetails,
            });
        });
    }

};
