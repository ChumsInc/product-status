import * as React from 'react';
import Button from '@mui/material/Button';
import Tooltip, {TooltipProps} from "@mui/material/Tooltip";
import {ItemRecord} from "../../types";
import numeral from "numeral";
import {useId} from "react";
import {Popover} from "@mui/material";

export interface QuantityAvailableToolTipProps extends Omit<TooltipProps, 'title'> {
    values: ItemRecord;
}

const QuantityAvailableToolTip = ({values, children}:QuantityAvailableToolTipProps) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
    const id = useId();

    const onOpenToolTip = (ev:React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(ev.currentTarget)
    }
    const closeHandler = () => {
        setAnchorEl(null);
    }

    const renderValues = () => {
        return (
            <table>
                <tbody>
                <tr>
                    <th>On Hand</th>
                    <td style={{textAlign:"right"}}>{numeral(values.QuantityAvailable).format('0,0')}</td>
                </tr>
                </tbody>
            </table>
        )
    }
    return (
        <>
            <div className="btn-text" aria-describedby={id} onClick={onOpenToolTip}>
                {numeral(values.QuantityAvailable).format('0,0')}
            </div>
            <Popover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={closeHandler}
                     anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                     transformOrigin={{vertical: 'top', horizontal: 'right'}}>
                <table className="table table-xs table-info">
                    <tbody>
                    <tr>
                        <th>On Hand</th>
                        <td className="ms-3 text-end">{numeral(values.QuantityOnHand).format('0,0')}</td>
                    </tr>
                    <tr>
                        <th>On S/O</th>
                        <td className="ms-3 text-end">{numeral(values.QuantityOnSalesOrder).format('0,0')}</td>
                    </tr>
                    <tr>
                        <th>On B/O</th>
                        <td className="ms-3 text-end">{numeral(values.QuantityOnBackOrder).format('0,0')}</td>
                    </tr>
                    <tr>
                        <th>Req W/T</th>
                        <td className="ms-3 text-end">{numeral(values.QuantityRequiredForWO).format('0,0')}</td>
                    </tr>
                    <tr>
                        <th>Req M/R</th>
                        <td className="ms-3 text-end">{numeral(values.QuantityOnMaterialReq).format('0,0')}</td>
                    </tr>
                    <tr>
                        <th>On W/T</th>
                        <td className="ms-3 text-end">{numeral(values.QuantityOnWorkOrder).format('0,0')}</td>
                    </tr>
                    <tr>
                        <th>On P/O</th>
                        <td className="ms-3 text-end">{numeral(values.QuantityOnPurchaseOrder).format('0,0')}</td>
                    </tr>
                    </tbody>
                </table>
            </Popover>
        </>
    )
}

export default QuantityAvailableToolTip;
