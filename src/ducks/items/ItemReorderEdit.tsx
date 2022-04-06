/**
 * Created by steve on 2/9/2017.
 */
import React from 'react';
import ItemListFilterBar from "./ItemListFilterBar";
import ItemReorderEditList from "./ItemReorderEditList";
import {ErrorBoundary} from "chums-ducks";
import {useDispatch, useSelector} from "react-redux";
import {selectChangedItems} from "./selectors";
import {saveChangedItemsAction} from "./actions";



const ItemReport: React.FC = () => {
    const dispatch = useDispatch();
    const changedItems = useSelector(selectChangedItems);
    const clickHandler = () => {
        dispatch(saveChangedItemsAction())
    }
    return (
        <ErrorBoundary>
            <ItemListFilterBar>
                <div className="col-auto">
                    <button type="button" className="btn btn-sm btn-primary" onClick={clickHandler} disabled={!changedItems.length}>
                        Save Changes ({changedItems.length})
                    </button>
                </div>
            </ItemListFilterBar>
            <ItemReorderEditList/>
        </ErrorBoundary>
    )
}

export default ItemReport;
