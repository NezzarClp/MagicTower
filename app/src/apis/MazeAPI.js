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
                mapTilesIDToString,
                monsters,
            } = mazeConfig;
            const numRows = mazeTiles.length;
            const doorsDetails = {};
            const monstersDetails = {};
            const tilesDetails = [];

            const gridHeight = numRows;
            let gridWidth = 0;

            for (let i = 0; i < numRows; i++) {
                const mazeTileRow = mazeTiles[i];
                const numTiles = mazeTileRow.length;
                const mazeTilesRowDetails = [];

                if (numTiles > gridWidth) {
                    gridWidth = numTiles;
                }

                for (let j = 0; j < numTiles; j++) {
                    const mazeTileType = mazeTileRow[j];
                    mazeTilesRowDetails.push({
                        doorID: null,
                        monsterID: null,
                        type: mapTilesIDToString[mazeTileType],
                    });
                }

                tilesDetails.push(mazeTilesRowDetails);
            }

            const numMonsters = monsters.length;

            for (let i = 0; i < numMonsters; i++) {
                const monster = monsters[i];
                const { row, column } = monster;

                monstersDetails[i] = {
                    ...monster,
                    ...mapMonsterTypeToDetails[monster.type],
                };

                tilesDetails[row][column].monsterID = i;
            }

            const numDoors = doors.length;

            for (let i = 0; i < numDoors; i++) {
                const door = doors[i];
                const { row, column } = door;

                doorsDetails[i] = {
                    ...door,
                };

                tilesDetails[row][column].doorID = i;
            }

            resolve({
                gridHeight,
                gridWidth,
                doorsDetails,
                monstersDetails,
                tilesDetails,
            });
        });
    }

};
