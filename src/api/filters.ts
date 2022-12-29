import {FiltersList, FiltersResponse} from "../types";
import {fetchJSON} from "chums-components";
import Filters, {Filter} from "../ducks/filters";
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
        return {
            warehouseList: warehouses ?? [],
            productLineList: productLines ?? [],
            categoryList: categories ?? [],
            collectionList: collections ?? [],
            baseSKUList: baseSKUs ?? [],
            primaryVendorList: primaryVendor ?? [],
            countryOfOriginList: countryOfOrigin ?? [],
            productStatusList: productStatusList ?? []
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


export async function fetchItemFilter(filters:Filter):Promise<ProductSearchItem[]> {
    try {
        const {itemCode, ...rest} = filters;
        const options = getFilterQuery(rest);
        const url = `/api/search/item/chums/${encodeURIComponent(itemCode || '^')}?${options.toString()}`
        const {result} = await fetchJSON(url);
        return result || [];
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug("fetchItemFilter()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchItemFilter()", err);
        return Promise.reject(new Error('Error in fetchItemFilter()'));
    }
}
