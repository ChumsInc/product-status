import React from 'react';

const NotesTabContent = () => {

    return (
        <div className="card mt-5">
            <div className="card-body">
                <div className="card-title">About Product Status Fields</div>
                <ul>
                    <li>
                        <code>QuantityAvailable = QuantityOnHand
                            - (QuantityOnSalesOrder + QuantityOnBackOrder + QuantityRequiredForWO +
                            QuantityOnMaterialReq)
                            + QuantityOnWorkOrder + QuantityOnPurchaseOrder;
                        </code>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default NotesTabContent;
