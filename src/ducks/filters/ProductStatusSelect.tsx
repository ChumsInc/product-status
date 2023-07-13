import React, {SelectHTMLAttributes} from 'react';
import {useSelector} from "react-redux";
import {selectProductStatusList} from "./index";
import {Select} from "chums-components";

const ProductStatusSelect = ({
                                 value,
                                 className,
                                 children,
                                 ...props
                             }: SelectHTMLAttributes<HTMLSelectElement>) => {
    const list = useSelector(selectProductStatusList);

    return (
        <Select value={value} className={className} bsSize="sm" {...props}>
            <option value="">-</option>
            {list
                .filter(status => !/%/.test(status.code))
                .map(status => (
                    <option key={status.id} value={status.code}>{status.code} - {status.description}</option>))}
        </Select>
    )
}
export default ProductStatusSelect;

