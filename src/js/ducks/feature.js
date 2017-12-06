export function selected(featureProperties) {
    return {
        type: 'FEATURE:SELECTED',
        featureProperties
    };
}

export function unselected() {
    return {
        type: 'FEATURE:UNSELECTED'
    };
}

const initialState = {
    selected: false,
    featureProperties: {}
};

export default function window(state = initialState, action) {
    let newState = {
        ...state
    };
    switch (action.type) {
        case 'FEATURE:SELECTED':
            newState.selected = true;
            newState.featureProperties = action.featureProperties;
            break;
        case 'FEATURE:UNSELECTED':
            newState.selected = false;
            newState.featureProperties = {};
            break;
        default:
            newState = state;
            break;
    }
    return newState;
}
