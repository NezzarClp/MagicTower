export default {
    MovetoLeft() {
        return {
            type: 'MOVE_CHARACTER',
            payload: {
                differenceX: -1,
                differenceY: 0,
            },
        };
    }
}
