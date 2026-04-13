import type {SortableTableField} from "@chumsinc/sortable-tables";
import type {ItemRecord} from "../../../types.ts";
import SelectAllCheckbox from "@/ducks/items/product-edit-list/SelectAllCheckbox.tsx";
import ItemSelectedCheckbox from "@/ducks/items/product-edit-list/ItemSelectedCheckbox.tsx";
import {
    productCostFields,
    productInfoFields,
    productListFields,
    productStatusField
} from "@/ducks/items/common/productListFields.tsx";

export const editListFields: SortableTableField<ItemRecord>[] = [
    {
        field: 'ItemCode',
        title: (<SelectAllCheckbox/>),
        render: (row) => <ItemSelectedCheckbox item={row} selected={row.selected ?? false}/>
    },
    ...productListFields,
    ...productInfoFields,
    productStatusField,
    ...productCostFields
];
