import ItemLink from "@/ducks/items/common/ItemLink.tsx";
import ProductStatusBadges from "@/ducks/items/common/ProductStatusBadges.tsx";
import numeral from "numeral";
import type {SortableTableField} from "@chumsinc/sortable-tables";
import type {ItemRecord} from "../../../types.ts";

export const productListFields:SortableTableField<ItemRecord>[] = [
    {field: 'ItemCode', title: 'Item', sortable: true, render: (item) => <ItemLink ItemCode={item.ItemCode}/>},
    {field: 'WarehouseCode', title: 'Whse', sortable: true},
    {field: 'ItemCodeDesc', title: 'Description', sortable: true},
];

export const productInfoFields:SortableTableField<ItemRecord>[] = [
    {field: 'ProductLine', title: 'P/L', sortable: true},
    {field: 'Category2', title: 'Category', sortable: true},
    {field: 'Category3', title: 'Collection', sortable: true},
    {field: 'Category4', title: 'SKU', sortable: true},
    {field: 'PrimaryVendorNo', title: 'Vendor', sortable: true},
]

export const productStatusField:SortableTableField<ItemRecord> = {
    field: 'ItemStatus',
    title: 'Status',
    className: 'status-container',
    sortable: true,
    render: (row) => (<ProductStatusBadges item={row}/>)
};

export const productCostFields:SortableTableField<ItemRecord>[] = [
    {
        field: 'QuantityOnHand',
        title: 'Qty On Hand',
        render: ({QuantityOnHand}) => numeral(QuantityOnHand).format('0,0'),
        align: 'end',
        sortable: true
    },
    {
        field: 'QuantityAvailable',
        title: 'Qty Available',
        render: ({QuantityAvailable}) => numeral(QuantityAvailable).format('0,0'),
        align: 'end',
        sortable: true
    },
    {
        field: 'AverageUnitCost',
        title: 'Item Cost',
        render: ({AverageUnitCost}) => numeral(AverageUnitCost).format('0,0.0000'),
        align: 'end',
        sortable: true
    },
    {
        field: 'QuantityAvailableCost',
        title: 'Ext Cost',
        render: ({QuantityAvailableCost}) => numeral(QuantityAvailableCost).format('0,0.00'),
        align: 'end',
        sortable: true
    },
];
