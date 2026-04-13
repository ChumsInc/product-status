import {configureStore} from '@reduxjs/toolkit'
import {combineReducers} from "redux";
import {type TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

import appSlice from '../ducks/app';
import {default as filtersReducer} from '../ducks/filters';
import alertsReducer from "../ducks/alerts";
import baseSKUSlice from "@/ducks/filters/base-sku/baseSKUSlice.ts";
import warehouseSlice from "@/ducks/filters/warehouse/warehouseSlice.ts";
import productTypeSlice from "@/ducks/filters/product-type/productTypeSlice.ts";
import productLineSlice from "@/ducks/filters/product-line/productLineSlice.ts";
import vendorSlice from "@/ducks/filters/vendor/vendorSlice.ts";
import productCategorySlice from "@/ducks/filters/product-category/productCategorySlice.ts";
import productCollectionSlice from "@/ducks/filters/product-collection/productCollectionSlice.ts";
import productStatusSlice from "@/ducks/filters/product-status/productStatusSlice.ts";
import itemListSlice from "@/ducks/items/itemListSlice.ts";

const rootReducer = combineReducers({
    alerts: alertsReducer,
    [appSlice.reducerPath]: appSlice.reducer,
    [baseSKUSlice.reducerPath]: baseSKUSlice.reducer,
    [itemListSlice.reducerPath]: itemListSlice.reducer,
    [productCategorySlice.reducerPath]: productCategorySlice.reducer,
    [productCollectionSlice.reducerPath]: productCollectionSlice.reducer,
    [productLineSlice.reducerPath]: productLineSlice.reducer,
    [productStatusSlice.reducerPath]: productStatusSlice.reducer,
    [productTypeSlice.reducerPath]: productTypeSlice.reducer,
    [vendorSlice.reducerPath]: vendorSlice.reducer,
    [warehouseSlice.reducerPath]: warehouseSlice.reducer,
    filters: filtersReducer,
    // items: itemsReducer,
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
