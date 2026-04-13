import type {ProductSearchItem} from "chums-types";
import {createContext} from "react";

export interface ItemAutocompleteState {
    itemCode: string;
    setItemCode: (itemCode: string) => void;
    searchItem: ProductSearchItem|null;
    list: ProductSearchItem[];
    status: 'idle'|'loading';
}
export const ItemAutocompleteContext = createContext<ItemAutocompleteState|null>(null);
