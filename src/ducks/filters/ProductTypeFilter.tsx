import React, {ChangeEvent} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {filterSetProductTypeAction, selectFilter} from "./index";
import {Select} from "chums-ducks";

const ProductTypeFilter:React.FC<{id:string}> = ({id}) => {
    const dispatch = useDispatch();
    const {productType} = useSelector(selectFilter);

    const changeHandler = (ev:ChangeEvent<HTMLSelectElement>) => {
        dispatch(filterSetProductTypeAction(ev.target.value));
    }

    return (
        <Select id={id} value={productType} onChange={changeHandler} bsSize="sm">
            <option value="FKR">FG/RM/Kit</option>
            <option value="F">Finished Goods</option>
            <option value="K">Kits</option>
            <option value="R">Raw Materials</option>
            <option value="D">Discontinued</option>
        </Select>
    )
}

export default React.memo(ProductTypeFilter);
