import React, {ChangeEvent, useEffect, useState} from 'react';
import {ItemKeyProps, ItemRecord} from "../../types";
import {useDispatch} from "react-redux";
import {setReorderOptions} from "./actions";
import {Input} from "chums-components";

export interface OrderQuantityInputProps {
    itemKey: ItemKeyProps,
    field: keyof ItemRecord,
    quantity: number,
}

const OrderQuantityInput: React.FC<OrderQuantityInputProps> = ({itemKey, field, quantity}) => {
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
               bsSize="sm"/>
    )
}

export default OrderQuantityInput;
