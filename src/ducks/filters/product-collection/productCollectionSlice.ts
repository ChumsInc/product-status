import {createEntityAdapter, createSelector, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {ProductCollection} from "chums-types";
import type {FilterState} from "@/ducks/filters/types.ts";
import {loadFilters} from "@/ducks/filters";
import {setFilters} from "@/ducks/filters/common-actions.ts";
import {filters} from "@/components/form/filters.ts";

const adapter = createEntityAdapter<ProductCollection, string>({
    selectId: arg => arg.Category3,
    sortComparer: (a, b) => a.Category3.localeCompare(b.Category3),
});

const selectors = adapter.getSelectors();

const extraState:FilterState  = {filter: ''};

const productCollectionSlice = createSlice({
    name: 'product-collections',
    initialState: adapter.getInitialState(extraState),
    reducers: {
        setCollectionFilter: (state, action:PayloadAction<string>) => {
            state.filter = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loadFilters.fulfilled, (state, action) => {
                adapter.setAll(state, action.payload.collectionList)
            })
            .addCase(setFilters, (state, action) => {
                state.filter = action.payload.get(filters.collection.key) ?? '';
            })
    },
    selectors: {
        selectAll: (state) => selectors.selectAll(state),
        selectCollectionFilter: (state) => state.filter,
        selectProductCollection: (state) => selectors.selectById(state, state.filter) ?? null,
    }
});

export default productCollectionSlice;
export const {selectAll, selectProductCollection, selectCollectionFilter} = productCollectionSlice.selectors;
export const {setCollectionFilter} = productCollectionSlice.actions;

export const selectCollectionList = createSelector(
    [selectAll],
    (list) => [...list]
);
