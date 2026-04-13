import {createEntityAdapter, createSelector, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {ProductLine} from "chums-types";
import type {FilterState} from "@/ducks/filters/types.ts";
import {loadFilters} from "@/ducks/filters";
import {setFilters} from "@/ducks/filters/common-actions.ts";
import {filters} from "@/components/form/filters.ts";
import {productLineSorter} from "@/ducks/filters/product-line/utils.ts";

const adapter = createEntityAdapter<ProductLine, string>({
    selectId: (pl) => pl.ProductLine,
    sortComparer: (a, b) => a.ProductLine.localeCompare(b.ProductLine),
});

const selectors = adapter.getSelectors();

const extraState:FilterState = {
    filter: '',
};

const productLineSlice = createSlice({
    name: 'productLine',
    initialState: adapter.getInitialState(extraState),
    reducers: {
        setProductLineFilter: (state, action:PayloadAction<string>) => {
            state.filter = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loadFilters.fulfilled, (state, action) => {
                adapter.setAll(state, action.payload.productLineList)
            })
            .addCase(setFilters, (state, action) => {
                state.filter = action.payload.get(filters.productLine.key) ?? ''
            })
    },
    selectors: {
        selectAll: (state) => selectors.selectAll(state),
        selectProductLineFilter: (state) => state.filter,
        selectProductLineValue: (state) => selectors.selectById(state, state.filter) ?? null
    }
});

export default productLineSlice;
export const {selectAll, selectProductLineFilter, selectProductLineValue} = productLineSlice.selectors;
export const {setProductLineFilter} = productLineSlice.actions;

export const selectProductLineList = createSelector(
    [selectAll],
    (list) => [...list].sort(productLineSorter)
);
