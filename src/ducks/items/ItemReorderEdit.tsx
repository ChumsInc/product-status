/**
 * Created by steve on 2/9/2017.
 */
import React from 'react';
import ItemListFilterBar from "./ItemListFilterBar";
import ItemReorderEditList from "./ItemReorderEditList";
import {ErrorBoundary} from "react-error-boundary";
import {useSelector} from "react-redux";
import {selectChangedItems} from "./selectors";
import {saveMultipleItemReorder} from "./actions";
import {useAppDispatch} from "../../app/configureStore";
import ErrorBoundaryFallbackAlert from "../alerts/ErrorBoundaryFallbackAlert";


const ItemReport= () => {
    const dispatch = useAppDispatch();
    const changedItems = useSelector(selectChangedItems);

    const clickHandler = () => {
        dispatch(saveMultipleItemReorder(changedItems))
    }

    return (
        <ErrorBoundary FallbackComponent={ErrorBoundaryFallbackAlert}>
            <ItemListFilterBar>
                <div className="col-auto">
                    <button type="button" className="btn btn-sm btn-primary" onClick={clickHandler}
                            disabled={!changedItems.length}>
                        Save Changes ({changedItems.length})
                    </button>
                </div>
            </ItemListFilterBar>
            <ItemReorderEditList/>
        </ErrorBoundary>
    )
}

export default ItemReport;
