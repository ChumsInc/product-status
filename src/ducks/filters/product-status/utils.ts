import type {ProductStatus} from "chums-types";

export const productStatusSort = (a: ProductStatus, b: ProductStatus) => a.code.localeCompare(b.code);

export const statusFilter = (value: string) => (element: ProductStatus) => {
    let regex = /^/;
    try {
        regex = new RegExp(value, 'i')
    } catch (_err: unknown) {
        // do nothing
    }

    return !value
        || element.code.toLowerCase().startsWith(value.toLowerCase())
        || regex.test(element.description);
}
