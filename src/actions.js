import { fetchGET, fetchPOST, fetchDELETE } from './chums/fetch';
export const RECEIVE_WAREHOUSES = 'RECEIVE_WAREHOUSES';
export const RECEIVE_PRODUCT_LINES = 'RECEIVE_PRODUCT_LINES';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const RECEIVE_SUBCATEGORIES = 'RECEIVE_SUBCATEGORIES';
export const RECEIVE_BASE_SKUS = 'RECEIVE_BASE_SKUS';
export const RECEIVE_STATUSES = 'RECEIVE_STATUSES';
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';

export const LOAD_PRODUCTS = 'LOAD_PRODUCTS';

export const LOAD_FAILURE = 'LOAD_FAILURE';
export const ACK_ERROR = 'ACK_ERROR';

export const fetchWarehouses = (company = 'CHI') => (dispatch) => {
    const url = '/node/search/whse/:company/'.replace(':company', company);
    fetchGET(url)
        .then(response => {
            dispatch({type: RECEIVE_WAREHOUSES, list: response.result});
        })
        .catch(err => {
            dispatch({type: LOAD_FAILURE, err});
        });
};

export const fetchProductLines = (company = 'CHI') => (dispatch) => {
    const url = '/node/search/prodline/:company/'.replace(':company', company);
    fetchGET(url)
        .then(response => {
            dispatch({type: RECEIVE_PRODUCT_LINES, list: response.result});
        })
        .catch(err => {
            dispatch({type: LOAD_FAILURE, err});
        });
};

export const fetchCat2 = (company = 'CHI') => (dispatch) => {
    const url = '/node/search/cat2/:company/'.replace(':company', company);
    fetchGET(url)
        .then(response => {
            dispatch({type: RECEIVE_CATEGORIES, list: response.result});
        })
        .catch(err => {
            dispatch({type: LOAD_FAILURE, err});
        });
};

export const fetchCat3 = (company = 'CHI') => (dispatch) => {
    const url = '/node/search/cat3/:company/'.replace(':company', company);
    fetchGET(url)
        .then(response => {
            dispatch({type: RECEIVE_SUBCATEGORIES, list: response.result});
        })
        .catch(err => {
            dispatch({type: LOAD_FAILURE, err});
        });
};

export const fetchCat4 = (company = 'CHI') => (dispatch) => {
    const url = '/node/search/cat4/:company/'.replace(':company', company);
    fetchGET(url)
        .then(response => {
            dispatch({type: RECEIVE_BASE_SKUS, list: response.result});
        })
        .catch(err => {
            dispatch({type: LOAD_FAILURE, err});
        });
};

export const fetchStatuses = (company = 'CHI') => (dispatch) => {
    const url = '/node-dev/production/item/status/';
    fetchGET(url)
        .then(response => {
            dispatch({type: RECEIVE_STATUSES, list: response.result});
        })
        .catch(err => {
            dispatch({type: LOAD_FAILURE, err});
        });
};

export const getQuery = (params) => {
    const qKeys = new Set(['WarehouseCode', 'ProductLine', 'Category2', 'Category3', 'Category4', 'ItemStatus']);
    return Object.keys(params)
        .filter(key => qKeys.has(key) && params[key] !== '' && params[key] !== '%')
        .map(key => `${key}=` + encodeURIComponent(params[key]))
        .join('&');
};

export const fetchProducts = ({Company, ItemCode, ...params}) => (dispatch) => {
    const url = '/node-dev/production/item/status/:Company/:ItemCode?:Query'
        .replace(':Company', encodeURIComponent(Company))
        .replace(':ItemCode', encodeURIComponent(ItemCode))
        .replace(':Query', getQuery(params));
    fetchGET(url)
        .then(response => {
            const list = response.result.map(r => {
                const key = `${r.ItemCode}:${r.WarehouseCode}`;
                const ItemCost = r.QuantityOnHand * r.AverageUnitCost;
                return {...r, Company, key, ItemCost};
            });
            dispatch({type: RECEIVE_PRODUCTS, list});
        })
        .catch(err => {
            console.log('fetchProducts()', err);
            dispatch({type: LOAD_FAILURE, err});
        });
};

