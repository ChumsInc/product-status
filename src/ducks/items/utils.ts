import {ItemSorterProps} from "./types";
import {ItemKeyProps, ItemRecord, ReorderMethod} from "../../types";
import classNames from "classnames";
import {SortProps} from "chums-components";

export const itemKey = (item:ItemKeyProps) => `${item.WarehouseCode}:${item.ItemCode}`;
export const itemKeyProps = ({ItemCode, WarehouseCode}:ItemKeyProps):ItemKeyProps => ({ItemCode, WarehouseCode})

export const itemSorter = (sort:SortProps<ItemRecord>) => (a:ItemRecord, b:ItemRecord) => {
    const {field, ascending} = sort;
    const sortMod = ascending ? 1 : -1;
    switch (field) {
    case 'ItemCode':
    case "ItemCodeDesc":
    case 'WarehouseCode':
    case 'ProductType':
    case 'ProductLine':
        return (a[field].toLowerCase() === b[field].toLowerCase()
                ? (itemKey(a) > itemKey(b) ? 1 : -1)
                : (a[field].toLowerCase() > b[field].toLowerCase() ? 1 : -1)) * sortMod;
    case 'AverageUnitCost':
    case 'QuantityAvailable':
    case 'QuantityAvailableCost':
    case 'QuantityOnHand':
    case 'StandardUnitCost':
    case 'MaximumOnHandQty':
    case 'MinimumOrderQty':
    case 'EconomicOrderQty':
    case 'ReorderPointQty':
        return (
            a[field] === b[field]
                ? (itemKey(a) > itemKey(b) ? 1 : -1)
                : a[field] - b[field]
        ) * sortMod;
    case 'changed':
    case 'selected':
        return (
            a[field] === b[field]
                ? (itemKey(a) > itemKey(b) ? 1 : -1)
                : (a[field] ? 1 : 0 ) - (b[field] ? 1 : 0)
        )  * sortMod;
    case 'ItemStatusHistory':
    case 'loading':
    case 'saving':
        return (itemKey(a) > itemKey(b) ? 1 : -1);
    default:
        return ((a[field] || '').toLowerCase() === (b[field] || '').toLowerCase()
            ? (itemKey(a) > itemKey(b) ? 1 : -1)
            : ((a[field] || '').toLowerCase() > (b[field] || '').toLowerCase() ? 1 : -1)) * sortMod;
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
