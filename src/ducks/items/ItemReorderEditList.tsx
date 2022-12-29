import React from 'react';
import numeral from "numeral";
import {itemKeyProps} from "./utils";
import ReorderMethodSelect from "./ReorderMethodSelect";
import OrderQuantityInput from "./OrderQuantityInput";
import classNames from "classnames";
import SortableItemList from "./SortableItemList";
import ItemLink from "./ItemLink";
import {SortableTableField} from "chums-components";
import {ItemRecord} from "../../types";


const fields: SortableTableField<ItemRecord>[] = [
    {
        field: 'changed',
        title: (<span className="bi-check-circle"/>),
        render: (row) => (
            <span className={classNames({'bi-check-circle-fill': row.changed, 'bi-circle': !row.changed})}/>),
        sortable: true,
    },
    {field: 'ItemCode', title: 'Item', sortable: true, render: (item) => <ItemLink ItemCode={item.ItemCode}/>},
    {field: 'WarehouseCode', title: 'Whse', sortable: true},
    {field: 'ItemCodeDesc', title: 'Description', sortable: true},
    {field: 'PrimaryVendorNo', title: 'Vendor', sortable: true},
    {field: 'ItemStatus', title: 'Status', className: 'status-container', sortable: true},
    {
        field: 'ReorderMethod',
        title: 'Reorder Method',
        sortable: true,
        render: (row) => <ReorderMethodSelect itemKey={itemKeyProps(row)} value={row.ReorderMethod}/>
    },
    {
        field: 'ReorderPointQty',
        title: 'Reorder Point',
        sortable: true,
        render: (row) => <OrderQuantityInput itemKey={itemKeyProps(row)} field="ReorderPointQty"
                                             quantity={row.ReorderPointQty}/>
    },
    {
        field: 'EconomicOrderQty',
        title: 'Econ Order Qty',
        sortable: true,
        render: (row) => <OrderQuantityInput itemKey={itemKeyProps(row)} field="EconomicOrderQty"
                                             quantity={row.EconomicOrderQty}/>
    },
    {
        field: 'MinimumOrderQty',
        title: 'Min Order Qty',
        sortable: true,
        render: (row) => <OrderQuantityInput itemKey={itemKeyProps(row)} field="MinimumOrderQty"
                                             quantity={row.MinimumOrderQty}/>
    },
    {
        field: 'MaximumOnHandQty',
        title: 'Max O/H Qty',
        sortable: true,
        render: (row) => <OrderQuantityInput itemKey={itemKeyProps(row)} field="MaximumOnHandQty"
                                             quantity={row.MaximumOnHandQty}/>
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

const ItemReorderList: React.FC = () => {
    return (
        <SortableItemList fields={fields}/>
    )
}

export default ItemReorderList;
