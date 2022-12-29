import React, {ChangeEvent, InputHTMLAttributes, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {filterCategory, selectCategory, selectCategoryList} from "./index";
import AutoComplete from "./AutoComplete";
import {useAppDispatch} from "../../app/configureStore";
import {ProductCategory} from "chums-types";

const CategoryAutoComplete = AutoComplete<ProductCategory>;

const categoryFilter = (value: string) => (element: ProductCategory): boolean => {
    return !value
        || element.Category2.toLowerCase().startsWith(value.toLowerCase())
        || (element.description?.toLowerCase()?.startsWith(value.toLowerCase()) ?? false);
}

const CategoryItem = ({Category2, description}: ProductCategory) => (
    <>
        <div className="me-3"><strong>{Category2}</strong></div>
        <div>{description ?? null}</div>
    </>
)

const CategoryFilter = ({
                            id = 'filter--category',
                            children,
                            ...props
                        }: InputHTMLAttributes<HTMLInputElement>) => {
    const dispatch = useAppDispatch();
    const value = useSelector(selectCategory);
    const list = useSelector(selectCategoryList);
    const [helpText, setHelpText] = useState<string | null>(null);

    useEffect(() => {
        const [cat] = list.filter(cat => cat.Category2 === value);
        setHelpText(cat?.description ?? null);
    }, [value])

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(filterCategory(ev.target.value));
    }

    const recordChangeHandler = (record?: ProductCategory) => dispatch(filterCategory(record?.Category2 ?? ''));

    return (
        <CategoryAutoComplete id={id} {...props}
                              value={value} onChange={changeHandler}
                              data={list} onChangeRecord={recordChangeHandler}
                              renderItem={CategoryItem}
                              itemKey={item => item.Category2}
                              filter={categoryFilter} itemStyle={{display: 'flex'}}
                              helpText={helpText}/>
    )
}

export default CategoryFilter;
