import {useId} from "react";
import {Col, FormLabel} from "react-bootstrap";
import CategoryAutocomplete from "@/ducks/filters/product-category/CategoryAutocomplete.tsx";
import {useFilterForm} from "@/components/form/hooks.ts";

export default function CategoryFilter() {
    const id = useId();
    const {visibleColumns} = useFilterForm();
    if (!visibleColumns.category) {
        return null;
    }

    return (
        <Col xs="auto">
            <FormLabel htmlFor={id}>Category</FormLabel>
            <CategoryAutocomplete id={id} placeholder="All"/>
        </Col>
    )
}
