import type {PrimaryVendor} from "chums-types";
import AutoCompleteItem from "@/components/auto-complete/AutoCompleteItem.tsx";

export default function VendorItem({PrimaryVendorNo, VendorName}:PrimaryVendor) {
    return (
        <AutoCompleteItem value={PrimaryVendorNo} description={VendorName}/>
    )
}
