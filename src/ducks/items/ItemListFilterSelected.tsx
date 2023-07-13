import React, {ChangeEvent} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectItemsShowSelected, selectSelectedCount} from "./selectors";
import {FormCheck} from "chums-components";
import {toggleShowSelected} from "./actions";
import {selectIsAdmin} from "../app";


const ItemListFilterSelected= () => {
    const dispatch = useDispatch();
    const checked = useSelector(selectItemsShowSelected);
    const count = useSelector(selectSelectedCount);
    const isAdmin = useSelector(selectIsAdmin);

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleShowSelected(ev.target.checked));
    }

    if (!isAdmin) {
        return null;
    }
    return (
        <FormCheck type="checkbox" label={`Show Only Selected (${count})`} checked={checked} onChange={changeHandler}/>
    )
}

export default ItemListFilterSelected;
