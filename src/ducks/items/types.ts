import {ActionInterface, ActionPayload} from "chums-ducks";
import {ItemRecord} from "../../types";
import {Filter} from "../filters";

export interface ItemsPayload extends ActionPayload {
    items?:ItemRecord[],
    itemKey?: string,
    item?: ItemRecord,
    selected?: boolean,
    itemKeys?: string[],
    search?: string,
    filter?: Filter,
}

export interface ItemsAction extends ActionInterface {
    payload: ItemsPayload,
}

