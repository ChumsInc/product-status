import {configureStore} from '@reduxjs/toolkit'
import {combineReducers} from "redux";
import {alertsReducer, pageSetsReducer, tablesReducer, tabsReducer} from "chums-connected-components";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

import {default as appReducer} from '../ducks/app';
import {default as itemsReducer} from '../ducks/items';
import {default as filtersReducer} from '../ducks/filters';

const rootReducer = combineReducers({
    alerts: alertsReducer,
    app: appReducer,
    filters: filtersReducer,
    items: itemsReducer,
    pageSets: pageSetsReducer,
    tables: tablesReducer,
    tabs: tabsReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
    })
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export default store;
