import type {ReactNode} from "react";
import {Col, type ColProps, FormLabel} from "react-bootstrap";

export interface ActionColProps extends ColProps {
    children: ReactNode;
}
export default function ActionCol({children, ...props}:ActionColProps) {
    return (
        <Col xs="auto" {...props}>
            <FormLabel>&nbsp;</FormLabel>
            <div>{children}</div>
        </Col>
    )
}
