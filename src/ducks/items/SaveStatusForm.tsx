import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectNextStatus, selectSelectedItems} from "./selectors";
import ProductStatusSelect from "../filters/ProductStatusSelect";
import {saveAllSelectedAction} from "./actions";


const SaveStatusForm:React.FC = () => {
    const dispatch = useDispatch();
    const selectedItems = useSelector(selectSelectedItems);
    const [nextStatus, setNextStatus] = useState('');

    const changeHandler = (ev:ChangeEvent<HTMLSelectElement>) => setNextStatus(ev.target.value);

    const submitHandler = (ev:FormEvent) => {
        ev.preventDefault();
        if (nextStatus === '' && !window.confirm(`Are you sure you want to remove the status from: ${selectedItems.map(i => i.ItemCode).join(', ')}?`)) {
            return;
        }
        dispatch(saveAllSelectedAction(nextStatus));
    }

    return (
        <form onSubmit={submitHandler} className="row g-3">
            <div className="col-auto">
                <div className="input-group input-group-sm">
                    <span className="input-group-text">Next Status</span>
                    <ProductStatusSelect value={nextStatus} onChange={changeHandler} />
                </div>
            </div>
            <div className="col-auto">
                <button type="submit" className="btn btn-sm btn-primary"
                        disabled={selectedItems.length === 0}>
                    Save Status ({selectedItems.length})
                </button>
            </div>
        </form>
    )
}

export default SaveStatusForm;
