import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {
    render() {
        return (
            <div>
                <div style={{marginTop: '10px'}}>
                    <ul className="nav nav-tabs" role="tablist" style={{marginBottom: '5px'}}>
                        <li role="presentation" className={classNames({active: this.currentTab === 'editor'})}>
                            <a href="#editor" role="tab" onClick={this.onSelectTab.bind(this, 'editor')}>Editor</a>
                        </li>
                        <li role="presentation" className={classNames({active: this.currentTab === 'report'})}>
                            <a href="#report" role="tab" onClick={this.onSelectTab.bind(this, 'report')}>Report</a>
                        </li>
                    </ul>
                    <div className="tab-content">
                        {content}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {
        warehouses,
        productLines,
        categories,
        subCategories,
        baseSKUs,
        statuses,
        products,
        hasError,
        isLoading
    } = state;

    return {
        warehouses,
        productLines,
        categories,
        subCategories,
        baseSKUs,
        statuses,
        products,
        hasError,
        isLoading
    };
};

export default connect(mapStateToProps)(App);
