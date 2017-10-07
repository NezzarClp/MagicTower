const initialState = {
    height: 0,
    width: 0,
    tilesDetails: [],

    character: {
        x: 3,
        y: 1,
    },
}

const maze = (state = initialState, action) => {
    switch (action.type) {
        case 'INITIALIZE_MAP_TILES': {
            const { mapTileDetails } = action.payload;
            const {
                height,
                width,
                tilesDetails
            } = mapTileDetails;

            return {
                ...state,
                gridHeight: height,
                gridWidth: width,
                tilesDetails,
            };
        }
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
