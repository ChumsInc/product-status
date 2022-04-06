/**
 * Created by steve on 2/9/2017.
 */
import React from 'react';
import ItemListFilterBar from "./ItemListFilterBar";
import ItemStatusList from "./ItemStatusList";
import {ErrorBoundary} from "chums-ducks";


const ItemReport: React.FC = () => {
    return (
        <ErrorBoundary>
            <ItemListFilterBar/>
            <ItemStatusList/>
        </ErrorBoundary>
    )
}

export default ItemReport;
