import {ItemSorterProps} from "./types";
import {ItemRecord, ReorderMethod} from "../../types";
import classNames from "classnames";

export const itemKey = (item:ItemRecord) => `${item.WarehouseCode}:${item.ItemCode}`;

export const itemSorter = (sort:ItemSorterProps) => (a:ItemRecord, b:ItemRecord) => {
    switch (sort.field) {
    case 'ItemCode':
    case "ItemCodeDesc":
    case 'WarehouseCode':
    case 'ProductType':
    case 'ProductLine':
        return (a[sort.field].toLowerCase() === b[sort.field].toLowerCase()
                ? (itemKey(a) > itemKey(b) ? 1 : -1)
                : (a[sort.field].toLowerCase() > b[sort.field].toLowerCase() ? 1 : -1)) * (sort.ascending ? 1 : -1);
    case 'AverageUnitCost':
    case 'QuantityAvailable':
    case 'QuantityAvailableCost':
    case 'QuantityOnHand':
    case 'StandardUnitCost':
    case 'MaximumOnHandQty':
    case 'MinimumOrderQty':
    case 'EconomicOrderQty':
    case 'ReorderPointQty':
        return (a[sort.field] - b[sort.field]) * (sort.ascending ? 1 : -1);
    case 'changed':
    case 'selected':
    case 'ItemStatusHistory':
        return (itemKey(a) > itemKey(b) ? 1 : -1);
    default:
        return ((a[sort.field] || '').toLowerCase() === (b[sort.field] || '').toLowerCase()
            ? (itemKey(a) > itemKey(b) ? 1 : -1)
            : ((a[sort.field] || '').toLowerCase() > (b[sort.field] || '').toLowerCase() ? 1 : -1)) * (sort.ascending ? 1 : -1);
    }
}

export const itemKeySorter = (a:ItemRecord, b:ItemRecord) => itemKey(a) > itemKey(b) ? 1 : -1;

export const updateItemInArray = (items:ItemRecord[], itemKeys: string[], updater: (item:ItemRecord) => ItemRecord):ItemRecord[] => {
    return [
        ...items.filter(item => !itemKeys?.includes(itemKey(item))),
        ...items.filter(item => itemKeys?.includes(itemKey(item))).map(updater),
    ].sort(itemKeySorter);
}

export const updateItemStatus = (newStatus:string) => (item:ItemRecord):ItemRecord => {
    return {
        ...item,
        ItemStatus: newStatus,
        changed: true
    }
}

export const updateItemSelected = (force?:boolean) => (item:ItemRecord):ItemRecord => {
    return {
        ...item,
        selected: typeof force === 'undefined' ? !item.selected : force,
    }
}

export const updateReorderMethod = (value?:ReorderMethod) => (item:ItemRecord):ItemRecord => {
    return {
        ...item,
        ReorderMethod: value || 'E',
        changed: true
    }
}

export const updateReorderPointQty = (qty?:number) => (item:ItemRecord):ItemRecord => {
    return {
        ...item,
        ReorderPointQty: qty || 0,
        changed: true
    }
}

export const updateEconomicOrderQty = (qty?:number) => (item:ItemRecord):ItemRecord => {
    return {
        ...item,
        EconomicOrderQty: qty || 0,
        changed: true
    }
}

export const updateMinimumOrderQty = (qty?:number) => (item:ItemRecord):ItemRecord => {
    return {
        ...item,
        MinimumOrderQty: qty || 0,
        changed: true
    }
}

export const updateMaximumOnHandQty = (qty?:number) => (item:ItemRecord):ItemRecord => {
    return {
        ...item,
        MaximumOnHandQty: qty || 0,
        changed: true
    }
}

export const rowClassName = (row:ItemRecord) => {
    return classNames({
        'text-danger': ((row.InactiveItem === 'Y' || /^D/.test(row.ItemStatus)) && row.QuantityAvailable < 0),
        'text-info': (row.InactiveItem === 'Y' && row.QuantityOnHand !== 0 && row.QuantityAvailable === 0),
        'text-success': (row.InactiveItem === 'Y' && row.QuantityOnHand === 0 && row.QuantityAvailable === 0),
        'table-warning': row.changed,
    })
}
