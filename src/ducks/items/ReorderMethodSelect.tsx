import React, {ChangeEvent} from "react";
import {useDispatch} from "react-redux";
import {setReorderOptions} from "./actions";
import {Select} from "chums-components";
import {ItemKeyProps, ReorderMethod} from "../../types";

export interface ReorderMethodSelectProps {
    itemKey: ItemKeyProps,
    value: string | null,
}

const ReorderMethodSelect: React.FC<ReorderMethodSelectProps> = ({itemKey, value}) => {
    const dispatch = useDispatch();
    const changeHandler = (ev: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setReorderOptions({...itemKey, ReorderMethod: ev.target.value as ReorderMethod}))
    }

    return (
        <Select bsSize="sm" value={value || ''} onChange={changeHandler}>
            <option value="">-</option>
            <option value="E">Economic</option>
            <option value="M">Max Stock</option>
            <option value="R">Reorder Point</option>
        </Select>
    )
}

export default ReorderMethodSelect;
