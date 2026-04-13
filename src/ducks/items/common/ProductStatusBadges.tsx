import type {ItemRecord} from "../../../types.ts";
import {Badge} from 'react-bootstrap';

const ProductStatusBadges = ({item}:{item:ItemRecord}) => {
    const {InactiveItem, ProductType, ItemStatus} = item;

    return (
        <div className="d-flex flex-wrap justify-content-start gap-1">
            {!!ItemStatus && (<Badge bg="dark">{ItemStatus}</Badge>)}
            {InactiveItem === 'Y' && (<Badge bg="warning" className="text-dark">Inactive</Badge>)}
            {ProductType === 'D' && (<Badge bg="danger">Disco</Badge>)}
        </div>
    )
}

export default ProductStatusBadges;
