import {type ChangeEvent} from "react";
import {useDispatch} from "react-redux";
import type {ItemKeyProps, ReorderMethod} from "../../../types.ts";
import {FormSelect, type  FormSelectProps} from "react-bootstrap";
import {updateItem} from "@/ducks/items/itemListSlice.ts";

export interface ReorderMethodSelectProps extends Omit<FormSelectProps, 'value'> {
    itemKey: ItemKeyProps,
    value: string | null,
}

const ReorderMethodSelect = ({itemKey, value, ...rest}: ReorderMethodSelectProps) => {
    const dispatch = useDispatch();
    const changeHandler = (ev: ChangeEvent<HTMLSelectElement>) => {
        dispatch(updateItem({...itemKey, ReorderMethod: ev.target.value as ReorderMethod}));
    }

    return (
        <FormSelect size="sm" value={value || ''} onChange={changeHandler} {...rest}>
            <option value="">-</option>
            <option value="E">Economic</option>
            <option value="M">Max Stock</option>
            <option value="R">Reorder Point</option>
        </FormSelect>
    )
}

export default ReorderMethodSelect;
