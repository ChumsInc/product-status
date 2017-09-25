/**
 * Created by steve on 2/9/2017.
 */

import { observable, computed } from 'mobx';
import { fetchGET, fetchPOST } from 'chums-components';


export default class Item {
    @observable Company = '';
    @observable ItemCode = '';
    @observable WarehouseCode = '';
    @observable ItemCodeDesc = '';
    @observable ProductLine = '';
    @observable Category2 = '';
    @observable Category3 = '';
    @observable Category4 = '';
    @observable QuantityOnHand = 0;
    @observable QuantityOnSalesOrder = 0;
    @observable QuantityRequiredForWO = 0;
    @observable QuantityOnWorkOrder = 0;
    @observable ItemStatus = '';
    @observable AverageUnitCost = 0;
    @observable StandardUnitCost = 0;
    @observable StandardUnitPrice = 0;
    @observable SuggestedRetailPrice = 0;
    @observable SalesUnitOfMeasure = '';
    @observable SalesUMConvFctr = 1;
    @observable selected = false;
    @observable newItemStatus = '';

    constructor(item = {}) {
        Object.keys(item)
            .filter(key => this[key] !== undefined)
            .map(key => {
                this[key] = item[key];
            });
    }

    @computed get key() {
        return `${this.Company}:${this.ItemCode}:${this.WarehouseCode}`;
    }

    @computed get ItemCost() {
        return this.QuantityOnHand * this.AverageUnitCost;
    }

    @computed get classNames() {
        return {
            info: this.selected,
            warning: this.newItemStatus !== '' && this.newItemStatus !== this.ItemStatus
        };
    }

    saveStatus(newItemStatus) {
        const url = `/node-dev/production/item/status/:Company/:ItemCode/:WarehouseCode`
                .replace(':Company', this.Company)
                .replace(':ItemCode', this.ItemCode)
                .replace(':WarehouseCode', this.WarehouseCode),
            data = {ItemStatus: newItemStatus};
        this.newItemStatus = newItemStatus;
        return new Promise((resolve, reject) => {
            fetchPOST(url, data)
                .then(response => {
                    return response.result;
                })
                .then(res => {
                    if (res.length === 1) {
                        this.constructor(res[0]);
                        this.newItemStatus = '';
                    }
                    resolve({success: true});
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                });
        })
    }

    /**
     *
     * @param {Item} itemParams
     */
    static loadCollection(itemParams) {
        return new Promise((resolve, reject) => {
            const query = itemParams.getSearchOptions();

            const url = `/node-dev/production/item/status/:Company/:ItemCode?:Query`
                .replace(':Company', encodeURIComponent(itemParams.Company))
                .replace(':ItemCode', encodeURIComponent(itemParams.ItemCode))
                .replace(':Query', query);

            fetchGET(url)
                .then(res => {
                    const items = res.result.map(row => {
                        let item = new Item(row);
                        item.Company = itemParams.Company;
                        return item;
                    });
                    resolve(items);
                })
                .catch(err => {
                    console.log('loadCollection()', err);
                    reject(err);
                });
        });
    }

    getSearchOptions() {
        const qKeys = new Set(['WarehouseCode', 'ProductLine', 'Category2', 'Category3', 'Category4', 'ItemStatus']);
        return Object.keys(this)
            .filter(key => qKeys.has(key) && this[key] !== '' && this[key] !== '%')
            .map(key => `${key}=` + encodeURIComponent(this[key]))
            .join('&');
    }
}
