import React from "react";
import {useSelector} from "react-redux";
import {selectFilter} from "./index";
import {getQuery} from "../items/actions";

const DownloadButton:React.FC = () => {
    const filters = useSelector(selectFilter);
    const clickHandler = () => {
        const query = getQuery(filters);
        const url = `/api/operations/production/item/status/chums.xlsx?${query.toString()}`;
        console.log(url);
        window.open(url, '_blank');
    }
    return (
        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={clickHandler}>Download .xlsx</button>
    )
}

export default React.memo(DownloadButton);
