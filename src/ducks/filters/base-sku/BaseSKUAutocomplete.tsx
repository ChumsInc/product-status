import {type ChangeEvent} from 'react';
import {useSelector} from 'react-redux';
import {useAppDispatch, useAppSelector} from "@/app/configureStore.ts";
import AutoComplete from "@/components/auto-complete/AutoComplete.tsx";
import type {BaseSKUSearch} from "chums-types";
import {
    selectBaseSKUFilter,
    selectBaseSKUList,
    selectBaseSKU,
    setBaseSKUFilter
} from "@/ducks/filters/base-sku/baseSKUSlice.ts";
import {filterBaseSKUList} from "@/ducks/filters/base-sku/utils.ts";
import BaseSKUItem from "@/ducks/filters/base-sku/BaseSKUItem.tsx";
import {filters} from "@/components/form/filters.ts";
import type {FormControlProps} from "react-bootstrap";

export default function BaseSKUAutocomplete({id = 'filter--sku', ...props}: FormControlProps) {
    const dispatch = useAppDispatch();
    const value = useSelector(selectBaseSKUFilter);
    const list = useSelector(selectBaseSKUList);
    const baseSKU = useAppSelector(selectBaseSKU);

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(setBaseSKUFilter(ev.target.value));
    }

    const recordChangeHandler = (value?: BaseSKUSearch) => {
        dispatch(setBaseSKUFilter(value?.Category4 ?? ''));
    }

    return (
        <AutoComplete {...props} id={id} name={filters.baseSKU.key}
                      value={value} onChange={changeHandler}
                      data={list} onChangeRecord={recordChangeHandler}
                      renderItem={BaseSKUItem}
                      itemKey={row => row.Category4}
                      filter={filterBaseSKUList}
                      itemStyle={{display: 'flex'}}
                      helpText={baseSKU?.description}/>
    )

}
