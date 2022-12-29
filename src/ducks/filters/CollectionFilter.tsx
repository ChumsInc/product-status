import React, {ChangeEvent, InputHTMLAttributes} from 'react';
import {useSelector} from 'react-redux';
import {filterCollection, selectCollection, selectCollectionList} from "./index";
import AutoComplete from "./AutoComplete";
import {CollectionRecord} from "../../types";
import {useAppDispatch} from "../../app/configureStore";

const CollectionAutoComplete = AutoComplete<CollectionRecord>;
const collectionFilter = (value: string) => (element: CollectionRecord) => {
    let regex = /^/;
    try {
        regex = new RegExp(`\\b${value}`, 'i')
    } catch(err:unknown) {
    }
    return !value
        || regex.test(element.Category3);
}

const CollectionFilter = ({id = 'filter-collection', ...props}: InputHTMLAttributes<HTMLInputElement>) => {
    const dispatch = useAppDispatch();
    const value = useSelector(selectCollection);
    const list = useSelector(selectCollectionList);


    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(filterCollection(ev.target.value));
    }

    const recordChangeHandler = (value?: CollectionRecord) => dispatch(filterCollection(value?.Category3 ?? ''))

    return (
        <CollectionAutoComplete {...props} id={id}
                                value={value} onChange={changeHandler}
                                data={list} onChangeRecord={recordChangeHandler}
                                renderItem={value => value.Category3} itemKey={value => value.Category3}
                                filter={collectionFilter}/>
    )
}

export default React.memo(CollectionFilter);
