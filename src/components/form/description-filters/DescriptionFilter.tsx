import {Col, FormControl, FormLabel} from "react-bootstrap";
import {useId, useState} from "react";
import {useFilterForm} from "@/components/form/hooks.ts";
import {filters} from "@/components/form/filters.ts";

export default function DescriptionFilter() {
    const {visibleColumns, params} = useFilterForm();
    const [value, setValue] = useState(params.get('description') ?? '');
    const id = useId();
    if (!visibleColumns.description) {
        return null;
    }

    return (
        <Col xs="auto">
            <FormLabel htmlFor={id}>
                Description
            </FormLabel>
            <FormControl type="search" className="form-control-sm" id={id} name={filters.description.key}
                         value={value} onChange={(ev) => setValue(ev.target.value)}
                         placeholder="All"/>
        </Col>
    )
}
