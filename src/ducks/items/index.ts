import {InProcessStatus, ItemRecord} from "../../types";
import {itemKey, itemSorter} from "./utils";
import {QueryStatus} from "@reduxjs/toolkit/query";
import {getPreference, localStorageKeys, setPreference} from "../../api/preferences";
import {createReducer} from "@reduxjs/toolkit";
import {
    loadItems,
    saveItemReorder,
    saveItemStatus,
    saveMultipleItemReorder,
    saveMultipleItemStatus,
    searchItems,
    selectMultipleItems,
    setPage,
    setReorderOptions,
    setRowsPerPage,
    setSort,
    toggleFilterActive,
    toggleFilterOnHand,
    toggleFilterSelected,
    toggleSelected
} from "./actions";
import {SortProps} from "chums-components";

export interface ItemsState {
    list: ItemRecord[];
    loading: QueryStatus;
    saving: QueryStatus;
    search: string;
    nextStatus: string;
    filterOnHand: boolean;
    filterInactive: boolean;
    filterOnlySelected: boolean;
    sort: SortProps<ItemRecord>;
    page: number;
    rowsPerPage: number;
}

const initialState: ItemsState = {
    list: [],
    loading: QueryStatus.uninitialized,
    saving: QueryStatus.uninitialized,
    search: '',
    nextStatus: '',
    filterOnHand: getPreference(localStorageKeys.filterOnHand, false),
    filterInactive: getPreference(localStorageKeys.filterInactive, true),
    filterOnlySelected: getPreference(localStorageKeys.filterOnlySelected, false),
    sort: {field: 'ItemCode', ascending: true},
    page: 0,
    rowsPerPage: getPreference(localStorageKeys.rowsPerPage, 25),
}

const itemsReducer = createReducer(initialState, builder => {
    builder
        .addCase(loadItems.pending, (state) => {
            state.loading = QueryStatus.pending;
        })
        .addCase(loadItems.rejected, (state) => {
            state.loading = QueryStatus.rejected;
        })
        .addCase(loadItems.fulfilled, (state, action) => {
            state.loading = QueryStatus.fulfilled;
            state.list = action.payload.sort(itemSorter(state.sort));
        })
        .addCase(saveItemStatus.pending, (state, action) => {
            const iKey = itemKey(action.meta.arg);
            state.list = [
                ...state.list.filter(item => itemKey(item) !== iKey),
                ...state.list.filter(item => itemKey(item) === iKey).map(item => ({...item, saving: InProcessStatus.saving}))
            ].sort(itemSorter(state.sort))
        })
        .addCase(saveItemStatus.rejected, (state, action) => {
            state.list = [
                ...state.list.filter(item => itemKey(item) !== itemKey(action.meta.arg)),
                ...state.list.filter(item => itemKey(item) === itemKey(action.meta.arg))
                    .map(item => ({...item, queryStatus: QueryStatus.rejected}))
            ].sort(itemSorter(state.sort))
        })
        .addCase(saveItemStatus.fulfilled, (state, action) => {
            const list = state.list.filter(item => itemKey(item) !== itemKey(action.meta.arg));
            if (action.payload) {
                list.push(action.payload);
            }
            state.list = list.sort(itemSorter(state.sort))
        })
        .addCase(saveMultipleItemStatus.pending, (state, action) => {
            const itemKeys = action.meta.arg.map(item => itemKey(item));
            state.list = [
                ...state.list.filter(item => !itemKeys.includes(itemKey(item))),
                ...state.list.filter(item => itemKeys.includes(itemKey(item)))
                    .map(item => ({...item, saving: QueryStatus.pending}))
            ].sort(itemSorter(state.sort));
            state.loading = QueryStatus.pending;
        })
        .addCase(saveMultipleItemStatus.rejected, (state) => {
            state.loading = QueryStatus.rejected;
        })
        .addCase(saveMultipleItemStatus.fulfilled, (state) => {
            state.loading = QueryStatus.fulfilled;
        })
        .addCase(toggleFilterOnHand, (state, action) => {
            setPreference(localStorageKeys.filterOnHand, action.payload ?? !state.filterOnHand);
            state.filterOnHand = action.payload ?? !state.filterOnHand;
            state.page = 0;
        })
        .addCase(toggleFilterActive, (state, action) => {
            setPreference(localStorageKeys.filterInactive, action.payload ?? !state.filterInactive);
            state.filterInactive = action.payload ?? !state.filterInactive;
            state.page = 0;
        })
        .addCase(toggleFilterSelected, (state, action) => {
            setPreference(localStorageKeys.filterOnlySelected, action.payload ?? !state.filterOnlySelected);
            state.filterOnlySelected = action.payload ?? !state.filterOnlySelected;
            state.page = 0;
        })
        .addCase(toggleSelected, (state, action) => {
            state.list = [
                ...state.list.filter(item => itemKey(item) !== itemKey(action.payload)),
                ...state.list.filter(item => itemKey(item) === itemKey(action.payload))
                    .map(item => ({...item, selected: action.payload.selected ?? !item.selected}))
            ].sort(itemSorter(state.sort));
        })
        .addCase(selectMultipleItems, (state, action) => {
            state.list = [
                ...state.list.filter(item => !action.payload.keys.includes(itemKey(item))),
                ...state.list.filter(item => action.payload.keys.includes(itemKey(item)))
                    .map(item => ({...item, selected: action.payload.selected ?? !item.selected}))
            ].sort(itemSorter(state.sort));
        })
        .addCase(setReorderOptions, (state, action) => {
            state.list = [
                ...state.list.filter(item => itemKey(item) !== itemKey(action.payload)),
                ...state.list.filter(item => itemKey(item) === itemKey(action.payload))
                    .map(item => ({...item, ...action.payload, changed: true}))
            ].sort(itemSorter(state.sort));
        })
        .addCase(saveItemReorder.pending, (state, action) => {
            state.list = [
                ...state.list.filter(item => itemKey(item) !== itemKey(action.meta.arg)),
                ...state.list.filter(item => itemKey(item) !== itemKey(action.meta.arg))
                    .map(item => ({...item, saving: InProcessStatus.saving}))
            ].sort(itemSorter(state.sort));
        })
        .addCase(saveItemReorder.rejected, (state, action) => {
            state.list = [
                ...state.list.filter(item => itemKey(item) !== itemKey(action.meta.arg)),
                ...state.list.filter(item => itemKey(item) !== itemKey(action.meta.arg))
                    .map(item => ({...item, saving: QueryStatus.rejected}))
            ].sort(itemSorter(state.sort));
        })
        .addCase(saveItemReorder.fulfilled, (state, action) => {
            const list = state.list.filter(item => itemKey(item) !== itemKey(action.meta.arg));
            if (action.payload) {
                list.push(action.payload);
            }
            state.list = list.sort(itemSorter(state.sort));
        })
        .addCase(saveMultipleItemReorder.pending, (state, action) => {
            const itemKeys = action.meta.arg.map(item => itemKey(item));
            state.list = [
                ...state.list.filter(item => !itemKeys.includes(itemKey(item))),
                ...state.list.filter(item => itemKeys.includes(itemKey(item)))
                    .map(item => ({...item, saving: QueryStatus.pending}))
            ].sort(itemSorter(state.sort));
            state.saving = QueryStatus.pending;
        })
        .addCase(saveMultipleItemReorder.fulfilled, (state, action) => {
            state.saving = QueryStatus.fulfilled;
        })
        .addCase(saveMultipleItemReorder.rejected, (state) => {
            state.saving = QueryStatus.rejected;
        })
        .addCase(setPage, (state, action) => {
            state.page = action.payload;
        })
        .addCase(setRowsPerPage, (state, action) => {
            state.page = 0;
            state.rowsPerPage = action.payload;
        })
        .addCase(setSort, (state, action) => {
            state.sort = action.payload;
            state.page = 0;
            state.list = state.list.sort(itemSorter(state.sort));
        })
        .addCase(searchItems, (state, action) => {
            state.page = 0;
            state.search = action.payload;
        })
})

export default itemsReducer;
