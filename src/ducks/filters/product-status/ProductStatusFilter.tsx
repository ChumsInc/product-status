import {Col, FormLabel} from "react-bootstrap";
import ProductStatusAutocomplete from "@/ducks/filters/product-status/ProductStatusAutocomplete.tsx";
import {useId} from "react";
import {useFilterForm} from "@/components/form/hooks.ts";

export default function ProductStatusFilter() {
    const id = useId();
    const {visibleColumns} = useFilterForm();
    if (!visibleColumns.status) {
        return null;
    }

    return (
        <Col xs="auto">
            <FormLabel htmlFor={id}>Product Status</FormLabel>
            <ProductStatusAutocomplete id={id} placeholder="All"/>
        </Col>
    )
}
