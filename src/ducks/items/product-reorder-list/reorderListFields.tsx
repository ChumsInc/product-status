import type {SortableTableField} from "@chumsinc/sortable-tables";
import type {ItemRecord} from "../../../types.ts";
import classNames from "classnames";
import {
    productCostFields,
    productInfoFields,
    productListFields,
    productStatusField
} from "@/ducks/items/common/productListFields.tsx";
import ReorderMethodSelect from "@/ducks/items/product-reorder-list/ReorderMethodSelect.tsx";
import {itemKeyProps} from "@/ducks/items/utils.ts";
import OrderQuantityInput from "@/ducks/items/product-reorder-list/OrderQuantityInput.tsx";
import numeral from "numeral";

export const reorderListFields:SortableTableField<ItemRecord>[] = [
    {
        field: 'changed',
        title: (<span className="bi-check-circle"/>),
        render: (row) => (
            <span className={classNames({'bi-check-circle-fill': row.changed, 'bi-circle': !row.changed})}/>
        ),
        sortable: true,
    },
    ...productListFields,
    ...productInfoFields.filter(col => col.field === "PrimaryVendorNo"),
    productStatusField,
    {
        field: 'ReorderMethod',
        title: 'Reorder Method',
        sortable: true,
        render: (row) => <ReorderMethodSelect itemKey={itemKeyProps(row)}
                                              value={row.changes?.ReorderMethod ?? row.ReorderMethod}
                                              disabled={row.ProductType === 'D' || row.InactiveItem === 'Y'}/>
    },
    {
        field: 'ReorderPointQty',
        title: 'Reorder Point',
        sortable: true,
        render: (row) => <OrderQuantityInput itemKey={itemKeyProps(row)} field="ReorderPointQty"
                                             quantity={numeral(row.changes?.ReorderPointQty ?? row.ReorderPointQty).format('0')}
                                             disabled={row.ProductType === 'D' || row.InactiveItem === 'Y'}/>
    },
    {
        field: 'EconomicOrderQty',
        title: 'Econ Order Qty',
        sortable: true,
        render: (row) => <OrderQuantityInput itemKey={itemKeyProps(row)} field="EconomicOrderQty"
                                             quantity={numeral(row.changes?.EconomicOrderQty ?? row.EconomicOrderQty).format('0')}
                                             disabled={row.ProductType === 'D' || row.InactiveItem === 'Y'}/>
    },
    {
        field: 'MinimumOrderQty',
        title: 'Min Order Qty',
        sortable: true,
        render: (row) => <OrderQuantityInput itemKey={itemKeyProps(row)} field="MinimumOrderQty"
                                             quantity={numeral(row.changes?.MinimumOrderQty ?? row.MinimumOrderQty).format('0')}
                                             disabled={row.ProductType === 'D' || row.InactiveItem === 'Y'}/>
    },
    {
        field: 'MaximumOnHandQty',
        title: 'Max O/H Qty',
        sortable: true,
        render: (row) => <OrderQuantityInput itemKey={itemKeyProps(row)} field="MaximumOnHandQty"
                                             quantity={numeral(row.changes?.MaximumOnHandQty ??  row.MaximumOnHandQty).format('0')}
                                             disabled={row.ProductType === 'D' || row.InactiveItem === 'Y'}/>
    },
    ...productCostFields,
];
