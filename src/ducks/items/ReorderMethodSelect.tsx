import React, {ChangeEvent, HTMLAttributes, SelectHTMLAttributes} from "react";
import {useDispatch} from "react-redux";
import {setReorderOptions} from "./actions";
import {Select} from "chums-components";
import {ItemKeyProps, ReorderMethod} from "../../types";

export interface ReorderMethodSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'value'> {
    itemKey: ItemKeyProps,
    value: string | null,
}

const ReorderMethodSelect = ({itemKey, value, ...rest}:ReorderMethodSelectProps) => {
    const dispatch = useDispatch();
    const changeHandler = (ev: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setReorderOptions({...itemKey, ReorderMethod: ev.target.value as ReorderMethod}))
    }

    return (
        <Select bsSize="sm" value={value || ''} onChange={changeHandler} {...rest}>
            <option value="">-</option>
            <option value="E">Economic</option>
            <option value="M">Max Stock</option>
            <option value="R">Reorder Point</option>
        </Select>
    )
}

export default ReorderMethodSelect;
