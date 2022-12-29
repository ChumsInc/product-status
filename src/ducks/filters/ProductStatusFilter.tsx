import React, {ChangeEvent, InputHTMLAttributes, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {filterProductStatus, selectProductStatus, selectProductStatusList} from "./index";
import {useAppDispatch} from "../../app/configureStore";
import AutoComplete from "./AutoComplete";
import {ProductStatus} from "chums-types";

const ProductStatusAutoComplete = AutoComplete<ProductStatus>;

const statusFilter = (value: string) => (element: ProductStatus) => {
    let regex = /^/;
    try {
        regex = new RegExp(value, 'i')
    } catch (err: unknown) {
    }

    return !value
        || element.code.toLowerCase().startsWith(value.toLowerCase())
        || regex.test(element.description);
}

const ProductStatusItem = ({code, description}: ProductStatus) => (
    <>
        <div className="me-3"><strong>{code}</strong></div>
        <div>{description}</div>
    </>
);


const ProductStatusFilter = ({id = 'filter--category', ...props}: InputHTMLAttributes<HTMLInputElement>) => {
    const dispatch = useAppDispatch();
    const value = useSelector(selectProductStatus);
    const list = useSelector(selectProductStatusList);
    const [helpText, setHelpText] = useState<string | null>(null);

    useEffect(() => {
        const [status] = list.filter(status => status.code === value);
        setHelpText(status?.description ?? null);
    }, [value])

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(filterProductStatus(ev.target.value));
    }

    const recordChangeHandler = (status?: ProductStatus) => {
        dispatch(filterProductStatus(status?.code ?? ''));
    }

    return (
        <ProductStatusAutoComplete {...props}
                                   id={id}
                                   value={value} data={list} onChange={changeHandler}
                                   onChangeRecord={recordChangeHandler}
                                   renderItem={ProductStatusItem}
                                   itemKey={(status) => status.code}
                                   filter={statusFilter} itemStyle={{display: 'flex'}}
                                   helpText={helpText}/>
    )
}

export default ProductStatusFilter;
