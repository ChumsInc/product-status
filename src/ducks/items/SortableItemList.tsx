import React from 'react';
import {useAppDispatch} from "../../app/configureStore";
import {useSelector} from "react-redux";
import {selectFilteredItems, selectItemsLoading, selectPage, selectRowsPerPage, selectSort} from "./selectors";
import {LoadingProgressBar, SortableTable, SortableTableField, SortProps, TablePagination} from "chums-components";
import {InProcessStatus, ItemRecord} from "../../types";
import {setPage, setRowsPerPage, setSort} from "./actions";
import {itemKey} from "./utils";
import classNames, {Argument} from "classnames";
import {QueryStatus} from "@reduxjs/toolkit/query";


export interface SortableItemListProps {
    fields: SortableTableField<ItemRecord>[],
    rowClassName?: (row:ItemRecord) => Argument
}

const SortableItemList = ({fields, rowClassName}: SortableItemListProps) => {
    const dispatch = useAppDispatch();
    const loading = useSelector(selectItemsLoading);
    const list = useSelector(selectFilteredItems);
    const page = useSelector(selectPage);
    const rowsPerPage = useSelector(selectRowsPerPage);
    const sort = useSelector(selectSort);

    const sortChangeHandler = (sort: SortProps<ItemRecord>) => {
        dispatch(setSort(sort))
    }

    const pageChangeHandler = (page: number) => dispatch(setPage(page));

    const rowsPerPageChangeHandler = (rowsPerPage: number) => dispatch(setRowsPerPage(rowsPerPage));

    const _rowClassName = (item:ItemRecord) => {
        return classNames({
            'table-warning': item.changed && !item.saving,
            'text-info': item.saving === QueryStatus.pending,
            'text-success': item.saving === InProcessStatus.saving
        }, rowClassName ? rowClassName(item) : '')
    }
    return (
        <div>
            {loading && <LoadingProgressBar animated striped/>}
            <SortableTable data={list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
                           className="table-sticky"
                           rowClassName={_rowClassName}
                           onChangeSort={sortChangeHandler}
                           fields={fields} currentSort={sort} keyField={row => itemKey(row)}/>
            <TablePagination page={page} onChangePage={pageChangeHandler} bsSize="sm"
                             rowsPerPage={rowsPerPage} onChangeRowsPerPage={rowsPerPageChangeHandler}
                             count={list.length} showFirst showLast/>
        </div>
    )
}

export default SortableItemList;
