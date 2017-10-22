// TODO read from database instead of local data
// or add an option to use local or database

import Promise from 'bluebird';

import mazeConfig from '../data/mazeConfig.json';

const {
    numLevels,
    mapTilesIDToString,
    mapMonsterTypeToDetails,
    mapDoorTypeToDetails,
    mapStairTypeToDetails,
} = mazeConfig;

export default {
    /**
     * Reads the tiles of the maze on a single level
     * @param {number} currentLevel The specified level
     * @return {Promise}            Promise that resolves the state of the level
     */
    _readLevel(currentLevel) {
        return new Promise((resolve, reject) => {
            const doorsDetails = {};
            const monstersDetails = {};
            const stairsDetails = {};
            const tilesDetails = [];
            const destroyedDoors = [];

            let totalDoors = 0;
            let totalMonsters = 0;
            let totalStairs = 0;

            const levelData = require(`../data/level_${currentLevel}.json`);

            const {
                mazeTiles,
                monsters,
                doors,
                stairs,
            } = levelData;

            const numRows = mazeTiles.length;

            let gridHeight = numRows;
            let gridWidth = 0;

            for (let i = 0; i < numRows; i++) {
                const mazeTileRow = mazeTiles[i];
                const numTiles = mazeTileRow.length;
                const mazeTilesRowDetails = [];

                gridWidth = Math.max(gridWidth, numTiles);

                for (let j = 0; j < numTiles; j++) {
                    const mazeTileType = mazeTileRow[j];
                    mazeTilesRowDetails.push({
                        doorID: null,
                        monsterID: null,
                        stairID: null,
                        type: mapTilesIDToString[mazeTileType],
                    });
                }

                tilesDetails.push(mazeTilesRowDetails);
            }

            const numMonsters = monsters.length;

            for (let i = 0; i < numMonsters; i++) {
                const monster = monsters[i];
                const { row, column, type } = monster;

                monstersDetails[totalMonsters] = {
                    level: currentLevel,
                    ...monster,
                    ...mapMonsterTypeToDetails[type],
                };

                tilesDetails[row][column].monsterID = totalMonsters;

                totalMonsters = totalMonsters + 1;
            }

            const numDoors = doors.length;

            for (let i = 0; i < numDoors; i++) {
                const door = doors[i];
                const { row, column, type } = door;

                doorsDetails[totalDoors] = {
                    level: currentLevel,
                    ...door,
                    ...mapDoorTypeToDetails[type],
                    destroyed: false,
                };

                tilesDetails[row][column].doorID = totalDoors;

                totalDoors = totalDoors + 1;
            }

            const numStairs = stairs.length;

            for (let i = 0; i < numStairs; i++) {
                const stair = stairs[i];
                const { row, column, type } = stair;

                stairsDetails[totalStairs] = {
                    level: currentLevel,
                    ...stair,
                    ...mapStairTypeToDetails[type],
                };

                tilesDetails[row][column].stairID = totalStairs;

                totalStairs = totalStairs + 1;
            }

            resolve({
                gridHeight,
                gridWidth,
                doorsDetails,
                monstersDetails,
                stairsDetails,
                tilesDetails,
                destroyedDoors,
            })
        });
    },

    /**
     * Reads the tiles of the maze from source
     * @return {Promise} Promise that returns when the tiles are read
     */
    readMazeTiles() {
        return new Promise((resolve, reject) => {
            const maze = {
                gridLevel: numLevels,
                gridHeight: 0,
                gridWidth: 0,
                doorsDetails: [],
                monstersDetails: [],
                stairsDetails: [],
                tilesDetails: [],
                destroyedDoors: [],
            }

            for (let i = 0; i < numLevels; i++) {
                this._readLevel(i).then((data) => {
                    const {
                       gridHeight: levelGridHeight,
                       gridWidth: levelGridWidth,
                       ...details,
                    } = data;

                    maze.gridHeight = Math.max(maze.gridHeight, levelGridHeight);
                    maze.gridWidth = Math.max(maze.gridWidth, levelGridWidth);

                    Object.keys(details).forEach((key) => {
                        maze[key].push(details[key]);
                    });
                });
            }

            resolve(maze);
        });
    }

};
