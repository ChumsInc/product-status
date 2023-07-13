/**
 * Created by steve on 2/9/2017.
 */
import React from 'react';
import ItemListFilterBar from "./ItemListFilterBar";
import ItemStatusList from "./ItemStatusList";
import {ErrorBoundary} from 'react-error-boundary';
import ErrorBoundaryFallbackAlert from "../alerts/ErrorBoundaryFallbackAlert";

const ItemReport= () => {
    return (
        <ErrorBoundary FallbackComponent={ErrorBoundaryFallbackAlert}>
            <ItemListFilterBar/>
            <ItemStatusList/>
        </ErrorBoundary>
    )
}

export default ItemReport;
