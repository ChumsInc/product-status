import {PATH_ITEMS, PATH_SAVE_ITEM_STATUS} from "../../constants";
import {Filter, selectFilter} from "../filters";
import {ItemsAction} from "./types";
import {ThunkAction} from "redux-thunk";
import {RootState} from "../index";
import {
    itemsFetchFailed,
    itemsFetchRequested,
    itemsFetchSucceeded,
    itemsSaveFailed,
    itemsSaveRequested,
    itemsSaveSucceeded, itemsSetFilterInactive,
    itemsSetFilterOnHand,
    itemsSetFilterSelected, itemsSetNextStatus,
    itemsSetSearch,
    itemsSetSelected, setEconomicOrderQty, setMaximumOnHandQty, setMinimumOrderQty, setReorderMethod, setReorderPointQty
} from "./actionTypes";
import {selectChangedItems, selectItemsLoading, selectSelectedItems} from "./selectors";
import {fetchJSON} from "chums-ducks";
import {ItemRecord} from "../../types";
import pLimit from 'p-limit';

interface ItemsThunkAction extends ThunkAction<any, RootState, unknown, ItemsAction> {
}

const URL_SAVE_REORDER_OPTIONS = `/sage/api/operations/item-reorder-options.php`;

export const getQuery = (filter: Filter): URLSearchParams => {
    const params = new URLSearchParams();
    const {itemCode, productType, warehouse, productLine, category, collection, baseSKU, status, primaryVendor} = filter;
    params.set('productType', productType);
    if (itemCode) {
        params.set('itemCode', itemCode);
    }
    if (warehouse) {
        params.set('warehouse', warehouse)
    }
    if (productLine) {
        params.set('pl', productLine);
    }
    if (primaryVendor) {
        params.set('vendor', primaryVendor);
    }
    if (category) {
        params.set('cat', category);
    }
    if (collection) {
        params.set('subcat', collection);
    }
    if (baseSKU) {
        params.set('sku', baseSKU);
    }
    if (status) {
        params.set('status', status);
    }
    return params;
};

export const fetchItemsAction = (): ItemsThunkAction =>
    async (dispatch, getState) => {
        try {
            const state = getState();
            if (selectItemsLoading(state)) {
                return;
            }
            dispatch({type: itemsFetchRequested});
            const params = getQuery(selectFilter(state));
            const url = PATH_ITEMS.replace(':Company', 'chums') + `?${params.toString()}`;
            const {result} = await fetchJSON<{ result: ItemRecord[] }>(url, {cache: 'no-cache'});
            dispatch({type: itemsFetchSucceeded, payload: {items: result}});
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("fetchItemsAction()", error.message);
                return dispatch({type: itemsFetchFailed, payload: {error, context: itemsFetchRequested}})
            }
            console.error("fetchItemsAction()", error);
        }
    }

export const saveItemStatusAction = (item: ItemRecord): ItemsThunkAction =>
    async (dispatch, getState) => {
        try {
            const state = getState();
            if (selectItemsLoading(state)) {
                return;
            }
            dispatch({type: itemsSaveRequested});
            const url = PATH_SAVE_ITEM_STATUS
                .replace(':Company', 'chums')
                .replace(':ItemCode', item.ItemCode)
                .replace(':WarehouseCode', item.WarehouseCode);
            const {ItemStatus} = item;
            const body = {ItemStatus};
            const {result} = await fetchJSON<{ result: ItemRecord[] }>(url, {
                method: 'post',
                body: JSON.stringify(body)
            });
            if (result.length) {
                dispatch({type: itemsSaveSucceeded, payload: {item: result[0]}});
            } else {
                dispatch({type: itemsSaveSucceeded});
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("saveItemStatusAction()", error.message);
                return dispatch({type: itemsSaveFailed, payload: {error, context: itemsSaveRequested}})
            }
            console.error("saveItemStatusAction()", error);
        }
    }

export const saveAllSelectedAction = (newStatus: string): ItemsThunkAction =>
    async (dispatch, getState) => {
        const state = getState();
        if (selectItemsLoading(state)) {
            return;
        }
        const items = selectSelectedItems(state)
        for await (const item of items) {
            dispatch(saveItemStatusAction({...item, ItemStatus: newStatus}));
        }
    };

export const selectItemAction = (key: string, force?: boolean): ItemsAction => ({
    type: itemsSetSelected,
    payload: {itemKeys: [key], force}
});

export const selectItemsAction = (itemKeys: string[], force: boolean): ItemsAction => ({
    type: itemsSetSelected,
    payload: {itemKeys, force}
});
export const itemsSetFilterAction = (value: string) => ({type: itemsSetSearch, payload: {value}});

export const itemsSetFilterOnHandAction = (force: boolean) => ({type: itemsSetFilterOnHand, payload: {force}});
export const itemsSetFilterInactiveAction = (force: boolean) => ({type: itemsSetFilterInactive, payload: {force}});
export const itemsSetFilterSelectedAction = (force: boolean) => ({type: itemsSetFilterSelected, payload: {force}});

export const setNewStatusAction = (value:string) => ({type: itemsSetNextStatus, payload: {value}});

export const setReorderMethodAction = (key: string, value:string):ItemsAction => ({type: setReorderMethod, payload: {itemKeys: [key], value}});
export const setReorderPointAction = (key: string, quantity:number):ItemsAction => ({type: setReorderPointQty, payload: {itemKeys: [key], quantity}})
export const setMinimumOrderAction = (key: string, quantity:number):ItemsAction => ({type: setMinimumOrderQty, payload: {itemKeys: [key], quantity}})
export const setEconomicOrderAction = (key: string, quantity:number):ItemsAction => ({type: setEconomicOrderQty, payload: {itemKeys: [key], quantity}})
export const setMaximumOnHandAction = (key: string, quantity:number):ItemsAction => ({type: setMaximumOnHandQty, payload: {itemKeys: [key], quantity}})


export const saveChangedItemsAction = ():ItemsThunkAction =>
    async (dispatch, getState) => {
        try {
            const state = getState();
            if (selectItemsLoading(state)) {
                return;
            }
            const items = selectChangedItems(state);
            const limit = pLimit(3);
            dispatch({type: itemsSaveRequested});
            for await (const item of items) {
                const updatedItem = await saveItemReorderOptions(item);
                dispatch({type: itemsSaveSucceeded, payload: {item: updatedItem}});
            }
        } catch(error:unknown) {
            if (error instanceof Error) {
                console.log("saveChangedItemsAction()", error.message);
                return dispatch({type:itemsSaveFailed, payload: {error, context: itemsSaveRequested}})
            }
            console.error("saveChangedItemsAction()", error);
        }
    }

export async function saveItemReorderOptions(item:ItemRecord):Promise<ItemRecord> {
    try {
        const {ItemCode, WarehouseCode, ReorderMethod, ReorderPointQty, EconomicOrderQty, MaximumOnHandQty, MinimumOrderQty} = item;
        const body = {
            Company: 'CHI',
            ItemCode,
            WarehouseCode, ReorderMethod, ReorderPointQty, EconomicOrderQty, MaximumOnHandQty, MinimumOrderQty
        }
        const response = await fetchJSON(URL_SAVE_REORDER_OPTIONS, {method: 'POST', body: JSON.stringify(body)});
        console.log(response);
        const params = new URLSearchParams();
        params.set('itemCode', `^${ItemCode}$`)
        params.set('warehouseCode', WarehouseCode);
        const url = PATH_ITEMS.replace(':Company', 'chums') + `?${params.toString()}`;
        const {result} = await fetchJSON<{ result: ItemRecord[] }>(url, {cache: 'no-cache'});
        return result[0];
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.log("saveItemReporderOptions()", err.message);
            return Promise.reject(err);
        }
        return Promise.reject(new Error('Unable to save item'));
    }
}
