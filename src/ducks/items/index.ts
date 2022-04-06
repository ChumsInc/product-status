import {combineReducers} from "redux";
import {ItemRecord, ReorderMethod} from "../../types";
import {ItemsAction} from "./types";
import {
    itemsFetchFailed,
    itemsFetchRequested,
    itemsFetchSucceeded,
    itemsSaveFailed,
    itemsSaveRequested,
    itemsSaveSucceeded, itemsSetFilterInactive,
    itemsSetFilterOnHand,
    itemsSetFilterSelected,
    itemsSetNextStatus,
    itemsSetSearch,
    itemsSetSelected,
    setEconomicOrderQty,
    setMaximumOnHandQty,
    setMinimumOrderQty,
    setReorderMethod,
    setReorderPointQty
} from "./actionTypes";
import {
    itemKey,
    itemKeySorter,
    updateEconomicOrderQty,
    updateItemInArray,
    updateItemSelected,
    updateItemStatus,
    updateMaximumOnHandQty,
    updateMinimumOrderQty,
    updateReorderMethod,
    updateReorderPointQty
} from "./utils";
import {getPreference, setPreference} from "../../preferences";
import {STORE_PREF_SHOW_ON_HAND, STORE_PREF_SHOW_INACTIVE, STORE_PREF_SHOW_ONLY_SELECTED} from "../../constants";


const listReducer = (state: ItemRecord[] = [], action: ItemsAction): ItemRecord[] => {
    const {type, payload} = action;
    switch (type) {
    case itemsFetchSucceeded:
        if (payload?.items) {
            return payload.items.sort(itemKeySorter)
        }
        return [];
    case itemsSaveSucceeded:
        if (payload?.item) {
            const item = payload.item;
            return updateItemInArray(state, [itemKey(payload.item)], () => item);
        }
        return state;
    case itemsSetNextStatus:
        if (payload?.itemKeys) {
            const itemKeys = payload.itemKeys || [];
            return updateItemInArray(state, itemKeys, updateItemStatus(payload.status || ''))
        }
        return state;
    case itemsSetSelected:
        if (payload?.itemKeys) {
            const itemKeys = payload.itemKeys || [];
            return updateItemInArray(state, itemKeys, updateItemSelected(payload.force));
        }
        return state;
    case setReorderMethod:
        if (payload?.itemKeys) {
            const itemKeys = payload.itemKeys || [];
            return updateItemInArray(state, itemKeys, updateReorderMethod(payload.value as ReorderMethod))
        }
        return state;
    case setReorderPointQty:
        if (payload?.itemKeys) {
            const itemKeys = payload.itemKeys || [];
            return updateItemInArray(state, itemKeys, updateReorderPointQty(payload.quantity));
        }
        return state;
    case setEconomicOrderQty:
        if (payload?.itemKeys) {
            const itemKeys = payload.itemKeys || [];
            return updateItemInArray(state, itemKeys, updateEconomicOrderQty(payload.quantity));
        }
        return state;
    case setMinimumOrderQty:
        if (payload?.itemKeys) {
            const itemKeys = payload.itemKeys || [];
            return updateItemInArray(state, itemKeys, updateMinimumOrderQty(payload.quantity));
        }
        return state;
    case setMaximumOnHandQty:
        if (payload?.itemKeys) {
            const itemKeys = payload.itemKeys || [];
            return updateItemInArray(state, itemKeys, updateMaximumOnHandQty(payload.quantity));
        }
        return state;
    default:
        return state;
    }
}

const loadingReducer = (state: boolean = false, action: ItemsAction): boolean => {
    switch (action.type) {
    case itemsFetchRequested:
        return true;
    case itemsFetchSucceeded:
    case itemsFetchFailed:
        return false;
    default:
        return state;
    }
}

const savingReducer = (state: boolean = false, action: ItemsAction): boolean => {
    switch (action.type) {
    case itemsSaveRequested:
        return true;
    case itemsSaveSucceeded:
    case itemsSaveFailed:
        return false;
    default:
        return state;
    }
}


const searchReducer = (state: string = '', action: ItemsAction): string => {
    switch (action.type) {
    case itemsSetSearch:
        return action.payload?.value || '';
    default:
        return '';
    }
}

const filterInactiveReducer = (state: boolean = getPreference(STORE_PREF_SHOW_INACTIVE, false), action: ItemsAction) => {
    const {type, payload} = action;
    switch (type) {
    case itemsSetFilterInactive: {
        const nextState = payload?.force === undefined ? !state : payload.force;
        setPreference(STORE_PREF_SHOW_INACTIVE, nextState);
        return nextState;
    }
    default:
        return state;
    }
};

const filterOnHandReducer = (state: boolean = getPreference(STORE_PREF_SHOW_ON_HAND, true), action: ItemsAction) => {
    const {type, payload} = action;
    switch (type) {
    case itemsSetFilterOnHand: {
        const nextState = payload?.force === undefined ? !state : payload.force;
        setPreference(STORE_PREF_SHOW_ON_HAND, nextState);
        return nextState;
    }
    default:
        return state;
    }
};

const filterOnlySelectedReducer = (state: boolean = getPreference(STORE_PREF_SHOW_ONLY_SELECTED, false), action: ItemsAction) => {
    const {type, payload} = action;
    switch (type) {
    case itemsSetFilterSelected: {
        const nextState = payload?.force === undefined ? !state : payload.force;
        setPreference(STORE_PREF_SHOW_ONLY_SELECTED, nextState);
        return nextState;
    }
    case itemsFetchSucceeded:
        setPreference(STORE_PREF_SHOW_ONLY_SELECTED, false);
        return false;
    default:
        return state;
    }
}

const nextStatusReducer = (state:string = '', action:ItemsAction):string => {
    const {type, payload} = action;
    switch (type) {
    case itemsSetNextStatus:
        return payload?.value || '';
    default:
        return state;
    }
}

const reorderPointQtyReducer = (state:number = 0, action:ItemsAction):number => {
    return 0;
}

export default combineReducers({
    list: listReducer,
    loading: loadingReducer,
    saving: savingReducer,
    search: searchReducer,
    nextStatus: nextStatusReducer,

    filterOnHand: filterOnHandReducer,
    filterInactive: filterInactiveReducer,
    filterOnlySelected: filterOnlySelectedReducer,
})
