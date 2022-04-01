export type ProductType = 'F'|'K'|'R'|'D';

export interface WarehouseRecord {
    WarehouseCode:string,
    WarehouseDesc: string,
    WarehouseStatus: 'A'|'I',
}

export interface ProductLineRecord {
    ProductLine: string,
    ProductLineDesc: string,
    ProductType: ProductType,
    Valuation: string,
    ExplodedKitItems: string,
    active: boolean,
}

export interface CategoryRecord {
    Category2: string,
    id?: number,
    code: string,
    description?: string,
    active?: boolean,
    notes?: string|null,
    tags: unknown,
    productLine: string,
}

export interface CollectionRecord {
    Category3: string,
}

export interface BaseSKURecord {
    Category4: string,
    id?: number,
    sku_group_id?: number,
    sku?: string,
    description?: string,
    upc?: string,
    active?: boolean,
    notes?: string|null,
    tags?: unknown,
}

export interface ProductStatusRecord {
    id: number,
    code: string,
    description: string,
}

export interface CountryOfOriginRecord {
    countryOfOrigin: string,
}

export interface PrimaryVendorRecord {
    PrimaryVendorNo: string,
    VendorName: string,
}

export interface ItemRecord {
    ItemCode: string,
    ItemCodeDesc: string,
    ProductType: ProductType,
    ProductLine: string,
    Category2: string|null,
    Category3: string|null,
    Category4: string|null,
    InactiveItem: 'Y'|'N',
    WarehouseCode: string,
    QuantityOnHand: number,
    QuantityAvailable: number,
    StandardUnitCost: number,
    AverageUnitCost: number,
    QuantityAvailableCost: number,
    selected?: boolean,
    changed?:boolean,
}
