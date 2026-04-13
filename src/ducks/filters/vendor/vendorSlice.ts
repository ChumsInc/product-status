import {createEntityAdapter, createSelector, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {PrimaryVendor} from "chums-types";
import type {FilterState} from "@/ducks/filters/types.ts";
import {loadFilters} from "@/ducks/filters";
import {setFilters} from "@/ducks/filters/common-actions.ts";
import {filters} from "@/components/form/filters.ts";
import {vendorSort} from "@/ducks/filters/vendor/utils.ts";

const adapter = createEntityAdapter<PrimaryVendor, string>({
    selectId: (v) => v.PrimaryVendorNo,
    sortComparer: (a, b) => a.PrimaryVendorNo.localeCompare(b.PrimaryVendorNo),
})

const selectors = adapter.getSelectors();

const extraState:FilterState = {
    filter: '',
}

const vendorSlice = createSlice({
    name: 'vendor',
    initialState: adapter.getInitialState(extraState),
    reducers: {
        setVendorFilter: (state, action:PayloadAction<string>) => {
            state.filter = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loadFilters.fulfilled, (state, action) => {
                adapter.setAll(state, action.payload.primaryVendorList);
            })
            .addCase(setFilters, (state, action) => {
                state.filter = action.payload.get(filters.vendorNo.key) ?? '';
            })
    },
    selectors: {
        selectAll: (state) => selectors.selectAll(state),
        selectVendorFilter: (state) => state.filter,
        selectPrimaryVendor: (state) => selectors.selectById(state, state.filter) ?? null,
    }
 });

export default vendorSlice;
export const {selectAll, selectVendorFilter, selectPrimaryVendor} = vendorSlice.selectors;
export const {setVendorFilter} = vendorSlice.actions;

export const selectVendorList = createSelector(
    [selectAll],
    (list) => {
        return [...list].sort(vendorSort)
    }
)
