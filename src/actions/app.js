import {
    DISMISS_ALERT, FETCH_ADMIN_ROLE,
    FETCH_BASE_SKU_LIST,
    FETCH_CATEGORIES,
    FETCH_COLLECTIONS,
    FETCH_FAILURE,
    FETCH_INIT,
    FETCH_PRODUCT_LINES,
    FETCH_STATUS_LIST,
    FETCH_SUCCESS,
    FETCH_WAREHOUSES,
    PATH_BASE_SKU_LIST,
    PATH_CATEGORY,
    PATH_CHECK_ADMIN_ROLE,
    PATH_COLLECTIONS,
    PATH_PRODUCT_LINES,
    PATH_STATUS_LIST,
    PATH_WAREHOUSES,
    SET_ALERT,
    SET_COMPANY, SET_PAGE, SET_ROWS_PER_PAGE,
    SET_TAB, UPDATE_SELECTION
} from "../constants";
import {buildPath, fetchGET} from "../fetch";

export const setAlert = ({type = 'warning', title = 'Oops!', message = 'There was an error'}) => ({
    type: SET_ALERT,
    alert: {type, title, message}
});

export const dismissAlert = (id) => ({type: DISMISS_ALERT, id});

export const setTab = (tab) => ({type: SET_TAB, tab});

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
    const url = buildPath(PATH_WAREHOUSES, {company});
    dispatch({type: FETCH_WAREHOUSES, status: FETCH_INIT});
    fetchGET(url, {cache: 'no-cache'})
        .then(response => {
            dispatch({type: FETCH_WAREHOUSES, status: FETCH_SUCCESS, list: response.result});
        })
        .catch(err => {
            dispatch({type: FETCH_WAREHOUSES, status: FETCH_FAILURE, err});

        });
};

export const fetchProductLines = (company = 'CHI') => (dispatch) => {
    const url = buildPath(PATH_PRODUCT_LINES, {company});
    dispatch({type: FETCH_PRODUCT_LINES, status: FETCH_INIT});
    fetchGET(url, {cache: 'no-cache'})
        .then(response => {
            const list = response.result || [];
            dispatch({type: FETCH_PRODUCT_LINES, status: FETCH_SUCCESS, list});
        })
        .catch(err => {
            dispatch({type: FETCH_PRODUCT_LINES, status: FETCH_FAILURE, err});
        });
};

export const fetchCategories = (company = 'CHI') => (dispatch) => {
    const url = buildPath(PATH_CATEGORY, {company});

    fetchGET(url, {cache: 'no-cache'})
        .then(response => {
            const list = response.result || [];
            dispatch({type: FETCH_CATEGORIES, status: FETCH_SUCCESS, list});
        })
        .catch(err => {
            dispatch({type: LOAD_FAILURE, err});
        });
};

export const fetchCollections = (company = 'CHI') => (dispatch) => {
    const url = buildPath(PATH_COLLECTIONS, {company});
    dispatch({type: FETCH_CATEGORIES, status: FETCH_INIT});
    fetchGET(url, {cache: 'no-cache'})
        .then(response => {
            const list = response.result || [];
            dispatch({type: FETCH_COLLECTIONS, status: FETCH_SUCCESS, list});
        })
        .catch(err => {
            dispatch({type: FETCH_COLLECTIONS, status: FETCH_FAILURE, err});
        });
};

export const fetchBaseSKUList = (company = 'CHI') => (dispatch) => {
    const url = buildPath(PATH_BASE_SKU_LIST, {company});
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
    const url = buildPath(PATH_STATUS_LIST, {company});
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





export const checkProductAdminRole = () => (dispatch, getState) => {

    fetchGET(PATH_CHECK_ADMIN_ROLE)
        .then(({success}) => {
            dispatch({type: FETCH_ADMIN_ROLE, status: FETCH_SUCCESS, success});
        })
        .catch(err => {
            dispatch({type: FETCH_ADMIN_ROLE, status: FETCH_FAILURE});
        })
};

export const setRowsPerPage = (rowsPerPage) => ({type: SET_ROWS_PER_PAGE, rowsPerPage});
export const setPage = (page) => ({type: SET_PAGE, page});
export const updateSelection = (props) => {
    return {type: UPDATE_SELECTION, props};
};
