import type {BaseSKUSearch} from "chums-types";

export const filterBaseSKUList = (value: string) => (element: BaseSKUSearch) => {
    let regex = /^/;
    try {
        regex = new RegExp(value, 'i')
    } catch (_err: unknown) {
        // do nothing
    }
    return !value
        || element.Category4.toLowerCase().startsWith(value.toLowerCase())
        || regex.test(element.description ?? '');
}

export const baseSkuSort = (a: BaseSKUSearch, b: BaseSKUSearch) => a.Category4 > b.Category4 ? 1 : -1;
