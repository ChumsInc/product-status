import {createEntityAdapter, createSelector, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {BaseSKUSearch} from "chums-types";
import {loadFilters} from "@/ducks/filters";
import {baseSkuSort} from "@/ducks/filters/base-sku/utils.ts";
import type {FilterState} from "@/ducks/filters/types.ts";
import {setFilters} from "@/ducks/filters/common-actions.ts";
import {filters} from "@/components/form/filters.ts";

const adapter = createEntityAdapter<BaseSKUSearch, string>({
    selectId: (sku) => sku.Category4,
    sortComparer: (a, b) => a.Category4.localeCompare(b.Category4),
})

const selectors = adapter.getSelectors();

const extraState: FilterState = {
    filter: '',
}

const baseSKUSlice = createSlice({
    name: 'baseSku',
    initialState: adapter.getInitialState(extraState),
    reducers: {
        setBaseSKUFilter: (state, action: PayloadAction<string>) => {
            state.filter = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loadFilters.fulfilled, (state, action) => {
                adapter.setAll(state, action.payload.baseSKUList);

            })
            .addCase(setFilters, (state, action) => {
                state.filter = action.payload.get(filters.baseSKU.key) ?? '';
            })
    },
    selectors: {
        selectBaseSKUFilter: (state) => state.filter,
        selectAll: (state) => selectors.selectAll(state),
        selectBaseSKU: (state) => selectors.selectById(state, state.filter) ?? null
    }
});

export default baseSKUSlice;
export const {selectAll, selectBaseSKUFilter, selectBaseSKU} = baseSKUSlice.selectors;
export const {setBaseSKUFilter} = baseSKUSlice.actions;
export const selectBaseSKUList = createSelector(
    [selectAll],
    (list) => {
        return [...list].sort(baseSkuSort)
    }
)
