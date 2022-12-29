import React, {ChangeEvent, InputHTMLAttributes, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {filterItemCode, selectFilter, selectItemCode} from "./index";
import {useAppDispatch} from "../../app/configureStore";
import AutoComplete from "./AutoComplete";
import {ProductSearchItem} from "chums-types";
import {fetchItemFilter} from "../../api/filters";

const ItemAutoComplete = AutoComplete<ProductSearchItem>;

const itemFilter = (value: string) => (element: ProductSearchItem) => {
    let regex = /^/;
    try {
        const smartSearch = /[\\^$*%_]/g.test(value)
            ? value.replace('*', '[\\w]*')
                .replace('%', '[.]*')
                .replace('_', '[\\w]{1}')
            : `\\b${value}`;
        regex = new RegExp(smartSearch, 'i')
    } catch (err: unknown) {
    }

    return !value
        || regex.test(element.ItemCode)
        || regex.test(element.ItemCodeDesc);
}

const ProductItem = ({ItemCode, ItemCodeDesc}: ProductSearchItem) => (
    <>
        <div className="me-3"><strong>{ItemCode}</strong></div>
        <div>{ItemCodeDesc}</div>
    </>
)

const ItemCodeFilter = ({
                            id = 'filter-collection',
                            children,
                            ...props
                        }: InputHTMLAttributes<HTMLInputElement>) => {
    const dispatch = useAppDispatch();
    const value = useSelector(selectItemCode);
    const filter = useSelector(selectFilter);
    const [timeoutHandle, setTimeoutHandle] = useState(0);
    const [items, setItems] = useState<ProductSearchItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [helpText, setHelpText] = useState<string | null>(null);

    useEffect(() => {
        return () => {
            window.clearTimeout(timeoutHandle);
        }
    }, [])
    useEffect(() => {
        const [item] = items.filter(i => i.ItemCode === value);
        if (item) {
            setHelpText(item.ItemCodeDesc);
            return;
        }
        window.clearTimeout(timeoutHandle);
        if (value.length) {
            const t = window.setTimeout(() => {
                setLoading(true);
                fetchItemFilter({...filter, itemCode: value})
                    .then(response => {
                        setItems(response || []);
                    })
                    .catch(err => console.log(err))
                    .then(() => {
                        setLoading(false);
                    });
            }, 500);
            setTimeoutHandle(() => t);
        }
    }, [value, filter]);


    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(filterItemCode(ev.target.value));
    }

    const recordChangeHandler = (value?: ProductSearchItem) => {
        dispatch(filterItemCode(value?.ItemCode || ''));
    }

    return (
        <ItemAutoComplete {...props}
                          id={id}
                          value={value} onChange={changeHandler}
                          data={items} onChangeRecord={recordChangeHandler}
                          renderItem={ProductItem}
                          itemKey={item => item.ItemCode} itemStyle={{display: 'flex'}}
                          filter={itemFilter} helpText={helpText}/>
    )
}

export default ItemCodeFilter;
