import {Filter} from "../ducks/filters";
import {ItemRecord, ItemStatusProps} from "../types";
import {getFilterQuery} from "./filters";
import {fetchJSON} from "chums-components";

const urlItems = '/api/operations/production/item/status/chums/';
const urlPostStatus = '/api/operations/production/item/status/chums/:ItemCode/:WarehouseCode';
const urlSaveReorderOptions = `/sage/api/operations/item-reorder-options.php`;


export async function fetchItems(filter: Partial<Filter>): Promise<ItemRecord[]> {
    try {
        const url = `${urlItems}?${getFilterQuery(filter)}`;
        const {result} = await fetchJSON<{ result: ItemRecord[] }>(url);
        return result ?? [];
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("fetchItems()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchItems()", err);
        return Promise.reject(new Error('Error in fetchItems()'));
    }
}

export async function postItemStatus(props: ItemStatusProps): Promise<ItemRecord | null> {
    try {
        const url = urlPostStatus.replace(':ItemCode', encodeURIComponent(props.ItemCode))
            .replace(':WarehouseCode', encodeURIComponent(props.WarehouseCode));
        const body = JSON.stringify({ItemStatus: props.ItemStatus});
        const {result} = await fetchJSON<{ result: ItemRecord[] }>(url, {method: 'POST', body});
        const [item] = result ?? [];
        return item ?? null;
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("postItemStatus()", err.message);
            return Promise.reject(err);
        }
        console.debug("postItemStatus()", err);
        return Promise.reject(new Error('Error in postItemStatus()'));
    }
}

export async function postReorderOptions(args: ItemRecord): Promise<ItemRecord | null> {
    try {
        const {
            ItemCode,
            WarehouseCode,
            ReorderMethod,
            ReorderPointQty,
            EconomicOrderQty,
            MaximumOnHandQty,
            MinimumOrderQty
        } = args;
        const body = {
            Company: 'CHI',
            ItemCode,
            WarehouseCode, ReorderMethod, ReorderPointQty, EconomicOrderQty, MaximumOnHandQty, MinimumOrderQty
        }
        await fetchJSON(urlSaveReorderOptions, {method: 'POST', body: JSON.stringify(body)});

        const [item] = await fetchItems({warehouse: WarehouseCode, itemCode: `^${ItemCode}$`});
        return item ?? null;
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("postReorderOptions()", err.message);
            return Promise.reject(err);
        }
        console.debug("postReorderOptions()", err);
        return Promise.reject(new Error('Error in postReorderOptions()'));
    }
}
