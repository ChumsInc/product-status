import type {ProductCategory} from "chums-types";
import AutoCompleteItem from "@/components/auto-complete/AutoCompleteItem.tsx";

export default function CategoryItem({Category2, description}:ProductCategory) {
    return <AutoCompleteItem value={Category2} description={description}/>
}
