import React, {ChangeEvent, InputHTMLAttributes, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {filterProductLine, selectProductLine, selectProductLineList} from "./index";
import AutoComplete from "./AutoComplete";
import {useAppDispatch} from "../../app/configureStore";
import {ProductLine} from "chums-types";

const ProductLineAutoComplete = AutoComplete<ProductLine>;

const ProductLineItem = ({ProductLine, ProductLineDesc}: ProductLine) => (
    <>
        <div className="me-3"><strong>{ProductLine}</strong></div>
        <div>{ProductLineDesc}</div>
    </>
)

const productLineFilter = (value: string) => (element: ProductLine) => {
    let regex = /^/;
    try {
        regex = new RegExp(value, 'i')
    } catch (err: unknown) {
    }

    return !value
        || element.ProductLine.toLowerCase().startsWith(value.toLowerCase())
        || regex.test(element.ProductLineDesc);
}


const ProductLineFilter = ({
                               id = 'filter--category',
                               children,
                               ...props
                           }: InputHTMLAttributes<HTMLInputElement>) => {
    const dispatch = useAppDispatch();
    const value = useSelector(selectProductLine);
    const productLineList = useSelector(selectProductLineList);

    const [helpText, setHelpText] = useState<string | null>(null);

    useEffect(() => {
        const [pl] = productLineList.filter(pl => pl.ProductLine === value)
        setHelpText(pl?.ProductLineDesc ?? null);
    }, [value])

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(filterProductLine(ev.target.value));
    }

    return (
        <ProductLineAutoComplete {...props}
                                 value={value} data={productLineList}
                                 onChange={changeHandler} id={id}
                                 onChangeRecord={value => dispatch(filterProductLine(value?.ProductLine ?? ''))}
                                 itemStyle={{display: 'flex'}}
                                 renderItem={ProductLineItem}
                                 filter={productLineFilter}
                                 helpText={helpText}
                                 itemKey={value => value.ProductLine}/>
    )
}

export default ProductLineFilter;
