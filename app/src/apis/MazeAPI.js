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
    mapItemTypeToDetails,
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
            const itemsDetails = {};
            const tilesDetails = [];

            let totalDoors = 0;
            let totalMonsters = 0;
            let totalStairs = 0;
            let totalItems = 0;

            const levelData = require(`../data/level_${currentLevel}.json`);

            const {
                mazeTiles,
                monsters,
                doors,
                stairs,
                items,
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
                        itemID: null,
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
                    ...stair,
                    ...mapStairTypeToDetails[type],
                };

                tilesDetails[row][column].stairID = totalStairs;

                totalStairs = totalStairs + 1;
            }

            const numItems = items.length;

            for (let i = 0; i < numItems; i++) {
                const item = items[i];
                const { row, column, type } = item;

                itemsDetails[totalItems] = {
                    ...item,
                    ...mapItemTypeToDetails[type],
                };

                tilesDetails[row][column].itemID = totalItems;

                totalItems = totalItems + 1;
            }

            resolve({
                gridHeight,
                gridWidth,
                doorsDetails,
                monstersDetails,
                stairsDetails,
                tilesDetails,
                itemsDetails,
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
                itemsDetails: [],
            }

            const promises = [];

            for (let i = 0; i < numLevels; i++) {
                promises.push(
                    this._readLevel(i)
                        .then((data) => {
                            const {
                               gridHeight: levelGridHeight,
                               gridWidth: levelGridWidth,
                               ...details,
                            } = data;

                            maze.gridHeight = Math.max(maze.gridHeight, levelGridHeight);
                            maze.gridWidth = Math.max(maze.gridWidth, levelGridWidth);

                            Object.keys(details).forEach((key) => {
                                console.log('key is ', key);
                                maze[key].push(details[key]);
                            });

                            return;
                        })
                );
            }

            Promise.all(promises)
                .then(() => {
                    resolve(maze);
                })
                .catch((err) => {
                    console.error('Loading map configuration failed!');
                    console.log(err);

                    throw err;
                });
        });
    }

};
