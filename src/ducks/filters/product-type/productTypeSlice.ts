import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {FilterState} from "@/ducks/filters/types.ts";
import {setFilters} from "@/ducks/filters/common-actions.ts";
import {filters} from "@/components/form/filters.ts";

const initialState:FilterState = {
    filter: '',
}
const productTypeSlice = createSlice({
    name: 'productType',
    initialState: initialState,
    reducers: {
        setProductTypeFilter: (state, action:PayloadAction<string>) => {
            state.filter = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(setFilters, (state, action) => {
                    state.filter = action.payload.get(filters.productType.key) ?? '';
            })
    },
    selectors: {
        selectProductTypeFilter: (state) => state.filter,
    }
})

export default  productTypeSlice;
export const {selectProductTypeFilter} = productTypeSlice.selectors;
export const {setProductTypeFilter} = productTypeSlice.actions;
