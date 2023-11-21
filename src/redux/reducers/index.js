import {RECEIVED_DATA, CLEAR_DATA, CLEAR_BY_DATA} from '../actions/searchActions';

const intialState = {
    recentSearch : [],
    count : 0
};
  
export const reducer = (state = intialState, action) => {
    switch (action.type){
        case RECEIVED_DATA:
        return {
            ...state,
            recentSearch: [...state.recentSearch, action.payload],
            count: state.count + 1
        }
        case CLEAR_BY_DATA: 
        return {
            ...state,
            recentSearch: state.recentSearch.filter((recentSearch) => recentSearch !== action.value),
            count: state.count - 1
        }
        case CLEAR_DATA:
        return {
            ...state,
            recentSearch : [],
            count: 0
        }
        default:
        return state;
    }
}