import React, {ChangeEvent} from "react";
import {useDispatch} from "react-redux";
import {setReorderMethodAction} from "./actions";
import {Select} from "chums-ducks";

export interface ReorderMethodSelectProps {
    itemKey: string,
    value: string|null,
}

const ReorderMethodSelect:React.FC<ReorderMethodSelectProps> = ({itemKey, value}) => {
    const dispatch = useDispatch();
    const changeHandler = (ev:ChangeEvent<HTMLSelectElement>) => {
        dispatch(setReorderMethodAction(itemKey, ev.target.value));
    }

    return (
        <Select bsSize="sm" value={value || ''} onChange={changeHandler} >
            <option value="">-</option>
            <option value="E">Economic</option>
            <option value="M">Max Stock</option>
            <option value="R">Reorder Point</option>
        </Select>
    )
}

export default ReorderMethodSelect;
