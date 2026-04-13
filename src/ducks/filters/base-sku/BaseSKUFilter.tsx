import {Col, FormLabel} from "react-bootstrap";
import {useId} from "react";
import BaseSKUAutocomplete from "@/ducks/filters/base-sku/BaseSKUAutocomplete.tsx";
import {useFilterForm} from "@/components/form/hooks.ts";

export default function BaseSKUFilter() {
    const id = useId();
    const {visibleColumns} = useFilterForm();
    if (!visibleColumns.baseSKU) {
        return null;
    }

    return (
        <Col xs="auto">
            <FormLabel htmlFor={id}>
                Base SKU
            </FormLabel>
            <BaseSKUAutocomplete id={id} placeholder="All"/>
        </Col>
    )
}
