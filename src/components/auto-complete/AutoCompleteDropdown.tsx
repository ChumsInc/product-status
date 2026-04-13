import classNames from "classnames";
import type {CSSProperties, ReactNode} from "react";
import {ProgressBar} from "react-bootstrap";

export interface AutoCompleteProps<T = unknown> {
    open: boolean;
    index: number;
    ref: ((node: HTMLElement | null) => void);
    values: T[];
    floatingStyles: CSSProperties;
    itemKey: (value: T) => string | number;
    renderItem: (value: T) => ReactNode;
    itemStyle?: CSSProperties;
    onClick: (value: T) => void;
    loading?: boolean;
}

export default function AutoCompleteDropdown<T = unknown>({
                                                              open,
                                                              index,
                                                              ref,
                                                              values,
                                                              floatingStyles,
                                                              itemKey,
                                                              renderItem,
                                                              itemStyle,
                                                              onClick,
                                                              loading,
                                                          }: AutoCompleteProps<T>) {
    if (!open) {
        return null;
    }
    return (
        <div ref={ref} className="" style={{
            height: 'auto',
            width: 'max-content',
            maxHeight: '70vh',
            overflow: 'auto',
            zIndex: 1000,
            borderColor: `var(--bs-border-color)`,
            boxShadow: 'var(--bs-box-shadow)',
            fontSize: 'var(--bs-dropdown-font-size)',
            ...floatingStyles,
        }}>
            <ul className={classNames('list-group fade', {show: open})}>
                {loading && (
                    <li className="list-group-item">
                        <ProgressBar animated striped now={100} variant="info" style={{height: '5px'}}/>
                    </li>
                )}
                {values
                    .map((value, i) => (
                        <li key={itemKey(value)}
                            className={classNames('list-group-item', {active: index === i})}
                            style={itemStyle} onClick={() => onClick(value)}>
                            {renderItem(value)}
                        </li>
                    ))}
            </ul>
        </div>
    )
}
