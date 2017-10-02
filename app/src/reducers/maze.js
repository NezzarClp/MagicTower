const initialState = {
    // TODO remove hard-coded grid
    grid: [
        {
            type: 'wall',
            x: 0,
            y: 0,
        },
        {
            type: 'wall',
            x: 0,
            y: 1,
        },
        {
            type: 'wall',
            x: 1,
            y: 0,
        },
        {
            type: 'floor',
            x: 1,
            y: 1,
        },
        {
            type: 'floor',
            x: 3,
            y: 3,
        },
    ],

    character: {
        x: 3,
        y: 1,
    },
};

const maze = (state = initialState, action) => {
    switch (action.type) {
        case 'MOVE_CHARACTER': {
            const { differenceX, differenceY } = action.payload;
            const { character } = state;
            const { x, y } = character;

            return {
                ...state,
                character: {
                    x: x + differenceX,
                    y: y + differenceY,
                },
            };
        }

        default:
            return state;
    }
}

export default maze;
