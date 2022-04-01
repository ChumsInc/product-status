import {buildPath, fetchGET, fetchPOST} from "../../fetch";
import {
    CLEAR_ALL_ITEMS,
    FETCH_FAILURE,
    FETCH_INIT,
    FETCH_ITEMS,
    FETCH_POST_ITEM,
    FETCH_SUCCESS,
    PATH_ITEMS,
    PATH_SAVE_ITEM_STATUS,
    SELECT_ALL_ITEMS,
    SELECT_ITEM,
    SET_FILTER, SET_VISIBLE_ITEMS,
    TOGGLE_HIDE_ZERO_ON_HAND,
    TOGGLE_SHOW_ONLY_SELECTED
} from "../../constants";
import {filterVisibleItems, itemKey} from "../../utils";
import {Filter} from "../filters";

export const getQuery = (filter:Filter):URLSearchParams => {
    const params = new URLSearchParams();
    const {productType, warehouse, productLine, category, collection, baseSKU, status} = filter;
    params.set('productType', productType);
    if (warehouse) {
        params.set('warehouse', warehouse)
    }
    if (productLine) {
        params.set('pl', productLine);
    }
    if (category) {
        params.set('cat', category);
    }
    if (collection) {
        params.set('subcat', collection);
    }
    if (baseSKU) {
        params.set('sku', baseSKU);
    }
    if (status) {
        params.set('status', status);
    }
    return params;
};

export const fetchItems = () => (dispatch, getState) => {
    const state = getState();
    const {Company, ItemCode, ...params} = state.app.selection;

    const query = getQuery(params);
    const url = buildPath(PATH_ITEMS, {Company, ItemCode: ItemCode  || null}) + '?' + query;

    dispatch({type: FETCH_ITEMS, status: FETCH_INIT});
    fetchGET(url, {cache: 'no-cache'})
        .then(response => {
            const list = response.result.map(r => {
                const key = itemKey(r);
                const ItemCost = r.QuantityOnHand * r.AverageUnitCost;
                return {...r, Company, key, ItemCost, selected: false};
            });
            dispatch({type: FETCH_ITEMS, status: FETCH_SUCCESS, list});
            dispatch(setVisibleItems());
        })
        .catch(err => {
            console.log('fetchItems()', err);
            dispatch({type: FETCH_ITEMS, status: FETCH_FAILURE, err});
        });
};

export const saveSelected = (newStatus) => (dispatch, getState) => {
    const {items} = getState();
    const selected = items.list.filter(item => !!item.selected);
    selected.forEach(item => dispatch(saveItemStatus(item, newStatus)))
};

export const saveItemStatus = (item, newStatus) => (dispatch, getState) => {
    const {Company, ItemCode, WarehouseCode} = item;
    const url = buildPath(PATH_SAVE_ITEM_STATUS, {Company, ItemCode, WarehouseCode});
    const data = {ItemStatus: newStatus};
    dispatch({type: FETCH_POST_ITEM, status: FETCH_INIT});
    return fetchPOST(url, data)
        .then(response => {
            const {result} = response;
            result.map(item => {
                item.key = itemKey(item);
                item.ItemCost = item.QuantityOnHand * item.AverageUnitCost;
                item.selected = false;
                item.Company = Company;
                dispatch({type: FETCH_POST_ITEM, status:FETCH_SUCCESS, item});
                dispatch(setVisibleItems());
            });
        })
        .catch(err => {
            dispatch({type: FETCH_POST_ITEM, status: FETCH_FAILURE, err});
        });
};

export const selectItem = (key, status) => ({type: SELECT_ITEM, key, status});
export const selectItemAll = (keys) => (dispatch, getState) => {
    dispatch({type: SELECT_ALL_ITEMS, keys});
    dispatch(setVisibleItems());
}
export const setFilter = (filter) => (dispatch, getState) => {
    clearTimeout(debounceFilterTimer);
    dispatch({type: SET_FILTER, filter});
    debounceFilterTimer = setTimeout(() => {
        dispatch(setVisibleItems());
    }, 500);
}
export const toggleShowOnlyOnHand = () => (dispatch, getState) => {
    dispatch({type: TOGGLE_HIDE_ZERO_ON_HAND});
    dispatch(setVisibleItems());
}
export const toggleShowOnlySelected = () => (dispatch, getState) => {
    dispatch({type: TOGGLE_SHOW_ONLY_SELECTED});
    dispatch(setVisibleItems());
}
export const clearSelections = () => (dispatch) => {
    dispatch({type: CLEAR_ALL_ITEMS});
    dispatch(setVisibleItems());
}

export const setVisibleItems = () => (dispatch, getState) => {
    const {items} = getState();
    const visibleItems = filterVisibleItems(items);
    dispatch({type: SET_VISIBLE_ITEMS, visibleItems});
}
