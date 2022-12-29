import React, {ChangeEvent} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectFilterOnlySelected, selectSelectedCount} from "./selectors";
import {FormCheck} from "chums-components";
import {toggleFilterSelected} from "./actions";
import {selectIsAdmin} from "../app";


const ItemListFilterSelected: React.FC = () => {
    const dispatch = useDispatch();
    const checked = useSelector(selectFilterOnlySelected);
    const count = useSelector(selectSelectedCount);
    const isAdmin = useSelector(selectIsAdmin);

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleFilterSelected(ev.target.checked));
    }

    if (!isAdmin) {
        return null;
    }
    return (
        <FormCheck type="checkbox" label={`Show Only Selected (${count})`} checked={checked} onChange={changeHandler}/>
    )
}

export default ItemListFilterSelected;
