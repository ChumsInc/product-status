import DownloadButton from "@/ducks/filters/DownloadButton.tsx";
import {useFilterForm} from "@/components/form/hooks.ts";
import {type ChangeEvent, useCallback, useRef} from "react";
import BaseSKUFilter from "@/ducks/filters/base-sku/BaseSKUFilter.tsx";
import ProductLineFilter from "@/ducks/filters/product-line/ProductLineFilter.tsx";
import ProductTypeFilter from "@/ducks/filters/product-type/ProductTypeFilter.tsx";
import PrimaryVendorFilter from "@/ducks/filters/vendor/PrimaryVendorFilter.tsx";
import WarehouseFilter from "@/ducks/filters/warehouse/WarehouseFilter.tsx";
import CategoryFilter from "@/ducks/filters/product-category/CategoryFilter.tsx";
import CollectionFilter from "@/ducks/filters/product-collection/CollectionFilter.tsx";
import ProductStatusFilter from "@/ducks/filters/product-status/ProductStatusFilter.tsx";
import ItemCodeFilter from "@/ducks/filters/item-code/ItemCodeFilter.tsx";
import ActionCol from "@/components/form/ActionCol.tsx";
import {useAppSelector} from "@/app/configureStore.ts";
import {selectItemListStatus} from "@/ducks/items/itemListSlice.ts";
import DescriptionFilter from "@/components/form/description-filters/DescriptionFilter.tsx";

export default function FilterForm() {
    const status = useAppSelector(selectItemListStatus);
    const ref = useRef<HTMLFormElement|null>(null);
    const {load, setParams, setShowColumnSelector, showColumnSelector} = useFilterForm();

    const submitHandler = useCallback((formData: FormData) => {
        const params = new URLSearchParams();
        formData.forEach((value, key) => {
            if (typeof value === 'string' && value.trim() !== '') {
                params.set(key, value);
            }
        })
        load(params);
    }, [load]);

    const resetHandler = () => {
        const params = new URLSearchParams();
        params.set('ProductType', 'FKR');
        setParams(params);
    }

    const toggleColumnSelector = (ev: ChangeEvent<HTMLInputElement>) => {
        setShowColumnSelector(ev.target.checked);
    }

    const onClickDownload = () => {
        if (!ref.current) {
            return;
        }
        const formData = new FormData(ref.current);
        const params = new URLSearchParams();
        formData.forEach((value, key) => {
            if (typeof value === 'string' && value.trim() !== '') {
                params.set(key, value);
            }
        })
        const url = `/api/operations/production/item/status/items.xlsx?${params.toString()}`;
        window.open(url, '_blank');
    }

    return (
        <form className="row g-3 hidden-print row--filter align-items-baseline"
              ref={ref}
              action={submitHandler}>
            <ActionCol>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="filter-column-selector"
                           checked={showColumnSelector} onChange={toggleColumnSelector}/>
                    <label className="form-check-label" htmlFor="filter-column-selector">
                        <span className="bi-funnel-fill" aria-label="Show Columns"/>
                    </label>
                </div>
            </ActionCol>
            <ItemCodeFilter/>
            <ProductTypeFilter/>
            <WarehouseFilter/>
            <ProductLineFilter/>
            <PrimaryVendorFilter/>
            <CategoryFilter/>
            <CollectionFilter/>
            <BaseSKUFilter/>
            <DescriptionFilter/>
            <ProductStatusFilter/>
            <ActionCol>
                <button type="button" className="btn btn-sm btn-outline-secondary" onClick={resetHandler}>
                    Reset
                </button>
            </ActionCol>
            <ActionCol>
                <button type="submit" className="btn btn-sm btn-primary" disabled={status !== 'idle'}>
                    Load
                </button>
            </ActionCol>
            <ActionCol>
                <DownloadButton onClick={onClickDownload}/>
            </ActionCol>
        </form>
    )
}
