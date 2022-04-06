import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectItemsFilterOnHand} from "./selectors";
import {FormCheck} from "chums-ducks";
import {itemsSetFilterOnHandAction} from "./actions";


const ItemListFilterOnHand:React.FC = () => {
    const dispatch = useDispatch();
    const checked = useSelector(selectItemsFilterOnHand);

    return(
        <FormCheck type="checkbox" label="Show Only On Hand" checked={checked}
                   onClick={() => dispatch(itemsSetFilterOnHandAction(!checked))} />
    )
}

export default React.memo(ItemListFilterOnHand);
