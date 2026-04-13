import {useId, useRef, useState} from 'react';
import type {ItemRecord} from "../../../types.ts";
import numeral from "numeral";
import {Overlay} from "react-bootstrap";

export interface QuantityAvailableToolTipProps {
    values: ItemRecord;
}

const QuantityAvailableToolTip = ({values}: QuantityAvailableToolTipProps) => {
    const [show, setShow] = useState(false);
    const id = useId();
    const ref = useRef<HTMLDivElement | null>(null)

    const onOpenToolTip = () => {
        setShow(!show);
    }
    const closeHandler = () => {
        setShow(false);
    }

    return (
        <>
            <div className="btn-text" aria-describedby={id} onClick={onOpenToolTip} ref={ref}>
                {numeral(values.QuantityAvailable).format('0,0')}
            </div>
            {/* eslint-disable-next-line react-hooks/refs */}
            <Overlay target={ref.current} show={show} placement="bottom-start" onExit={closeHandler}>
                {(props) => (
                    <div {...props}
                         style={{
                             position: 'absolute',
                             backgroundColor: `var(--bs-info-border-subtle)`,
                             padding: `2px 10px`,
                             borderRadius: 3, ...props.style
                         }}
                         onMouseLeave={closeHandler} id={id} className="p-2">
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
                    </div>
                )}
            </Overlay>
        </>
    )
}

export default QuantityAvailableToolTip;
