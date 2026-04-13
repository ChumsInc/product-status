import ItemListSearchInput from "./ItemListSearchInput.tsx";
import ItemListFilterOnHand from "./ItemListFilterOnHand.tsx";
import ItemListFilterSelected from "./ItemListFilterSelected.tsx";
import ItemListFilterInactive from "./ItemListFilterInactive.tsx";
import type {ReactNode} from "react";

export interface ItemListFilterBarProps {
    children?: ReactNode
}
const ItemListFilterBar = ({children}:ItemListFilterBarProps) => {

    return (
        <div className="row g-3 align-items-baseline mb-3">
            <div className="col-auto">
                <ItemListSearchInput/>
            </div>
            <div className="col-auto">
                <ItemListFilterOnHand/>
            </div>
            <div className="col-auto">
                <ItemListFilterInactive/>
            </div>
            <div className="col-auto">
                <ItemListFilterSelected/>
            </div>
            {children}
        </div>
    )
}

export default ItemListFilterBar;
