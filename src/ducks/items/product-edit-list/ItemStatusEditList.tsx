import SortableItemList from "../common/SortableItemList.tsx";
import {editListFields} from "@/ducks/items/product-edit-list/editListFields.tsx";


export default function ItemStatusEditList() {
    return (
        <SortableItemList fields={editListFields}/>
    )
}

