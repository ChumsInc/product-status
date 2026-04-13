import type {ItemRecord, ItemStatusProps} from "../../types";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchItems, postItemStatus, postReorderOptions} from "@/api/items.ts";


export const loadItems = createAsyncThunk<ItemRecord[], URLSearchParams>(
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
    async (arg, {dispatch}) => {
        await processList(arg, (item) => dispatch(saveItemStatus(item)), 3);
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
    async (arg, {dispatch}) => {
        await processList(arg, (item) => dispatch(saveItemReorder(item)), 3)
    }
)


async function processList<T = unknown>(list: T[], callback: (arg: T) => void, limit: number) {
    const executing = new Set();

    for (const arg of list) {
        // create a wrapper to save the item
        const p = Promise.resolve().then(() => callback(arg));
        executing.add(p);

        //cleanup when done
        const cleanup = () => executing.delete(p);
        p.finally(cleanup);

        if (executing.size >= limit) {
            await Promise.race(executing);
        }
    }
}
