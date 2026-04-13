import {useId} from "react";
import {Col, FormLabel} from "react-bootstrap";
import ItemCodeAutocomplete from "@/ducks/filters/item-code/ItemCodeAutocomplete.tsx";
import ItemAutocompleteProvider from "@/ducks/filters/item-code/ItemAutocompleteProvider.tsx";
import {useFilterForm} from "@/components/form/hooks.ts";

export default function ItemCodeFilter() {
    const id = useId();
    const {visibleColumns} = useFilterForm();
    if (!visibleColumns.itemCode) {
        return null;
    }
    return (
        <ItemAutocompleteProvider>
            <Col xs="auto" lg>
                <FormLabel htmlFor={id}>Item Code</FormLabel>
                <ItemCodeAutocomplete id={id} placeholder="All"/>
            </Col>
        </ItemAutocompleteProvider>
    )
}
