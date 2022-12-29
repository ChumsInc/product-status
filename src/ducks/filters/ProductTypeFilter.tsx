import React, {ChangeEvent, SelectHTMLAttributes} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {filterProductType, selectProductType} from "./index";
import {Select} from "chums-components";

const ProductTypeFilter = ({id, ...props}: SelectHTMLAttributes<HTMLSelectElement>) => {
    const dispatch = useDispatch();
    const productType = useSelector(selectProductType);

    const changeHandler = (ev: ChangeEvent<HTMLSelectElement>) => {
        dispatch(filterProductType(ev.target.value));
    }

    return (
        <Select id={id} {...props} value={productType} onChange={changeHandler} bsSize="sm">
            <option value="FKR">FG/RM/Kit</option>
            <option value="F">Finished Goods</option>
            <option value="K">Kits</option>
            <option value="R">Raw Materials</option>
            <option value="D">Discontinued</option>
        </Select>
    )
}

export default ProductTypeFilter;
