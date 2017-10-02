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
                mapTilesIDToString
            } = mazeConfig;
            const numRows = mazeTiles.length;
            const returnTiles = [];

            for (let i = 0; i < numRows; i++) {
                const mazeTileRow = mazeTiles[i];
                const numTiles = mazeTileRow.length;

                for (let j = 0; j < numTiles; j++) {
                    const mazeTileType = mazeTileRow[j];
                    returnTiles.push({
                        type: mapTilesIDToString[mazeTileType],
                        x: i,
                        y: j,
                    });
                }
            }

            resolve(returnTiles);
        });
    }

};
