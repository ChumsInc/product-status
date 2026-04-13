import SortableItemList from "../common/SortableItemList.tsx";
import {statusListFields} from "@/ducks/items/product-status-list/statusListFields.tsx";

export default function ProductStatusList() {
    return (
        <SortableItemList fields={statusListFields}/>
    )
}

