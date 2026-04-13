import {createEntityAdapter, createSelector, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {ItemKeyProps, ItemRecord, ItemRecordEditFields} from "../../types.ts";
import {isItemChanged, itemKey, itemSorter, listFilter} from "@/ducks/items/utils.ts";
import type {SortProps} from "chums-types";
import {LocalStore} from "@chumsinc/ui-utils";
import {localStorageKeys} from "@/api/preferences.ts";
import {dismissAlert} from "@chumsinc/alert-list";
import {loadItems, saveItemReorder, saveItemStatus} from "@/ducks/items/actions.ts";
import Decimal from "decimal.js";

const adapter = createEntityAdapter<ItemRecord, string>({
    selectId: (arg) => itemKey(arg),
    sortComparer: (a, b) => itemKey(a).localeCompare(itemKey(b)),
});

const selectors = adapter.getSelectors();

export interface ItemListState {
    status: 'idle' | 'loading' | 'saving' | 'rejected',
    search: string,
    nextStatus: string;
    showOnHand: boolean;
    showInactive: boolean;
    showOnlySelected: boolean;
    sort: SortProps<ItemRecord>;
}

const extraState: ItemListState = {
    status: 'idle',
    search: '',
    nextStatus: '',
    showOnHand: LocalStore.getItem(localStorageKeys.showOnlyOnHand, false),
    showInactive: LocalStore.getItem(localStorageKeys.showInactive, true),
    showOnlySelected: LocalStore.getItem(localStorageKeys.showOnlySelected, false),
    sort: {field: 'ItemCode', ascending: true},
}

const itemListSlice = createSlice({
    name: 'items',
    initialState: adapter.getInitialState(extraState),
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setNextStatus: (state, action: PayloadAction<string>) => {
            state.nextStatus = action.payload;
        },
        setShowOnHand: (state, action: PayloadAction<boolean>) => {
            state.showOnHand = action.payload;
        },
        setShowInactive: (state, action: PayloadAction<boolean>) => {
            state.showInactive = action.payload;
        },
        setShowOnlySelected: (state, action: PayloadAction<boolean>) => {
            state.showOnlySelected = action.payload;
        },
        setSort: (state, action: PayloadAction<SortProps<ItemRecord>>) => {
            state.sort = action.payload;
        },
        toggleItem: (state, action:PayloadAction<{key: string, checked: boolean}>) => {
            adapter.updateOne(state, {
                id: action.payload.key,
                changes: {
                    selected: action.payload.checked
                }
            })
        },
        toggleMultipleItems: (state, action: PayloadAction<{ keys: string[], checked: boolean }>) => {
            const items = selectors.selectAll(state);
            const changes = items
                .filter(item => action.payload.keys.includes(itemKey(item)))
                .map((item) => {
                const key = itemKey(item);
                return {
                    id: key,
                    changes: {selected: action.payload.checked}
                }
            })
            adapter.updateMany(state, changes)
        },
        updateItem: (state, action: PayloadAction<ItemKeyProps & ItemRecordEditFields>) => {
            const key = itemKey(action.payload);
            const {ItemCode, WarehouseCode, ...rest} = action.payload;
            const existing = selectors.selectById(state, key);
            const changes:ItemRecordEditFields = {...existing.changes, ...rest};
            const changed = isItemChanged({...existing, changes});
            adapter.updateOne(state, {id: key, changes: {changes, changed}})
        }
    },
    extraReducers: builder => {
        builder
            .addCase(dismissAlert, (state, action) => {
                if (action.payload?.context?.startsWith('items/')) {
                    state.status = 'idle'
                }
            })
            .addAsyncThunk(loadItems, {
                pending: (state) => {
                    state.status = 'loading'
                },
                fulfilled: (state, action) => {
                    state.status = 'idle';
                    adapter.setAll(state, action.payload);
                },
                rejected: (state) => {
                    state.status = 'rejected';
                }
            })
            .addAsyncThunk(saveItemStatus, {
                pending: (state, action) => {
                    adapter.updateOne(state, {id: itemKey(action.meta.arg), changes: {status: 'saving'}})
                },
                fulfilled: (state, action) => {
                    if (action.payload) {
                        adapter.upsertOne(state, action.payload)
                    } else {
                        adapter.updateOne(state, {id: itemKey(action.meta.arg), changes: {status: 'rejected'}})
                    }
                },
                rejected: (state, action) => {
                    adapter.updateOne(state, {id: itemKey(action.meta.arg), changes: {status: 'rejected'}})
                }
            })
            .addAsyncThunk(saveItemReorder, {
                pending: (state, action) => {
                    adapter.updateOne(state, {
                        id: itemKey(action.meta.arg),
                        changes: {
                            status: 'saving'
                        }
                    })
                },
                fulfilled: (state, action) => {
                    if (action.payload) {
                        adapter.setOne(state, action.payload)
                    } else {
                        adapter.updateOne(state, {
                            id: itemKey(action.meta.arg),
                            changes: {
                                status: 'rejected'
                            }
                        })
                    }
                },
                rejected: (state, action) => {
                    adapter.updateOne(state, {
                        id: itemKey(action.meta.arg),
                        changes: {
                            status: 'rejected'
                        }
                    })
                }
            })
    },
    selectors: {
        selectAll: (state) => selectors.selectAll(state),
        selectItemListStatus: (state) => state.status,
        selectItemListSearch: (state) => state.search,
        selectNextStatus: (state) => state.nextStatus,
        selectShowOnHand: (state) => state.showOnHand,
        selectShowInactive: (state) => state.showInactive,
        selectShowOnlySelected: (state) => state.showOnlySelected,
        selectItemListSort: (state) => state.sort,
    }
});

export default itemListSlice;
export const {
    setSearch,
    setNextStatus,
    setShowInactive,
    setShowOnHand,
    setShowOnlySelected,
    toggleItem,
    toggleMultipleItems,
    setSort,
    updateItem,
} = itemListSlice.actions;
export const {
    selectAll,
    selectItemListSearch,
    selectItemListSort,
    selectItemListStatus,
    selectNextStatus,
    selectShowOnlySelected,
    selectShowInactive,
    selectShowOnHand
} = itemListSlice.selectors

export const selectFilteredItems = createSelector(
    [selectAll, selectItemListSearch, selectShowOnHand, selectShowInactive, selectShowOnlySelected, selectItemListSort],
    (list, search, filterOnHand, showInactive, filterSelected, sort) => {
        return listFilter(list, search, filterOnHand, showInactive, filterSelected).sort(itemSorter(sort));
    }
)

export const selectSelectedItems = createSelector(
    [selectAll, selectItemListSort],
    (list, sort) => {
        return list
            .filter(item => item.selected)
            .sort(itemSorter(sort));
    }
)

export const selectChangedItems = createSelector(
    [selectAll, selectItemListSort],
    (list, sort) => {
        return list
            .filter(item => item.changed)
            .sort(itemSorter(sort));
    }
);

export const selectZeroCount = createSelector(
    [selectAll],
    (list) => list
        .filter(item => {
            return new Decimal(item.QuantityOnHand).eq(0) && new Decimal(item.QuantityAvailable).eq(0)
        })
        .length
)

export const selectInactiveCount = createSelector(
    [selectAll],
    (list) => list
        .filter(item => item.InactiveItem === 'Y' || item.ProductType === 'D')
        .length
)

export const selectCheckedCount = createSelector(
    [selectAll],
    (list) => list.filter(item => item.selected || item.changed).length
)

export const selectPendingCount = createSelector(
    [selectAll],
    (list) => list.filter(item => item.status === 'pending').length
)

export const selectSavingCount = createSelector(
    [selectAll],
    (list) => list.filter(item => item.status === 'saving').length
)
