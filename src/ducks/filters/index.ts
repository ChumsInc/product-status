import {combineReducers} from 'redux'
import {ActionInterface, ActionPayload, fetchJSON} from "chums-ducks";
import {
    BaseSKURecord,
    CategoryRecord,
    CollectionRecord,
    CountryOfOriginRecord,
    PrimaryVendorRecord,
    ProductLineRecord,
    ProductStatusRecord,
    WarehouseRecord
} from "../../types";
import {ThunkAction} from "redux-thunk";
import {RootState} from "../index";

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

export interface Filter {
    itemCode: string,
    productType: string,
    warehouse: string,
    productLine: string,
    category: string,
    collection: string,
    baseSKU: string,
    status: string,
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

interface FiltersResponse {
    warehouses: WarehouseRecord[],
    productLines: ProductLineRecord[],
    categories: CategoryRecord[],
    collections: CollectionRecord[],
    baseSKUs: BaseSKURecord[],
    primaryVendor: PrimaryVendorRecord[],
    countryOfOrigin: CountryOfOriginRecord[],
    productStatusList: ProductStatusRecord[],
}

export const fetchFiltersAction = (): FiltersThunkAction =>
    async (dispatch, getState) => {
        try {
            const state = getState();
            if (selectFiltersLoading(state)) {
                return;
            }
            dispatch({type: filtersFetchRequested});
            const {
                warehouses,
                productLines,
                categories,
                collections,
                baseSKUs,
                primaryVendor,
                countryOfOrigin,
                productStatusList
            } = await fetchJSON<FiltersResponse>('/api/search/item/filters/CHI/');
            dispatch({
                type: filtersFetchSucceeded,
                payload: {
                    warehouseList: warehouses,
                    productLineList: productLines,
                    categoryList: categories,
                    collectionList: collections,
                    baseSKUList: baseSKUs,
                    primaryVendorList: primaryVendor,
                    countryOfOriginList: countryOfOrigin,
                    productStatusList
                }
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("fetchFiltersAction()", error.message);
                return dispatch({type: filtersFetchFailed, payload: {error, context: filtersFetchRequested}})
            }
            console.error("fetchFiltersAction()", error);
        }
    }

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

const sortWarehouseRecord = (a: WarehouseRecord, b: WarehouseRecord) => a.WarehouseCode > b.WarehouseCode ? 1 : -1;
const sortProductLineRecord = (a: ProductLineRecord, b: ProductLineRecord) => a.ProductLine > b.ProductLine ? 1 : -1;
const sortCategoryRecord = (a: CategoryRecord, b: CategoryRecord) => a.Category2 > b.Category2 ? 1 : -1;
const sortCollectionRecord = (a: CollectionRecord, b: CollectionRecord) => a.Category3 > b.Category3 ? 1 : -1;
const sortBaseSKURecord = (a: BaseSKURecord, b: BaseSKURecord) => a.Category4 > b.Category4 ? 1 : -1;
const sortProductStatusRecord = (a: ProductStatusRecord, b: ProductStatusRecord) => a.code > b.code ? 1 : -1;
const sortCountryOfOriginRecord = (a: CountryOfOriginRecord, b: CountryOfOriginRecord) => a.countryOfOrigin > b.countryOfOrigin ? 1 : -1;
const sortPrimaryVendorRecord = (a: PrimaryVendorRecord, b: PrimaryVendorRecord) => a.PrimaryVendorNo > b.PrimaryVendorNo ? 1 : -1;

export const defaultFilter: Filter = {
    itemCode: '',
    productType: 'FKR',
    warehouse: '',
    productLine: '',
    category: '',
    collection: '',
    baseSKU: '',
    status: '',
    countryOfOrigin: '',
    primaryVendor: '',
}

export const selectFilter = (state: RootState) => state.filters.filter;
export const selectFiltersLoading = (state: RootState) => state.filters.loading;
export const selectWarehouseList = (state: RootState) => state.filters.warehouse;
export const selectProductLineList = (state: RootState) => state.filters.productLine;
export const selectCategoryList = (state: RootState) => state.filters.category;
export const selectCollectionList = (state: RootState) => state.filters.collection;
export const selectBaseSKUList = (state: RootState) => state.filters.baseSKU;
export const selectProductStatusList = (state: RootState) => state.filters.status;
export const selectCountryOfOriginList = (state: RootState) => state.filters.countryOfOrigin;
export const selectPrimaryVendorList = (state: RootState) => state.filters.primaryVendor;


const filterReducer = (state: Filter = defaultFilter, action: FiltersAction): Filter => {
    const {type, payload} = action;
    const value = payload?.value || '';
    switch (type) {
    case filtersSetItemCode:
        return {...state, itemCode: value};
    case filterSetProductType:
        return {...state, productType: value || 'FKR'}
    case filterSetWarehouse:
        return {...state, warehouse: value};
    case filterSetProductLine:
        return {...state, productLine: value};
    case filterSetCategory:
        return {...state, category: value};
    case filterSetCollection:
        return {...state, collection: value};
    case filterSetProductStatus:
        return {...state, status: value};
    case filterSetCountryOfOrigin:
        return {...state, countryOfOrigin: value};
    case filterSetPrimaryVendor:
        return {...state, primaryVendor: value};
    case filterSetBaseSKU:
        return {...state, baseSKU: value}
    default:
        return state;
    }
}

const loadingReducer = (state: boolean = false, action: FiltersAction): boolean => {
    switch (action.type) {
    case filtersFetchRequested:
        return true;
    case filtersFetchFailed:
    case filtersFetchSucceeded:
        return false;
    default:
        return state;
    }
}

const warehouseReducer = (state: WarehouseRecord[] = [], action: FiltersAction): WarehouseRecord[] => {
    const {type, payload} = action;
    switch (type) {
    case filtersFetchSucceeded:
        if (payload?.warehouseList) {
            return payload.warehouseList.sort(sortWarehouseRecord)
        }
        return state;
    default:
        return state;
    }
};

const productLineReducer = (state: ProductLineRecord[] = [], action: FiltersAction): ProductLineRecord[] => {
    const {type, payload} = action;
    switch (type) {
    case filtersFetchSucceeded:
        if (payload?.productLineList) {
            return payload.productLineList.sort(sortProductLineRecord)
        }
        return state;
    default:
        return state;
    }
};

const categoryReducer = (state: CategoryRecord[] = [], action: FiltersAction): CategoryRecord[] => {
    const {type, payload} = action;
    switch (type) {
    case filtersFetchSucceeded:
        if (payload?.categoryList) {
            return payload.categoryList.sort(sortCategoryRecord)
        }
        return state;
    default:
        return state;
    }
};

const collectionReducer = (state: CollectionRecord[] = [], action: FiltersAction): CollectionRecord[] => {
    const {type, payload} = action;
    switch (type) {
    case filtersFetchSucceeded:
        if (payload?.collectionList) {
            return payload.collectionList.sort(sortCollectionRecord)
        }
        return state;
    default:
        return state;
    }
};

const baseSKUReducer = (state: BaseSKURecord[] = [], action: FiltersAction): BaseSKURecord[] => {
    const {type, payload} = action;
    switch (type) {
    case filtersFetchSucceeded:
        if (payload?.baseSKUList) {
            return payload.baseSKUList.sort(sortBaseSKURecord)
        }
        return state;
    default:
        return state;
    }
};

const statusReducer = (state: ProductStatusRecord[] = [], action: FiltersAction): ProductStatusRecord[] => {
    const {type, payload} = action;
    switch (type) {
    case filtersFetchSucceeded:
        if (payload?.productStatusList) {
            return payload.productStatusList.sort(sortProductStatusRecord)
        }
        return state;
    default:
        return state;
    }
};

const countryOfOriginReducer = (state: CountryOfOriginRecord[] = [], action: FiltersAction): CountryOfOriginRecord[] => {
    const {type, payload} = action;
    switch (type) {
    case filtersFetchSucceeded:
        if (payload?.countryOfOriginList) {
            return payload.countryOfOriginList.sort(sortCountryOfOriginRecord)
        }
        return state;
    default:
        return state;
    }
};

const primaryVendorReducer = (state: PrimaryVendorRecord[] = [], action: FiltersAction): PrimaryVendorRecord[] => {
    const {type, payload} = action;
    switch (type) {
    case filtersFetchSucceeded:
        if (payload?.primaryVendorList) {
            return payload.primaryVendorList.sort(sortPrimaryVendorRecord)
        }
        return state;
    default:
        return state;
    }
};

export default combineReducers({
    filter: filterReducer,
    loading: loadingReducer,
    warehouse: warehouseReducer,
    productLine: productLineReducer,
    category: categoryReducer,
    collection: collectionReducer,
    baseSKU: baseSKUReducer,
    status: statusReducer,
    countryOfOrigin: countryOfOriginReducer,
    primaryVendor: primaryVendorReducer,
})
