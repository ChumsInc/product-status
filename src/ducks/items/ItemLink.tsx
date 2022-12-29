import React from 'react';

const ItemLink = ({ItemCode}: { ItemCode: string }) => {
    const url = `/reports/production/customer-open-items/?company=chums&item=${encodeURIComponent(ItemCode)}`;
    return (<a href={url} target="_blank" rel="noopener">{ItemCode}</a>)
}

export default ItemLink;
