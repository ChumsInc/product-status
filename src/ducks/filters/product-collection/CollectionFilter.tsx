import {useId} from "react";
import {Col, FormLabel} from "react-bootstrap";
import CollectionAutocomplete from "@/ducks/filters/product-collection/CollectionAutocomplete.tsx";
import {useFilterForm} from "@/components/form/hooks.ts";

export default function CollectionFilter() {
    const id = useId();
    const {visibleColumns} = useFilterForm();
    if (!visibleColumns.collection) {
        return null;
    }

    return (
        <Col xs="auto">
            <FormLabel htmlFor={id}>Collection</FormLabel>
            <CollectionAutocomplete id={id} placeholder="All"/>
        </Col>
    )
}
