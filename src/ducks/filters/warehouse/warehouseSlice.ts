import {createEntityAdapter, createSelector, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {Warehouse} from "chums-types";
import type {FilterState} from "@/ducks/filters/types.ts";
import {loadFilters} from "@/ducks/filters";
import {warehouseSort} from "@/ducks/filters/warehouse/utils.ts";
import {setFilters} from "@/ducks/filters/common-actions.ts";
import {filters} from "@/components/form/filters.ts";

const adapter = createEntityAdapter<Warehouse, string>({
    selectId: (whs) => whs.WarehouseCode,
    sortComparer: (a, b) => a.WarehouseCode.localeCompare(b.WarehouseCode),
})
const selectors = adapter.getSelectors();

const extraState: FilterState = {
    filter: '',
}


const warehouseSlice = createSlice({
    name: 'warehouses',
    initialState: adapter.getInitialState(extraState),
    reducers: {
        setWarehouseFilter: (state, action: PayloadAction<string>) => {
            state.filter = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loadFilters.fulfilled, (state, action) => {
                adapter.setAll(state, action.payload.warehouseList);
            })
            .addCase(setFilters, (state, action) => {
                state.filter = action.payload.get(filters.warehouseCode.key) ?? '';
            })
    },
    selectors: {
        selectAll: (state) => selectors.selectAll(state),
        selectWarehouseFilter: (state) => state.filter,
        selectWarehouseValue: (state) => selectors.selectById(state, state.filter) ?? null
    }
});

export default warehouseSlice;
export const {selectAll, selectWarehouseFilter, selectWarehouseValue} = warehouseSlice.selectors;
export const {setWarehouseFilter} = warehouseSlice.actions;

export const selectWarehouseList = createSelector(
    [selectAll],
    (list) => {
        return list
            .filter(whs => whs.WarehouseStatus === 'A')
            .sort(warehouseSort)
    }
)
