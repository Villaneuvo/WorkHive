import { ACTIONS } from "./action-search";

export type State = {
    locationInput: string;
    debounceInput: string;
    positionInput: string;
    locationList: string[];
    positionList: string[];
    allLocations: string[];
    showSuggestions: boolean;
};

export function reducer(state: State, action: { type: string; payload: any }) {
    switch (action.type) {
        case ACTIONS.SET_LOCATION_INPUT:
            return { ...state, locationInput: action.payload };
        case ACTIONS.SET_DEBOUNCE_INPUT:
            return { ...state, debounceInput: action.payload };
        case ACTIONS.SET_POSITION_INPUT:
            return { ...state, positionInput: action.payload };
        case ACTIONS.SET_LOCATION_LIST:
            return { ...state, locationList: action.payload };
        case ACTIONS.SET_POSITION_LIST:
            return { ...state, positionList: action.payload };
        case ACTIONS.SET_ALL_LOCATIONS:
            return { ...state, allLocations: action.payload };
        case ACTIONS.SET_SHOW_SUGGESTIONS:
            return { ...state, showSuggestions: action.payload };
        default:
            return state;
    }
}

export const initialState: State = {
    locationInput: "",
    debounceInput: "",
    positionInput: "",
    locationList: [],
    positionList: [],
    allLocations: [],
    showSuggestions: false,
};
