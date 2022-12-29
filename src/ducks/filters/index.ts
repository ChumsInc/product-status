import {fetchJSON} from "chums-components";
import {
    BaseSKURecord,
    CategoryRecord,
    CollectionRecord,
    CountryOfOriginRecord,
    FiltersList,
    PrimaryVendorRecord,
    ProductLineRecord,
    ProductStatusRecord,
    WarehouseRecord
} from "../../types";
import {ThunkAction} from "redux-thunk";
import {RootState} from "../index";
import {ActionInterface, ActionPayload} from "chums-connected-components";
import {QueryStatus} from "@reduxjs/toolkit/query";
import {createAction, createAsyncThunk, createReducer} from "@reduxjs/toolkit";
import {fetchFilters} from "../../api/filters";
import {
    BaseSKU,
    CountryOfOrigin, PrimaryVendor,
    ProductCategory,
    ProductCollection,
    ProductLine, ProductSearchItem,
    ProductStatus,
    Warehouse
} from "chums-types";

export interface FiltersState {
    filter:Filter;
    queryStatus: QueryStatus;
    warehouse: Warehouse[];
    productLine: ProductLine[],
    category: ProductCategory[],
    collection: ProductCollection[],
    baseSKU: BaseSKU[],
    productStatus: ProductStatus[],
    countryOfOrigin: CountryOfOrigin[],
    primaryVendor: PrimaryVendor[],
    items:ProductSearchItem[],
}

export const defaultFilter: Filter = {
    itemCode: '',
    productType: 'FKR',
    warehouse: '',
    productLine: '',
    category: '',
    collection: '',
    baseSKU: '',
    productStatus: '',
    countryOfOrigin: '',
    primaryVendor: '',
}

export const initialFiltersState:FiltersState = {
    filter: {...defaultFilter},
    queryStatus: QueryStatus.uninitialized,
    warehouse: [],
    productLine: [],
    category: [],
    collection: [],
    baseSKU: [],
    productStatus: [],
    countryOfOrigin: [],
    primaryVendor: [],
    items: [],
}

export const filterItemCode = createAction<string>('filters/filter/itemCode');
export const filterProductType = createAction<string>('filters/filter/productType');
export const filterWarehouse = createAction<string>('filters/filter/warehouse');
export const filterCategory = createAction<string>('filters/filter/category');
export const filterCollection = createAction<string>('filters/filter/collection');
export const filterCountryOfOrigin = createAction<string>('filters/filter/countryOfOrigin');
export const filterProductLine = createAction<string>('filters/filter/productLine');
export const filterPrimaryVendor = createAction<string>('filters/filter/primaryVendor');
export const filterBaseSKU = createAction<string>('filters/filter/baseSKU');
export const filterProductStatus = createAction<string>('filters/filter/productStatus');

export const loadFilters = createAsyncThunk<FiltersList>(
    'filters/load',
    async () => {
        return await fetchFilters();
    }
)

const filtersReducer = createReducer(initialFiltersState, (builder) => {
    builder
        .addCase(loadFilters.pending, (state) => {
            state.queryStatus = QueryStatus.pending;
        })
        .addCase(loadFilters.rejected, (state) => {
            state.queryStatus = QueryStatus.rejected;
        })
        .addCase(loadFilters.fulfilled, (state, action) => {
            state.warehouse = action.payload.warehouseList.sort(sortWarehouseRecord);
            state.productLine = action.payload.productLineList.sort(sortProductLineRecord);
            state.category = action.payload.categoryList.sort(sortCategoryRecord);
            state.collection = action.payload.collectionList.sort(sortCollectionRecord);
            state.baseSKU = action.payload.baseSKUList.sort(sortBaseSKU);
            state.productStatus = action.payload.productStatusList.sort(sortProductStatusRecord);
            state.countryOfOrigin = action.payload.countryOfOriginList.sort(sortCountryOfOriginRecord);
            state.primaryVendor = action.payload.primaryVendorList.sort(sortPrimaryVendorRecord);
        })
        .addCase(filterItemCode, (state, action) => {
            state.filter.itemCode = action.payload;
        })
        .addCase(filterProductType, (state, action) => {
            state.filter.productType = action.payload;
        })
        .addCase(filterWarehouse, (state, action) => {
            state.filter.warehouse = action.payload;
        })
        .addCase(filterCategory, (state, action) => {
            state.filter.category = action.payload;
        })
        .addCase(filterCollection, (state, action) => {
            state.filter.collection = action.payload;
        })
        .addCase(filterCountryOfOrigin, (state, action) => {
            state.filter.countryOfOrigin = action.payload;
        })
        .addCase(filterProductLine, (state, action) => {
            state.filter.productLine = action.payload;
        })
        .addCase(filterPrimaryVendor, (state, action) => {
            state.filter.primaryVendor = action.payload;
        })
        .addCase(filterBaseSKU, (state, action) => {
            state.filter.baseSKU = action.payload;
        })
        .addCase(filterProductStatus, (state, action) => {
            state.filter.productStatus = action.payload;
        })
});

export interface FiltersPayload extends ActionPayload {
    warehouseList?: WarehouseRecord[],
    productLineList?: ProductLineRecord[],
    categoryList?: CategoryRecord[],
    collectionList?: CollectionRecord[],
    baseSKUList?: BaseSKURecord[],
    productStatusList?: ProductStatusRecord[],
    countryOfOriginList?: CountryOfOriginRecord[],
    primaryVendorList?: PrimaryVendorRecord[],
    value?: string|null,
}

export interface FiltersAction extends ActionInterface {
    payload?: FiltersPayload,
}

export interface FiltersThunkAction extends ThunkAction<any, RootState, unknown, FiltersAction> {
}

export interface Filter extends Record<string, string> {
    itemCode: string,
    productType: string,
    warehouse: string,
    productLine: string,
    category: string,
    collection: string,
    baseSKU: string,
    productStatus: string,
    countryOfOrigin: string,
    primaryVendor: string,
}

export const filtersSetItemCode = 'filters/setItemCode';
export const filtersFetchRequested = 'filters/fetchRequested';
export const filtersFetchSucceeded = 'filters/FetchSucceeded';
export const filtersFetchFailed = 'filters/fetchFailed';
export const filterSetProductType = 'filters/setProductType';
export const filterSetWarehouse = 'filters/setWarehouse';
export const filterSetProductLine = 'filters/setProductLine';
export const filterSetCategory = 'filters/setCategory';
export const filterSetCollection = 'filters/setCollection';
export const filterSetBaseSKU = 'filters/setBaseSKU';
export const filterSetProductStatus = 'filters/setProductStatus';
export const filterSetCountryOfOrigin = 'filters/setCountryOfOrigin';
export const filterSetPrimaryVendor = 'filters/setPrimaryVendor';


export const filterSetItemCodeAction = (value:string):FiltersAction => ({type: filtersSetItemCode, payload: {value}});
export const filterSetProductTypeAction = (value: string):FiltersAction => ({type: filterSetProductType, payload: {value}});
export const filtersSetWarehouseAction = (value: string):FiltersAction => ({type: filterSetWarehouse, payload: {value}});
export const filterSetCategoryAction = (value: string):FiltersAction => ({type: filterSetCategory, payload: {value}});
export const filterSetCollectionAction = (value: string):FiltersAction => ({type: filterSetCollection, payload: {value}});
export const filterSetCountryOfOriginAction = (value: string):FiltersAction => ({type: filterSetCountryOfOrigin, payload: {value}});
export const filterSetProductLineAction = (value: string):FiltersAction => ({type: filterSetProductLine, payload: {value}});
export const filterSetPrimaryVendorAction = (value: string):FiltersAction => ({type: filterSetPrimaryVendor, payload: {value}});
export const filterSetBaseSKUAction = (value: string):FiltersAction => ({type: filterSetBaseSKU, payload: {value}});
export const filterSetProductStatusAction = (value: string):FiltersAction => ({type: filterSetProductStatus, payload: {value}});


const sortWarehouseRecord = (a: Warehouse, b: Warehouse) => a.WarehouseCode > b.WarehouseCode ? 1 : -1;
const sortProductLineRecord = (a: ProductLine, b: ProductLine) => a.ProductLine > b.ProductLine ? 1 : -1;
const sortCategoryRecord = (a: ProductCategory, b: ProductCategory) => a.Category2 > b.Category2 ? 1 : -1;
const sortCollectionRecord = (a: ProductCollection, b: ProductCollection) => a.Category3 > b.Category3 ? 1 : -1;
const sortBaseSKU = (a: BaseSKU, b: BaseSKU) => a.Category4 > b.Category4 ? 1 : -1;
const sortProductStatusRecord = (a: ProductStatusRecord, b: ProductStatusRecord) => a.code > b.code ? 1 : -1;
const sortCountryOfOriginRecord = (a: CountryOfOriginRecord, b: CountryOfOriginRecord) => a.countryOfOrigin > b.countryOfOrigin ? 1 : -1;
const sortPrimaryVendorRecord = (a: PrimaryVendorRecord, b: PrimaryVendorRecord) => a.PrimaryVendorNo > b.PrimaryVendorNo ? 1 : -1;


export const selectFilter = (state: RootState) => state.filters.filter;

export const selectItemCode = (state:RootState) => state.filters.filter.itemCode;
export const selectProductType = (state:RootState) => state.filters.filter.productType;
export const selectWarehouse = (state:RootState) => state.filters.filter.warehouse;
export const selectProductLine = (state:RootState) => state.filters.filter.productLine;
export const selectCategory = (state:RootState) => state.filters.filter.category;
export const selectCollection = (state:RootState) => state.filters.filter.collection;
export const selectBaseSKU = (state:RootState) => state.filters.filter.baseSKU;
export const selectProductStatus = (state:RootState) => state.filters.filter.productStatus;
export const selectCountryOfOrigin = (state:RootState) => state.filters.filter.countryOfOrigin;
export const selectPrimaryVendor = (state:RootState) => state.filters.filter.primaryVendor;

export const selectFiltersLoading = (state: RootState) => state.filters.queryStatus === QueryStatus.pending;
export const selectWarehouseList = (state: RootState) => state.filters.warehouse;
export const selectActiveWarehouseList = (state:RootState) => state.filters.warehouse.filter(whs => whs.WarehouseStatus === 'A');

export const selectProductLineList = (state: RootState) => state.filters.productLine;
export const selectCategoryList = (state: RootState) => state.filters.category;
export const selectCollectionList = (state: RootState) => state.filters.collection;
export const selectBaseSKUList = (state: RootState) => state.filters.baseSKU;
export const selectProductStatusList = (state: RootState) => state.filters.productStatus;
export const selectCountryOfOriginList = (state: RootState) => state.filters.countryOfOrigin;
export const selectPrimaryVendorList = (state: RootState) => state.filters.primaryVendor;

export default filtersReducer;
