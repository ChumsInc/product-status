import {RootState} from "../index";
import {createAsyncThunk, createReducer} from "@reduxjs/toolkit";
import {getAdminRole} from "../../api/admin";
import {QueryStatus} from "@reduxjs/toolkit/query";

export interface AppState {
    isAdmin: boolean;
    status: QueryStatus
}

export const initialAppState: AppState = {
    isAdmin: false,
    status: QueryStatus.uninitialized,
}

export const loadAdminRole = createAsyncThunk<boolean>(
    'app/loadAdminRole',
    async () => {
        return await getAdminRole();
    }
)

export const selectIsAdmin = (state:RootState) => state.app.isAdmin;
export const selectIsAdminLoaded = (state:RootState) => state.app.status === QueryStatus.fulfilled;
export const selectIsAdminLoading = (state:RootState) => state.app.status === QueryStatus.pending;

const appReducer = createReducer(initialAppState, (builder) => {
    builder
        .addCase(loadAdminRole.pending, (state) => {
            state.status = QueryStatus.pending;
        })
        .addCase(loadAdminRole.rejected, (state) => {
            state.status = QueryStatus.rejected;
        })
        .addCase(loadAdminRole.fulfilled, (state, action) => {
            state.status = QueryStatus.fulfilled;
            state.isAdmin = action.payload;
        })
});

export default appReducer;
