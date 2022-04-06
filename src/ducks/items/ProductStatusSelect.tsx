import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectProductStatusList} from "../filters";
import {Select} from "chums-ducks";
import {selectNextStatus} from "./selectors";

const ProductStatusSelect:React.FC<{id:string}> = () => {
    const dispatch = useDispatch();
    const nextStatus = useSelector(selectNextStatus);
    const list = useSelector(selectProductStatusList);

    return (
        <Select bsSize="sm" required value={nextStatus}>
            <option value="">New Status</option>
            {list
                .filter(status => !/%/.test(status.code))
                .map(status => (<option key={status.id} value={status.code}>{status.description}</option>))}
        </Select>
    )
}
export default ProductStatusSelect;
