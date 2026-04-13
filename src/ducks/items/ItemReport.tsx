import ItemListFilterBar from "./common/ItemListFilterBar.tsx";
import ProductStatusList from "./product-status-list/ProductStatusList.tsx";
import {ErrorBoundary} from 'react-error-boundary';
import ErrorBoundaryFallbackAlert from "../alerts/ErrorBoundaryFallbackAlert";

const ItemReport= () => {
    return (
        <ErrorBoundary FallbackComponent={ErrorBoundaryFallbackAlert}>
            <ItemListFilterBar/>
            <ProductStatusList/>
        </ErrorBoundary>
    )
}

export default ItemReport;
