import React, {ChangeEvent, InputHTMLAttributes, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {filterBaseSKU, selectBaseSKU, selectBaseSKUList} from "./index";
import {useAppDispatch} from "../../app/configureStore";
import AutoComplete from "./AutoComplete";
import {BaseSKUSearch} from "chums-types/src/products";

const BaseSKUAutoComplete = AutoComplete<BaseSKUSearch>;

const baseSKUFilter = (value: string) => (element: BaseSKUSearch) => {
    let regex = /^/;
    try {
        regex = new RegExp(value, 'i')
    } catch (err: unknown) {
    }
    return !value
        || element.Category4.toLowerCase().startsWith(value.toLowerCase())
        || regex.test(element.description ?? '');
}

const BaseSKUItem = ({Category4, description}: BaseSKUSearch) => (
    <>
        <div className="me-3"><strong>{Category4}</strong></div>
        <div>{description}</div>
    </>
)


const BaseSKUFilter = ({id = 'filter--sku', ...props}: InputHTMLAttributes<HTMLInputElement>) => {
    const dispatch = useAppDispatch();
    const value = useSelector(selectBaseSKU);
    const list = useSelector(selectBaseSKUList);
    const [helpText, setHelpText] = useState<string | null>(null);

    useEffect(() => {
        const [sku] = list.filter(sku => sku.Category4 === value);
        setHelpText(sku?.description ?? null);
    }, [value]);

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(filterBaseSKU(ev.target.value));
    }

    const recordChangeHandler = (value?: BaseSKUSearch) => {
        dispatch(filterBaseSKU(value?.Category4 ?? ''));
    }

    return (
        <BaseSKUAutoComplete {...props} id={id}
                             value={value} onChange={changeHandler}
                             data={list} onChangeRecord={recordChangeHandler}
                             renderItem={BaseSKUItem}
                             itemKey={row => row.Category4}
                             filter={baseSKUFilter}
                             itemStyle={{display: 'flex'}}
                             helpText={helpText}/>
    )

}

export default BaseSKUFilter;
