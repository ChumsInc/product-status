import React, {ChangeEvent, InputHTMLAttributes, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {filterPrimaryVendor, selectPrimaryVendor, selectPrimaryVendorList} from "./index";
import {useAppDispatch} from "../../app/configureStore";
import AutoComplete from "./AutoComplete";
import {PrimaryVendor} from "chums-types";

const VendorAutoComplete = AutoComplete<PrimaryVendor>;

const vendorFilter = (value: string) => (element: PrimaryVendor) => {
    let regex = /^/;
    try {
        regex = new RegExp(value, 'i')
    } catch(err:unknown) {
    }

    return !value
        || element.PrimaryVendorNo.toLowerCase().startsWith(value.toLowerCase())
        || regex.test(element.VendorName);
}

const VendorItem = ({PrimaryVendorNo, VendorName}: PrimaryVendor) => (
    <>
        <div className="me-3"><strong>{PrimaryVendorNo}</strong></div>
        <div>{VendorName}</div>
    </>
)

const VendorFilter = ({
                          id = 'filter-vendor',
                          children,
                          ...props
                      }: InputHTMLAttributes<HTMLInputElement>) => {
    const dispatch = useAppDispatch();
    const value = useSelector(selectPrimaryVendor);
    const vendors = useSelector(selectPrimaryVendorList);
    const [helpText, setHelpText] = useState<string | null>(null);

    useEffect(() => {
        const [vendor] = vendors.filter(v => v.PrimaryVendorNo === value);
        setHelpText(vendor?.VendorName ?? null);
    }, [value])

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(filterPrimaryVendor(ev.target.value));
    }

    const onChangeRecord = (value?: PrimaryVendor) => {
        dispatch(filterPrimaryVendor(value?.PrimaryVendorNo ?? ''))
    }

    return (
        <VendorAutoComplete {...props}
                            id={id}
                            value={value} onChange={changeHandler}
                            data={vendors} onChangeRecord={onChangeRecord}
                            renderItem={VendorItem}
                            itemKey={vendor => vendor.PrimaryVendorNo}
                            filter={vendorFilter} itemStyle={{display: 'flex'}}
                            helpText={helpText}/>
    )
}

export default VendorFilter;
