import {
    type ChangeEvent,
    type CSSProperties,
    type KeyboardEvent,
    type ReactNode,
    useEffect,
    useRef,
    useState,
} from 'react';
import useClickOutside from "@/hooks/click-outside.ts";
import {useFloating} from "@floating-ui/react";
import AutoCompleteDropdown from "@/components/auto-complete/AutoCompleteDropdown.tsx";
import styled from '@emotion/styled';
import {FormControl, type FormControlProps} from "react-bootstrap";

/* eslint-disable react-hooks/refs */

const AutocompleteContainer = styled.div`
    position: relative;
    --bs-dropdown-font-size: 0.875rem;
`;

export interface AutoCompleteProps<T = unknown> extends FormControlProps {
    value: string;
    data: T[];
    onChange: (ev: ChangeEvent<HTMLInputElement>) => void;
    onChangeRecord: (value: T | undefined) => void;
    renderItem: (value: T) => ReactNode;
    itemKey: (value: T) => string | number;
    helpText?: string | null;
    itemStyle?: CSSProperties;
    filter: (value: string) => (element: T) => boolean;
    loading?: boolean;
}

export default function AutoComplete<T = unknown>({
                                                      value,
                                                      data,
                                                      onChange,
                                                      onChangeRecord,
                                                      renderItem,
                                                      itemKey,
                                                      helpText,
                                                      itemStyle,
                                                      filter,
                                                      loading,
                                                      ...props
                                                  }: AutoCompleteProps<T>) {
    const containerRef = useRef<HTMLDivElement>(null);
    const {refs, floatingStyles} = useFloating({placement: 'bottom-start', middleware: []});
    const [values, setValues] = useState<T[]>(data.slice(0, 50));
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(-1);
    const minWidth = '100px';

    useClickOutside(containerRef, () => setOpen(false));


    useEffect(() => {
        const values = data.filter(filter(value));
        setValues(values);
        setIndex(-1);
    }, [value, filter, data]);

    useEffect(() => {
        setValues(data.filter(filter(value)));
    }, [data, filter, value]);

    useEffect(() => {
        containerRef.current
            ?.querySelector('li.list-group-item.active')
            ?.scrollIntoView(false);
    }, [index])


    const inputHandler = (ev: KeyboardEvent<HTMLInputElement>) => {
        const len = values.length;
        let current: T | undefined;
        switch (ev.key) {
            case 'Escape':
                setOpen(false);
                ev.preventDefault();
                ev.stopPropagation();
                return;
            case 'ArrowDown':
                ev.preventDefault();
                setOpen(true);
                setIndex((index + 1) % len);
                return;
            case 'ArrowUp':
                ev.preventDefault();
                setOpen(true);
                setIndex((index - 1 + len) % len);
                return;
            case 'PageDown':
                ev.preventDefault();
                setOpen(true);
                setIndex(Math.min(index + 10, len - 1));
                return;
            case 'PageUp':
                ev.preventDefault();
                setOpen(true);
                setIndex(Math.max(index - 10, 0));
                return;

            case 'Enter':
                if (!open) {
                    return;
                }
                if (open && index === -1) {
                    setOpen(false);
                    return;
                }
                ev.preventDefault();
                current = values[index];
                setOpen(false);
                return onChangeRecord(current);
        }
    }

    const clickHandler = (value: T) => {
        onChangeRecord(value);
        setOpen(false);
    }

    return (
        <AutocompleteContainer ref={containerRef}>
            <FormControl type="search"
                         ref={refs.setReference}
                         autoComplete="off"
                         className="form-control form-control-sm" value={value} onChange={onChange}
                         onKeyDown={inputHandler} onFocus={() => setOpen(true)} {...props}/>
            <small className="text-muted overflow-hidden">
                {helpText ?? null}
            </small>
            <AutoCompleteDropdown open={open} index={index} ref={refs.setFloating} values={values}
                                  floatingStyles={{...floatingStyles, minWidth}} itemKey={itemKey}
                                  renderItem={renderItem} onClick={clickHandler} loading={loading}/>
        </AutocompleteContainer>
    )
}
