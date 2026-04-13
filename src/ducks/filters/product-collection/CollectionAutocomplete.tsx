import {type ChangeEvent} from 'react';
import {useSelector} from 'react-redux';
import AutoComplete from "@/components/auto-complete/AutoComplete.tsx";
import {useAppDispatch} from "@/app/configureStore.ts";
import {collectionFilter} from "@/ducks/filters/product-collection/utils.ts";
import {
    selectCollectionFilter, selectCollectionList,
    setCollectionFilter
} from "@/ducks/filters/product-collection/productCollectionSlice.ts";
import type {FormControlProps} from "react-bootstrap";
import type {ProductCollection} from "chums-types";
import {filters} from "@/components/form/filters.ts";
import CollectionItem from "@/ducks/filters/product-collection/CollectionItem.tsx";


export default function CollectionAutocomplete({id = 'filter-collection', ...props}: FormControlProps) {
    const dispatch = useAppDispatch();
    const value = useSelector(selectCollectionFilter);
    const list = useSelector(selectCollectionList);


    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(setCollectionFilter(ev.target.value));
    }

    const recordChangeHandler = (value?: ProductCollection) => {
        dispatch(setCollectionFilter(value?.Category3 ?? ''))
    }

    return (
        <AutoComplete {...props} id={id} name={filters.collection.key}
                      value={value} onChange={changeHandler}
                      data={list} onChangeRecord={recordChangeHandler}
                      renderItem={CollectionItem}
                      itemKey={value => value.Category3}
                      filter={collectionFilter}/>
    )
}

