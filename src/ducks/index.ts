import {combineReducers} from "redux";
import {alertsReducer, pagesReducer, sortableTablesReducer, tabsReducer} from 'chums-ducks';
import {default as appReducer} from './app';
import {default as itemsReducer} from './items';
import {default as filtersReducer} from './filters';

const rootReducer = combineReducers({
    alerts: alertsReducer,
    app: appReducer,
    filters: filtersReducer,
    items: itemsReducer,
    pages: pagesReducer,
    sortableTables: sortableTablesReducer,
    tabs: tabsReducer,
});


export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;
