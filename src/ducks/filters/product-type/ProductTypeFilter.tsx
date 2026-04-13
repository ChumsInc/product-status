import {Col, FormLabel} from "react-bootstrap";
import {useId} from "react";
import ProductTypeSelect from "@/ducks/filters/product-type/ProductTypeSelect.tsx";
import {useFilterForm} from "@/components/form/hooks.ts";

export default function ProductTypeFilter() {
    const id = useId();
    const {visibleColumns} = useFilterForm();
    if (!visibleColumns.productType) {
        return null;
    }

    return (
        <Col xs="auto" lg>
            <FormLabel htmlFor={id}>Product Type</FormLabel>
            <ProductTypeSelect id={id} />
        </Col>
    )
}
