import React, {ChangeEvent} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {FormCheck} from "chums-components";
import {toggleSelected} from "./actions";
import {selectIsAdmin} from "../app";
import {ItemKeyProps} from "../../types";

export interface ItemSelectedCheckboxProps {
    itemKey: ItemKeyProps,
    selected: boolean,
}

const ItemSelectedCheckbox = ({itemKey, selected}:ItemSelectedCheckboxProps) => {
    const dispatch = useDispatch();
    const isAdmin = useSelector(selectIsAdmin);
    if (!isAdmin) {
        return null;
    }
    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleSelected({...itemKey, selected: ev.target.checked}));
    }

    return (<FormCheck label="" checked={selected || false} onChange={changeHandler} type="checkbox"/>)
}
export default ItemSelectedCheckbox;
