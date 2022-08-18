import {combineReducers} from "redux";

import {default as appReducer} from './app';
import {default as itemsReducer} from './items';
import {default as filtersReducer} from './filters';

const rootReducer = combineReducers({
    app: appReducer,
    filters: filtersReducer,
    items: itemsReducer,
});


export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;
