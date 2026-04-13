import type {Warehouse} from "chums-types";
import AutoCompleteItem from "@/components/auto-complete/AutoCompleteItem.tsx";

export default function WarehouseItem({WarehouseCode, WarehouseDesc}:Warehouse) {
    return (
        <AutoCompleteItem value={WarehouseCode} description={WarehouseDesc}/>
    )
}
