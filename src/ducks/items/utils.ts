import type {ItemKeyProps, ItemRecord, ItemRecordEditFields} from "../../types";
import type {SortProps} from "@chumsinc/sortable-tables";
import Decimal from "decimal.js";

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
        case 'QuantityOnSalesOrder':
        case 'QuantityOnBackOrder':
        case 'QuantityOnPurchaseOrder':
        case 'QuantityOnWorkOrder':
        case 'QuantityRequiredForWO':
        case 'QuantityOnMaterialReq':
            return (
                new Decimal(a[field]).eq(b[field])
                    ? (itemKey(a) > itemKey(b) ? 1 : -1)
                    : new Decimal(a[field]).sub(b[field]).toNumber()
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
        case 'changes':
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

export const listFilter = (list: ItemRecord[], search: string, showOnlyOnHand: boolean, showInactive: boolean, filterSelected: boolean) => {
    let searchRegexp = /^/;
    try {
        searchRegexp = new RegExp(search, 'i');
    } catch (_err) {
        searchRegexp = /^/
    }

    return list
        .filter(item => !search || searchRegexp.test(item.ItemCode) || searchRegexp.test(item.ItemCodeDesc))
        .filter(item => showInactive || !(item.InactiveItem === 'Y' || item.ProductType === 'D'))
        .filter(item => !showOnlyOnHand || !new Decimal(item.QuantityOnHand).eq(0))
        .filter(item => !filterSelected || item.selected || item.changed);
}

export function isItemChanged(item:ItemRecord):boolean {
    return isItemFieldChanged(item, 'ReorderMethod')
        || isItemFieldChanged(item, 'ReorderPointQty')
        || isItemFieldChanged(item, 'MinimumOrderQty')
        || isItemFieldChanged(item, 'MaximumOnHandQty')
        || isItemFieldChanged(item, 'EconomicOrderQty')
}

function isItemFieldChanged(item:ItemRecord, field:keyof ItemRecordEditFields):boolean {
    if (item.changes?.[field] === undefined) {
        return false
    }
    switch (field) {
        case 'ReorderMethod':
            return (item.changes[field] ?? '') !== (item.ReorderMethod ?? '');
        default:
            return !new Decimal(item.changes[field]).eq(item[field]);
    }
}
