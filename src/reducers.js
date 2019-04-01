import { combineReducers } from 'redux';
import {
    COMPANY_CHUMS, defaultSelection,
    DISMISS_ALERT, FETCH_ADMIN_ROLE, FETCH_BASE_SKU_LIST, FETCH_CATEGORIES, FETCH_COLLECTIONS,
    FETCH_FAILURE, FETCH_INIT, FETCH_ITEM, FETCH_ITEMS, FETCH_POST_ITEM,
    FETCH_PRODUCT_LINES, FETCH_STATUS_LIST,
    FETCH_SUCCESS,
    FETCH_WAREHOUSES, SELECT_ALL_ITEMS, SELECT_ITEM,
    SET_ALERT, SET_COMPANY, SET_TAB, TABS, UPDATE_SELECTION
} from "./constants";
import {now} from './utils';


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

const tab = (state = TABS.report, action) => {
    const {type, tab} = action;
    switch (type) {
    case SET_TAB:
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
        return props.Company === undefined ? state: props.Company;
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

const items = (state = [], action) => {
    const {type, key, status, item, list} = action;
    switch (type) {
    case SELECT_ITEM:
        const [selected] = state.filter(i => i.key === key);
        selected.selected = status;
        const rest = state.filter(i => i.key !== key);
        return [{...selected}, ...rest];

    case SELECT_ALL_ITEMS:
        const items = state.map(i => {
            i.selected = status;
            return i;
        });
        return [...items];

    case FETCH_ITEM:
    case FETCH_POST_ITEM:
        if (status === FETCH_SUCCESS) {
            const notUpdated = state.filter(i => i.key !== item.key);
            return [{...item}, ...notUpdated];
        }
        return state;

    case FETCH_ITEMS:
        return status === FETCH_SUCCESS ? [...list] : state;
    default:
        return state;
    }
};

const itemsLoaded = (state = 0, action) => {
    const {type, status} = action;
    return type === FETCH_ITEMS && status === FETCH_SUCCESS
        ? new Date().valueOf()
        : state;
};

const loading = (state = false, action) => {
    const {type, status} = action;
    switch (type) {
    case FETCH_ITEMS:
    case FETCH_POST_ITEM:
        return status === FETCH_INIT;
    default:
        return state;
    }
};

const selection = (state = defaultSelection,  action) => {
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


const appReducer = combineReducers({
    alerts,
    tab,
    isAdmin,
    company,
    warehouses,
    productLines,
    categories,
    collections,
    baseSKUs,
    statusList,
    items,
    loading,
    selection,
    itemsLoaded,
});

export default appReducer;
