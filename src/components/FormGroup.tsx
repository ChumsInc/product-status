import React, {ReactNode} from 'react';


export interface FormColumnProps {
    label: string | ReactNode,
    children?: ReactNode;
    htmlFor?: string;
}

const FormGroup: React.FC<FormColumnProps> = ({
                                                  label,
                                                  htmlFor,
                                                  children
                                              }) => {
    return (
        <div className="col-auto">
            <label className="form-label" htmlFor={htmlFor}>{label}</label>
            <div>{children}</div>
        </div>
    )
}

export default FormGroup;
