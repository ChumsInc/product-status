import React, {ChangeEvent, useEffect, useState} from 'react';
import {ItemRecord} from "../../types";
import {useDispatch} from "react-redux";
import {setEconomicOrderAction, setMaximumOnHandAction, setMinimumOrderAction, setReorderPointAction} from "./actions";
import {Input} from "chums-components";

export interface OrderQuantityInputProps {
    itemKey: string,
    field: keyof ItemRecord,
    quantity: number,
}

const OrderQuantityInput:React.FC<OrderQuantityInputProps> = ({itemKey, field, quantity}) => {
    const dispatch = useDispatch();
    const [value, setValue] = useState(quantity);
    useEffect(() => {
        setValue(quantity);
    }, [quantity])

    const changeHandler = (ev:ChangeEvent<HTMLInputElement>) => {
        setValue(ev.target.valueAsNumber);
    }

    const blurHandler = () => {
        if (value === quantity) {
            return;
        }
        switch (field) {
        case 'ReorderPointQty':
            dispatch(setReorderPointAction(itemKey, value));
            return;
        case 'MinimumOrderQty':
            dispatch(setMinimumOrderAction(itemKey, value));
            return;
        case 'EconomicOrderQty':
            dispatch(setEconomicOrderAction(itemKey, value));
            return;
        case 'MaximumOnHandQty':
            dispatch(setMaximumOnHandAction(itemKey, value));
            return;
        }
    }

    return (
        <Input type="number" min={0} max={9999999} step={1} onChange={changeHandler} onBlur={blurHandler} value={value} bsSize="sm"/>
    )
}

export default OrderQuantityInput;
