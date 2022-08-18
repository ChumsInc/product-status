import React, {ChangeEvent} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectItemsFilterInactive} from "./selectors";
import {FormCheck} from "chums-components";
import {itemsSetFilterInactiveAction} from "./actions";


const ItemListFilterInactive: React.FC = () => {
    const dispatch = useDispatch();
    const checked = useSelector(selectItemsFilterInactive);

    return (
        <FormCheck type="checkbox" label="Show Only Inactive" checked={checked}
                   onChange={(ev:ChangeEvent<HTMLInputElement>) => dispatch(itemsSetFilterInactiveAction(ev.target.checked))}/>
    )
}

export default React.memo(ItemListFilterInactive);
