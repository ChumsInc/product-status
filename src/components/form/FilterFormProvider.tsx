import {type ReactNode, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useSearchParams} from "react-router";
import {useAppDispatch} from "@/app/configureStore.ts";
import {FilterFormContext, type FilterFormContextState} from "@/components/form/FilterFormContext.tsx";
import {setFilters} from "@/ducks/filters/common-actions.ts";
import {loadItems} from "@/ducks/items/actions.ts";
import {LocalStore} from "@chumsinc/ui-utils";
import {localStorageKeys} from "@/api/preferences.ts";
import type {ColumnVisibility} from "@/components/form/filters.ts";
import {getInitialVisibility} from "@/components/form/filters.ts";


export interface FilterFormProviderProps {
    children: ReactNode;
}

export default function FilterFormProvider({children}: FilterFormProviderProps) {
    const dispatch = useAppDispatch();
    const hasMounted = useRef(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [visibleColumns, setVisibleColumns] = useState<ColumnVisibility>(getInitialVisibility());
    const [showColumnSelector, setShowColumnSelector] = useState(false);

    useEffect(() => {
        if (!hasMounted.current) {
            dispatch(setFilters(searchParams));
            hasMounted.current = true;
        }
    }, [dispatch, searchParams, hasMounted]);

    const loadHandler = useCallback((params: URLSearchParams) => {
        setSearchParams(params);
        dispatch(loadItems(params));
    }, [dispatch, setSearchParams]);

    const toggleColumn = useCallback((arg: Partial<ColumnVisibility>) => {
        setVisibleColumns(prev => {
            const visibility: ColumnVisibility = {...prev, ...arg} as ColumnVisibility;
            LocalStore.setItem<ColumnVisibility>(localStorageKeys.columnVisibility, visibility);
            return visibility;
        })
    }, [setVisibleColumns])

    const value = useMemo<FilterFormContextState>(() => {
        return {
            params: searchParams,
            setParams: setSearchParams,
            load: loadHandler,
            showColumnSelector,
            setShowColumnSelector,
            visibleColumns,
            toggleColumn
        }
    }, [searchParams, setSearchParams, loadHandler, showColumnSelector, setShowColumnSelector, visibleColumns, toggleColumn])

    return <FilterFormContext value={value}>{children}</FilterFormContext>
}
