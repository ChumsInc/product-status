import React, {ChangeEvent} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectInactiveCount, selectItemsShowInactive} from "./selectors";
import {FormCheck} from "chums-components";
import {toggleShowInactive} from "./actions";


const ItemListFilterInactive= () => {
    const dispatch = useDispatch();
    const checked = useSelector(selectItemsShowInactive);
    const count = useSelector(selectInactiveCount);

    const changeHandler = (ev:ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleShowInactive(ev.target.checked));
    }

    const label = `Show Inactive (${count})`;
    return (
        <FormCheck type="checkbox" label={label} title="InactiveItem = 'Y' OR ProductType = 'D'"
                   checked={checked} onChange={changeHandler}/>
    )
}

export default ItemListFilterInactive;
