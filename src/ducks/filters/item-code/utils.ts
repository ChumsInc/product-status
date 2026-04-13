import type {ProductSearchItem} from "chums-types";

export const itemSearchSort = (a: ProductSearchItem, b: ProductSearchItem) => a.ItemCode.localeCompare(b.ItemCode);

export const itemSearchFilter = (value: string) => (element: ProductSearchItem) => {
    let regex = /^/;
    try {
        const smartSearch = /[\\^$*%_]/g.test(value)
            ? value.replace('*', '[\\w]*')
                .replace('%', '[.]*')
                .replace('_', '[\\w]{1}')
            : `\\b${value}`;
        regex = new RegExp(smartSearch, 'i')
    } catch (_err: unknown) {
        // do nothing
    }

    return !value
        || regex.test(element.ItemCode)
        || regex.test(element.ItemCodeDesc);
}
