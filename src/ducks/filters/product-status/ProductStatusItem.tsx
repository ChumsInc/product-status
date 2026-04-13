import type {ProductStatus} from "chums-types";
import AutoCompleteItem from "@/components/auto-complete/AutoCompleteItem.tsx";

export default function ProductStatusItem({code, description}:ProductStatus) {
    return (
        <AutoCompleteItem value={code} description={description}/>
    )
}
