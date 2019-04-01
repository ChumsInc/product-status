export const SET_ALERT = 'SET_ALERT';
export const DISMISS_ALERT = 'DISMISS_ALERT';

export const SET_TAB = 'SET_TAB';
export const SET_COMPANY = 'SET_COMPANY';

export const FETCH_INIT = 'FETCH_INIT';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';

export const FETCH_WAREHOUSES = 'FETCH_WAREHOUSES';
export const FETCH_PRODUCT_LINES = 'FETCH_PRODUCT_LINES';
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_COLLECTIONS = 'FETCH_COLLECTIONS';
export const FETCH_BASE_SKU_LIST = 'FETCH_BASE_SKU_LIST';
export const FETCH_STATUS_LIST = 'FETCH_STATUS_LIST';
export const FETCH_ITEMS = 'FETCH_ITEMS';
export const LOAD_ITEMS = 'LOAD_ITEMS';
export const FETCH_ADMIN_ROLE = 'FETCH_ROLE';

export const FETCH_POST_ITEM = 'FETCH_POST_ITEM';
export const FETCH_ITEM = 'FETCH_ITEM';

export const LOAD_FAILURE = 'LOAD_FAILURE';
export const ACK_ERROR = 'ACK_ERROR';

export const UPDATE_SELECTION = 'UPDATE_SELECTION';

export const SELECT_ITEM = 'SELECT_ITEM';
export const SELECT_ALL_ITEMS = 'SELECT_ALL_ITEMS';

export const PATH_WAREHOUSES = '/node/search/whse/:company/';
export const PATH_PRODUCT_LINES = '/node/search/prodline/:company/';
export const PATH_CATEGORY = '/node/search/cat2/:company/';
export const PATH_COLLECTIONS = '/node/search/cat3/:company/';
export const PATH_BASE_SKU_LIST = '/node/search/cat4/:company/';
export const PATH_STATUS_LIST = '/node-dev/production/item/status/';
export const PATH_ITEMS = '/node-dev/production/item/status/:Company/:ItemCode?';
export const PATH_SAVE_ITEM_STATUS = '/node-dev/production/item/status/:Company/:ItemCode/:WarehouseCode';
export const PATH_CHECK_ADMIN_ROLE = '/node-dev/user/validate/role/product-admin';


export const TABS = {
    report: 0,
    edit: 1
};

export const TAB_LIST = [
    {id: TABS.report, title: 'Product Status Report'},
    {id: TABS.edit, title: 'Edit Product Status'},
];

export const COMPANY_CHUMS = {code: 'CHI', name: 'Chums'};
export const COMPANY_BEYONDCOASTAL = {code: 'BCS', name: 'Beyond Coastal'};
export const COMPANIES = [COMPANY_CHUMS, COMPANY_BEYONDCOASTAL];

export const defaultSelection = {
    Company: 'CHI',
    WarehouseCode: '',
    ItemCode: '',
    ProductLine: '',
    Category2: '',
    Category3: '',
    Category4: '',
    ItemStatus: 'D%'
};

