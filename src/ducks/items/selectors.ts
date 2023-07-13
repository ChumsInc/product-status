import {RootState} from "../index";
import {createSelector} from "reselect";
import {itemSorter} from "./utils";
import {QueryStatus} from "@reduxjs/toolkit/query";
import {InProcessStatus, ItemRecord} from "../../types";


export const selectItemList = (state: RootState) => state.items.list;
export const selectItemsLoading = (state: RootState) => state.items.loading === QueryStatus.pending;
export const selectItemsSaving = (state: RootState) => state.items.saving === QueryStatus.pending;
export const selectItemSearchFilter = (state: RootState) => state.items.search;
export const selectItemsShowOnHand = (state: RootState) => state.items.showOnHand;
export const selectItemsShowInactive = (state: RootState) => state.items.showInactive;
export const selectItemsShowSelected = (state: RootState) => state.items.showOnlySelected;


export const selectPage = (state:RootState) => state.items.page;

export const selectRowsPerPage = (state:RootState) => state.items.rowsPerPage;

export const selectSort = (state:RootState) => state.items.sort;

const listFilter = (list:ItemRecord[], search:string, showOnlyOnHand: boolean, showInactive: boolean, filterSelected: boolean) => {
    let searchRegexp = /^/;
    try {
        searchRegexp = new RegExp(search, 'i');
    } catch (err) {
        searchRegexp = /^/
    }

    return list
        .filter(item => !search || searchRegexp.test(item.ItemCode) || searchRegexp.test(item.ItemCodeDesc))
        .filter(item => showInactive || !(item.InactiveItem === 'Y' || item.ProductType === 'D'))
        .filter(item => !showOnlyOnHand || item.QuantityOnHand !== 0)
        .filter(item => !filterSelected || item.selected || item.changed);
}

export const selectFilteredItems = createSelector(
    [selectItemList, selectItemSearchFilter, selectItemsShowOnHand, selectItemsShowInactive, selectItemsShowSelected, selectSort],
    (list, search, filterOnHand, showInactive, filterSelected, sort) => {
        return listFilter(list, search, filterOnHand, showInactive, filterSelected).sort(itemSorter(sort));
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
