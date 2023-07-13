import React from "react";
import {useSelector} from "react-redux";
import {selectFilter} from "./index";
import {getFilterQuery} from "../../api/filters";

const DownloadButton = () => {
    const filters = useSelector(selectFilter);

    const clickHandler = () => {
        const query = getFilterQuery(filters);
        const url = `/api/operations/production/item/status/chums.xlsx?${query.toString()}`;
        window.open(url, '_blank');
    }
    return (
        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={clickHandler}>
            Download .xlsx
        </button>
    )
}

export default DownloadButton;
