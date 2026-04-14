import {Col, FormLabel} from "react-bootstrap";
import {useId} from "react";
import ProductLineAutoComplete from "@/ducks/filters/product-line/ProductLineAutoComplete.tsx";
import {useFilterForm} from "@/components/form/hooks.ts";

export default function ProductLineFilter() {
    const id = useId();
    const {visibleColumns} = useFilterForm();
    if (!visibleColumns.productLine) {
        return null;
    }

    return (
        <Col xs="auto" lg>
            <FormLabel htmlFor={id}>
                Product Line
            </FormLabel>
            <ProductLineAutoComplete id={id} placeholder="All"/>
        </Col>
    )
}
