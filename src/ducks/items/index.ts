import {InProcessStatus, ItemRecord, SavingStatus} from "../../types";
import {itemKey, itemSorter, updateItemInArray} from "./utils";
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
    toggleShowInactive,
    toggleFilterOnHand,
    toggleShowSelected,
    toggleSelected
} from "./actions";
import {SortProps} from "chums-components";

export interface ItemsState {
    list: ItemRecord[];
    loading: QueryStatus;
    saving: QueryStatus;
    search: string;
    nextStatus: string;
    showOnHand: boolean;
    showInactive: boolean;
    showOnlySelected: boolean;
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
    showOnHand: getPreference(localStorageKeys.showOnlyOnHand, false),
    showInactive: getPreference(localStorageKeys.showInactive, true),
    showOnlySelected: getPreference(localStorageKeys.showOnlySelected, false),
    sort: {field: 'ItemCode', ascending: true},
    page: 0,
    rowsPerPage: getPreference(localStorageKeys.rowsPerPage, 25),
}

const updateItemSaving = (status: SavingStatus) => (item: ItemRecord) => ({...item, saving: status});

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
            state.list = updateItemInArray(state.list, [itemKey(action.meta.arg)], updateItemSaving(InProcessStatus.saving))
                .sort(itemSorter(state.sort));
        })
        .addCase(saveItemStatus.rejected, (state, action) => {
            state.list = updateItemInArray(
                state.list,
                [itemKey(action.meta.arg)],
                updateItemSaving(QueryStatus.rejected)
            ).sort(itemSorter(state.sort));
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
            state.list = updateItemInArray(state.list, itemKeys, updateItemSaving(QueryStatus.pending))
                .sort(itemSorter(state.sort));
            state.saving = QueryStatus.pending;
        })
        .addCase(saveMultipleItemStatus.rejected, (state) => {
            state.saving = QueryStatus.rejected;
        })
        .addCase(saveMultipleItemStatus.fulfilled, (state) => {
            state.saving = QueryStatus.fulfilled;
        })
        .addCase(toggleFilterOnHand, (state, action) => {
            setPreference(localStorageKeys.showOnlyOnHand, action.payload ?? !state.showOnHand);
            state.showOnHand = action.payload ?? !state.showOnHand;
            state.page = 0;
        })
        .addCase(toggleShowInactive, (state, action) => {
            setPreference(localStorageKeys.showInactive, action.payload ?? !state.showInactive);
            state.showInactive = action.payload ?? !state.showInactive;
            state.page = 0;
        })
        .addCase(toggleShowSelected, (state, action) => {
            setPreference(localStorageKeys.showOnlySelected, action.payload ?? !state.showOnlySelected);
            state.showOnlySelected = action.payload ?? !state.showOnlySelected;
            state.page = 0;
        })
        .addCase(toggleSelected, (state, action) => {
            state.list = updateItemInArray(
                state.list,
                [itemKey(action.payload)],
                (item) => ({...item, selected: action.payload.selected ?? !item.selected})
            ).sort(itemSorter(state.sort));
        })
        .addCase(selectMultipleItems, (state, action) => {
            state.list = updateItemInArray(
                state.list,
                action.payload.keys,
                (item) => ({...item, selected: action.payload.selected ?? !item.selected})
            ).sort(itemSorter(state.sort));
        })
        .addCase(setReorderOptions, (state, action) => {
            state.list = updateItemInArray(
                state.list,
                [itemKey(action.payload)],
                (item) => ({...item, ...action.payload, changed: true})
            ).sort(itemSorter(state.sort));
        })
        .addCase(saveItemReorder.pending, (state, action) => {
            state.list = updateItemInArray(
                state.list,
                [itemKey(action.meta.arg)],
                (item) => ({...item, saving: InProcessStatus.saving})
            ).sort(itemSorter(state.sort));
        })
        .addCase(saveItemReorder.rejected, (state, action) => {
            state.list = updateItemInArray(
                state.list,
                [itemKey(action.meta.arg)],
                (item) => ({...item, saving: QueryStatus.rejected})
            ).sort(itemSorter(state.sort));
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
            state.list = updateItemInArray(
                state.list,
                itemKeys,
                (item) => ({...item, saving: QueryStatus.pending})
            ).sort(itemSorter(state.sort));
            state.saving = QueryStatus.pending;
        })
        .addCase(saveMultipleItemReorder.fulfilled, (state) => {
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
