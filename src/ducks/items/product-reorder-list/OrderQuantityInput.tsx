import {type ChangeEvent, useState} from 'react';
import type {ItemKeyProps, ItemRecordEditFields} from "../../../types.ts";
import {useDispatch} from "react-redux";
import {FormControl, type FormControlProps} from "react-bootstrap";
import {updateItem} from "@/ducks/items/itemListSlice.ts";

export interface OrderQuantityInputProps extends FormControlProps {
    itemKey: ItemKeyProps,
    field: keyof ItemRecordEditFields,
    quantity: number | string,
}

export default function OrderQuantityInput({itemKey, field, quantity, ...rest}: OrderQuantityInputProps) {
    const dispatch = useDispatch();
    const [value, setValue] = useState<string>(`${quantity}`);

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        setValue(ev.target.value);
    }

    const blurHandler = () => {
        if (value === quantity) {
            return;
        }
        switch (field) {
            case 'ReorderPointQty':
            case 'MinimumOrderQty':
            case 'EconomicOrderQty':
            case 'MaximumOnHandQty':
                dispatch(updateItem({...itemKey, [field]: value}));
        }
    }


    return (
        <FormControl type="number" value={value} className="text-end"
                     onChange={changeHandler} onBlur={blurHandler}
                     min={0} max={9999999} step={1}
                     size="sm" {...rest}/>
    )
}
