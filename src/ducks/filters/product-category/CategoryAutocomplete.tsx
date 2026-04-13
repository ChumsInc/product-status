import {type ChangeEvent} from 'react';
import {useSelector} from 'react-redux';
import AutoComplete from "@/components/auto-complete/AutoComplete.tsx";
import {useAppDispatch, useAppSelector} from "@/app/configureStore.ts";
import type {ProductCategory} from "chums-types";
import {
    selectCategoryFilter,
    selectCategoryList,
    selectProductCategory,
    setCategoryFilter
} from "@/ducks/filters/product-category/productCategorySlice.ts";
import CategoryItem from "@/ducks/filters/product-category/CategoryItem.tsx";
import {categoryFilter} from "@/ducks/filters/product-category/utils.ts";
import type {FormControlProps} from "react-bootstrap";


export default function CategoryAutocomplete({
                                           id = 'filter--product-category',
                                           children,
                                           ...props
                                       }: FormControlProps) {
    const dispatch = useAppDispatch();
    const value = useSelector(selectCategoryFilter);
    const list = useSelector(selectCategoryList);
    const category = useAppSelector(selectProductCategory)

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(setCategoryFilter(ev.target.value));
    }

    const recordChangeHandler = (value?: ProductCategory) => {
        dispatch(setCategoryFilter(value?.Category2 ?? ''));
    }


    return (
        <AutoComplete id={id} {...props}
                      value={value} onChange={changeHandler}
                      data={list} onChangeRecord={recordChangeHandler}
                      renderItem={CategoryItem}
                      itemKey={item => item.Category2}
                      filter={categoryFilter} itemStyle={{display: 'flex'}}
                      helpText={category?.description}/>
    )
}
