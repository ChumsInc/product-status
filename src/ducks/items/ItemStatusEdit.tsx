/**
 * Created by steve on 2/9/2017.
 */
import React from 'react';
import ItemListFilterBar from "./ItemListFilterBar";
import ItemStatusEditList from "./ItemStatusEditList";
import {ErrorBoundary} from "chums-ducks";
import SaveStatusForm from "./SaveStatusForm";


const ItemReport: React.FC = () => {
    return (
        <ErrorBoundary>
            <ItemListFilterBar>
                <div className="col-auto">
                    <SaveStatusForm />
                </div>
            </ItemListFilterBar>
            <ItemStatusEditList/>
        </ErrorBoundary>
    )
}

export default ItemReport;
