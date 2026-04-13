import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getAdminRole} from "@/api/admin.ts";
import {QueryStatus} from "@reduxjs/toolkit/query";
import {dismissAlert} from "@chumsinc/alert-list";


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

const appSlice = createSlice({
    name: 'app',
    initialState: initialAppState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(dismissAlert, (state, action) => {
                if (action.payload.context === loadAdminRole.typePrefix) {
                    state.status = QueryStatus.uninitialized;
                }
            })
            .addAsyncThunk(loadAdminRole, {
                pending: (state) => {
                    state.status = QueryStatus.pending;
                },
                fulfilled: (state, action) => {
                    state.status = QueryStatus.fulfilled;
                    state.isAdmin = action.payload;
                },
                rejected: (state) => {
                    state.status = QueryStatus.rejected;
                }
            })
    },
    selectors: {
        selectIsAdmin: (state) => state.isAdmin,
    }
});

export default appSlice;
export const {selectIsAdmin} = appSlice.selectors;
