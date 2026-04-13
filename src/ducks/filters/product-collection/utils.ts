import type {ProductCollection} from "chums-types";

export const collectionSorter = (a: ProductCollection, b: ProductCollection) => a.Category3.localeCompare(b.Category3);

export const collectionFilter = (value: string) => (element: ProductCollection) => {
    let regex = /^/;
    try {
        regex = new RegExp(`\\b${value}`, 'i')
    } catch (_err: unknown) {
        // do nothing
    }
    return !value
        || regex.test(element.Category3);
}
