import type {ProductSearchItem} from "chums-types";
import AutoCompleteItem from "@/components/auto-complete/AutoCompleteItem.tsx";

export default function SearchItem({ItemCode, ItemCodeDesc}:ProductSearchItem) {
    return (
        <AutoCompleteItem value={ItemCode} description={ItemCodeDesc}/>
    )
}
