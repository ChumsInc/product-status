import React, {ChangeEvent} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {filterSetProductLineAction, selectFilter} from "./index";
import FilterInput, {FilterInputContainerProps} from "./FilterInput";
import ProductStatusDataList from "./ProductStatusDataList";

const ProductStatusFilter: React.FC<FilterInputContainerProps> = ({
                                                                      id = 'filter--category',
                                                                      children,
                                                                      ...props
                                                                  }) => {
    const dispatch = useDispatch();
    const {status} = useSelector(selectFilter);

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(filterSetProductLineAction(ev.target.value));
    }
    const listId = `${id}--datalist`
    return (
        <FilterInput value={status} onChange={changeHandler} list={listId} id={id}>
            <ProductStatusDataList id={listId}/>
        </FilterInput>
    );
}

export default React.memo(ProductStatusFilter);
