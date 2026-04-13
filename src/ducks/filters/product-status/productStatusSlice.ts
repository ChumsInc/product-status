import {createEntityAdapter, createSelector, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {ProductStatus} from "chums-types";
import type {FilterState} from "@/ducks/filters/types.ts";
import {loadFilters} from "@/ducks/filters";
import {setFilters} from "@/ducks/filters/common-actions.ts";
import {filters} from "@/components/form/filters.ts";
import {productStatusSort} from "@/ducks/filters/product-status/utils.ts";

const adapter = createEntityAdapter<ProductStatus, number>({
    selectId: (arg) => arg.id,
    sortComparer: (a, b) => a.id - b.id,
});

const selectors = adapter.getSelectors();

const extraState: FilterState = {filter: ''};

const productStatusSlice = createSlice({
    name: 'product-status',
    initialState: adapter.getInitialState(extraState),
    reducers: {
        setProductStatusFilter: (state, action: PayloadAction<string>) => {
            state.filter = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loadFilters.fulfilled, (state, action) => {
                adapter.setAll(state, action.payload.productStatusList);
            })
            .addCase(setFilters, (state, action) => {
                state.filter = action.payload.get(filters.status.key) ?? '';
            })
    },
    selectors: {
        selectAll: (state) => selectors.selectAll(state),
        selectStatusFilter: (state) => state.filter,
    }
});

export default productStatusSlice;
export const {selectAll, selectStatusFilter} = productStatusSlice.selectors;
export const {setProductStatusFilter} = productStatusSlice.actions;

export const selectProductStatusList = createSelector(
    [selectAll],
    (list) => {
        return [...list].sort(productStatusSort)
    }
)
export const selectProductStatus = createSelector(
    [selectAll, selectStatusFilter],
    (list, filter) => {
        return list.find(value => value.code === filter) ?? null
    }

)
