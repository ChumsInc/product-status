import {LocalStore} from "@chumsinc/ui-utils";
import {localStorageKeys} from "@/api/preferences.ts";

export type FilterName = 'itemCode' | 'productType' | 'warehouseCode' | 'productLine' | 'vendorNo'
    | 'category' | 'collection' | 'baseSKU' | 'status' | 'description';

export interface FilterInfo {
    key: FilterName;
    label: string;
    priority: number;
    title?: string;
}

export type ColumnVisibility = Record<FilterName, boolean>;

export const defaultColumnVisibility:ColumnVisibility = {
    itemCode: true,
    productType: true,
    warehouseCode: true,
    productLine: false,
    vendorNo: false,
    category: false,
    collection: false,
    baseSKU: true,
    description: false,
    status: true,
}

export function getInitialVisibility():ColumnVisibility {
    const stored = LocalStore.getItem(localStorageKeys.columnVisibility, defaultColumnVisibility);
    const params = new URLSearchParams(window.location.search);
    return {
        itemCode: stored.itemCode || params.has(filters.itemCode.key),
        productType: stored.productType || params.has(filters.productType.key),
        warehouseCode: stored.warehouseCode || params.has(filters.warehouseCode.key),
        productLine: stored.warehouseCode || params.has(filters.productLine.key),
        vendorNo: stored.vendorNo || params.has(filters.vendorNo.key),
        category: stored.category || params.has(filters.category.key),
        collection: stored.collection || params.has(filters.collection.key),
        baseSKU: stored.baseSKU || params.has(filters.baseSKU.key),
        description: stored.description || params.has(filters.description.key),
        status: stored.status || params.has(filters.status.key),
    }
}

export type FilterRecord = Record<FilterName, FilterInfo>;

export const filters:FilterRecord = {
    itemCode: {key: 'itemCode', label: 'Item Code', priority: 10},
    productType: {key: 'productType', label: 'Product Type', priority: 20},
    warehouseCode: {key: 'warehouseCode', label: 'Warehouse', priority: 30},
    productLine: {key: 'productLine', label: 'Product Line', priority: 40},
    vendorNo: {key: 'vendorNo', label: 'Primary Vendor', priority: 50},
    category: {key: 'category', label: 'Category', priority: 60},
    collection: {key: 'collection', label: 'Collection', priority: 70},
    baseSKU: {key: 'baseSKU', label: 'Base SKU', priority: 80},
    description: {key: 'description', label: 'Item Description', priority: 90},
    status: {key: 'status', label: 'Product Status', priority: 100},
}

export const filterList = Object.values(filters).sort((a, b) => a.priority - b.priority);

export const visibleColumnsKey = 'chums-store-visible-columns';
