import {useId} from "react";
import {Col, FormLabel} from "react-bootstrap";
import VendorAutocomplete from "@/ducks/filters/vendor/VendorAutocomplete.tsx";
import {useFilterForm} from "@/components/form/hooks.ts";

export default function PrimaryVendorFilter() {
    const id = useId();
    const {visibleColumns} = useFilterForm();
    if (!visibleColumns.vendorNo) {
        return null;
    }

    return (
        <Col xs="auto">
            <FormLabel htmlFor={id}>Primary Vendor</FormLabel>
            <VendorAutocomplete id={id} placeholder="All"/>
        </Col>
    )
}
