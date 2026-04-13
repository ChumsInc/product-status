import type {PrimaryVendor} from "chums-types";

export const vendorSort = (a: PrimaryVendor, b: PrimaryVendor) => a.PrimaryVendorNo.localeCompare(b.PrimaryVendorNo);

export const vendorFilter = (value: string) => (element: PrimaryVendor) => {
    let regex = /^/;
    try {
        regex = new RegExp(value, 'i')
    } catch(_err:unknown) {
        // do nothing
    }

    return !value
        || element.PrimaryVendorNo.toLowerCase().startsWith(value.toLowerCase())
        || regex.test(element.VendorName);
}
