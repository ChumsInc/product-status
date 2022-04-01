import React, {SelectHTMLAttributes} from 'react';
import {useSelector} from "react-redux";
import {selectProductStatusList} from "./index";
import {Select} from "chums-ducks";

const ProductStatusSelect: React.FC<SelectHTMLAttributes<HTMLSelectElement>> = ({
                                                                                    value,
                                                                                    className,
                                                                                    children,
                                                                                    ...props
                                                                                }) => {
    const list = useSelector(selectProductStatusList);

    return (
        <Select value={value} className={className} bsSize="sm">
            <option value="">-</option>
            {list
                .filter(status => !/%/.test(status.code))
                .map(status => (<option key={status.id} value={status.code}>{status.description}</option>))}
        </Select>
    )
}
export default ProductStatusSelect;