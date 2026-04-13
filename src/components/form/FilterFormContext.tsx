import {createContext} from "react";
import type {SetURLSearchParams} from "react-router";
import type {ColumnVisibility} from "@/components/form/filters.ts";

export type FormStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface FilterFormContextState {
    params: URLSearchParams;
    setParams: SetURLSearchParams;
    load: (params: URLSearchParams) => void;
    showColumnSelector: boolean;
    setShowColumnSelector: (show: boolean) => void;
    visibleColumns: ColumnVisibility;
    toggleColumn: (arg: Partial<ColumnVisibility>) => void;
}

export const FilterFormContext = createContext<FilterFormContextState | null>(null);
