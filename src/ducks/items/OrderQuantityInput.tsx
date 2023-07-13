import React, {ChangeEvent, InputHTMLAttributes, useEffect, useState} from 'react';
import {ItemKeyProps, ItemRecord} from "../../types";
import {useDispatch} from "react-redux";
import {setReorderOptions} from "./actions";
import {Input} from "chums-components";

export interface OrderQuantityInputProps extends InputHTMLAttributes<HTMLInputElement>{
    itemKey: ItemKeyProps,
    field: keyof ItemRecord,
    quantity: number,
}

const OrderQuantityInput = ({itemKey, field, quantity, ...rest}:OrderQuantityInputProps) => {
    const dispatch = useDispatch();
    const [value, setValue] = useState(quantity);

    useEffect(() => {
        setValue(quantity);
    }, [quantity])

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        setValue(ev.target.valueAsNumber);
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
            dispatch(setReorderOptions({...itemKey, [field]: value}));
        }
    }

    return (
        <Input type="number" value={value} className="text-end"
               onChange={changeHandler} onBlur={blurHandler}
               min={0} max={9999999} step={1}
               bsSize="sm" {...rest}/>
    )
}

export default OrderQuantityInput;
