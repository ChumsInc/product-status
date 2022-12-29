import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectFilteredItems, selectPage, selectRowsPerPage} from "./selectors";
import {ItemRecord} from "../../types";
import {itemKey} from "./utils";
import {selectMultipleItems} from "./actions";

function isIndeterminate(qtyChecked: number, qtyRecords: number) {
    return qtyRecords > 0 && qtyChecked > 0 && qtyChecked !== qtyRecords;
}

const SelectAllCheckbox: React.FC = () => {
    const dispatch = useDispatch();
    const list = useSelector(selectFilteredItems);
    const page = useSelector(selectPage);
    const rowsPerPage = useSelector(selectRowsPerPage);
    const [pagedList, setPagedList] = useState<ItemRecord[]>(list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
    const [qtyChecked, setQtyChecked] = useState(pagedList.filter(row => row.selected).length);
    const [checked, setChecked] = useState<boolean>(qtyChecked > 0 && qtyChecked === pagedList.length);
    const [indeterminate, setIndeterminate] = useState(isIndeterminate(qtyChecked, pagedList.length));
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const pagedList = list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
        const qtyChecked = pagedList.filter(row => row.selected).length
        setPagedList(pagedList);
        setQtyChecked(qtyChecked);
        setChecked(qtyChecked > 0 && qtyChecked === pagedList.length);
        setIndeterminate(isIndeterminate(qtyChecked, pagedList.length))
    }, [page, rowsPerPage, list]);

    useEffect(() => {
        if (ref.current) {
            ref.current.indeterminate = indeterminate;
        }
    }, [indeterminate]);


    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        const itemKeys = pagedList.map(item => itemKey(item));
        dispatch(selectMultipleItems({keys: itemKeys, selected: ev.target.checked}));
    }

    return (
        <div>
            <div className="form-check form-check-inline">
                <input type="checkbox" className="form-check-input" checked={checked && !indeterminate}
                       onChange={changeHandler} ref={ref}/>
                <label className="form-check-label">({qtyChecked})</label>
            </div>
        </div>
    )
}

export default SelectAllCheckbox;
