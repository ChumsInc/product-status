import {createEntityAdapter, createSelector, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {ProductCategory} from "chums-types";
import type {FilterState} from "@/ducks/filters/types.ts";
import {loadFilters} from "@/ducks/filters";
import {setFilters} from "@/ducks/filters/common-actions.ts";
import {filters} from "@/components/form/filters.ts";
import {categorySorter} from "@/ducks/filters/product-category/utils.ts";

const adapter = createEntityAdapter<ProductCategory, string>({
    selectId: (cat) => cat.Category2,
    sortComparer: (a, b) => a.Category2.localeCompare(b.Category2),
})
const selectors = adapter.getSelectors();

const extraState: FilterState = {filter: ''}

const productCategorySlice = createSlice({
    name: 'product-categories',
    initialState: adapter.getInitialState(extraState),
    reducers: {
        setCategoryFilter: (state, action: PayloadAction<string>) => {
            state.filter = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loadFilters.fulfilled, (state, action) => {
                adapter.setAll(state, action.payload.categoryList);
            })
            .addCase(setFilters, (state, action) => {
                state.filter = action.payload.get(filters.category.key) ?? '';
            })
    },
    selectors: {
        selectAll: (state) => selectors.selectAll(state),
        selectCategoryFilter: (state) => state.filter,
        selectProductCategory: (state) => selectors.selectById(state, state.filter) ?? null,
    }
});

export default productCategorySlice;
export const {setCategoryFilter} = productCategorySlice.actions
export const {selectAll, selectProductCategory, selectCategoryFilter} = productCategorySlice.selectors;


export const selectCategoryList = createSelector(
    [selectAll],
    (list) => {
        return [...list].sort(categorySorter);
    }
)
