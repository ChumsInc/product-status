import React, {ChangeEvent} from 'react';
import {ItemRecord} from "../../types";
import {useDispatch} from "react-redux";
import {setEconomicOrderAction, setMaximumOnHandAction, setMinimumOrderAction, setReorderPointAction} from "./actions";
import {Input} from "chums-ducks";

export interface OrderQuantityInputProps {
    itemKey: string,
    field: keyof ItemRecord,
    quantity: number,
}

const OrderQuantityInput:React.FC<OrderQuantityInputProps> = ({itemKey, field, quantity}) => {
    const dispatch = useDispatch();

    const changeHandler = (ev:ChangeEvent<HTMLInputElement>) => {
        switch (field) {
        case 'ReorderPointQty':
            return dispatch(setReorderPointAction(itemKey, ev.target.valueAsNumber));
        case 'MinimumOrderQty':
            return dispatch(setMinimumOrderAction(itemKey, ev.target.valueAsNumber));
        case 'EconomicOrderQty':
            return dispatch(setEconomicOrderAction(itemKey, ev.target.valueAsNumber));
        case 'MaximumOnHandQty':
            return dispatch(setMaximumOnHandAction(itemKey, ev.target.valueAsNumber));
        }
    }

    return (
        <Input type="number" min={0} max={9999999} step={1} onChange={changeHandler} value={quantity} bsSize="sm"/>
    )
}

export default OrderQuantityInput;
