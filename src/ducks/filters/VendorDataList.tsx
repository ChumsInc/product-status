import React, {ChangeEvent, InputHTMLAttributes} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {filterSetCategoryAction, selectCollectionList, selectFilter, selectPrimaryVendorList} from "./index";
import FilterInput from "./FilterInput";


const VendorDataList: React.FC<{ id: string }> = ({id}) => {
    const list = useSelector(selectPrimaryVendorList);

    return (
        <datalist id={id}>
            {list
                .map((vendor) => (
                    <option key={vendor.PrimaryVendorNo} value={vendor.PrimaryVendorNo}>{vendor.PrimaryVendorNo} - {vendor.VendorName}</option>
                ))}
        </datalist>
    );
}

export default React.memo(VendorDataList);
