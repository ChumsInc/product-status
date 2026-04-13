const localStoragePrefix:string = 'local/product-status';

export const localStorageKeys = {
    rowsPerPage:`${localStoragePrefix}/items/rowsPerPage`,
    showOnlyOnHand: `${localStoragePrefix}/items/showOnlyOnHand`,
    showInactive: `${localStoragePrefix}/items/showInactive`,
    showOnlySelected: `${localStoragePrefix}/items/showOnlySelected`,
    columnVisibility: `${localStoragePrefix}/filter/columnVisibility`,
}
