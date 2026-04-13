import SortableItemList from "../common/SortableItemList.tsx";
import {reorderListFields} from "@/ducks/items/product-reorder-list/reorderListFields.tsx";

const ItemReorderList = () => {
    return (
        <SortableItemList fields={reorderListFields}
                          rowClassName={(row) => ({'text-danger': row.InactiveItem === 'Y' || row.ProductType === 'D'})}/>
    )
}

export default ItemReorderList;
