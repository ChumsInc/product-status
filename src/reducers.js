import { combineReducers } from 'redux';
import {
    RECEIVE_WAREHOUSES, RECEIVE_BASE_SKUS, RECEIVE_CATEGORIES, RECEIVE_PRODUCT_LINES, RECEIVE_STATUSES,
    RECEIVE_SUBCATEGORIES, LOAD_FAILURE, ACK_ERROR, RECEIVE_PRODUCTS, LOAD_PRODUCTS
} from './actions';


const warehouses = (state = [], action) => {
    switch (action.type) {
    case RECEIVE_WAREHOUSES:
        return action.list;
    default:
        return state;
    }
};

const productLines = (state = [], action) => {
    switch (action.type) {
    case RECEIVE_PRODUCT_LINES:
        return action.list;
    default:
        return state;
    }
};

const categories = (state = [], action) => {
    switch (action.type) {
    case RECEIVE_CATEGORIES:
        return action.list;
    default:
        return state;
    }
};

const subCategories = (state = [], action) => {
    switch (action.type) {
    case RECEIVE_SUBCATEGORIES:
        return action.list;
    default:
        return state;
    }
};

const baseSKUs = (state = [], action) => {
    switch (action.type) {
    case RECEIVE_BASE_SKUS:
        return action.list;
    default:
        return state;
    }
};

const statuses = (state = [], action) => {
    switch (action.type) {
    case RECEIVE_STATUSES:
        return action.list;
    default:
        return state;
    }
};

const products = (state = [], action) => {
    switch (action.type) {
    case RECEIVE_PRODUCTS:
        return action.list;
    default:
        return state;
    }
};


const hasError = (state = null, action) => {
    switch (action.type) {
    case LOAD_FAILURE:
        return action.err.message;
    case ACK_ERROR:
        return null;
    default:
        return state;
    }
};

const isLoading = (state = false, action) => {
    switch (action.type) {
    case RECEIVE_PRODUCTS:
        return false;
    case LOAD_PRODUCTS:
        return true;
    default:
        return state;
    }
};


const appReducer = combineReducers({
    warehouses,
    productLines,
    categories,
    subCategories,
    baseSKUs,
    statuses,
    products,
    hasError,
    isLoading
});

export default appReducer;
