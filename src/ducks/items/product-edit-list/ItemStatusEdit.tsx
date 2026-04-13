import ItemListFilterBar from "../common/ItemListFilterBar.tsx";
import ItemStatusEditList from "./ItemStatusEditList.tsx";
import {ErrorBoundary} from "react-error-boundary";
import SaveStatusForm from "./SaveStatusForm.tsx";
import ErrorBoundaryFallbackAlert from "../../alerts/ErrorBoundaryFallbackAlert.tsx";


const ItemStatusEdit= () => {
    return (
        <ErrorBoundary FallbackComponent={ErrorBoundaryFallbackAlert}>
            <ItemListFilterBar>
                <div className="col" />
                <div className="col-auto">
                    <SaveStatusForm />
                </div>
            </ItemListFilterBar>
            <ItemStatusEditList/>
        </ErrorBoundary>
    )
}

export default ItemStatusEdit;
