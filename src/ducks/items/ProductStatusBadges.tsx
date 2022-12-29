import React from 'react';
import {ItemRecord} from "../../types";
import {Badge} from 'chums-components';

const ProductStatusBadges = ({item}:{item:ItemRecord}) => {
    const {InactiveItem, ProductType, ItemStatus} = item;

    return (
        <>
            {!!ItemStatus && (<Badge color="dark" className="me-1">{ItemStatus}</Badge>)}
            {InactiveItem === 'Y' && (<Badge color="warning" className="text-dark me-1">Inactive</Badge>)}
            {ProductType === 'D' && (<Badge color="danger" className="me-1">Disco</Badge>)}
        </>
    )
}

export default ProductStatusBadges;
