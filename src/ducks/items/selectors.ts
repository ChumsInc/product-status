import {RootState} from "../index";
import {createSelector} from "reselect";
import {itemSorter} from "./utils";
import {QueryStatus} from "@reduxjs/toolkit/query";
import {InProcessStatus, ItemRecord} from "../../types";


export const selectItemList = (state: RootState) => state.items.list;
export const selectItemListLength = (state: RootState) => state.items.list.length;
export const selectItemsLoading = (state: RootState) => state.items.loading === QueryStatus.pending;
export const selectItemsSaving = (state: RootState) => state.items.saving === QueryStatus.pending;
export const selectItemSearchFilter = (state: RootState) => state.items.search;
export const selectItemsFilterOnHand = (state: RootState) => state.items.filterOnHand;
export const selectItemsFilterInactive = (state: RootState) => state.items.filterInactive;
export const selectFilterOnlySelected = (state: RootState) => state.items.filterOnlySelected;
export const selectNextStatus = (state: RootState) => state.items.nextStatus;


export const selectPage = (state:RootState) => state.items.page;

export const selectRowsPerPage = (state:RootState) => state.items.rowsPerPage;

export const selectSort = (state:RootState) => state.items.sort;

const listFilter = (list:ItemRecord[], search:string, filterOnHand: boolean, filterInactive: boolean, filterSelected: boolean) => {
    let searchRegexp = /^/;
    try {
        searchRegexp = new RegExp(search, 'i');
    } catch (err) {
        searchRegexp = /^/
    }

    return list
        .filter(item => !search || searchRegexp.test(item.ItemCode) || searchRegexp.test(item.ItemCodeDesc))
        .filter(item => !filterInactive || (item.InactiveItem === 'Y' || item.ProductType === 'D'))
        .filter(item => !filterOnHand || item.QuantityOnHand > 0)
        .filter(item => !filterSelected || item.selected || item.changed);
}

export const selectFilteredItems = createSelector(
    [selectItemList, selectItemSearchFilter, selectItemsFilterOnHand, selectItemsFilterInactive, selectFilterOnlySelected, selectSort],
    (list, search, filterOnHand, filterInactive, filterSelected, sort) => {
        return listFilter(list, search, filterOnHand, filterInactive, filterSelected).sort(itemSorter(sort));
    });


export const selectSelectedItems = createSelector(
    [selectItemList, selectSort],
    (list, sort) => {
        return list.filter(item => item.selected).sort(itemSorter(sort));
    }
);

export const selectChangedItems = createSelector(
    [selectItemList, selectSort],
    (list, sort) => {
        return list.filter(item => item.changed).sort(itemSorter(sort));
    }
);

export const selectZeroCount = (state:RootState) => state.items.list.filter(item => item.QuantityOnHand === 0 && item.QuantityAvailable === 0).length;

export const selectInactiveCount = (state:RootState) => state.items.list.filter(item => item.InactiveItem === 'Y' || item.ProductType === 'D').length;

export const selectSelectedCount = (state:RootState) => state.items.list.filter(item => item.selected || item.changed).length;

export const selectPendingCount = (state:RootState) => state.items.list.filter(item => item.saving === QueryStatus.pending).length;
export const selectSavingCount = (state:RootState) => state.items.list.filter(item => item.saving === InProcessStatus.saving).length;
