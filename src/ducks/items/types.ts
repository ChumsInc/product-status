import {SortableTableField, SortProps} from "chums-components";
import {ItemRecord} from "../../types";
import {Filter} from "../filters";
import {ActionInterface, ActionPayload} from "chums-connected-components";

export interface ItemsPayload extends ActionPayload {
    items?:ItemRecord[],
    item?: ItemRecord,
    itemKeys?: string[],
    selected?: boolean,
    search?: string,
    filter?: Filter,
    status?: string,
    value?: string,
    quantity?: number,
    force?: boolean,
}

export interface ItemsAction extends ActionInterface {
    payload?: ItemsPayload,
}

export type ItemField = keyof ItemRecord;

export interface ItemSorterProps extends SortProps {
    field: ItemField
}

export interface ItemTableField extends SortableTableField {
    field: ItemField,
}

