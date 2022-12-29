import React, {ChangeEvent} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectInactiveCount, selectItemsFilterInactive} from "./selectors";
import {FormCheck} from "chums-components";
import {toggleFilterActive} from "./actions";


const ItemListFilterInactive: React.FC = () => {
    const dispatch = useDispatch();
    const checked = useSelector(selectItemsFilterInactive);
    const count = useSelector(selectInactiveCount);

    const changeHandler = (ev:ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleFilterActive(ev.target.checked));
    }

    const label = `Show Only Inactive (${count})`;
    return (
        <FormCheck type="checkbox" label={label} title="InactiveItem = 'Y' OR ProductType = 'D'"
                   checked={checked} onChange={changeHandler}/>
    )
}

export default React.memo(ItemListFilterInactive);
