import AlertList from "../ducks/alerts/AlertList";
import AppTabs from "./AppTabs";
import {Outlet} from 'react-router';
import {ErrorBoundary} from "react-error-boundary";
import ErrorBoundaryFallbackAlert from "@/ducks/alerts/ErrorBoundaryFallbackAlert.tsx";
import FilterFormProvider from "@/components/form/FilterFormProvider.tsx";
import FilterForm from "@/components/form/FilterForm.tsx";
import FilterChooser from "@/components/form/FilterChooser.tsx";

const AppContent = () => {

    return (
        <ErrorBoundary FallbackComponent={ErrorBoundaryFallbackAlert}>
            <AlertList/>
            <FilterFormProvider>
                <FilterForm/>
                <FilterChooser/>
            </FilterFormProvider>
            <AppTabs/>
            <Outlet/>
        </ErrorBoundary>
    )
}

export default AppContent;
