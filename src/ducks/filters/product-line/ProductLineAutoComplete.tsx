import {type ChangeEvent} from 'react';
import AutoComplete from "@/components/auto-complete/AutoComplete.tsx";
import {useAppDispatch, useAppSelector} from "@/app/configureStore.ts";
import ProductLineItem from "@/ducks/filters/product-line/ProductLineItem.tsx";
import {productLineFilter} from "@/ducks/filters/product-line/utils.ts";
import {
    selectProductLineFilter,
    selectProductLineList,
    selectProductLineValue,
    setProductLineFilter
} from "@/ducks/filters/product-line/productLineSlice.ts";
import type {ProductLine} from "chums-types";
import type {FormControlProps} from "react-bootstrap";
import {filters} from "@/components/form/filters.ts";


export default function ProductLineAutoComplete({
                                              id = 'filter--product-category',
                                              children,
                                              ...props
                                          }: FormControlProps) {
    const dispatch = useAppDispatch();
    const value = useAppSelector(selectProductLineFilter);
    const productLineList = useAppSelector(selectProductLineList);
    const productLine = useAppSelector(selectProductLineValue);

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(setProductLineFilter(ev.target.value));
    }

    const recordChangeHandler = (value?: ProductLine) => {
        dispatch(setProductLineFilter(value?.ProductLine ?? ''));
    }

    return (
        <AutoComplete {...props} name={filters.productLine.key}
                      value={value} data={productLineList}
                      onChange={changeHandler} id={id}
                      onChangeRecord={recordChangeHandler}
                      itemStyle={{display: 'flex'}}
                      renderItem={ProductLineItem}
                      filter={productLineFilter}
                      helpText={productLine?.ProductLineDesc}
                      itemKey={value => value.ProductLine}/>
    )
}
