import {ItemKeyProps, ItemRecord} from "../../types";
import {SortProps} from "chums-components";

export const itemKey = (item: ItemKeyProps) => `${item.WarehouseCode}:${item.ItemCode}`;
export const itemKeyProps = ({ItemCode, WarehouseCode}: ItemKeyProps): ItemKeyProps => ({ItemCode, WarehouseCode})

export const itemSorter = (sort: SortProps<ItemRecord>) => (a: ItemRecord, b: ItemRecord) => {
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
                : (a[field] ? 1 : 0) - (b[field] ? 1 : 0)
        ) * sortMod;
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

export const itemKeySorter = (a: ItemRecord, b: ItemRecord) => itemKey(a) > itemKey(b) ? 1 : -1;

export const updateItemInArray = (items: ItemRecord[], itemKeys: string[], updater: (item: ItemRecord) => ItemRecord): ItemRecord[] => {
    return [
        ...items.filter(item => !itemKeys?.includes(itemKey(item))),
        ...items.filter(item => itemKeys?.includes(itemKey(item))).map(updater),
    ].sort(itemKeySorter);
}
