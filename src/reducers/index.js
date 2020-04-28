import {combineReducers} from 'redux';
import items from './items';
import app from './app';

export default combineReducers({
    app,
    items,
})
