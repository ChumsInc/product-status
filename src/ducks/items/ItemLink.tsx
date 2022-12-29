import React from 'react';
import {ItemKeyProps} from "../../types";

const ItemLink = ({ItemCode}:{ItemCode:string}) => {
    const url = `/reports/production/customer-open-items/?company=chums&item=${encodeURIComponent(ItemCode)}`;
    return (<a href={url} target="_blank" rel="noopener">{ItemCode}</a>)
}

export default ItemLink;
