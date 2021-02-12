import {combineReducers} from 'redux';
import {now} from "../utils";
import {
    COMPANY_CHUMS,
    defaultSelection,
    DISMISS_ALERT,
    FETCH_ADMIN_ROLE,
    FETCH_BASE_SKU_LIST,
    FETCH_CATEGORIES,
    FETCH_COLLECTIONS,
    FETCH_FAILURE,
    FETCH_ITEMS,
    FETCH_PRODUCT_LINES,
    FETCH_STATUS_LIST,
    FETCH_SUCCESS,
    FETCH_WAREHOUSES,
    SET_ALERT,
    SET_COMPANY,
    SET_PAGE,
    SET_ROWS_PER_PAGE,
    SET_TAB,
    STORE_PREF_ROWS_PER_PAGE,
    STORE_PREF_TAB,
    TABS,
    UPDATE_SELECTION
} from "../constants";
import {getPreference, setPreference} from "../preferences";


const errorAlert = (err, actionType) => ({
    type: 'danger',
    title: err.name,
    message: `${err.message} [${actionType}]`,
    id: now()
});

const alerts = (state = [], action) => {
    const {type, alert, id, status, err} = action;
    switch (type) {
    case SET_ALERT:
        return [...state, {...alert, id: now()}];
    case DISMISS_ALERT:
        return [...state.filter(alert => alert.id !== id)];
    case FETCH_ITEMS:
    case FETCH_ADMIN_ROLE:
        return status === FETCH_FAILURE ? [...state, errorAlert(err, type)] : state;
    default:
        return state;
    }
};

const rowsPerPage = (state = getPreference(STORE_PREF_ROWS_PER_PAGE, 10), action) => {
    const {type, rowsPerPage} = action;
    switch (type) {
    case SET_ROWS_PER_PAGE:
        setPreference(STORE_PREF_ROWS_PER_PAGE, rowsPerPage);
        return rowsPerPage;
    default:
        return state;
    }
};

const page = (state = 1, action) => {
    const {type, page, status} = action;
    switch (type) {
    case FETCH_ITEMS:
        if (status === FETCH_SUCCESS) {
            return 1;
        }
        return state;
    case SET_ROWS_PER_PAGE:
        return 1;
    case SET_PAGE:
        return page;
    default:
        return state;
    }
};

const tab = (state = getPreference(STORE_PREF_TAB, TABS.report), action) => {
    const {type, tab} = action;
    switch (type) {
    case SET_TAB:
        setPreference(STORE_PREF_TAB, tab);
        return tab;
    default:
        return state;
    }
};

const isAdmin = (state = false, action) => {
    const {type, status, success} = action;
    switch (type) {
    case FETCH_ADMIN_ROLE:
        return status === FETCH_SUCCESS ? success : state;
    default:
        return state;
    }
};

const company = (state = COMPANY_CHUMS.code, action) => {
    const {type, company, props} = action;
    switch (type) {
    case UPDATE_SELECTION:
        return props.Company === undefined ? state : props.Company;
    case SET_COMPANY:
        return company;
    default:
        return state;
    }
};


const warehouses = (state = [], action) => {
    const {type, status, list} = action;
    switch (type) {
    case FETCH_WAREHOUSES:
        return status === FETCH_SUCCESS ? [...list] : state;
    default:
        return state;
    }
};

const productLines = (state = [], action) => {
    const {type, status, list} = action;
    switch (type) {
    case FETCH_PRODUCT_LINES:
        return status === FETCH_SUCCESS ? list : state;
    default:
        return state;
    }
};

const categories = (state = [], action) => {
    const {type, status, list} = action;
    switch (type) {
    case FETCH_CATEGORIES:
        return status === FETCH_SUCCESS ? list : state;
    default:
        return state;
    }
};

const collections = (state = [], action) => {
    const {type, status, list} = action;
    switch (type) {
    case FETCH_COLLECTIONS:
        return status === FETCH_SUCCESS ? list : state;
    default:
        return state;
    }
};

const baseSKUs = (state = [], action) => {
    const {type, status, list} = action;
    switch (type) {
    case FETCH_BASE_SKU_LIST:
        return status === FETCH_SUCCESS ? list : state;
    default:
        return state;
    }
};

const statusList = (state = [], action) => {
    const {type, status, list} = action;
    switch (type) {
    case FETCH_STATUS_LIST:
        return status === FETCH_SUCCESS ? list : state;
    default:
        return state;
    }
};


const selection = (state = defaultSelection, action) => {
    const {type, props, company} = action;
    switch (type) {
    case UPDATE_SELECTION:
        return {...state, ...props};
    case SET_COMPANY:
        return {...defaultSelection, Company: company};
    default:
        return state;
    }
};

export default combineReducers({
    alerts,
    tab,
    rowsPerPage,
    page,
    isAdmin,
    company,
    warehouses,
    productLines,
    categories,
    collections,
    baseSKUs,
    statusList,
    selection,
})
