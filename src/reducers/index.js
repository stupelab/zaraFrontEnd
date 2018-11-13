import { combineReducers } from 'redux';
import itunesData from './reducer_itunes';

const appReducer = combineReducers({
    itunesData,
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;
