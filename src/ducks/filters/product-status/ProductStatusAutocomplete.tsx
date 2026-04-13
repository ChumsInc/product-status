import {type ChangeEvent} from 'react';
import {useSelector} from 'react-redux';
import {useAppDispatch, useAppSelector} from "@/app/configureStore.ts";
import AutoComplete from "@/components/auto-complete/AutoComplete.tsx";
import type {ProductStatus} from "chums-types";
import {statusFilter} from "@/ducks/filters/product-status/utils.ts";
import ProductStatusItem from "@/ducks/filters/product-status/ProductStatusItem.tsx";
import type {FormControlProps} from "react-bootstrap";
import {
    selectProductStatus,
    selectProductStatusList,
    selectStatusFilter,
    setProductStatusFilter
} from "@/ducks/filters/product-status/productStatusSlice.ts";
import {filters} from "@/components/form/filters.ts";

export default function ProductStatusAutocomplete({id = 'filter--product-category', ...props}: FormControlProps) {
    const dispatch = useAppDispatch();
    const value = useSelector(selectStatusFilter);
    const list = useSelector(selectProductStatusList);
    const productStatus = useAppSelector(selectProductStatus)
    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(setProductStatusFilter(ev.target.value));
    }

    const recordChangeHandler = (status?: ProductStatus) => {
        dispatch(setProductStatusFilter(status?.code ?? ''));
    }

    return (
        <AutoComplete {...props} name={filters.status.key}
                      id={id}
                      value={value} data={list} onChange={changeHandler}
                      onChangeRecord={recordChangeHandler}
                      renderItem={ProductStatusItem}
                      itemKey={(status) => status.code}
                      filter={statusFilter}
                      itemStyle={{display: 'flex'}}
                      helpText={productStatus?.description}/>
    )
}
