import AppConstants from '../constants/AppConstants';

const { CellTypes } = AppConstants;

export default class MazeUtils {
    /**
     * Check if the position is inside the maze
     * @param {Object} maze
     * @param {Object} position
     * @property {number} row
     * @property {number} column
     * @return {boolean}
     */
    static isInsideMaze(maze, position) {
        const {
            gridHeight: height,
            gridWidth: width,
        } = maze;
        const {
            row,
            column,
        } = position;

        return (
            ((row >= 0) && (row < height)) &&
            ((column >= 0) && (column < width))
        );
    }

    /**
     * Check if the position can be entered
     * @param {Object} maze
     * @param {Object} position
     * @property {number} level
     * @property {number} row
     * @property {number} column
     * @return {boolean}
     */
    static canEnter(maze, position) {
        const {
            tilesDetails,
        } = maze;
        const {
            level,
            row,
            column,
        } = position;
        const cell = tilesDetails[level][row][column];
        const {
            doorID,
            monsterID,
            itemID,
            type,
        } = cell;

        return (
            MazeUtils.isInsideMaze(maze, position) && (type === CellTypes.FLOOR) &&
            (doorID === null) && (monsterID === null) && (itemID === null)
        );
    }
}
