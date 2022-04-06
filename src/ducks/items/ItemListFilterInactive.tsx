import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectItemsFilterInactive} from "./selectors";
import {FormCheck} from "chums-ducks";
import {itemsSetFilterInactiveAction} from "./actions";


const ItemListFilterInactive: React.FC = () => {
    const dispatch = useDispatch();
    const checked = useSelector(selectItemsFilterInactive);

    return (
        <FormCheck type="checkbox" label="Show Only Inactive" checked={checked}
                   onClick={() => dispatch(itemsSetFilterInactiveAction(!checked))}/>
    )
}

export default React.memo(ItemListFilterInactive);
