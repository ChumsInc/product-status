/**
 * Created by steve on 4/24/2017.
 */

import { observable } from 'mobx';
import { fetchGET, fetchPOST } from 'chums-components';
import Item from './Item';

class ProductStatusStore {
    /**
     *
     * @type {Item}
     */
    @observable itemParams = new Item({Company: 'CHI'});
    @observable company = 'chums';
    @observable warehouses = [];
    @observable productLines = [];
    @observable category2 = [];
    @observable category3 = [];
    @observable category4 = [];
    @observable itemStatus = [];

    @observable items = [];
    @observable hide0 = true;


    loadWarehouses(company = 'chums') {
        const url = '/node/search/whse/:company/'.replace(':company', company);
        fetchGET(url)
            .then(response => {
                this.warehouses = response.result;
            })
            .catch(err => {
                console.log(err.message);
            });
    }

    loadProductLines(company = 'chums') {
        const url = '/node/search/prodline/:company'.replace(':company', company);
        fetchGET(url)
            .then(response => {
                this.productLines = response.result;
            })
            .catch(err => {
                console.log(err.message);
            });
    }

    loadCategory2(company = 'chums') {
        const url = '/node/search/cat2/:company'.replace(':company', company);
        fetchGET(url)
            .then(response => {
                this.category2 = response.result;
            })
            .catch(err => {
                console.log(err.message);
            });
    }

    loadCategory3(company = 'chums') {
        const url = '/node/search/cat3/:company'.replace(':company', company);
        fetchGET(url)
            .then(response => {
                this.category3 = response.result;
            })
            .catch(err => {
                console.log(err.message);
            });
    }

    loadCategory4(company = 'chums') {
        const url = '/node/search/cat4/:company'.replace(':company', company);
        fetchGET(url)
            .then(response => {
                this.category4 = response.result;
            })
            .catch(err => {
                console.log(err.message);
            });
    }
    
    loadItemStatus() {
        const url = '/node-dev/production/item/status';
        fetchGET(url)
            .then(response => {
                this.itemStatus = response.result;
            })
            .catch(err => {
                console.log(err.message);
            });
    }


    onChangeCompany(company) {
        this.itemParams.Company = company;
        this.loadWarehouses(company);
        this.loadProductLines(company);
        this.loadCategory2(company);
        this.loadCategory3(company);
        this.loadCategory4(company);
        this.loadItemStatus();
    }
}

export const store = new ProductStatusStore();