import React from 'react';
import {ItemTableField} from "./types";
import numeral from "numeral";
import {useSelector} from "react-redux";
import {selectFilteredItems, selectItemListLength, selectItemsLoading} from "./selectors";
import {ConnectedPager, ConnectedTable, selectPagedData} from "chums-connected-components";
import {itemStatusTableKey} from "./actionTypes";
import {itemKey, rowClassName} from "./utils";
import ReorderMethodSelect from "./ReorderMethodSelect";
import OrderQuantityInput from "./OrderQuantityInput";
import classNames from "classnames";
import {LoadingProgressBar} from "chums-components";


const fields: ItemTableField[] = [
    {
        field: 'changed',
        title: (<span className="bi-check-circle"/>),
        render: (row) => (
            <span className={classNames({'bi-check-circle-fill': row.changed, 'bi-circle': !row.changed})}/>),
        sortable: true,
    },
    {field: 'ItemCode', title: 'Item', sortable: true},
    {field: 'WarehouseCode', title: 'Whse', sortable: true},
    {field: 'ItemCodeDesc', title: 'Description', sortable: true},
    // {field: 'ProductLine', title: 'P/L', sortable: true},
    // {field: 'Category2', title: 'Category', sortable: true},
    // {field: 'Category3', title: 'Collection', sortable: true},
    // {field: 'Category4', title: 'SKU', sortable: true},
    {field: 'PrimaryVendorNo', title: 'Vendor', sortable: true},
    {field: 'ItemStatus', title: 'Status', className: 'status-container', sortable: true},
    {
        field: 'ReorderMethod',
        title: 'Reorder Method',
        sortable: true,
        render: (row) => <ReorderMethodSelect itemKey={itemKey(row)} value={row.ReorderMethod}/>
    },
    {
        field: 'ReorderPointQty',
        title: 'Reorder Point',
        sortable: true,
        render: (row) => <OrderQuantityInput itemKey={itemKey(row)} field="ReorderPointQty"
                                             quantity={row.ReorderPointQty}/>
    },
    {
        field: 'EconomicOrderQty',
        title: 'Econ Order Qty',
        sortable: true,
        render: (row) => <OrderQuantityInput itemKey={itemKey(row)} field="EconomicOrderQty"
                                             quantity={row.EconomicOrderQty}/>
    },
    {
        field: 'MinimumOrderQty',
        title: 'Min Order Qty',
        sortable: true,
        render: (row) => <OrderQuantityInput itemKey={itemKey(row)} field="MinimumOrderQty"
                                             quantity={row.MinimumOrderQty}/>
    },
    {
        field: 'MaximumOnHandQty',
        title: 'Max O/H Qty',
        sortable: true,
        render: (row) => <OrderQuantityInput itemKey={itemKey(row)} field="MaximumOnHandQty"
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

const ItemStatusList: React.FC = () => {
    const loading = useSelector(selectItemsLoading);
    const list = useSelector(selectFilteredItems);
    const listLength = useSelector(selectItemListLength);
    const pageList = useSelector(selectPagedData(itemStatusTableKey, list));

    return (
        <div>
            {loading && <LoadingProgressBar animated striped/>}
            <ConnectedTable tableKey={itemStatusTableKey} keyField={itemKey} fields={fields} data={pageList}
                            defaultSort={{field: 'ItemCode', ascending: true}}
                            className="table-sticky" rowClassName={rowClassName}/>
            <ConnectedPager pageSetKey={itemStatusTableKey} dataLength={list.length}
                            filtered={list.length < listLength}/>
        </div>
    )
}

export default ItemStatusList;
