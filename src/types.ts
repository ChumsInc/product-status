import {
    BaseSKUSearch,
    CountryOfOrigin,
    PrimaryVendor,
    ProductCategory,
    ProductCollection,
    ProductLine,
    ProductStatus,
    Warehouse
} from "chums-types";
import {QueryStatus} from "@reduxjs/toolkit/query";

export type ProductType = 'F' | 'K' | 'R' | 'D';


export interface CollectionRecord {
    Category3: string;
}


export interface ProductStatusRecord {
    id: number;
    code: string;
    description: string;
}

export interface CountryOfOriginRecord {
    countryOfOrigin: string;
}

export interface PrimaryVendorRecord {
    PrimaryVendorNo: string;
    VendorName: string;
}

export interface ItemStatusHistory {
    date: string;
    status: string | null;
    user: number
}

export type ReorderMethod = 'E' | 'M' | 'R' | null;

export enum InProcessStatus {
    saving = 'saving',
}

export type SavingStatus = QueryStatus | InProcessStatus;

export interface ItemRecord {
    ItemCode: string;
    ItemCodeDesc: string;
    ProductType: ProductType;
    ProductLine: string;
    Category2: string | null;
    Category3: string | null;
    Category4: string | null;
    InactiveItem: 'Y' | 'N';
    WarehouseCode: string;
    QuantityOnHand: number;
    // QuantityOnSalesOrder: number;
    // QuantityOnBackOrder: number;
    // QuantityOnPurchaseOrder: number;
    // QuantityOnWorkOrder: number;
    // QuantityRequiredForWO: number;
    // QuantityOnMaterialReq: number;
    QuantityAvailable: number;
    StandardUnitCost: number;
    AverageUnitCost: number;
    QuantityAvailableCost: number;
    selected?: boolean;
    changed?: boolean;
    ItemStatus: string;
    BinLocation: string | null;
    ReorderMethod: ReorderMethod;
    ReorderPointQty: number;
    EconomicOrderQty: number;
    MaximumOnHandQty: number;
    MinimumOrderQty: number;
    PrimaryVendorNo: string;
    ItemStatusHistory?: ItemStatusHistory[];
    loading?: QueryStatus;
    saving?: SavingStatus;
}

export type ItemStatusProps = Pick<ItemRecord, 'ItemCode' | 'WarehouseCode' | 'ItemStatus'>
export type ItemKeyProps = Pick<ItemRecord, 'ItemCode' | 'WarehouseCode'>

export interface FiltersResponse {
    warehouses?: Warehouse[];
    productLines?: ProductLine[];
    categories?: ProductCategory[];
    collections?: ProductCollection[];
    baseSKUs?: BaseSKUSearch[];
    countryOfOrigin?: CountryOfOrigin[];
    productStatusList?: ProductStatus[];
    primaryVendor?: PrimaryVendor[];
}

export interface FiltersList {
    warehouseList: Warehouse[];
    productLineList: ProductLine[];
    categoryList: ProductCategory[];
    collectionList: ProductCollection[];
    baseSKUList: BaseSKUSearch[];
    productStatusList: ProductStatus[];
    countryOfOriginList: CountryOfOrigin[];
    primaryVendorList: PrimaryVendor[];
}
