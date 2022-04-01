import React, {ChangeEvent, InputHTMLAttributes} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {filterSetProductLineAction, selectFilter, selectProductLineList} from "./index";
import FilterInput from "./FilterInput";
import ProductLineDataList from "./ProductLineDataList";


const ProductLineFilter: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({
                                                                                id = 'filter--category',
                                                                                children,
                                                                                ...props
                                                                            }) => {
    const dispatch = useDispatch();
    const {productLine} = useSelector(selectFilter);
    const productLineList = useSelector(selectProductLineList);

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(filterSetProductLineAction(ev.target.value));
    }
    const listId = `${id}--list`
    return (
        <FilterInput value={productLine} onChange={changeHandler} list={listId}
                     id={id}>
            <ProductLineDataList id={listId}/>
        </FilterInput>
    );
}

export default React.memo(ProductLineFilter);
