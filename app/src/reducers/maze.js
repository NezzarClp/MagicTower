const initialState = {
    // TODO remove hard-coded grid
    grid: [
        {
            type: 'wall',
            x: 0,
            y: 0,
            character: false,
        },
        {
            type: 'wall',
            x: 0,
            y: 1,
            character: false,
        },
        {
            type: 'wall',
            x: 1,
            y: 0,
            character: true,
        },
        {
            type: 'floor',
            x: 1,
            y: 1,
            character: false,
        },
        {
            type: 'floor',
            x: 3,
            y: 3,
            character: false,
        },
    ],
};

const maze = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default maze;