import React, {ReactNode} from 'react';


export interface FormColumnProps {
    label: string | ReactNode,
    children?: ReactNode;
    htmlFor?: string;
    className?: string;
}

const FormGroup = ({
                       label,
                       htmlFor,
                       className = 'col-auto',
                       children
                   }: FormColumnProps) => {
    return (
        <div className={className}>
            <label className="form-label" htmlFor={htmlFor}>{label}</label>
            <div>{children}</div>
        </div>
    )
}

export default FormGroup;
