import { combineReducers } from 'redux';
import {
    CLEAR_ALL_ITEMS,
    COMPANY_CHUMS,
    defaultSelection,
    DISMISS_ALERT,
    FETCH_ADMIN_ROLE,
    FETCH_BASE_SKU_LIST,
    FETCH_CATEGORIES,
    FETCH_COLLECTIONS,
    FETCH_FAILURE,
    FETCH_INIT,
    FETCH_ITEM,
    FETCH_ITEMS,
    FETCH_POST_ITEM,
    FETCH_PRODUCT_LINES,
    FETCH_STATUS_LIST,
    FETCH_SUCCESS,
    FETCH_WAREHOUSES,
    SELECT_ALL_ITEMS,
    SELECT_ITEM,
    SET_ALERT,
    SET_COMPANY, SET_FILTER,
    SET_PAGE,
    SET_ROWS_PER_PAGE,
    SET_TAB, SET_VISIBLE_ITEMS,
    STORE_PREF_ROWS_PER_PAGE,
    STORE_PREF_SHOW_ON_HAND, STORE_PREF_SHOW_ONLY_SELECTED,
    STORE_PREF_TAB,
    TABS,
    TOGGLE_HIDE_ZERO_ON_HAND, TOGGLE_SHOW_ONLY_SELECTED,
    UPDATE_SELECTION
} from "../constants";
import {now} from '../utils';
import {getPreference, setPreference} from "../preferences";



const list = (state = [], action) => {
    const {type, key, status, item, list, keys = []} = action;
    switch (type) {
    case SELECT_ITEM:
        const [selected] = state.filter(i => i.key === key);
        selected.selected = status;
        const rest = state.filter(i => i.key !== key);
        return [{...selected}, ...rest];

    case SELECT_ALL_ITEMS:
        return [
            ...state.map(item => ({...item, selected: item.selected || keys.includes(item.key)}))
        ];
    case CLEAR_ALL_ITEMS:
        return [
            ...state.map(item => ({...item, selected: false}))
        ]
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

const filter = (state = '', action) => {
    const {type, filter} = action;
    switch (type) {
    case SET_FILTER:
        return filter;
    default:
        return state;
    }
};

const hideZeroOnHand = (state = getPreference(STORE_PREF_SHOW_ON_HAND, true), action) => {
    const {type, } = action;
    switch (type) {
    case TOGGLE_HIDE_ZERO_ON_HAND:
        setPreference(STORE_PREF_SHOW_ON_HAND, !state);
        return !state;
    default:
        return state;
    }
};

const showOnlySelected = (state = false, action) => {
    const {type, } = action;
    switch (type) {
    case TOGGLE_SHOW_ONLY_SELECTED:
        return !state;
    case CLEAR_ALL_ITEMS:
        return false;
    default:
        return state;
    }
};

const visibleItems = (state = [], action) => {
    const {type, visibleItems, key, status} = action;
    switch (type) {
    case SELECT_ITEM:
        return [
            ...state.filter(item => item.key !== key),
            ...state.filter(item => item.key === key).map(item => ({...item, selected: status}))
        ];

    case SET_VISIBLE_ITEMS:
        return [...visibleItems];
    default:
        return state;
    }
};



export default combineReducers({
    list,
    loading,
    itemsLoaded,
    filter,
    hideZeroOnHand,
    showOnlySelected,
    visibleItems,
});
