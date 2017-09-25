/**
 * Created by steve on 5/8/2017.
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';


export default class DownloadReportForm extends Component {
    static propTypes = {
        Company: PropTypes.string.isRequired,
        ItemCode: PropTypes.string.isRequired,
        WarehouseCode: PropTypes.string.isRequired,
        ProductLine: PropTypes.string.isRequired,
        Category2: PropTypes.string.isRequired,
        Category3: PropTypes.string.isRequired,
        Category4: PropTypes.string.isRequired,
        ItemStatus: PropTypes.string.isRequired,
    };

    onSubmit(ev) {
        ReactDOM.findDOMNode(this.dlForm).submit();
        ev.preventDefault();
        ev.stopPropagation();
    }

    render() {
        const { Company, WarehouseCode, ItemCode, ProductLine, Category2, Category3, Category4, ItemStatus } = this.props;
        return (
            <form method="get"
                  action={`/node-dev/production/item/status-xlsx/${encodeURIComponent(Company)}/${encodeURIComponent(ItemCode)}`}
                  style={{display: 'inline'}}
                  onSubmit={::this.onSubmit}
                  ref={(form) => { this.dlForm = form; }} >
                <input type="hidden" name="WarehouseCode" value={WarehouseCode} />
                <input type="hidden" name="ProductLine" value={ProductLine} />
                <input type="hidden" name="Category2" value={Category2} />
                <input type="hidden" name="Category3" value={Category3} />
                <input type="hidden" name="Category4" value={Category4} />
                <input type="hidden" name="ItemStatus" value={ItemStatus} />
                <div className="form-group">
                    <label className="hidden-xs">&nbsp;</label>
                    <button type="submit" className="btn btn-primary" onClick={::this.onSubmit}>
                        Download .xlsx
                    </button>
                </div>
            </form>
        );
    }
}
