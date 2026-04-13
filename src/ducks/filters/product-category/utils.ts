import type {ProductCategory} from "chums-types";

export const categorySorter = (a: ProductCategory, b: ProductCategory) => a.Category2.localeCompare(b.Category2);

export const categoryFilter = (value: string) => (element: ProductCategory): boolean => {
    return !value
        || element.Category2.toLowerCase().startsWith(value.toLowerCase())
        || (element.description?.toLowerCase()?.startsWith(value.toLowerCase()) ?? false);
}

