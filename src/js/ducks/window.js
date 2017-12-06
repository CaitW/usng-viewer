
/**
 * When the browser window changes sizes, this dispatches the height and width of the window to the store
 *
 * @param {number} height
 * @param {number} width
 */
export function updateWindowDimensions(height, width) {
    return {
        type: 'WINDOW:UPDATE_DIMENSIONS',
        height,
        width
    };
}

const initialState = {
    height: false,
    width: false
};

export default function window(state = initialState, action) {
    let newState = {
        ...state
    };
    switch (action.type) {
        case 'WINDOW:UPDATE_DIMENSIONS':
            newState.height = action.height;
            newState.width = action.width;
            break;
        default:
            newState = state;
            break;
    }
    return newState;
}
