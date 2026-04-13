import type {SortableTableField} from "@chumsinc/sortable-tables";
import type {ItemRecord} from "../../../types.ts";
import {
    productCostFields,
    productInfoFields,
    productListFields,
    productStatusField
} from "@/ducks/items/common/productListFields.tsx";

export const statusListFields: SortableTableField<ItemRecord>[] = [
    ...productListFields,
    ...productInfoFields,
    productStatusField,
    ...productCostFields,
]
