import ItemListFilterBar from "../common/ItemListFilterBar.tsx";
import ItemReorderEditList from "./ItemReorderEditList.tsx";
import {ErrorBoundary} from "react-error-boundary";
import {useSelector} from "react-redux";
import {selectChangedItems} from "../itemListSlice.ts";
import {saveMultipleItemReorder} from "../actions.ts";
import {useAppDispatch} from "@/app/configureStore.ts";
import ErrorBoundaryFallbackAlert from "../../alerts/ErrorBoundaryFallbackAlert.tsx";


export default function ItemReport() {
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
