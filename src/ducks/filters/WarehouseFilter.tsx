import React, {ChangeEvent} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {filtersSetWarehouseAction, selectFilter} from "./index";
import FilterInput, {FilterInputContainerProps} from "./FilterInput";
import WarehouseDataList from "./WarehouseDataList";


const WarehouseFilter: React.FC<FilterInputContainerProps> = ({id = 'filter-warehouse', children, ...props}) => {
    const dispatch = useDispatch();
    const {warehouse} = useSelector(selectFilter);

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(filtersSetWarehouseAction(ev.target.value));
    }

    const listId = `${id}--datalist`
    return (
        <FilterInput value={warehouse} onChange={changeHandler} list={listId} {...props}>
            <WarehouseDataList id={listId}/>
        </FilterInput>
    );
}

export default React.memo(WarehouseFilter);
