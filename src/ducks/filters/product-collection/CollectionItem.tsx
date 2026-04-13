import type {ProductCollection} from "chums-types";
import AutoCompleteItem from "@/components/auto-complete/AutoCompleteItem.tsx";

export default function CollectionItem({Category3}:ProductCollection) {
    return (
        <AutoCompleteItem value={Category3}/>
    )

}
