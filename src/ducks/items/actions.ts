import {Filter} from "../filters";
import {RootState} from "../index";
import {selectPendingCount, selectSavingCount} from "./selectors";
import {SortProps} from "chums-components";
import {ItemKeyProps, ItemRecord, ItemStatusProps} from "../../types";
import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {fetchItems, postItemStatus, postReorderOptions} from "../../api/items";


export const toggleSelected = createAction<ItemKeyProps & Pick<ItemRecord, 'selected'>>('items/selectItem');

export const selectMultipleItems = createAction<{ keys: string[], selected: boolean | undefined }>('items/selectItems');

export const searchItems = createAction<string>('items/search');

export const toggleFilterOnHand = createAction<boolean | undefined>('items/filterOnHand');

export const toggleFilterActive = createAction<boolean | undefined>('items/filterInactive');
export const toggleFilterSelected = createAction<boolean | undefined>('items/filterSelected');

export const setReorderOptions = createAction<ItemKeyProps & Partial<ItemRecord>>('items/changeReorderOptions');

export const setPage = createAction<number>('items/setPage');
export const setRowsPerPage = createAction<number>('items/setRowsPerPage');

export const setSort = createAction<SortProps<ItemRecord>>('items/setSort');

export const loadItems = createAsyncThunk<ItemRecord[], Filter>(
    'items/load',
    async (arg) => {
        return await fetchItems(arg);
    }
)

export const saveItemStatus = createAsyncThunk<ItemRecord | null, ItemStatusProps>(
    'items/saveItem',
    async (arg) => {
        return await postItemStatus(arg);
    }
);

export const saveMultipleItemStatus = createAsyncThunk<void, ItemStatusProps[]>(
    'items/saveMultipleItems',
    async (arg, {dispatch, getState}) => {
        let intervalId = 0;
        let index = 0;
        const maxFiles = 3;
        intervalId = window.setInterval(() => {
            const state = getState() as RootState;
            let pending = selectPendingCount(state);
            let saving = selectSavingCount(state);
            if (!pending) {
                window.clearInterval(intervalId);
                return;
            }
            while (saving < maxFiles && index < arg.length) {
                dispatch(saveItemStatus(arg[index]));
                index += 1;
                saving += 1;
            }
        }, 250)
    }
)

export const saveItemReorder = createAsyncThunk<ItemRecord | null, ItemRecord>(
    'items/saveItemReorder',
    async (arg) => {
        return await postReorderOptions(arg);
    }
)

export const saveMultipleItemReorder = createAsyncThunk<void, ItemRecord[]>(
    'items/saveMultipleReorder',
    async (arg, {dispatch, getState}) => {
        let intervalId = 0;
        let index = 0;
        const maxFiles = 3;
        function savePending() {
            const state = getState() as RootState;
            let pending = selectPendingCount(state);
            let saving = selectSavingCount(state);
            console.log('savePending', {pending, saving, maxFiles, index})
            if (!pending) {
                window.clearInterval(intervalId);
                return;
            }
            while (saving < maxFiles && index < arg.length) {
                dispatch(saveItemReorder(arg[index]));
                index += 1;
                saving += 1;
            }
        }
        intervalId = window.setInterval(savePending, 250)
    }
)
