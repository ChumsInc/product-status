import type {ItemRecord, ItemStatusProps} from "../types";
import {fetchJSON} from "@chumsinc/ui-utils";
import Decimal from "decimal.js";

const urlItems = '/api/operations/production/item/status/items.json';
const urlPostStatus = '/api/operations/production/item/status/:ItemCode/:WarehouseCode.json';
const urlSaveReorderOptions = `/sage/api/operations/item-reorder-options.php`;


export async function fetchItems(params: URLSearchParams): Promise<ItemRecord[]> {
    try {
        const url = `${urlItems}?${params.toString()}`;
        const res = await fetchJSON<{ result: ItemRecord[] }>(url);
        return res?.result ?? [];
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
        const res = await fetchJSON<{ result: ItemRecord[] }>(url, {method: 'POST', body});
        const [item] = res?.result ?? [];
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
            MinimumOrderQty,
            changes,
        } = args;
        const body = {
            Company: 'CHI',
            ItemCode,
            WarehouseCode,
            ReorderMethod: changes?.ReorderMethod ?? ReorderMethod,
            ReorderPointQty: new Decimal(changes?.ReorderPointQty ?? ReorderPointQty).toDecimalPlaces(0).toNumber(),
            EconomicOrderQty: new Decimal(changes?.EconomicOrderQty ?? EconomicOrderQty).toDecimalPlaces(0).toNumber(),
            MinimumOrderQty: new Decimal(changes?.MinimumOrderQty ?? MinimumOrderQty).toDecimalPlaces(0).toNumber(),
            MaximumOnHandQty: new Decimal(changes?.MaximumOnHandQty ?? MaximumOnHandQty).toDecimalPlaces(0).toNumber()
        }
        await fetchJSON(urlSaveReorderOptions, {method: 'POST', body: JSON.stringify(body)});

        const params = new URLSearchParams();
        params.set('itemCode', `^${ItemCode}$`);
        params.set('warehouse', WarehouseCode);
        const [item] = await fetchItems(params);
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
