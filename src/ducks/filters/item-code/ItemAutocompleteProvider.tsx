import {type ReactNode, useCallback, useEffect, useMemo, useRef, useState} from "react";
import type {ProductSearchItem} from "chums-types";
import {fetchItemFilter} from "@/api/filters.ts";
import {useFilterForm} from "@/components/form/hooks.ts";
import {
    ItemAutocompleteContext,
    type ItemAutocompleteState
} from "@/ducks/filters/item-code/ItemAutocompleteContext.tsx";
import {itemSearchSort} from "@/ducks/filters/item-code/utils.ts";
import {filters} from "@/components/form/filters.ts";

export interface ItemAutocompleteProviderProps {
    children: ReactNode;
}

export default function ItemAutocompleteProvider({children}: ItemAutocompleteProviderProps) {
    const {params} = useFilterForm()
    const [itemCode, setItemCode] = useState<string>(params.get(filters.itemCode.key) ?? '');
    const [list, setList] = useState<ProductSearchItem[]>([]);
    const [status, setStatus] = useState<'idle' | 'loading'>('idle');
    const timerRef = useRef<number>(0);

    const loadItems = useCallback(async (value: string) => {
        console.log('loadItems', JSON.stringify(value));
        if (value.trim().length === 0) {
            setList([]);
            return;
        }
        if (value.trim().length < 3) {
            return;
        }
        setStatus('loading');
        const search = new URLSearchParams(params);
        search.delete('itemCode');
        const data = await fetchItemFilter(value, search)
        setList([...data].sort(itemSearchSort));
        setStatus('idle');
    }, [setStatus, setList, params]);

    useEffect(() => {
        timerRef.current = window.setTimeout(async () => {
            await loadItems(itemCode);
        }, 500)
        return () => {
            window.clearTimeout(timerRef.current);
        }
    }, [itemCode, timerRef, loadItems])

    const state = useMemo<ItemAutocompleteState>(() => {
        const searchItem = list.find(item => item.ItemCode === itemCode) ?? null;
        return {
            itemCode,
            setItemCode,
            list,
            status,
            searchItem,
        }
    }, [itemCode, setItemCode, list, status])

    return (
        <ItemAutocompleteContext value={state}>
            {children}
        </ItemAutocompleteContext>
    )
}
