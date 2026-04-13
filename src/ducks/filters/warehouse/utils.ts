import type {Warehouse} from "chums-types";

export const warehouseSort = (a: Warehouse, b: Warehouse) => a.WarehouseCode > b.WarehouseCode ? 1 : -1;

export const warehouseFilter = (value: string) => (element: Warehouse) => {
    let regex = /^/;
    try {
        regex = new RegExp(value, 'i')
    } catch (_err: unknown) {
        // do nothing
    }

    return !value
        || element.WarehouseCode.toLowerCase().startsWith(value.toLowerCase())
        || regex.test(element.WarehouseDesc);
}
