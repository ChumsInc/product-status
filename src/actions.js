import { fetchGET, fetchPOST, buildPath } from './fetch';
import {
    DISMISS_ALERT,
    FETCH_FAILURE,
    FETCH_INIT,
    FETCH_PRODUCT_LINES,
    FETCH_SUCCESS,
    FETCH_WAREHOUSES,
    SET_ALERT,
    SET_TAB,
    UPDATE_SELECTION,
    PATH_WAREHOUSES,
    PATH_PRODUCT_LINES,
    PATH_CATEGORY,
    FETCH_CATEGORIES,
    PATH_COLLECTIONS,
    FETCH_COLLECTIONS,
    PATH_BASE_SKU_LIST,
    FETCH_BASE_SKU_LIST,
    PATH_STATUS_LIST,
    FETCH_STATUS_LIST,
    PATH_ITEMS,
    FETCH_ITEMS,
    PATH_SAVE_ITEM_STATUS,
    FETCH_ITEM,
    FETCH_POST_ITEM,
    SELECT_ITEM,
    SELECT_ALL_ITEMS,
    SET_COMPANY,
    PATH_CHECK_ADMIN_ROLE, FETCH_ADMIN_ROLE
} from "./constants";

// export const RECEIVE_USER = 'RECEIVE_USER';

export const setAlert = ({type = 'warning', title = 'Oops!', message = 'There was an error'}) => ({
    type: SET_ALERT,
    alert: {type, title, message}
});

export const dismissAlert = (id) => ({type: DISMISS_ALERT, id});

export const setTab = (tab) => ({type: SET_TAB, tab});

export const itemKey = (item) => ( `${item.ItemCode}:${item.WarehouseCode}`);

export const updateSelection = (props) => {
    return {type: UPDATE_SELECTION, props};
};

export const setCompany = (company) => (dispatch, getState) => {
    fetchCompanyOptions(company);
    dispatch({type: SET_COMPANY, company});
};

export const fetchCompanyOptions = (company) => (dispatch, getState) => {
    if (!company) {
        const state = getState();
        company = state.selection.Company;
    }
    dispatch(fetchWarehouses(company));
    dispatch(fetchProductLines(company));
    dispatch(fetchCategories(company));
    dispatch(fetchCollections(company));
    dispatch(fetchBaseSKUList(company));
    dispatch(fetchStatuses(company));
    dispatch(checkProductAdminRole());
};

export const fetchWarehouses = (company = 'CHI') => (dispatch) => {
    const url = buildPath(PATH_WAREHOUSES, {company}, true);
    dispatch({type: FETCH_WAREHOUSES, status: FETCH_INIT});
    fetchGET(url)
        .then(response => {
            dispatch({type: FETCH_WAREHOUSES, status: FETCH_SUCCESS, list: response.result});
        })
        .catch(err => {
            dispatch({type: FETCH_WAREHOUSES, status: FETCH_FAILURE, err});

        });
};

export const fetchProductLines = (company = 'CHI') => (dispatch) => {
    const url = buildPath(PATH_PRODUCT_LINES, {company}, true);
    dispatch({type: FETCH_PRODUCT_LINES, status: FETCH_INIT});
    fetchGET(url)
        .then(response => {
            const list = response.result || [];
            dispatch({type: FETCH_PRODUCT_LINES, status: FETCH_SUCCESS, list});
        })
        .catch(err => {
            dispatch({type: FETCH_PRODUCT_LINES, status: FETCH_FAILURE, err});
        });
};

export const fetchCategories = (company = 'CHI') => (dispatch) => {
    const url = buildPath(PATH_CATEGORY, {company}, true);

    fetchGET(url)
        .then(response => {
            const list = response.result || [];
            dispatch({type: FETCH_CATEGORIES, status: FETCH_SUCCESS, list});
        })
        .catch(err => {
            dispatch({type: LOAD_FAILURE, err});
        });
};

export const fetchCollections = (company = 'CHI') => (dispatch) => {
    const url = buildPath(PATH_COLLECTIONS, {company}, true);
    dispatch({type: FETCH_CATEGORIES, status: FETCH_INIT});
    fetchGET(url)
        .then(response => {
            const list = response.result || [];
            dispatch({type: FETCH_COLLECTIONS, status: FETCH_SUCCESS, list});
        })
        .catch(err => {
            dispatch({type: FETCH_COLLECTIONS, status: FETCH_FAILURE, err});
        });
};

export const fetchBaseSKUList = (company = 'CHI') => (dispatch) => {
    const url = buildPath(PATH_BASE_SKU_LIST, {company}, false);
    dispatch({type: FETCH_BASE_SKU_LIST, status: FETCH_INIT});
    fetchGET(url)
        .then(response => {
            const list = response.result || [];
            dispatch({type: FETCH_BASE_SKU_LIST, status: FETCH_SUCCESS, list});
        })
        .catch(err => {
            dispatch({type: FETCH_BASE_SKU_LIST, status: FETCH_FAILURE, err});
        });
};

export const fetchStatuses = (company = 'CHI') => (dispatch) => {
    const url = buildPath(PATH_STATUS_LIST, {company}, false);
    dispatch({type: FETCH_STATUS_LIST, status: FETCH_INIT});
    fetchGET(url)
        .then(response => {
            const list = response.result || [];
            dispatch({type: FETCH_STATUS_LIST, status: FETCH_SUCCESS, list});
        })
        .catch(err => {
            dispatch({type: FETCH_STATUS_LIST, err});
        });
};

export const getQuery = (params) => {
    const keys = ['WarehouseCode', 'ProductLine', 'Category2', 'Category3', 'Category4', 'ItemStatus'];
    return Object.keys(params)
        .filter(key => keys.includes(key))
        .filter(key => params[key] !== '' && params[key] !== '%')
        .map(key => `${key}=` + encodeURIComponent(params[key]))
        .join('&');
};

export const fetchItems = () => (dispatch, getState) => {
    const state = getState();
    const {Company, ItemCode, ...params} = state.selection;

    const query = getQuery(params);
    const url = buildPath(PATH_ITEMS, {Company, ItemCode: ItemCode  || null}, true) + '&' + query;

    dispatch({type: FETCH_ITEMS, state: FETCH_INIT});
    fetchGET(url)
        .then(response => {
            const list = response.result.map(r => {
                const key = itemKey(r);
                const ItemCost = r.QuantityOnHand * r.AverageUnitCost;
                return {...r, Company, key, ItemCost, selected: false};
            });
            dispatch({type: FETCH_ITEMS, status: FETCH_SUCCESS, list});
        })
        .catch(err => {
            console.log('fetchItems()', err);
            dispatch({type: FETCH_ITEMS, status: FETCH_FAILURE, err});
        });
};

export const saveItemStatus = (item, newStatus) => (dispatch, getState) => {
    const {Company, ItemCode, WarehouseCode} = item;
    const url = buildPath(PATH_SAVE_ITEM_STATUS, {Company, ItemCode, WarehouseCode});
    const data = {ItemStatus: newStatus};
    dispatch({type: FETCH_POST_ITEM, status: FETCH_INIT});
    fetchPOST(url, data)
        .then(response => {
            const {result} = response;
            result.map(item => {
                item.key = itemKey(item);
                item.ItemCost = item.QuantityOnHand * item.AverageUnitCost;
                item.selected = false;
                item.Company = Company;
                dispatch({type: FETCH_POST_ITEM, status:FETCH_SUCCESS, item});
            });
        })
        .catch(err => {
            dispatch({type: FETCH_POST_ITEM, status: FETCH_FAILURE, err});
        });
};

export const selectItem = (key, status) => ({type: SELECT_ITEM, key, status});
export const selectItemAll = (status) => ({type: SELECT_ALL_ITEMS, status: status === true});


export const checkProductAdminRole = () => (dispatch, getState) => {

    fetchGET(PATH_CHECK_ADMIN_ROLE)
        .then(({success}) => {
            dispatch({type: FETCH_ADMIN_ROLE, status: FETCH_SUCCESS, success});
        })
        .catch(err => {
            dispatch({type: FETCH_ADMIN_ROLE, status: FETCH_FAILURE});
        })
};