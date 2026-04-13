import AutoCompleteItem from "@/components/auto-complete/AutoCompleteItem.tsx";
import type {ProductLine} from "chums-types";

export default function ProductLineItem({ProductLine, ProductLineDesc}: ProductLine) {
    return (
        <AutoCompleteItem value={ProductLine} description={ProductLineDesc}/>
    )
}
