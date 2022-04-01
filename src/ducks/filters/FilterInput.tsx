import React, {ChangeEvent, InputHTMLAttributes, useEffect, useState} from 'react';
import classNames from "classnames";

export type FilterInputContainerProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value'>;

export interface FilterInputProps extends InputHTMLAttributes<HTMLInputElement> {
    value: string,
    onChange: (ev: ChangeEvent<HTMLInputElement>) => void,
}

const FilterInput: React.FC<FilterInputProps> = ({
                                                     value,
                                                     className,
                                                     children,
                                                     ...props
                                                 }) => {
    const [localValue, setLocalValue] = useState(value);
    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    return (
        <>
            <input type="search" value={localValue}
                   className={classNames("form-control form-control-sm", className)} placeholder="All"
                   {...props}/>
            {children}
        </>
    )
}
export default React.memo(FilterInput);
