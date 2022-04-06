import {ActionInterface, ActionPayload, SortableTableField, SorterProps} from "chums-ducks";
import {ItemRecord} from "../../types";
import {Filter} from "../filters";

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

export interface ItemSorterProps extends SorterProps {
    field: ItemField
}

export interface ItemTableField extends SortableTableField {
    field: ItemField,
}

