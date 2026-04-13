import {useAppDispatch, useAppSelector} from "@/app/configureStore.ts";
import {useSelector} from "react-redux";
import {InProcessStatus, type  ItemRecord} from "../../../types.ts";
import classNames, {type Argument} from "classnames";
import {QueryStatus} from "@reduxjs/toolkit/query";
import {
    DataTableRowCellSet,
    DataTableTR,
    type SortableTableField,
    SortableTableTH,
    Table
} from "@chumsinc/sortable-tables";
import type {SortProps} from "chums-types";
import {ProgressBar} from "react-bootstrap";
import {type TableComponents, TableVirtuoso} from "react-virtuoso";
import {selectFilteredItems, selectItemListSort, selectItemListStatus, setSort} from "@/ducks/items/itemListSlice.ts";
import SortableItemListContainer from "@/ducks/items/common/SortableItemListContainer.tsx";

export interface SortableItemListProps {
    fields: SortableTableField<ItemRecord>[],
    rowClassName?: (row: ItemRecord) => Argument
}

const SortableItemList = ({fields, rowClassName}: SortableItemListProps) => {
    const dispatch = useAppDispatch();
    const status = useAppSelector(selectItemListStatus)
    const list = useSelector(selectFilteredItems);
    const sort = useSelector(selectItemListSort);

    const sortChangeHandler = (sort: SortProps<ItemRecord>) => {
        dispatch(setSort(sort))
    }


    const _rowClassName = (item: ItemRecord) => {
        return classNames({
            'table-warning': item.changed && !item.saving,
            'text-info': item.saving === QueryStatus.pending,
            'text-success': item.saving === InProcessStatus.saving
        }, rowClassName ? rowClassName(item) : '')
    }

    const components: TableComponents<ItemRecord> = {
        Table: ({children, style}) => (
            <Table style={style} className="table table-sm table-hover">{children}</Table>
        ),
        TableRow: ({children, item, ...rest}) => (
            <DataTableTR row={item} rowClassName={_rowClassName(item)} {...rest}>
                {children}
            </DataTableTR>
        )
    }
    return (
        <SortableItemListContainer>
            {status === 'loading' && <ProgressBar animated striped now={100}/>}
            <TableVirtuoso data={list}
                           components={components}
                           fixedHeaderContent={() => (
                               <tr>
                                   {fields.map((field, index) => (
                                       <SortableTableTH key={index}
                                                        field={field}
                                                        sorted={sort.field === field.field}
                                                        ascending={sort.ascending}
                                                        onClick={sortChangeHandler}/>
                                   ))}
                               </tr>
                           )}
                           itemContent={(_index, row) => (
                               <DataTableRowCellSet fields={fields} row={row}/>
                           )}

            />
        </SortableItemListContainer>
    )
}

export default SortableItemList;
