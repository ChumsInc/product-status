import {useFilterForm} from "@/components/form/hooks.ts";
import {Offcanvas} from "react-bootstrap";
import type {ChangeEvent} from "react";
import {filters} from "@/components/form/filters.ts";

export default function FilterChooser() {
    const {visibleColumns, toggleColumn, showColumnSelector, setShowColumnSelector, params} = useFilterForm();

    const changeHandler = (field: string) => (ev:ChangeEvent<HTMLInputElement>) => {
        toggleColumn({[field]: ev.target.checked});
    }
    return (
        <Offcanvas show={showColumnSelector} onHide={() => setShowColumnSelector(false)} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Toggle Filters</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {Object.entries(filters).map(([key, filter]) => (
                    <div key={key} className="d-flex justify-content-between">
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" role="switch"
                                   id={`filter-${key}`} checked={visibleColumns[filter.key]}
                                   onChange={changeHandler(key)}/>
                            <label className="form-check-label" htmlFor={`filter-${key}`}>
                                {filter.label}
                            </label>
                        </div>
                        <div className="text-secondary font-monospace">
                            {params.get(key)}
                        </div>
                    </div>
                ))}
            </Offcanvas.Body>
        </Offcanvas>
    )
}
