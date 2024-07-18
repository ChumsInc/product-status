import {FiltersList, FiltersResponse} from "../types";
import {fetchJSON} from "chums-components";
import {Filter} from "../ducks/filters";
import {ProductSearchItem} from "chums-types";

export const getFilterQuery = (filter: Partial<Filter>): URLSearchParams => {
    const params = new URLSearchParams();
    Object.keys(filter).map(key => {
        if (filter[key]) {
            params.set(key, filter[key] ?? '');
        }
    })
    return params;
};

export async function fetchFilters(): Promise<FiltersList> {
    try {
        const res = await fetchJSON<FiltersResponse>('/api/search/item/filters/CHI/');
        return {
            warehouseList: res?.warehouses ?? [],
            productLineList: res?.productLines ?? [],
            categoryList: res?.categories ?? [],
            collectionList: res?.collections ?? [],
            baseSKUList: res?.baseSKUs ?? [],
            primaryVendorList: res?.primaryVendor ?? [],
            countryOfOriginList: res?.countryOfOrigin ?? [],
            productStatusList: res?.productStatusList ?? []
        }
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("fetchFilters()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchFilters()", err);
        return Promise.reject(new Error('Error in fetchFilters()'));
    }
}


export async function fetchItemFilter(filters: Filter): Promise<ProductSearchItem[]> {
    try {
        const {itemCode, ...rest} = filters;
        const options = getFilterQuery(rest);
        const url = `/api/search/item/chums/${encodeURIComponent(itemCode || '^')}?${options.toString()}`
        const {result} = await fetchJSON(url);
        return result || [];
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("fetchItemFilter()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchItemFilter()", err);
        return Promise.reject(new Error('Error in fetchItemFilter()'));
    }
}
