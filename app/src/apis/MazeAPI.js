// TODO read from database instead of local data
// or add an option to use local or database

import Promise from 'bluebird';

import mazeConfig from '../data/mazeConfig.json';

export default {

    /**
     * Read the tiles of the maze from source
     * return @{Promise} Promise that returns when the tiles are read
     */
    readMazeTiles() {
        return new Promise((resolve, reject) => {
            const {
                mazeTiles,
                mapTilesIDToString,
                monsters,
            } = mazeConfig;
            const numRows = mazeTiles.length;
            const monstersDetails = [];
            const tilesDetails = [];

            const height = numRows;
            let width = 0;

            for (let i = 0; i < numRows; i++) {
                const mazeTileRow = mazeTiles[i];
                const numTiles = mazeTileRow.length;
                const mazeTilesRowDetails = [];

                if (numTiles > width) {
                    width = numTiles;
                }

                for (let j = 0; j < numTiles; j++) {
                    const mazeTileType = mazeTileRow[j];
                    mazeTilesRowDetails.push({
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
                
                monstersDetails.push(monster);
                tilesDetails[row][column].monsterID = i;
            }
    
            resolve({
                height,
                width,
                monstersDetails,
                tilesDetails,
            });
        });
    }

};
