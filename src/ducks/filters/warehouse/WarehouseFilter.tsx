import {useId} from "react";
import {Col, FormLabel} from "react-bootstrap";
import WarehouseAutocomplete from "@/ducks/filters/warehouse/WarehouseAutocomplete.tsx";
import {useFilterForm} from "@/components/form/hooks.ts";

export default function WarehouseFilter() {
    const id = useId();
    const {visibleColumns} = useFilterForm();
    if (!visibleColumns.warehouseCode) {
        return null;
    }

    return (
        <Col xs="auto" lg>
            <FormLabel htmlFor={id}>Warehouse</FormLabel>
            <WarehouseAutocomplete id={id} placeholder="All"/>
        </Col>
    )
}
