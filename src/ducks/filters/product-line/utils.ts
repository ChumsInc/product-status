import type {ProductLine} from "chums-types";

export const productLineSorter = (a: ProductLine, b: ProductLine) => a.ProductLine > b.ProductLine ? 1 : -1;

export const productLineFilter = (value: string) => (element: ProductLine) => {
    let regex = /^/;
    try {
        regex = new RegExp(value, 'i')
    } catch (_err: unknown) {
        // do nothing
    }

    return !value
        || element.ProductLine.toLowerCase().startsWith(value.toLowerCase())
        || regex.test(element.ProductLineDesc);
}
