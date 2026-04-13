import {createAction} from "@reduxjs/toolkit";

export const setFilters = createAction<URLSearchParams>('filters/setFilters');
