import {useContext} from "react";
import {FilterFormContext} from "@/components/form/FilterFormContext.tsx";

export const useFilterForm = () => {
    const context = useContext(FilterFormContext);
    if (context === undefined) {
        throw new Error('useFilterForm must be used within a FilterFormProvider');
    }
    return context!;
}
