import AutoCompleteItem from "@/components/auto-complete/AutoCompleteItem.tsx";
import type {BaseSKUSearch} from "chums-types";

export default function BaseSKUItem({Category4, description}: BaseSKUSearch) {
    return (
        <AutoCompleteItem value={Category4} description={description}/>
    )
}
