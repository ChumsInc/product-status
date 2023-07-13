/**
 * Created by steve on 2/9/2017.
 */
import React from 'react';
import ItemListFilterBar from "./ItemListFilterBar";
import ItemStatusEditList from "./ItemStatusEditList";
import {ErrorBoundary} from "react-error-boundary";
import SaveStatusForm from "./SaveStatusForm";
import ErrorBoundaryFallbackAlert from "../alerts/ErrorBoundaryFallbackAlert";


const ItemStatusEdit= () => {
    return (
        <ErrorBoundary FallbackComponent={ErrorBoundaryFallbackAlert}>
            <ItemListFilterBar>
                <div className="col-auto">
                    <SaveStatusForm />
                </div>
            </ItemListFilterBar>
            <ItemStatusEditList/>
        </ErrorBoundary>
    )
}

export default ItemStatusEdit;
