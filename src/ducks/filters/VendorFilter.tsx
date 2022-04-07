import React, {ChangeEvent, InputHTMLAttributes} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {filterSetPrimaryVendorAction, selectFilter} from "./index";
import FilterInput from "./FilterInput";
import VendorDataList from "./VendorDataList";


const VendorFilter: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({
                                                                           id = 'filter-vendor',
                                                                           value, //discard item prop
                                                                           children,
                                                                           ...props
                                                                       }) => {
    const dispatch = useDispatch();
    const {primaryVendor} = useSelector(selectFilter);

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(filterSetPrimaryVendorAction(ev.target.value));
    }
    const listId = `${id}--datalist`;
    return (
        <FilterInput value={primaryVendor} onChange={changeHandler} list={listId} {...props}>
            <VendorDataList id={listId}/>
        </FilterInput>
    );
}

export default React.memo(VendorFilter);
