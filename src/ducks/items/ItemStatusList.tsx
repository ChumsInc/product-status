import React from 'react';
import numeral from "numeral";
import {SortableTableField} from "chums-components";
import {ItemRecord} from "../../types";
import ProductStatusBadges from "./ProductStatusBadges";
import SortableItemList from "./SortableItemList";
import ItemLink from "./ItemLink";


const fields: SortableTableField<ItemRecord>[] = [
    {field: 'ItemCode', title: 'Item', sortable: true, render: (item) => <ItemLink ItemCode={item.ItemCode}/>},
    {field: 'WarehouseCode', title: 'Whse', sortable: true},
    {field: 'ItemCodeDesc', title: 'Description', sortable: true},
    {field: 'ProductLine', title: 'P/L', sortable: true},
    {field: 'Category2', title: 'Category', sortable: true},
    {field: 'Category3', title: 'Collection', sortable: true},
    {field: 'Category4', title: 'SKU', sortable: true},
    {
        field: 'ItemStatus',
        title: 'Status',
        className: 'status-container',
        sortable: true,
        render: (row) => (<ProductStatusBadges item={row}/>)
    },
    {
        field: 'QuantityOnHand',
        title: 'Qty On Hand',
        render: ({QuantityOnHand}) => numeral(QuantityOnHand).format('0,0'),
        className: 'text-end',
        sortable: true
    },
    {
        field: 'QuantityAvailable',
        title: 'Qty Available',
        render: ({QuantityAvailable}) => numeral(QuantityAvailable).format('0,0'),
        className: 'text-end',
        sortable: true
    },
    {
        field: 'AverageUnitCost',
        title: 'Item Cost',
        render: ({AverageUnitCost}) => numeral(AverageUnitCost).format('0,0.0000'),
        className: 'text-end',
        sortable: true
    },
    {
        field: 'QuantityAvailableCost',
        title: 'Ext Cost',
        render: ({QuantityAvailableCost}) => numeral(QuantityAvailableCost).format('0,0.00'),
        className: 'text-end',
        sortable: true
    },

]

const ItemStatusList= () => {
    return (
        <SortableItemList fields={fields}/>
    )
}

export default ItemStatusList;
