import {RootState} from "../index";
import {createSelector} from "reselect";
import {selectCurrentPage, selectRowsPerPage, selectTableSort, selectPageFilter, SorterProps} from "chums-ducks";
import {itemStatusTableKey} from "./actionTypes";
import {itemSorter} from "./utils";
import {ItemSorterProps} from "./types";


export const selectItemList = (state: RootState) => state.items.list;
export const selectItemListLength = (state:RootState) => state.items.list.length;
export const selectItemsLoading = (state: RootState) => state.items.loading;
export const selectItemsSaving = (state: RootState) => state.items.saving;
export const selectItemSearchFilter = (state: RootState) => state.items.search;
export const selectItemsFilterOnHand = (state: RootState) => state.items.filterOnHand;
export const selectItemsFilterInactive = (state: RootState) => state.items.filterInactive;
export const selectFilterOnlySelected = (state: RootState) => state.items.filterOnlySelected;
export const selectNextStatus = (state:RootState) => state.items.nextStatus;


export const selectFilteredItems = createSelector(
    [selectItemList, selectItemSearchFilter, selectItemsFilterOnHand, selectItemsFilterInactive, selectFilterOnlySelected, selectTableSort(itemStatusTableKey)],
    (list, search, onHand, inactive, onlySelected, sort) => {
        let searchRegexp = /^/;
        try {
            searchRegexp = new RegExp(search, 'i');
        } catch(err) {
            searchRegexp = /^/
        }

        return list.filter(item => searchRegexp.test(item.ItemCode) || searchRegexp.test(item.ItemCodeDesc))
            .filter(item => inactive ? item.InactiveItem === 'Y' : (item.InactiveItem !== 'Y' || item.QuantityOnHand !== 0 || item.QuantityAvailable !== 0))
            .filter(item => !onHand || item.QuantityOnHand > 0)
            .filter(item => !onlySelected || item.selected || item.changed)
            .sort(itemSorter(sort as ItemSorterProps));
    });



export const selectSelectedItems = (state:RootState) => state.items.list.filter(item => item.selected);
export const selectChangedItems = (state:RootState) => state.items.list.filter(item => item.changed);
