import React, {ChangeEvent} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {filterSetBaseSKUAction, selectFilter} from "./index";
import FilterInput, {FilterInputContainerProps} from "./FilterInput";
import BaseSKUDataList from "./BaseSKUDataList";

const BaseSKUFilter: React.FC<FilterInputContainerProps> = ({id = 'filter--sku', children, ...props}) => {
    const dispatch = useDispatch();
    const {baseSKU} = useSelector(selectFilter);

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(filterSetBaseSKUAction(ev.target.value));
    }
    const listId = id + '--list';

    return (
        <FilterInput value={baseSKU || ''} onChange={changeHandler} id={id} list={listId}>
            <BaseSKUDataList id={listId}/>
        </FilterInput>
    );
}

export default React.memo(BaseSKUFilter);
