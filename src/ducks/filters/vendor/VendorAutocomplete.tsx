import {type ChangeEvent} from 'react';
import {useSelector} from 'react-redux';
import {useAppDispatch, useAppSelector} from "@/app/configureStore.ts";
import type {PrimaryVendor} from "chums-types";
import {
    selectPrimaryVendor,
    selectVendorFilter,
    selectVendorList,
    setVendorFilter
} from "@/ducks/filters/vendor/vendorSlice.ts";
import AutoComplete from "@/components/auto-complete/AutoComplete.tsx";
import VendorItem from "@/ducks/filters/vendor/VendorItem.tsx";
import {vendorFilter} from "@/ducks/filters/vendor/utils.ts";
import type {FormControlProps} from "react-bootstrap";


const VendorAutocomplete = ({
                                id = 'filter-vendor',
                                children,
                                ...props
                            }: FormControlProps) => {
    const dispatch = useAppDispatch();
    const value = useSelector(selectVendorFilter);
    const vendors = useSelector(selectVendorList);
    const vendor = useAppSelector(selectPrimaryVendor)

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(setVendorFilter(ev.target.value));
    }

    const onChangeRecord = (value?: PrimaryVendor) => {
        dispatch(setVendorFilter(value?.PrimaryVendorNo ?? ''))
    }

    return (
        <AutoComplete {...props}
                      id={id}
                      value={value} onChange={changeHandler}
                      data={vendors} onChangeRecord={onChangeRecord}
                      renderItem={VendorItem}
                      itemKey={vendor => vendor.PrimaryVendorNo}
                      filter={vendorFilter} itemStyle={{display: 'flex'}}
                      helpText={vendor?.VendorName}/>
    )
}

export default VendorAutocomplete;
