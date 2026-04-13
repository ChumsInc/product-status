import {useContext} from "react";
import {ItemAutocompleteContext} from "@/ducks/filters/item-code/ItemAutocompleteContext.tsx";

export const useItemAutocomplete = () => {
    const context = useContext(ItemAutocompleteContext);
    if (!context) {
        throw new Error('useItemAutocomplete must be used within a ItemAutocompleteProvider');
    }
    return context!;
};
