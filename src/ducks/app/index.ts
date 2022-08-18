import {combineReducers} from "redux";
import {fetchJSON} from "chums-components";
import {ThunkAction} from "redux-thunk";
import {RootState} from "../index";
import {PATH_CHECK_ADMIN_ROLE} from "../../constants";
import {ActionInterface, ActionPayload} from "chums-connected-components";

export interface AppPayload extends ActionPayload {
    isAdmin?: boolean,
}

export interface AppAction extends ActionInterface {
    payload?: AppPayload,
}

export interface AppThunkAction extends ThunkAction<any, RootState, unknown, AppAction> {
}

export const fetchAdminRequested = 'app/fetchAdminRequested';
export const fetchAdminSucceeded = 'app/fetchAdminSucceeded';
export const fetchAdminFailed = 'app/fetchAdminFailed';

export const checkIsAdminAction = (): AppThunkAction =>
    async (dispatch, getState) => {
        try {
            const state = getState();
            dispatch({type: fetchAdminRequested});
            const {success} = await fetchJSON<{ success: boolean }>(PATH_CHECK_ADMIN_ROLE);
            dispatch({type: fetchAdminSucceeded, payload: {isAdmin: success}});
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("checkIsAdminAction()", error.message);
                return dispatch({type: fetchAdminFailed, payload: {error, context: fetchAdminRequested}})
            }
            console.error("checkIsAdminAction()", error);
        }
    }

export const selectIsAdmin = (state: RootState) => state.app.isAdmin;

const isAdminReducer = (state: boolean = false, action: AppAction): boolean => {
    const {type, payload} = action;
    switch (type) {
    case fetchAdminSucceeded:
        return payload?.isAdmin || false;
    case fetchAdminFailed:
        return false;
    default:
        return state;
    }
}

export default combineReducers({
    isAdmin: isAdminReducer,
})
